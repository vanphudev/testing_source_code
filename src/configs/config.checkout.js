module.exports = {
   default: {
      publish: true,
      paths: ["src/tests/features/Checkout/*.feature"],
      require: ["src/tests/step_definitions/Checkout/*.js", "src/hooks/common/*.js", "src/hooks/Checkout/*.js"],
      format: [
         "progress-bar",
         "html:src/reports/Checkout/cucumber-report.html",
         "json:src/reports/Checkout/cucumber-report.json",
      ],
      parallel: 1,
   },
};
