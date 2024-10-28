module.exports = {
   default: {
      publish: true,
      paths: ["src/testUnits/features/Cart/*.feature"],
      require: ["src/testUnits/step_definitions/Cart/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/Cart/cucumber-report.html",
         "json:src/reports/Cart/cucumber-report.json",
      ],
      parallel: 1,
   },
};
