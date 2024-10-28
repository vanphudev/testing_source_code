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
   console.log(data);
   return data[rowIndex];
}

Given("Tôi có dữ liệu người dùng từ {string} ở hàng {string}", async function (sheetName, rowIndex) {
   this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
   console.log(this.rowData);
   if (this.rowData) {
      this.client_id = this.rowData.client_id === "null" ? null : this.rowData.client_id;
      this.authorization = this.rowData.authorization === "null" ? null : this.rowData.authorization;
      this.expected_status = this.rowData.expected_status === "null" ? null : this.rowData.expected_status;
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
   } else {
      throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheetName} hàng ${rowIndex}`);
   }
});

When("Tôi gửi yêu cầu POST đến {string}", async function (endpoint) {
   startTime = new Date().getTime();
   try {
      const res = await chai
         .request(server)
         .post(endpoint)
         .set("authorization", this.authorization)
         .set("client_id", this.client_id);
      this.response = res;
      this.attach("Dữ liệu phản hồi: " + JSON.stringify(this.response), "application/json");
      const endTime = new Date().getTime();
      this.duration = endTime - startTime;
   } catch (err) {
      throw new Error(err);
   }
});

Then(
   "Tôi sẽ nhận được trạng thái phản hồi với expected_status từ {string} ở hàng {string}",
   function (sheetName, rowIndex) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

Then(
   "Nếu trạng thái phản hồi là {int}, thì tôi sẽ không được phép thanh toán và yêu cầu đăng nhập lại",
   function (status) {
      if (this.response.status === status) {
         this.attach("Bạn không có quyền thanh toán, yêu cầu đăng nhập lại."); // Xuất ra thông báo
      }
   }
);

Then("Dữ liệu trả về có đúng với định dạng JSON", function () {
   expect(this.response).to.be.json; // Kiểm tra xem dữ liệu trả về có phải là JSON không
});

Then("Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds", function (time) {
   this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
   expect(this.duration).to.be.below(Number(time)); // Kiểm tra thời gian phản hồi
});
