module.exports = {
   default: {
      publish: true,
      paths: ["src/tests/features/Cart/*.feature"],
      require: ["src/tests/step_definitions/Cart/*.js", "src/hooks/common/*.js", "src/hooks/Cart/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/Cart/cucumber-report.html",
         "json:src/reports/Cart/cucumber-report.json",
      ],
      parallel: 1,
   },
};
