const reporter = require("cucumber-html-reporter");

const options = {
   jsonFile: "src/reports/Auth/cucumber-report-ui.json",
   launchReport: true,
   name: "Cucumber Report - Login Feature - Tester Nguyễn Văn Phú",
   output: "src/reports/Auth/cucumber-report-reporter-ui.html",
   theme: "bootstrap",
};

reporter.generate(options);
