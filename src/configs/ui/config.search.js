module.exports = {
   default: {
      publish: true,
      paths: ["src/testUIs/features/SearchProduct/*.feature"],
      require: ["src/testUIs/step_definitions/SearchProduct/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/SearchProduct/cucumber-report-ui.html",
         "json:src/reports/SearchProduct/cucumber-report-ui.json",
      ],
      parallel: 1,
   },
};
