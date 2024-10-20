const reporter = require("cucumber-html-reporter");

const options = {
   jsonFile: "src/reports/cucumber-report.json",
   launchReport: true,
   name: "Cucumber Report - Login Feature - Tester Nguyễn Văn Phú",
   output: "src/reports/cucumber-report-reporter.html",
   theme: "bootstrap",
};

reporter.generate(options);
