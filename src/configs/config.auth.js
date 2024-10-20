module.exports = {
   default: {
      publish: true,
      paths: ["src/tests/features/Auth/*.feature"],
      require: ["src/tests/step_definitions/Auth/*.js", "src/hooks/common/*.js", "src/hooks/Auth/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/Auth/cucumber-report.html",
         "json:src/reports/Auth/cucumber-report.json",
      ],
      parallel: 1,
   },
};
