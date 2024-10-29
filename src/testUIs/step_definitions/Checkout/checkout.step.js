const {Given, When, Then, Before, After, AfterStep} = require("@cucumber/cucumber");
const {Builder, By, until} = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;

require("dotenv").config();

Before({tags: "@checkoutFeature"}, async function () {
   this.driver = await new Builder().forBrowser("chrome").build();
   await this.driver.manage().window().maximize();
});

AfterStep({tags: "@checkoutFeature"}, async function () {
   const data = await this.driver.takeScreenshot();
   const decodedImage = Buffer.from(data.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), "base64");
   await this.attach(decodedImage, "image/png");
});

After({tags: "@checkoutFeature"}, async function () {
   await this.driver.quit();
});

// Given: Mở trình duyệt và truy cập vào trang đăng nhập
Given("Tôi mở trình duyệt và truy cập vào trang đăng nhập của hệ thống.", async function () {
   await this.driver.get(process.env.LOGIN_URL);
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
   await this.driver.findElement(By.id("btn-login")).click();
   await this.driver.sleep(2000);
});

// Given: Chuyển sang trang giỏ hàng
Given("Tôi chuyển sang trang giỏ hàng", async function () {
   await this.driver.get(process.env.CART_URL);
   await this.driver.wait(until.urlIs(process.env.CART_URL), 10000);
});

// Given: Nhấn nút đặt hàng
Given("Tôi chọn nhấn nút đặt hàng", async function () {
   await this.driver.findElement(By.id("btn-checkout")).click();
   await this.driver.sleep(2000);
});

// Given: Chọn tỉnh từ dropdown
Given("Tôi chọn tỉnh là {string}", async function (province) {
   const provinceDropdown = await this.driver.findElement(By.id("province"));
   await provinceDropdown.click();
   const provinceOption = await this.driver.findElement(By.xpath(`//option[text()="${province}"]`));
   await provinceOption.click();
   await this.driver.sleep(2000);
});

// Given: Chọn quận/huyện từ dropdown
Given("Tôi chọn quận\\/huyện là {string}", async function (district) {
   const districtDropdown = await this.driver.findElement(By.id("district"));
   await districtDropdown.click(); // Nhấn vào dropdown
   const districtOption = await this.driver.findElement(By.xpath(`//option[text()="${district}"]`));
   await districtOption.click(); // Chọn quận/huyện
   await this.driver.sleep(2000);
});

// Given: Chọn xã từ dropdown
Given("Tôi chọn xã là {string}", async function (ward) {
   const wardDropdown = await this.driver.findElement(By.id("ward"));
   await wardDropdown.click(); // Nhấn vào dropdown
   const wardOption = await this.driver.findElement(By.xpath(`//option[text()="${ward}"]`));
   await wardOption.click(); // Chọn xã
   await this.driver.sleep(2000);
});

// Given: Nhập địa chỉ cụ thể trên đường
Given("Tôi nhập địa chỉ cụ thể trên đường là {string}", async function (address) {
   const addressInput = await this.driver.findElement(By.id("address"));
   await addressInput.sendKeys(address);
   await this.driver.sleep(2000);
});

// Given: Nhập các giá trị đầu vào để tiến hành thanh toán
Given(
   "Tôi nhập các giá trị đầu vào để tiến hành thanh toán name là {string}, phone là {string}, email là {string}, note là {string}",
   async function (name, phone, email, note) {
      await this.driver.findElement(By.id("name")).clear();
      await this.driver.findElement(By.id("contactNo")).clear();
      await this.driver.findElement(By.id("email")).clear();
      await this.driver.findElement(By.id("orderNote")).clear();
      //
      await this.driver.findElement(By.id("name")).sendKeys(name);
      await this.driver.findElement(By.id("contactNo")).sendKeys(phone);
      await this.driver.findElement(By.id("email")).sendKeys(email);
      await this.driver.findElement(By.id("orderNote")).sendKeys(note);
      await this.driver.sleep(2000);
   }
);

// Given: Chọn phương thức thanh toán là COD
Given("Tôi chọn phương thức thanh toán là {string}", async function (paymentMethod) {
   const paymentMethodRadio = await this.driver.findElement(By.xpath(`//input[@value="${paymentMethod}"]`));
   await paymentMethodRadio.click();
   await this.driver.sleep(2000);
});

// When: Nhấn nút đặt hàng
When("Tôi nhấn nút đặt hàng", async function () {
   await this.driver.findElement(By.id("btn-submit-order")).click();
   await this.driver.sleep(2000);
});

// Then: Kiểm tra nếu đặt hàng thành công
Then("Nếu đặt hàng thành công, tôi sẽ chuyển đến đơn hàng của tôi", async function () {
   const orderConfirmationUrl = process.env.ORDER_CONFIRMATION_URL;
   await this.driver.wait(until.urlIs(orderConfirmationUrl), 10000);
   const currentUrl = await this.driver.getCurrentUrl();
   expect(currentUrl).to.equal(orderConfirmationUrl);
});

// Then: Kiểm tra nếu đặt hàng thất bại
Then("Nếu đặt hàng thất bại, tôi sẽ thấy thông báo lỗi trên màn hình về {string}", async function (errorMessage) {
   const errorNotificationExists = await this.driver.findElements(By.id("id_notification-error"));
   if (errorNotificationExists.length > 0) {
      const notification = await this.driver.findElement(By.id("id_notification-error")).getText();
      expect(notification).to.equal(errorMessage);
   }
});
