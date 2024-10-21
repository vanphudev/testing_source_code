const { Given, When, Then } = require("@cucumber/cucumber");
const chai = require("chai");
const chaiHttp = require("chai-http");
const xlsx = require("xlsx");
const expect = chai.expect;
chai.use(chaiHttp);

let startTime;
const file_name = "D:\\KDPM\\DoAnn\\Pay Test.xlsx"; // Đường dẫn đến file Excel
const server = "http://localhost:5555"; // Địa chỉ API của bạn

async function readDataFromExcel(sheetName, rowIndex) {
   const workbook = await xlsx.readFile(file_name);
   const sheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
   return data[rowIndex];
}

Given("Tôi có dữ liệu người dùng từ {string} ở hàng {string}", async function (sheetName, rowIndex) {
   this.rowData = await readDataFromExcel(sheetName, rowIndex);
   if (this.rowData) {
      this.client_id = this.rowData[1]; // Lấy client_id từ cột thứ hai
      this.authorization = this.rowData[2]; // Lấy authorization từ cột thứ ba
      this.expected_status = this.rowData[3]; // Lấy expected_status từ cột thứ tư
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
      console.log('Ten', this.response.body);
   } catch (err) {
      throw new Error(err);
   }
});

Then("Tôi sẽ nhận được trạng thái phản hồi với expected_status từ {string} ở hàng {string}", function (expectedStatus, sheetName, rowIndex) {
   expect(this.response).to.have.status(parseInt(this.expected_status));
   this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
   this.attach(`Trạng thái phản hồi: ${this.response.status}`);
});

Then('Nếu trạng thái phản hồi là {int}, thì tôi sẽ không được phép thanh toán và yêu cầu đăng nhập lại', function (status) {
   if (this.response.status === status) {
        this.attach("Bạn không có quyền thanh toán, yêu cầu đăng nhập lại."); // Xuất ra thông báo
   }
});

Then("Dữ liệu trả về có đúng với định dạng JSON", function () {
   expect(this.response).to.be.json; // Kiểm tra xem dữ liệu trả về có phải là JSON không
});

Then("Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds", function (time) {
   const endTime = new Date().getTime();
   const duration = endTime - startTime;
   this.attach(`Thời gian thực thi: ${duration} milliseconds`);
   expect(duration).to.be.below(Number(time)); // Kiểm tra thời gian phản hồi
});
