module.exports = {
   default: {
      publish: true,
      paths: ["src/testUIs/features/User/*.feature"],
      require: ["src/testUIs/step_definitions/User/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/User/cucumber-report-ui.html",
         "json:src/reports/User/cucumber-report-ui.json",
      ],
      parallel: 1,
   },
};
