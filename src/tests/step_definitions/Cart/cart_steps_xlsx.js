const chai = require("chai");
const chaiHttp = require("chai-http");
const {Given, When, Then} = require("@cucumber/cucumber");
const xlsx = require("xlsx");
chai.use(chaiHttp);
const expect = chai.expect;
const server = "http://localhost:5555"; // Địa chỉ API

let response;
let testData;

// Đọc dữ liệu từ file Excel
function readExcelData(filePath) {
   const workbook = xlsx.readFile(filePath);
   const sheetName = workbook.SheetNames[0]; // Lấy sheet đầu tiên
   const sheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(sheet); // Chuyển đổi sheet thành JSON
   return data;
}

// Đọc dữ liệu từ file Excel và lưu vào biến testData
testData = readExcelData("F:\\data_testing\\input_data.xlsx"); // Thay đổi đường dẫn tới file Excel của bạn

// Lặp qua từng dòng dữ liệu và tạo ví dụ cho kịch bản
testData.forEach((row) => {
   Given("I have the client ID {string} and authorization {string}", function (client_id, authorization) {
      this.clientId = row.client_id; // Lấy client ID từ row
      this.authorization = row.authorization; // Lấy authorization từ row
   });

   When("I request the cart for the user", function () {
      return chai
         .request(server)
         .get(`/api/v1/carts/getcart/byuser?client_id=${this.clientId}`)
         .set("Authorization", this.authorization)
         .then((res) => {
            response = res; // Lưu lại response để sử dụng trong các bước tiếp theo
         });
   });

   Then("the response status should be {int}", function (expected_status) {
      expect(response).to.have.status(row.expected_status); // Kiểm tra status từ row
   });

   Then("the response should contain the cart details", function () {
      expect(response.body).to.have.property("cartDetails"); // Giả sử bạn có thuộc tính 'cartDetails' trong response
   });

   Then("the response should match the structure of the JSON", function () {
      const expectedStructure = {
         cartDetails: {
            items: [],
            total: 0,
         },
      };

      expect(response.body).to.have.all.keys(Object.keys(expectedStructure));
   });
});
