const {Given, When, Then, Before, After, AfterStep} = require("@cucumber/cucumber");
const {Builder, By, until} = require("selenium-webdriver");
const xlsx = require("xlsx");
const chai = require("chai");
const expect = chai.expect;
require("dotenv").config();
const loginUrl = process.env.LOGIN_URL;
const dashboardUrl = process.env.DASHBOARD_URL;

async function readDataFromExcel(sheetName, rowIndex) {
   const workbook = await xlsx.readFile(process.env.FILE_NAME_AUTH);
   const sheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(sheet);
   return data[rowIndex];
}

Before({tags: "@loginFeature"}, async function () {
   this.driver = await new Builder().forBrowser("chrome").build();
   await this.driver.manage().window().maximize();
});

AfterStep({tags: "@loginFeature"}, async function () {
   const data = await this.driver.takeScreenshot();
   const decodedImage = Buffer.from(data.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), "base64");
   await this.attach(decodedImage, "image/png");
});

After({tags: "@loginFeature"}, async function () {
   await this.driver.quit();
});

Given("Tôi mở trình duyệt và truy cập vào trang đăng nhập của hệ thống bán hàng Beauty Store.", async function () {
   await this.driver.get(loginUrl);
   await this.driver.wait(until.urlContains(loginUrl), 10000);
});

Given("Tôi có dữ liệu người dùng từ file Excel tại sheet {string} và row {string}.", async function (sheet, row) {
   this.rowData = await readDataFromExcel(sheet, row - 1);
   if (this.rowData) {
      this.email = this.rowData.email || "";
      this.password = this.rowData.password || "";
      this.expected_status = this.rowData.expected_status || "";
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
   } else {
      throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheet} hàng ${row}`);
   }
   await this.driver.sleep(2000);
});

When("Tôi nhập username và password vào 2 input form đăng nhập.", async function () {
   await this.driver.findElement(By.id("email")).sendKeys(this.email);
   await this.driver.findElement(By.id("password")).sendKeys(this.password);
   await this.driver.sleep(2000);
});

When("Tôi nhấn nút hiển thị mật khẩu để kiểm tra mật khẩu đã nhập.", async function () {
   await this.driver.findElement(By.id("password-show-toggle")).click();
   await this.driver.sleep(2000);
});

When("Tôi nhấn nút đăng nhập.", async function () {
   await this.driver.findElement(By.id("btn-login")).click();
   await this.driver.sleep(2000);
});

Then("Nếu đăng nhập thành công, tôi sẽ thấy trang chính của hệ thống bán hàng Beauty Store.", async function () {
   try {
      await this.driver.wait(until.urlIs(dashboardUrl), 5000);
      const currentUrl = await this.driver.getCurrentUrl();
      expect(currentUrl).to.equal(dashboardUrl);
   } catch (error) {
      throw new Error("Không truy cập được trang chính sau khi đăng nhập thành công");
   }
   await this.driver.sleep(2000);
});

Then(
   "Nếu đăng nhập thất bại, tôi sẽ thấy thông báo lỗi trên màn hình của trình duyệt {string}.",
   async function (errorMessage) {
      const notifications = await this.driver.findElements(By.id("id_notification-error"));
      if (notifications.length > 0) {
         const notificationText = await notifications[0].getText();
         expect(notificationText).to.equal(errorMessage);
      }
      await this.driver.sleep(2000);
   }
);
