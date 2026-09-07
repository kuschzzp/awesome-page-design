const test = require("node:test");
const assert = require("node:assert/strict");
const { validateBehaviorEvals, validateTriggerEvals } = require("./skill-quality");

test("behavior evals reject duplicate ids and empty expected output", () => {
  const errors = validateBehaviorEvals({
    skill_name: "awesome-page-design",
    evals: [
      { id: 1, prompt: "A", expected_output: "", assertions: [] },
      { id: 1, prompt: "B", expected_output: "result", assertions: [] },
    ],
  });

  assert.match(errors.join("\n"), /duplicate/i);
  assert.match(errors.join("\n"), /expected_output/i);
});

test("trigger evals require twenty balanced unique cases", () => {
  const errors = validateTriggerEvals([
    { query: "Build a dashboard UI", should_trigger: true },
  ]);

  assert.match(errors.join("\n"), /20/);
  assert.match(errors.join("\n"), /balanced/i);
});
