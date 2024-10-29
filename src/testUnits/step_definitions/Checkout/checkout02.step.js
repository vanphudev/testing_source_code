const {Given, When, Then} = require("@cucumber/cucumber");
const chai = require("chai");
const chaiHttp = require("chai-http");
const xlsx = require("xlsx");
const expect = chai.expect;
require("dotenv").config();
chai.use(chaiHttp);

let startTime;
const file_name = process.env.FILE_NAME_CHECKOUT;
const server = process.env.SERVER;

async function readDataFromExcel(sheetName, rowIndex) {
   const workbook = await xlsx.readFile(file_name);
   const sheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(sheet);
   return data[rowIndex];
}

// Step 1
Given(
   "Tôi có dữ liệu Excel người dùng từ {string} ở hàng {string} để thực hiện thanh toán",
   async function (sheetName, rowIndex) {
      this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
      console.log(this.rowData);
      if (this.rowData) {
         this.client_id = this.rowData.client_id === "null" ? null : this.rowData.client_id;
         this.authorization = this.rowData.authorization === "null" ? null : this.rowData.authorization;
         this.expected_status = this.rowData.expected_status === "null" ? null : this.rowData.expected_status;
         this.userId = this.rowData.userId;
         this.phone = this.rowData.phone;
         this.email = this.rowData.email;
         this.items = this.rowData.items;
         this.totalPrice = this.rowData.totalPrice;
         this.shippingAddress = this.rowData.shippingAddress;
         this.paymentMethod = this.rowData.paymentMethod;
         this.voucherId = this.rowData.voucherId;
         this.discountAmount = this.rowData.discountAmount;
         this.finalPrice = this.rowData.finalPrice;
         this.note = this.rowData.note;
         this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      } else {
         throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheetName} hàng ${rowIndex}`);
      }
   }
);

// Step 2
When("Tôi gửi yêu cầu POST đến {string} để tạo đơn hàng", async function (endpoint) {
   startTime = new Date().getTime();
   try {
      console.log("this.items", this.items);
      const res = await chai
         .request(server)
         .post(endpoint)
         .set("authorization", this.authorization)
         .set("client_id", this.client_id)
         .send({
            userId: this.userId,
            phone: this.phone,
            email: this.email,
            items: this.items,
            totalPrice: this.totalPrice,
            shippingAddress: this.shippingAddress,
            paymentMethod: this.paymentMethod,
            voucherId: this.voucherId,
            discountAmount: this.discountAmount,
            finalPrice: this.finalPrice,
            note: this.note,
         });
      this.response = res;
      this.attach("Dữ liệu phản hồi: " + JSON.stringify(this.response.body), "application/json");
      const endTime = new Date().getTime();
      this.duration = endTime - startTime;
   } catch (err) {
      throw new Error(err);
   }
});

// Step 3
Then(
   "Tôi sẽ nhận được trạng thái phản hồi với expected_status từ {string} ở hàng {string} để kiểm tra",
   function (sheetName, rowIndex) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

// Step 4
Then(
   "Nếu trạng thái phản hồi là {int}, thì tôi sẽ nhận được trạng thái phản hồi với thông tin đơn hàng đã được tạo thành công",
   function (status) {
      if (this.response.status === status) {
         this.attach("Đơn hàng đã được tạo thành công.");
      } else {
         this.attach("Đơn hàng chưa được tạo thành công.");
      }
   }
);

// Step 5
Then("Dữ liệu trả về có đúng với định dạng JSON và thông tin người dùng đã được xác thực", function () {
   expect(this.response).to.be.json;
   this.attach("Dữ liệu trả về có định dạng JSON hợp lệ.");

   const responseData = this.response.body;
   if (responseData.status === 201) {
      expect(responseData.status).to.equal(201);
      expect(responseData.message).to.equal("Order created");
      const order = responseData.data.orders;
      expect(order.userId).to.equal(this.userId);
      expect(order.items).to.be.an("array").that.has.lengthOf(this.items.length);
      order.items.forEach((item, index) => {
         expect(item.productId).to.equal(this.items[index].productId);
         expect(item.name).to.be.a("string");
         expect(item.price).to.be.a("number");
         expect(item.quantity).to.be.a("number");
         expect(item._id).to.be.a("string");
      });
      expect(order.totalPrice).to.equal(this.totalPrice);
      expect(order.shippingAddress).to.deep.equal(this.shippingAddress);
      expect(order.paymentMethod).to.equal(this.paymentMethod);
      expect(order.phone).to.equal(this.phone);
      expect(order.email).to.equal(this.email);
      expect(order.discountAmount).to.equal(this.discountAmount);
      expect(order.finalPrice).to.equal(this.finalPrice);
      expect(order.note).to.equal(this.note);
      expect(order.status).to.equal("pending");
   }
});

// Step 6
Then(
   "Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds để kiểm tra",
   function (time) {
      this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
      expect(this.duration).to.be.below(Number(time));
   }
);
