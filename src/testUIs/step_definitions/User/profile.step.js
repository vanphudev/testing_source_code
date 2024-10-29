const {Given, When, Then, Before, After, AfterStep} = require("@cucumber/cucumber");
const {Builder, By, until} = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
require("dotenv").config();

Before({tags: "@profileFeature"}, async function () {
   this.driver = await new Builder().forBrowser("chrome").build();
   await this.driver.manage().window().maximize();
});

AfterStep({tags: "@profileFeature"}, async function () {
   const data = await this.driver.takeScreenshot();
   const decodedImage = Buffer.from(data.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), "base64");
   await this.attach(decodedImage, "image/png");
});

After({tags: "@profileFeature"}, async function () {
   await this.driver.quit();
});

// Given: Mở trình duyệt và truy cập vào trang đăng nhập
Given("Tôi mở trình duyệt và truy cập vào trang đăng nhập của hệ thống.", async function () {
   await this.driver.get(process.env.LOGIN_URL); // Đường dẫn đến trang đăng nhập
   await this.driver.wait(until.urlIs(process.env.LOGIN_URL), 10000);
});

// Given: Nhập tên đăng nhập và mật khẩu
Given("Tôi nhập tên đăng nhập là {string} và mật khẩu là {string}", async function (username, password) {
   await this.driver.findElement(By.id("email")).sendKeys(username);
   await this.driver.findElement(By.id("password")).sendKeys(password);
   await this.driver.sleep(2000);
});

// Given: Nhấn nút đăng nhập
Given("Tôi nhấn nút đăng nhập", async function () {
   await this.driver.findElement(By.id("btn-login")).click(); // ID của nút đăng nhập
   await this.driver.sleep(2000);
});

// Given: Chuyển sang trang cập nhật thông tin cá nhân
Given("Tôi chuyển sang trang cập nhật thông tin cá nhân của người dùng", async function () {
   await this.driver.get(process.env.PROFILE_URL); // Truy cập vào trang cập nhật thông tin
   await this.driver.wait(until.urlIs(process.env.PROFILE_URL), 10000);
   await this.driver.sleep(2000);
});

Given("Tôi chọn chức năng cập nhật thông tin cá nhân", async function () {
   await this.driver.findElement(By.id("nav-information-tab")).click();
   await this.driver.sleep(2000);
});

// Các bước còn lại không thay đổi
Given("Tôi nhập tên là {string}", async function (name) {
   await this.driver.findElement(By.id("name")).clear();
   await this.driver.findElement(By.id("name")).sendKeys(name); // ID của ô nhập tên
});

Given("Tôi nhập email là {string}", async function (email) {
   await this.driver.findElement(By.id("email")).clear();
   await this.driver.findElement(By.id("email")).sendKeys(email); // ID của ô nhập email
});

Given("Tôi chọn tỉnh là {string}", async function (province) {
   const provinceDropdown = await this.driver.findElement(By.id("province"));
   await provinceDropdown.click();
   const provinceOption = await this.driver.findElement(By.xpath(`//option[text()="${province}"]`));
   await provinceOption.click();
   await this.driver.sleep(2000);
});

Given("Tôi chọn quận\\/huyện là {string}", async function (district) {
   const districtDropdown = await this.driver.findElement(By.id("district"));
   await districtDropdown.click(); // Nhấn vào dropdown
   const districtOption = await this.driver.findElement(By.xpath(`//option[text()="${district}"]`));
   await districtOption.click(); // Chọn quận/huyện
   await this.driver.sleep(2000);
});

Given("Tôi chọn xã là {string}", async function (ward) {
   const wardDropdown = await this.driver.findElement(By.id("ward"));
   await wardDropdown.click(); // Nhấn vào dropdown
   const wardOption = await this.driver.findElement(By.xpath(`//option[text()="${ward}"]`));
   await wardOption.click(); // Chọn xã
   await this.driver.sleep(2000);
});

Given("Tôi nhập tên đường là {string}", async function (street) {
   await this.driver.findElement(By.id("address")).sendKeys(street); // ID của ô nhập tên đường
});

Given("Tôi nhập mô tả bio là {string}", async function (bio) {
   await this.driver.findElement(By.id("bio")).sendKeys(bio); // ID của ô nhập mô tả bio
});

When("Tôi nhấn nút cập nhật thông tin", async function () {
   await this.driver.findElement(By.id("btn-update")).click();
   await this.driver.sleep(3000);
});

Then("Nếu cập nhật thành công, tôi sẽ thấy thông báo xác nhận", async function () {
   const notifications = await this.driver.findElements(By.id("id_notification"));
   let confirmationFound = false;
   for (let notification of notifications) {
      const text = await notification.getText();
      if (text === "Cập nhật thông tin Profile thành công !") {
         confirmationFound = true;
         break;
      }
   }
   expect(confirmationFound).to.be.true;
});

Then("Nếu cập nhật thất bại, tôi sẽ thấy thông báo lỗi về {string}", async function (errorMessage) {
   const errorNotificationExists = await this.driver.findElements(By.id("id_notification-error"));
   await this.driver.sleep(3000);
   if (errorNotificationExists.length > 0) {
      const notification = await this.driver.findElement(By.id("id_notification-error")).getText();
      expect(notification).to.equal(errorMessage);
   }
});
