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

Given(
   "Tôi có dữ liệu người dùng từ file {string} ở hàng {string}, bao gồm client_id và authorization.",
   async function (sheetName, rowIndex) {
      this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
      if (this.rowData) {
         this.client_id = this.rowData.client_id;
         this.authorization = this.rowData.authorization;
         this.expected_status = this.rowData.expected_status;
         this.attach("Dữ liệu người dùng từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      } else {
         throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheetName} hàng ${rowIndex}`);
      }
   }
);

When("Tôi gửi yêu cầu POST đến {string} với client_id và authorization.", async function (endpoint) {
   startTime = new Date().getTime();
   try {
      const res = await chai.request(server).post(endpoint).set("Authorization", `Bearer ${this.authorization}`).send({
         client_id: this.client_id,
      });
      this.response = res;
      this.attach("Dữ liệu phản hồi: " + JSON.stringify(this.response), "application/json");
      const endTime = new Date().getTime();
      this.duration = endTime - startTime;
   } catch (err) {
      throw new Error(err);
   }
});

Then(
   "Tôi sẽ nhận được trạng thái phản hồi khớp với expected_status từ file {string} ở hàng {string} và kiểm tra dữ liệu trả về có đúng với định dạng JSON.",
   function (sheetName, rowIndex) {
      const expectedStatus = parseInt(this.expected_status);
      expect(this.response.status).to.equal(expectedStatus);
      expect(this.response.type).to.equal("application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`, "application/json");
   }
);

Then(
   "Tôi sẽ kiểm tra thời gian xử lý của endpoint API không không được quá {string} milliseconds cho mỗi Request.",
   function (time) {
      expect(this.duration).to.be.below(Number(time));
      this.attach(`Thời gian xử lý: ${this.duration} milliseconds`, "application/json");
   }
);

Then(
   "Nếu trạng thái phản hồi là {int}, tôi sẽ nhận được thông báo logout thành công và phiên làm việc sẽ bị vô hiệu hóa.",
   function (status) {
      if (this.response.status === status) {
         const responseBody = this.response.body;
         expect(responseBody).to.have.property("message").that.equals("User logged out successfully");
         expect(responseBody).to.have.property("data").that.is.an("object");
         expect(responseBody.data).to.have.property("acknowledged").that.equals(true);
         expect(responseBody.data).to.have.property("deletedCount").that.equals(1);
         this.attach(`Thông báo thành công: ${responseBody.message}`, "application/json");
         this.attach(`Dữ liệu phản hồi: ${JSON.stringify(responseBody.data)}`, "application/json");
      }
   }
);
