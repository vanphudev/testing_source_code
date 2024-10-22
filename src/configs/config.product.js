module.exports = {
   default: {
      publish: true,
      paths: ["src/tests/features/Products/*.feature"],
      require: ["src/tests/step_definitions/Products/*.js", "src/hooks/common/*.js", "src/hooks/Products/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/Products/cucumber-report.html",
         "json:src/reports/Products/cucumber-report.json",
      ],
      parallel: 1,
   },
};
