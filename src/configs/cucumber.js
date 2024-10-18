module.exports = {
   default: {
      publish: true,
      paths: ["src/tests/features"],
      require: ["src/tests/features/step_definitions/*.js", "src/hooks/*.js"],
      format: ["progress-bar", "html:src/reports/cucumber-report.html", "json:src/reports/cucumber-report.json"],
      parallel: 1,
   },
};
