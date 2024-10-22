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
   "Tôi đã có dữ liệu Excel mã loại sản phẩm từ {string} ở hàng {string} cần lọc theo loại sản phẩm đó",
   async function (sheetName, rowIndex) {
      this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
      if (this.rowData) {
         this.categoryId = this.rowData.categoryId === "null" ? null : this.rowData.categoryId;
         this.expected_status = this.rowData.expected_status === "null" ? null : this.rowData.expected_status;
         this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      } else {
         throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheetName} hàng ${rowIndex}`);
      }
   }
);

When("Tôi gửi yêu cầu HTTP GET đến {string} để lọc sản phẩm theo loại sản phẩm tương ứng", async function (url) {
   startTime = new Date().getTime();
   try {
      const res = await chai.request(server).get(`${url}?categoryId=${this.categoryId}`);
      this.response = res;
      const endTime = new Date().getTime();
      this.duration = endTime - startTime;
   } catch (err) {
      throw new Error(err);
   }
});

Then(
   "Tôi phải nhận được trạng thái phản hồi khớp với expected_status từ {string} ở hàng {string} ứng với loại sản phẩm cần lọc",
   async function (sheetName, rowIndex) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

Then(
   "Tôi mong muốn kiểm tra dữ liệu trả về từ API endpoint phải đúng với định dạng JSON đồng thời kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin sản phẩm đã được lọc theo loại sản phẩm thành công",
   function () {
      if (this.response.status === 200) {
         this.attach(`Trạng thái phản hồi: ${this.response.status}`, "application/json");
         this.attach("Loại sản phẩm cần lọc: " + JSON.stringify(this.categoryId), "application/json");
         expect(this.response.body.data).to.have.property("products");
         expect(this.response.body.data.products)
            .to.have.property("categoryId")
            .to.have.property("_id")
            .to.equal(this.categoryId);
         this.attach("Dữ liệu trả về từ API endpoint: " + JSON.stringify(this.response.body.data), "application/json");
      }
   }
);

Then(
   "Tôi mong muốn mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds cho mỗi Request mà tôi gửi đi để lọc sản phẩm theo loại sản phẩm",
   function (time) {
      this.attach(`Thời gian thực thi mong muốn: ${Number(time)} milliseconds`, "application/json");
      expect(this.duration).to.be.below(Number(time));
      this.attach(`Thời gian thực thi thực tế: ${this.duration} milliseconds`, "application/json");
   }
);
