const {Given, When, Then} = require("@cucumber/cucumber");
const chai = require("chai");
const chaiHttp = require("chai-http");
const xlsx = require("xlsx");
const expect = chai.expect;
require("dotenv").config();
chai.use(chaiHttp);

let startTime;
const file_name = process.env.FILE_NAME_AUTH;
const server = process.env.SERVER;

async function readDataFromExcel(sheetName, rowIndex) {
   const workbook = await xlsx.readFile(file_name);
   const sheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(sheet);
   return data[rowIndex];
}

Given(
   "Tôi có dữ liệu Excel người dùng cần đăng nhập vào hệ thống từ {string} ở hàng {string}",
   async function (sheet, row) {
      this.rowData = await readDataFromExcel(sheet, row - 1);
      if (this.rowData) {
         this.email = this.rowData.email === "null" ? null : this.rowData.email;
         this.password = this.rowData.password === "null" ? null : this.rowData.password;
         this.expected_status = this.rowData.expected_status === "null" ? null : this.rowData.expected_status;
         this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      } else {
         throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheet} hàng ${row}`);
      }
   }
);

When("Tôi gửi yêu cầu đăng nhập theo giao thức Http POST đến endpoint là {string}", async function (endpoint) {
   startTime = new Date().getTime();
   try {
      const res = await chai.request(server).post(endpoint).send({email: this.email, password: this.password});
      this.response = res;
      this.attach("Dữ liệu phản hồi: " + JSON.stringify(this.response.body), "application/json");
      const endTime = new Date().getTime();
      this.duration = endTime - startTime;
   } catch (err) {
      throw new Error(err);
   }
});

Then(
   "Tôi sẽ nhận được trạng thái phản hồi với expected_status trong tập dữ liệu Excel đọc được từ {string} ở hàng {string}",
   function (sheet, row) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

Then(
   "Tôi muốn kiểm tra thời gian phản hồi của API endpoint không quá {string} milliseconds cho mỗi Request",
   function (time) {
      this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
      expect(this.duration).to.be.below(Number(time), "Thời gian phản hồi quá lớn so với ngưỡng cho phép");
   }
);

Then(
   "Tôi mong muốn dữ liệu trả về từ API endpoint phải đúng với định dạng JSON đồng thời kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin người dùng đã đăng nhập thành công với Token và Refresh Token.",
   function () {
      expect(this.response).to.be.json;
      const responseDataJSON = this.response.body;
      this.attach("Dữ liệu trả về: " + JSON.stringify(responseDataJSON), "application/json");

      if (this.response.status === 200) {
         const responseBody = this.response.body;
         expect(responseBody).to.have.property("message", "SUCCESS");
         const responseData = responseBody.data;
         expect(responseData).to.have.property("code", 200);
         expect(responseData.data).to.have.property("user");
         expect(responseData.data).to.have.property("tokens");
         const user = responseData.data.user;
         expect(user).to.have.property("email", this.email, "Email không khớp với dữ liệu đầu vào");
         const tokens = responseData.data.tokens;
         expect(tokens).to.have.property("accessToken");
         expect(tokens).to.have.property("refreshToken");
         this.attach("Access Token: " + tokens.accessToken, "application/json");
         this.attach("Refresh Token: " + tokens.refreshToken, "application/json");
      }
   }
);
