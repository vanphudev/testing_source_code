const {Given, When, Then} = require("@cucumber/cucumber");
const chai = require("chai");
const chaiHttp = require("chai-http");
const xlsx = require("xlsx");
const expect = chai.expect;
require("dotenv").config();

chai.use(chaiHttp);

let startTime;
const file_name = process.env.FILE_NAME_CART;
const server = process.env.SERVER;

async function readDataFromExcel(sheetName, rowIndex) {
   const workbook = await xlsx.readFile(file_name);
   const sheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(sheet);
   return data[rowIndex];
}

Given(
   "Tôi đã có dữ liệu Excel người dùng, sản phẩm từ {string} ở hàng {string} cần xóa khỏi giỏ hàng của người dùng đó",
   async function (sheetName, rowIndex) {
      this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
      if (this.rowData) {
         this.client_id = this.rowData.client_id === "null" ? null : this.rowData.client_id;
         this.authorization = this.rowData.authorization === "null" ? null : this.rowData.authorization;
         this.expected_status = this.rowData.expected_status === "null" ? null : this.rowData.expected_status;
         this.productId = this.rowData.productId === "null" ? null : this.rowData.productId;
         this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      } else {
         throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheetName} hàng ${rowIndex}`);
      }
   }
);

When(
   "Tôi gửi yêu cầu giao thức Http DELETE đến {string} với dữ liệu từ Excel người dùng cần xóa",
   async function (endpoint) {
      startTime = new Date().getTime();
      try {
         const res = await chai
            .request(server)
            .delete(endpoint)
            .set("authorization", this.authorization)
            .set("client_id", this.client_id)
            .send({
               productId: this.productId,
            });
         this.response = res;
         const endTime = new Date().getTime();
         this.duration = endTime - startTime;
      } catch (err) {
         throw new Error(err);
      }
   }
);

Then(
   "Tôi nhận được trạng thái phản hồi khớp với expected_status từ {string} ở hàng {string}",
   async function (sheetName, rowIndex) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

Then(
   "Nếu trạng thái phản hồi là 200, tôi sẽ nhận được thông báo thành công về việc xóa sản phẩm khỏi giỏ hàng của người dùng",
   function () {
      if (this.response.status === 200) {
         expect(this.response.body).to.have.property("status", 200);
         expect(this.response.body).to.have.property("message", "Item removed from cart");
      }
   }
);

Then(
   "Tôi kiểm tra dữ liệu có đúng với định dạng JSON và kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin người dùng đã xóa sản phẩm khỏi giỏ hàng thành công.",
   function () {
      if (this.response) {
         expect(this.response).to.be.json;
         const cart = this.response.body.data.cart;
         const totalItems = this.response.body.data.totalItems;
         expect(cart).to.have.property("_id");
         expect(cart).to.have.property("userId");
         expect(cart).to.have.property("items").that.is.an("array");
         expect(cart).to.have.property("createdAt");
         expect(cart).to.have.property("updatedAt");
         expect(cart).to.have.property("__v");
         expect(totalItems).to.be.a("number");
      }
   }
);

Then(
   "Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds cho mỗi Request",
   function (time) {
      this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
      expect(this.duration).to.be.below(Number(time));
   }
);
