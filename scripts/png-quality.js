const fs = require("node:fs");
const zlib = require("node:zlib");

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const channelsByColorType = new Map([
  [0, 1],
  [2, 3],
  [3, 1],
  [4, 2],
  [6, 4],
]);

function paethPredictor(left, up, upperLeft) {
  const estimate = left + up - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const upDistance = Math.abs(estimate - up);
  const upperLeftDistance = Math.abs(estimate - upperLeft);

  if (leftDistance <= upDistance && leftDistance <= upperLeftDistance) return left;
  if (upDistance <= upperLeftDistance) return up;
  return upperLeft;
}

function readChunks(buffer) {
  if (!buffer.subarray(0, 8).equals(pngSignature)) {
    throw new Error("not a PNG file");
  }

  const idatParts = [];
  let palette = null;
  let header = null;
  let offset = 8;

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const data = buffer.subarray(dataStart, dataEnd);

    if (type === "IHDR") {
      header = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
        interlace: data[12],
      };
    } else if (type === "PLTE") {
      palette = data;
    } else if (type === "IDAT") {
      idatParts.push(data);
    } else if (type === "IEND") {
      break;
    }

    offset = dataEnd + 4;
  }

  if (!header) throw new Error("missing PNG header");
  if (idatParts.length === 0) throw new Error("missing PNG image data");

  return { header, palette, compressed: Buffer.concat(idatParts) };
}

function unfilterScanline(filter, source, previous, bytesPerPixel) {
  const row = Buffer.alloc(source.length);

  for (let index = 0; index < source.length; index += 1) {
    const value = source[index];
    const left = index >= bytesPerPixel ? row[index - bytesPerPixel] : 0;
    const up = previous[index] || 0;
    const upperLeft = index >= bytesPerPixel ? previous[index - bytesPerPixel] || 0 : 0;

    if (filter === 0) {
      row[index] = value;
    } else if (filter === 1) {
      row[index] = (value + left) & 0xff;
    } else if (filter === 2) {
      row[index] = (value + up) & 0xff;
    } else if (filter === 3) {
      row[index] = (value + Math.floor((left + up) / 2)) & 0xff;
    } else if (filter === 4) {
      row[index] = (value + paethPredictor(left, up, upperLeft)) & 0xff;
    } else {
      throw new Error(`unsupported PNG filter ${filter}`);
    }
  }

  return row;
}

function pixelToRgb(row, x, colorType, palette) {
  if (colorType === 0) {
    const value = row[x];
    return [value, value, value, 255];
  }

  if (colorType === 2) {
    const offset = x * 3;
    return [row[offset], row[offset + 1], row[offset + 2], 255];
  }

  if (colorType === 3) {
    const paletteIndex = row[x] * 3;
    if (!palette || paletteIndex + 2 >= palette.length) return [0, 0, 0, 255];
    return [palette[paletteIndex], palette[paletteIndex + 1], palette[paletteIndex + 2], 255];
  }

  if (colorType === 4) {
    const offset = x * 2;
    const value = row[offset];
    return [value, value, value, row[offset + 1]];
  }

  const offset = x * 4;
  return [row[offset], row[offset + 1], row[offset + 2], row[offset + 3]];
}

function readPngQuality(file) {
  const buffer = fs.readFileSync(file);
  const { header, palette, compressed } = readChunks(buffer);
  const channels = channelsByColorType.get(header.colorType);

  if (!channels) throw new Error(`unsupported PNG color type ${header.colorType}`);
  if (header.bitDepth !== 8) throw new Error(`unsupported PNG bit depth ${header.bitDepth}`);
  if (header.interlace !== 0) throw new Error("interlaced PNGs are not supported");

  const inflated = zlib.inflateSync(compressed);
  const stride = header.width * channels;
  const bytesPerPixel = Math.max(1, channels);
  const xStep = Math.max(1, Math.floor(header.width / 180));
  const yStep = Math.max(1, Math.floor(header.height / 140));
  const uniqueColors = new Set();

  let previous = Buffer.alloc(stride);
  let offset = 0;
  let sampleCount = 0;
  let minLuma = Infinity;
  let maxLuma = -Infinity;
  let mean = 0;
  let m2 = 0;

  for (let y = 0; y < header.height; y += 1) {
    const filter = inflated[offset];
    const encoded = inflated.subarray(offset + 1, offset + 1 + stride);
    const row = unfilterScanline(filter, encoded, previous, bytesPerPixel);
    offset += 1 + stride;

    if (y % yStep === 0) {
      for (let x = 0; x < header.width; x += xStep) {
        const [red, green, blue, alpha] = pixelToRgb(row, x, header.colorType, palette);
        if (alpha < 8) continue;

        const luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        sampleCount += 1;
        minLuma = Math.min(minLuma, luma);
        maxLuma = Math.max(maxLuma, luma);

        const delta = luma - mean;
        mean += delta / sampleCount;
        m2 += delta * (luma - mean);
        uniqueColors.add(`${red >> 4},${green >> 4},${blue >> 4}`);
      }
    }

    previous = row;
  }

  const variance = sampleCount > 1 ? m2 / (sampleCount - 1) : 0;

  return {
    width: header.width,
    height: header.height,
    fileSize: buffer.length,
    sampleCount,
    uniqueColors: uniqueColors.size,
    luminanceSpread: Number.isFinite(minLuma) ? maxLuma - minLuma : 0,
    luminanceStdDev: Math.sqrt(variance),
  };
}

function hasVisibleContent(stats) {
  return (
    stats.sampleCount >= 64 &&
    stats.uniqueColors >= 8 &&
    stats.luminanceSpread >= 8 &&
    stats.luminanceStdDev >= 2
  );
}

function describePngQuality(stats) {
  return `size=${stats.width}x${stats.height}, colors=${stats.uniqueColors}, spread=${stats.luminanceSpread.toFixed(1)}, std=${stats.luminanceStdDev.toFixed(1)}`;
}

function assertPngHasVisibleContent(file, label = file) {
  const stats = readPngQuality(file);
  if (!hasVisibleContent(stats)) {
    throw new Error(`${label} appears blank or too low-detail (${describePngQuality(stats)})`);
  }
  return stats;
}

module.exports = {
  assertPngHasVisibleContent,
  describePngQuality,
  hasVisibleContent,
  readPngQuality,
};
