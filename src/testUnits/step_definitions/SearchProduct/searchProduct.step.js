const {Given, When, Then} = require("@cucumber/cucumber");
const chai = require("chai");
const chaiHttp = require("chai-http");
const xlsx = require("xlsx");
const expect = chai.expect;
require("dotenv").config();
chai.use(chaiHttp);

let startTime;
const file_name = process.env.FILE_NAME_PRODUCT;
const server = process.env.SERVER;

async function readDataFromExcel(sheetName, rowIndex) {
   const workbook = await xlsx.readFile(file_name);
   const sheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(sheet);
   return data[rowIndex];
}

Given(
   "Tôi đã có dữ liệu Excel từ {string} ở hàng {string} cần tìm kiếm sản phẩm",
   async function (sheetName, rowIndex) {
      this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
      if (this.rowData) {
         this.searchTerm = this.rowData.searchTerm === "null" ? null : this.rowData.searchTerm;
         this.expected_status = this.rowData.expected_status === "null" ? null : this.rowData.expected_status;
         this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      } else {
         throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheetName} hàng ${rowIndex}`);
      }
   }
);

When("Tôi gửi yêu cầu HTTP GET đến {string} để tìm kiếm sản phẩm theo từ khóa", async function (url) {
   startTime = new Date().getTime();
   try {
      const res = await chai.request(server).get(`${url}?searchTerm=${this.searchTerm}`);
      this.response = res;
      const endTime = new Date().getTime();
      this.duration = endTime - startTime;
   } catch (err) {
      throw new Error(err);
   }
});

Then(
   "Tôi phải nhận được trạng thái phản hồi khớp với expected_status từ {string} ở hàng {string} ứng với từ khóa tìm kiếm",
   async function (sheetName, rowIndex) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

Then(
   "Nếu thành công trạng thái phản hồi là {int}, thì Tôi mong muốn kiểm tra dữ liệu trả về từ API endpoint phải đúng với định dạng JSON đồng thời kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin sản phẩm đã được tìm thấy theo từ khóa tìm kiếm.",
   function (status) {
      if (this.response.status === status) {
         this.attach(`Trạng thái phản hồi: ${this.response.status}`, "application/json");
         this.attach("Từ khóa tìm kiếm: " + JSON.stringify(this.searchTerm), "application/json");
         expect(this.response.body).to.have.property("status", 200);
         expect(this.response.body).to.have.property("message", "List of all products by search");
         expect(this.response.body).to.have.property("data");
         expect(this.response.body.data).to.have.property("products");
         expect(this.response.body.data.products).to.be.an("array");
         this.response.body.data.products.forEach((product) => {
            expect(product.name).to.include(this.searchTerm);
            expect(product).to.have.property("_id");
            expect(product).to.have.property("description");
            expect(product).to.have.property("price");
            expect(product).to.have.property("images").that.is.an("array");
            expect(product).to.have.property("categoryId").that.is.an("object");
            expect(product).to.have.property("inventory").that.is.a("number");
            expect(product).to.have.property("ratings").that.is.an("array");
            expect(product).to.have.property("attributes").that.is.an("array");
            expect(product).to.have.property("productUrl");
            expect(product).to.have.property("createdAt");
            expect(product).to.have.property("updatedAt");
            expect(product).to.have.property("discount").that.is.a("number");
         });
         this.attach("Dữ liệu trả về từ API endpoint: " + JSON.stringify(this.response.body), "application/json");
      }
   }
);

Then(
   "Tôi mong muốn mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds cho mỗi Request mà tôi gửi đi để tìm kiếm sản phẩm.",
   function (time) {
      this.attach(`Thời gian thực thi mong muốn: ${Number(time)} milliseconds`, "application/json");
      expect(this.duration).to.be.below(Number(time));
      this.attach(`Thời gian thực thi thực tế: ${this.duration} milliseconds`, "application/json");
   }
);
