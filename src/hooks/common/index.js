const {Before, After, Status, AfterStep} = require("@cucumber/cucumber");
const {Builder, By, until} = require("selenium-webdriver");

// Trước kích bản
Before(async function () {
   this.driver = await new Builder().forBrowser("chrome").build();
   await this.driver.manage().window().maximize();
});

// Sau mỗi step
AfterStep(async function () {
   const data = await this.driver.takeScreenshot();
   const decodedImage = Buffer.from(data.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), "base64");
   await this.attach(decodedImage, "image/png");
});

// Sau kích bản
After(async function () {
   const data = await this.driver.takeScreenshot();
   const decodedImage = Buffer.from(data.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), "base64");
   await this.attach(decodedImage, "image/png");
   await this.driver.quit();
});
