module.exports = {
   default: {
      publish: true,
      paths: ["src/testUIs/features/Auth/*.feature"],
      require: ["src/testUIs/step_definitions/Auth/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/Auth/cucumber-report-ui.html",
         "json:src/reports/Auth/cucumber-report-ui.json",
      ],
      parallel: 1,
   },
};
