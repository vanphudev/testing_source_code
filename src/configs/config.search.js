module.exports = {
   default: {
      publish: true,
      paths: ["src/tests/features/SearchProduct/*.feature"],
      require: [
         "src/tests/step_definitions/SearchProduct/*.js",
         "src/hooks/common/*.js",
         "src/hooks/SearchProduct/*.js",
      ],
      format: [
         "progress-bar",
         "html:src/reports/SearchProduct/cucumber-report.html",
         "json:src/reports/SearchProduct/cucumber-report.json",
      ],
      parallel: 1,
   },
};
