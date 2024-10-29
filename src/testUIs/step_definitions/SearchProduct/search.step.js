const {Given, When, Then, Before, After, AfterStep} = require("@cucumber/cucumber");
const {Builder, By, until} = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
require("dotenv").config();

Before({tags: "@signupFeature"}, async function () {
   this.driver = await new Builder().forBrowser("chrome").build();
   await this.driver.manage().window().maximize();
});

AfterStep({tags: "@signupFeature"}, async function () {
   const data = await this.driver.takeScreenshot();
   const decodedImage = Buffer.from(data.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), "base64");
   await this.attach(decodedImage, "image/png");
});

After({tags: "@signupFeature"}, async function () {
   await this.driver.quit();
});

Given("Tôi mở trình duyệt và truy cập vào trang chính của hệ thống.", async function () {
   const homepageUrl = process.env.HOMEPAGE_URL;
   await this.driver.get(homepageUrl);
   await this.driver.wait(until.urlIs(homepageUrl), 10000);
   await this.driver.sleep(2000);
});

Given("Tôi nhập từ khóa tìm kiếm là {string} vào ô tìm kiếm", async function (keyword) {
   const searchBox = await this.driver.findElement(By.id("search_box"));
   await searchBox.sendKeys(keyword);
   await this.driver.sleep(2000);
});

When("Tôi nhấn nút tìm kiếm sản phẩm", async function () {
   const searchButton = await this.driver.findElement(By.id("search_button"));
   await searchButton.click();
   await this.driver.sleep(3000);
});

Then("Tôi sẽ thấy kết quả tìm kiếm trang sản phẩm hiển thị", async function () {
   const resultsSection = await this.driver.findElement(By.id("search_results"));
   const isDisplayed = await resultsSection.isDisplayed();
   expect(isDisplayed).to.be.true;
   await this.driver.sleep(2000);
});

Then("Tôi sẽ thấy sản phẩm {string} trong kết quả tìm kiếm", async function (product) {
   const productElements = await this.driver.findElements(By.id("search_results"));
   let productFound = false;

   for (let element of productElements) {
      const text = await element.getText();
      if (text.includes(product)) {
         productFound = true;
         break;
      }
   }

   expect(productFound).to.be.true;
});
