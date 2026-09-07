function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateBehaviorEvals(value) {
  const errors = [];

  if (!isRecord(value)) {
    return ["behavior evals must be an object"];
  }

  if (value.skill_name !== "awesome-page-design") {
    errors.push('behavior evals skill_name must be "awesome-page-design"');
  }

  if (!Array.isArray(value.evals)) {
    errors.push("behavior evals must include an evals array");
    return errors;
  }

  if (value.evals.length < 10 || value.evals.length > 12) {
    errors.push("behavior evals must contain 10-12 cases");
  }

  const ids = new Set();
  value.evals.forEach((entry, index) => {
    const label = `behavior eval ${index + 1}`;
    if (!isRecord(entry)) {
      errors.push(`${label} must be an object`);
      return;
    }

    if (!Number.isInteger(entry.id) || entry.id < 1) {
      errors.push(`${label} id must be a positive integer`);
    } else if (ids.has(entry.id)) {
      errors.push(`${label} has duplicate id ${entry.id}`);
    } else {
      ids.add(entry.id);
    }

    if (!isNonEmptyString(entry.prompt)) {
      errors.push(`${label} prompt must be a non-empty string`);
    }
    if (!isNonEmptyString(entry.expected_output)) {
      errors.push(`${label} expected_output must be a non-empty string`);
    }
    if (!Array.isArray(entry.assertions) || entry.assertions.length === 0) {
      errors.push(`${label} assertions must be a non-empty string array`);
    } else {
      entry.assertions.forEach((assertion, assertionIndex) => {
        if (!isNonEmptyString(assertion)) {
          errors.push(`${label} assertion ${assertionIndex + 1} must be a non-empty string`);
        }
      });
    }
  });

  return errors;
}

function validateTriggerEvals(value) {
  const errors = [];

  if (!Array.isArray(value)) {
    return ["trigger evals must be an array"];
  }

  if (value.length !== 20) {
    errors.push("trigger evals must contain exactly 20 cases");
  }

  const queries = new Set();
  let positiveCount = 0;
  let negativeCount = 0;

  value.forEach((entry, index) => {
    const label = `trigger eval ${index + 1}`;
    if (!isRecord(entry)) {
      errors.push(`${label} must be an object`);
      return;
    }

    if (!isNonEmptyString(entry.query)) {
      errors.push(`${label} query must be a non-empty string`);
    } else {
      const normalized = entry.query.trim().toLocaleLowerCase("en-US");
      if (queries.has(normalized)) {
        errors.push(`${label} has a duplicate query`);
      } else {
        queries.add(normalized);
      }
    }

    if (entry.should_trigger === true) {
      positiveCount += 1;
    } else if (entry.should_trigger === false) {
      negativeCount += 1;
    } else {
      errors.push(`${label} should_trigger must be a boolean`);
    }
  });

  if (positiveCount !== 10 || negativeCount !== 10) {
    errors.push(
      `trigger evals must be balanced with 10 true and 10 false cases (found ${positiveCount} true, ${negativeCount} false)`
    );
  }

  return errors;
}

module.exports = { validateBehaviorEvals, validateTriggerEvals };
