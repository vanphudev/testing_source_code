const {Given, When, Then, Before, After, AfterStep} = require("@cucumber/cucumber");
const {Builder, By, until} = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
require("dotenv").config();

Before({tags: "@cartFeature"}, async function () {
   this.driver = await new Builder().forBrowser("chrome").build();
   await this.driver.manage().window().maximize();
});

AfterStep({tags: "@cartFeature"}, async function () {
   const data = await this.driver.takeScreenshot();
   const decodedImage = Buffer.from(data.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), "base64");
   await this.attach(decodedImage, "image/png");
});

After({tags: "@cartFeature"}, async function () {
   await this.driver.quit();
});

// Given: Đăng nhập vào hệ thống
Given("Tôi login vào hệ thống với tài khoản {string} và mật khẩu {string}", async function (username, password) {
   await this.driver.get(process.env.LOGIN_URL); // Đường dẫn đến trang đăng nhập
   await this.driver.wait(until.urlIs(process.env.LOGIN_URL), 10000);
   await this.driver.findElement(By.id("email")).sendKeys(username);
   await this.driver.findElement(By.id("password")).sendKeys(password);
   await this.driver.findElement(By.id("btn-login")).click();
   await this.driver.sleep(2000);
});

// Given: Có sản phẩm cần thêm vào giỏ hàng
Given("Tôi có sản phẩm {string} cần thêm vào giỏ hàng", async function (product) {
   this.product = product;
   await this.driver.sleep(1000);
});

// Given: Chuyển sang trang chi tiết sản phẩm
Given("Tôi chuyển sang trang chi tiết sản phẩm", async function () {
   await this.driver.get(process.env.PRODUCT_DETAIL_URL + this.product);
   await this.driver.wait(until.urlIs(process.env.PRODUCT_DETAIL_URL + this.product), 10000);
   await this.driver.sleep(2000);
});

// Given: Chọn số lượng sản phẩm
Given("Tôi chọn số lượng sản phẩm là {string}", async function (quantity) {
   const quantityInput = await this.driver.findElement(By.id("tp-cart-input"));
   const currentValue = await quantityInput.getAttribute("value");
   if (currentValue !== quantity) {
      const targetQuantity = parseInt(quantity);
      let currentQuantity = parseInt(currentValue);
      while (currentQuantity < targetQuantity) {
         await this.driver.findElement(By.id("tp-cart-plus")).click();
         await this.driver.sleep(500);
         currentQuantity++;
      }
      while (currentQuantity > targetQuantity) {
         await this.driver.findElement(By.id("tp-cart-minus")).click();
         await this.driver.sleep(500);
         currentQuantity--;
      }
   }
   await this.driver.sleep(2000);
});

// Given: Nhấn nút thêm vào giỏ hàng
Given("Tôi nhấn nút thêm vào giỏ hàng", async function () {
   const addToCartButton = await this.driver.findElement(By.id("btn-add-to-cart"));
   await addToCartButton.click();
   await this.driver.sleep(2000);
});

Then(
   "Tôi sẽ chuyển đến trang giỏ hàng và thấy sản phẩm {string} với số lượng {string} trong giỏ hàng",
   async function (productId, expectedQuantity) {
      await this.driver.get(process.env.CART_URL);
      await this.driver.wait(until.urlIs(process.env.CART_URL), 10000);
      await this.driver.sleep(2000);
      const productElement = await this.driver.findElement(By.id(`product-${productId}-name`));
      if (!productElement) {
         throw new Error(`Không tìm thấy sản phẩm ${productId} trong giỏ hàng`);
      }
      const productQuantity = await this.driver
         .findElement(By.id(`product-${productId}-quantity`))
         .getAttribute("value");
      expect(productQuantity).to.equal(expectedQuantity);
   }
);
