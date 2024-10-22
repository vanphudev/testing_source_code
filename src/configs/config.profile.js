module.exports = {
   default: {
      publish: true,
      paths: ["src/tests/features/User/*.feature"],
      require: ["src/tests/step_definitions/User/*.js", "src/hooks/common/*.js", "src/hooks/User/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/User/cucumber-report.html",
         "json:src/reports/User/cucumber-report.json",
      ],
      parallel: 1,
   },
};
