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
   "Tôi đã có dữ liệu Excel người dùng từ {string} ở hàng {string} cần xóa giỏ hàng",
   async function (sheetName, rowIndex) {
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
   }
);

When("Tôi gửi yêu cầu HTTP DELETE đến {string} để xóa giỏ hàng của người dùng", async function (url) {
   startTime = new Date().getTime();
   try {
      const res = await chai
         .request(server)
         .delete(url)
         .set("authorization", this.authorization)
         .set("client_id", this.client_id);
      this.response = res;
      this.attach("Dữ liệu phản hồi: " + JSON.stringify(this.response.body), "application/json");
      const endTime = new Date().getTime();
      this.duration = endTime - startTime;
   } catch (err) {
      throw new Error(err);
   }
});

Then(
   "Tôi phải nhận được trạng thái phản hồi khớp với expected_status từ {string} ở hàng {string} ứng với giỏ hàng cần xóa của người dùng",
   async function (sheetName, rowIndex) {
      expect(this.response).to.have.status(this.expected_status);
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

Then("Nếu trạng thái phản hồi là 200, tôi sẽ nhận được thông báo thành công về việc giỏ hàng đã được xóa", function () {
   if (this.response.status === 200) {
      expect(this.response.body).to.have.property("status", 200);
      expect(this.response.body).to.have.property("message", "Cart cleared");
      expect(this.response.body.data).to.have.property("message", "Giỏ hàng đã được xóa thành công.");
   }
});

Then(
   "Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds cho mỗi Request mà tôi gửi đi để xóa giỏ hàng của người dùng",
   function (time) {
      this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
      expect(this.duration).to.be.below(Number(time));
   }
);

Then(
   "Tôi mong muốn dữ liệu trả về từ API endpoint phải đúng với định dạng JSON đồng thời kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin người dùng đã xóa giỏ hàng thành công.",
   function () {
      if (this.response.status === 200) {
         expect(this.response.body).to.be.an("object");
         expect(this.response.body).to.have.property("status").equal(200);
         expect(this.response.body).to.have.property("message");
         expect(this.response.body.data).to.have.property("message").equal("Giỏ hàng đã được xóa thành công.");
      }
   }
);
