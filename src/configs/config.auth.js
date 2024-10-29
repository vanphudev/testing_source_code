module.exports = {
   default: {
      publish: true,
      paths: ["src/testUnits/features/Auth/*.feature"],
      require: ["src/testUnits/step_definitions/Auth/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/Auth/cucumber-report.html",
         "json:src/reports/Auth/cucumber-report.json",
      ],
      parallel: 1,
   },
};
