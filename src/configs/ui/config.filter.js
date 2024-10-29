module.exports = {
   default: {
      publish: true,
      paths: ["src/testUnits/features/FilterProduct/*.feature"],
      require: [
         "src/testUnits/step_definitions/FilterProduct/*.js",
         "src/hooks/common/*.js",
         "src/hooks/FilterProduct/*.js",
      ],
      format: [
         "progress-bar",
         "html:src/reports/FilterProduct/cucumber-report.html",
         "json:src/reports/FilterProduct/cucumber-report.json",
      ],
      parallel: 1,
   },
};
