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
   "Tôi đã có dữ liệu người dùng từ {string} ở hàng {string} cần cập nhật số lượng sản phẩm trong giỏ hàng",
   async function (sheetName, rowIndex) {
      this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
      console.log(this.rowData);
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
   "Tôi gửi yêu cầu HTTP PUT đến {string} với dữ liệu cập nhật số lượng sản phẩm là 1 trong giỏ hàng của người dùng",
   async function (url) {
      startTime = new Date().getTime();
      try {
         const res = await chai
            .request(server)
            .put(url)
            .set("authorization", this.authorization)
            .set("client_id", this.client_id)
            .send({
               productId: this.productId,
            });
         this.response = res;
         this.attach("Dữ liệu phản hồi: " + JSON.stringify(this.response.body), "application/json");
         const endTime = new Date().getTime();
         this.duration = endTime - startTime;
      } catch (err) {
         throw new Error(err);
      }
   }
);

Then(
   "Tôi phải nhận được trạng thái phản hồi khớp với expected_status từ {string} ở hàng {string}",
   async function (sheetName, rowIndex) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

Then(
   "Nếu trạng thái phản hồi là 200, tôi sẽ phải nhận được dữ liệu giỏ hàng của người dùng với số lượng sản phẩm đã được tăng lên 1",
   function () {
      if (this.response.status === 200) {
         expect(this.response.body.data).to.have.property("cart");
         expect(this.response.body.data.cart.items).to.not.be.empty;
         const updatedItem = this.response.body.data.cart.items.find((item) => item.productId === this.productId);
         expect(updatedItem).to.have.property("quantity");
      }
   }
);

Then(
   "Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds cho mỗi Request mà tôi gửi đi để cập nhật số lượng sản phẩm trong giỏ hàng lên 1 sản phẩm",
   function (time) {
      this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
      expect(this.duration).to.be.below(Number(time));
   }
);

Given(
   "Tôi đã có dữ liệu Excel người dùng từ {string} ở hàng {string} cần cập nhật số lượng sản phẩm trong giỏ hàng của người dùng",
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
   "Tôi gửi yêu cầu HTTP PUT đến {string} để giảm số lượng sản phẩm trong giỏ hàng của người dùng xuống 1",
   async function (url) {
      startTime = new Date().getTime();
      try {
         const res = await chai
            .request(server)
            .put(url)
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
   "Tôi phải nhận được trạng thái phản hồi khớp với expected_status từ {string} ở hàng {string} ứng với giỏ hàng của người dùng",
   async function (sheetName, rowIndex) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

Then(
   "Nếu trạng thái phản hồi là 200, tôi sẽ phải nhận được dữ liệu giỏ hàng của người dùng với số lượng sản phẩm đã được giảm xuống 1",
   function () {
      if (this.response.status === 200) {
         expect(this.response.body.data).to.have.property("cart");
         expect(this.response.body.data.cart.items).to.not.be.empty;
         const updatedItem = this.response.body.data.cart.items.find((item) => item.productId === this.productId);
         expect(updatedItem).to.have.property("quantity");
      }
   }
);

Then(
   "Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds cho mỗi Request mà tôi gửi đi để cập nhật số lượng sản phẩm trong giỏ hàng giảm xuống 1 sản phẩm",
   function (time) {
      this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
      expect(this.duration).to.be.below(Number(time));
   }
);
