module.exports = {
   default: {
      publish: true,
      defaultTimeout: 10000,
      paths: ["src/testUIs/features/Cart/*.feature"],
      require: ["src/testUIs/step_definitions/Cart/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/Cart/cucumber-report-ui.html",
         "json:src/reports/Cart/cucumber-report-ui.json",
      ],
      parallel: 1,
   },
};
