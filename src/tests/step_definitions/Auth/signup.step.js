const {Given, When, Then} = require("@cucumber/cucumber");
const chai = require("chai");
const chaiHttp = require("chai-http");
const xlsx = require("xlsx");
const expect = chai.expect;
require("dotenv").config();
chai.use(chaiHttp);

let startTime;
const server = process.env.SERVER;
const file_name = process.env.FILE_NAME_AUTH;

async function readDataFromExcel(sheetName, rowIndex) {
   const workbook = await xlsx.readFile(file_name);
   const sheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(sheet);
   return data[rowIndex];
}

Given('Tôi có dữ liệu người dùng từ "{string}" ở hàng "{string}"', async function (sheetName, rowIndex) {
   this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
   if (this.rowData) {
      this.email = this.rowData.email;
      this.password = this.rowData.password;
      this.phone = this.rowData.phone;
      this.fullName = this.rowData.fullName;
      this.expected_status = this.rowData.expected_status;
      this.attach("Dữ liệu người dùng từ file Excel: " + JSON.stringify(this.rowData), "application/json");
   } else {
      throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheetName} hàng ${rowIndex}`);
   }
});

When('Tôi gửi yêu cầu POST đến "{string}" với dữ liệu người dùng', async function (endpoint) {
   startTime = new Date().getTime();
   try {
      const res = await chai.request(server).post(endpoint).send({
         email: this.email,
         password: this.password,
         fullName: this.fullName,
         phone: this.phone,
      });
      this.response = res;
      const endTime = new Date().getTime();
      this.duration = endTime - startTime;
   } catch (err) {
      throw new Error(err);
   }
});

Then(
   'Tôi sẽ nhận được trạng thái phản hồi mà endpoint API trả về khớp với expected_status từ "{string}" ở hàng "{string}" mà tôi mong muốn',
   function (sheetName, rowIndex) {
      const expectedStatus = parseInt(this.expected_status);
      expect(this.response.status).to.equal(expectedStatus);
      this.attach(`Trạng thái phản hồi: ${this.response.status}`, "application/json");
   }
);

Then('Tôi sẽ kiểm tra thời gian phản hồi của endpoint API không quá "{string}" milliseconds', function (time) {
   expect(this.duration).to.be.below(Number(time));
   this.attach(`Thời gian phản hồi: ${this.duration} milliseconds`, "application/json");
});

Then("Nếu trạng thái phản hồi là 200, tôi sẽ nhận được thông báo thành công", function () {
   if (this.response.status === 200) {
      const responseBody = this.response.body;
      expect(responseBody).to.have.property("message").that.equals("SUCCESS");
      this.attach(`Thông báo thành công: ${responseBody.message}`, "application/json");
   }
});

Then("Tôi mong muốn dữ liệu trả về từ endpoint API phải đúng với định dạng JSON", function () {
   expect(this.response).to.be.json;
   this.attach("Dữ liệu trả về đúng định dạng JSON", "application/json");
});

Then("Tôi mong muốn dữ liệu trả về từ endpoint API phải chứa thông tin người dùng đã đăng ký thành công", function () {
   const responseBody = this.response.body;
   expect(responseBody.data).to.have.property("user");
   const user = responseBody.data.user;
   expect(user).to.have.property("email").that.equals(this.email);
   expect(user).to.have.property("phone").that.equals(this.phone);
   expect(user).to.have.property("fullName").that.equals(this.fullName);
   expect(user).to.have.property("_id").that.is.a("string");
   this.attach(`Thông tin người dùng đã đăng ký thành công: ${JSON.stringify(user)}`, "application/json");
});
