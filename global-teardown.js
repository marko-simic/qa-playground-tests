import * as core from "@actions/core";
console.log("I'm trying to do an experiment");
await core.summary
  .addHeading("Test Results")
  .addCodeBlock(generateTestResults(), "js")
  .addTable([
    [
      { data: "File", header: true },
      { data: "Result", header: true },
    ],
    ["foo.js", "Pass "],
    ["bar.js", "Fail "],
    ["test.js", "Pass "],
  ])
  .addLink("View staging deployment!", "https://github.com")
  .write();
console.log("I'm trying to do an experiment 2");
