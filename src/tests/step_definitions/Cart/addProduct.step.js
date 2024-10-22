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
   "Tôi có dữ liệu Excel chứa thông tin người dùng, sản phẩm và số lượng sản phẩm từ {string} ở hàng {string} cần thêm vào giỏ hàng",
   async function (sheetName, rowIndex) {
      this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
      if (this.rowData) {
         this.client_id = this.rowData.client_id === "null" ? null : this.rowData.client_id;
         this.authorization = this.rowData.authorization === "null" ? null : this.rowData.authorization;
         this.expected_status = this.rowData.expected_status === "null" ? null : this.rowData.expected_status;
         this.productId = this.rowData.productId === "null" ? null : this.rowData.productId;
         this.quantity = this.rowData.quantity === "null" ? null : this.rowData.quantity;
         this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      } else {
         throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheetName} hàng ${rowIndex}`);
      }
   }
);

When("Tôi gửi yêu cầu POST đến {string} với dữ liệu Excel người dùng", async function (endpoint) {
   startTime = new Date().getTime();
   try {
      const res = await chai
         .request(server)
         .post(endpoint)
         .set("authorization", this.authorization)
         .set("client_id", this.client_id)
         .send({
            productId: this.productId,
            quantity: this.quantity,
         });
      this.response = res;
      const endTime = new Date().getTime();
      this.duration = endTime - startTime;
   } catch (err) {
      throw new Error(err);
   }
});

Then(
   "Tôi sẽ nhận được trạng thái phản hồi với expected_status từ {string} ở hàng {string}",
   async function (sheetName, rowIndex) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

Then(
   "Nếu trạng thái phản hồi là 200, thì tôi sẽ nhận được dữ liệu giỏ hàng của người dùng sau khi thêm sản phẩm",
   function () {
      if (this.response.status === 200) {
         expect(this.response.body).to.have.property("status", 200);
         expect(this.response.body).to.have.property("message", "Item added to cart");
         expect(this.response.body.data).to.have.property("cart");
      }
   }
);

Then("Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds", function (time) {
   this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
   expect(this.duration).to.be.below(Number(time));
});

Then(
   "Tôi mong muốn dữ liệu trả về từ API endpoint phải đúng với định dạng JSON đồng thời kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin người dùng đã thêm sản phẩm vào giỏ hàng thành công",
   function () {
      if (this.response && this.response.status === 200) {
         expect(this.response).to.be.json;
         const cart = this.response.body.data.cart;
         const cartData = `Dữ liệu giỏ hàng trả về:\n${JSON.stringify(cart, null, 2)}\n`;
         this.attach(cartData, "application/json");

         // Kiểm tra các trường thông tin trong giỏ hàng
         expect(cart).to.have.property("_id");
         expect(cart).to.have.property("userId");
         expect(cart).to.have.property("items").that.is.an("array").with.lengthOf(1);
         expect(cart.items[0]).to.have.property("productId", this.productId);
         expect(cart.items[0]).to.have.property("quantity", this.quantity);
         expect(cart).to.have.property("createdAt");
         expect(cart).to.have.property("updatedAt");
         expect(cart).to.have.property("__v");
         expect(this.response.body.data).to.have.property("totalItems", 1);
      }
   }
);
