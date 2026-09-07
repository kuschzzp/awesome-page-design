function renderAuditExpression() {
  return `(() => {
    const selector = 'button, a[href], input, select, textarea, [role="button"], [role="option"], [role="tab"]';
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const documentWidth = Math.max(
      document.documentElement?.scrollWidth || 0,
      document.body?.scrollWidth || 0
    );

    const isHidden = (element) => {
      let current = element;
      while (current && current.nodeType === 1) {
        const style = window.getComputedStyle(current);
        if (
          current.hidden ||
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          style.visibility === 'collapse' ||
          Number(style.opacity) === 0
        ) {
          return true;
        }
        current = current.parentElement;
      }
      return false;
    };

    const hasHorizontalScrollContainer = (element) => {
      let current = element.parentElement;
      while (current && current !== document.documentElement) {
        const style = window.getComputedStyle(current);
        if (
          /^(auto|scroll)$/.test(style.overflowX) &&
          current.scrollWidth > current.clientWidth + 1
        ) {
          return true;
        }
        current = current.parentElement;
      }
      return false;
    };

    const describeSelector = (element) => {
      const tag = element.tagName.toLowerCase();
      if (element.id) return tag + '#' + element.id.replace(/[^a-zA-Z0-9_-]/g, '');
      const classes = Array.from(element.classList)
        .slice(0, 2)
        .map((name) => name.replace(/[^a-zA-Z0-9_-]/g, ''))
        .filter(Boolean);
      const role = element.getAttribute('role');
      return tag + (classes.length ? '.' + classes.join('.') : '') + (role ? '[role="' + role + '"]' : '');
    };

    const describeText = (element) => {
      const value =
        element.getAttribute('aria-label') ||
        element.getAttribute('title') ||
        element.value ||
        element.textContent ||
        '';
      return String(value).replace(/\\s+/g, ' ').trim().slice(0, 80);
    };

    const serializeRect = (rect) => ({
      left: Math.round(rect.left * 100) / 100,
      top: Math.round(rect.top * 100) / 100,
      right: Math.round(rect.right * 100) / 100,
      bottom: Math.round(rect.bottom * 100) / 100,
      width: Math.round(rect.width * 100) / 100,
      height: Math.round(rect.height * 100) / 100,
    });

    const offscreenControls = [];
    const zeroSizeControls = [];
    document.querySelectorAll(selector).forEach((element) => {
      if (element.hasAttribute('data-render-audit-ignore') || isHidden(element)) return;
      const rect = element.getBoundingClientRect();
      const item = {
        selector: describeSelector(element),
        text: describeText(element),
        rect: serializeRect(rect),
      };

      if (rect.width <= 0 || rect.height <= 0) {
        zeroSizeControls.push(item);
        return;
      }

      const crossesHorizontalViewport = rect.left < -1 || rect.right > viewport.width + 1;
      if (crossesHorizontalViewport && !hasHorizontalScrollContainer(element)) {
        offscreenControls.push(item);
      }
    });

    return {
      viewport,
      documentWidth,
      horizontalOverflow: documentWidth > viewport.width + 1,
      offscreenControls,
      zeroSizeControls,
    };
  })()`;
}

function formatControl(item) {
  const selector = item?.selector || "unknown control";
  const text = item?.text ? ` \"${item.text}\"` : "";
  const rect = item?.rect || {};
  return `${selector}${text} at left=${rect.left}, right=${rect.right}, width=${rect.width}`;
}

function formatRenderAuditErrors(result, label = "render") {
  if (!result || typeof result !== "object" || !result.viewport) {
    return [`${label}: invalid render audit result`];
  }

  const errors = [];
  if (result.horizontalOverflow) {
    errors.push(
      `${label}: horizontal overflow (${result.documentWidth}px document in ${result.viewport.width}px viewport)`
    );
  }

  const offscreenControls = Array.isArray(result.offscreenControls) ? result.offscreenControls : [];
  offscreenControls.slice(0, 5).forEach((item) => {
    errors.push(`${label}: offscreen interactive control ${formatControl(item)}`);
  });
  if (offscreenControls.length > 5) {
    errors.push(`${label}: ${offscreenControls.length - 5} more offscreen interactive control(s)`);
  }

  const zeroSizeControls = Array.isArray(result.zeroSizeControls) ? result.zeroSizeControls : [];
  zeroSizeControls.slice(0, 5).forEach((item) => {
    errors.push(`${label}: zero-size interactive control ${formatControl(item)}`);
  });
  if (zeroSizeControls.length > 5) {
    errors.push(`${label}: ${zeroSizeControls.length - 5} more zero-size interactive control(s)`);
  }

  return errors;
}

module.exports = { formatRenderAuditErrors, renderAuditExpression };
