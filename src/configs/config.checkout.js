module.exports = {
   default: {
      publish: true,
      paths: ["src/testUnits/features/Checkout/*.feature"],
      require: ["src/testUnits/step_definitions/Checkout/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/Checkout/cucumber-report.html",
         "json:src/reports/Checkout/cucumber-report.json",
      ],
      parallel: 1,
   },
};
