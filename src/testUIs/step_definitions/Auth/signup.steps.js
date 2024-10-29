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

// Mở trang đăng ký
Given("Tôi mở trình duyệt và truy cập vào trang đăng ký của hệ thống.", async function () {
   await this.driver.get(process.env.SIGNUP_URL);
   await this.driver.wait(until.urlContains(process.env.SIGNUP_URL), 10000);
});

// Nhập giá trị đầu vào
Given(
   "Tôi nhập các giá trị đầu vào name là {string}, phone là {string}, email là {string}, password là {string}",
   async function (name, phone, email, password) {
      this.name = name;
      this.phone = phone;
      this.email = email;
      this.password = password;

      await this.driver.findElement(By.id("name")).sendKeys(this.name);
      await this.driver.findElement(By.id("phone")).sendKeys(this.phone);
      await this.driver.findElement(By.id("email")).sendKeys(this.email);
      await this.driver.findElement(By.id("password")).sendKeys(this.password);
      await this.driver.sleep(2000);
   }
);

// Nhấn nút hiển thị mật khẩu
Given("Tôi nhấn nút hiển thị mật khẩu", async function () {
   await this.driver.findElement(By.id("password-show-toggle")).click();
   await this.driver.sleep(2000);
});

// Nhấn nút đăng ký
When("Tôi nhấn nút đăng ký", async function () {
   await this.driver.findElement(By.id("signup")).click();
   await this.driver.sleep(2000);
});

// Kiểm tra thông báo lỗi
Then("Nếu đăng ký thất bại, tôi sẽ thấy thông báo lỗi trên màn hình về {string}", async function (errorMessage) {
   const notifications = await this.driver.findElements(By.id("id_notification-error"));
   if (notifications.length > 0) {
      const notificationText = await notifications[0].getText();
      expect(notificationText).to.equal(errorMessage);
   } 
   await this.driver.sleep(2000);
});
