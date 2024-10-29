module.exports = {
   default: {
      publish: true,
      paths: ["src/testUIs/features/Checkout/*.feature"],
      require: ["src/testUIs/step_definitions/Checkout/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/Checkout/cucumber-report-ui.html",
         "json:src/reports/Checkout/cucumber-report-ui.json",
      ],
      parallel: 1,
   },
};
