const {Given, When, Then} = require("@cucumber/cucumber");
const chai = require("chai");
const chaiHttp = require("chai-http");
const xlsx = require("xlsx");
const expect = chai.expect;
require("dotenv").config();
chai.use(chaiHttp);

let startTime;
const file_name = process.env.FILE_NAME_PROFILE;
const server = process.env.SERVER;

async function readDataFromExcel(sheetName, rowIndex) {
   const workbook = await xlsx.readFile(file_name);
   const sheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(sheet);
   return data[rowIndex];
}

Given(
   "Tôi có dữ liệu Excel người dùng và các Input cập nhật thông tin tương ứng với người dùng từ {string} ở hàng {string}",
   async function (sheetName, rowIndex) {
      this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
      if (this.rowData) {
         this.client_id = this.rowData.client_id === "null" ? null : this.rowData.client_id;
         this.authorization = this.rowData.authorization === "null" ? null : this.rowData.authorization;
         this.expected_status = this.rowData.expected_status === "null" ? null : this.rowData.expected_status;
         this.inputData = {
            id: this.rowData.id,
            name: this.rowData.name,
            email: this.rowData.email,
            phone: this.rowData.phone,
            address: this.rowData.address,
            bio: this.rowData.bio,
         };
         this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      } else {
         throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheetName} hàng ${rowIndex}`);
      }
   }
);

When("Tôi gửi yêu cầu Http PUT đến Endpoint {string} với dữ liệu người dùng đọc từ Excel", async function (endpoint) {
   startTime = new Date().getTime();
   try {
      const res = await chai
         .request(server)
         .put(endpoint)
         .set("authorization", this.authorization)
         .set("client_id", this.client_id)
         .send(this.inputData);
      this.response = res;
      const endTime = new Date().getTime();
      this.duration = endTime - startTime;
   } catch (err) {
      throw new Error(err);
   }
});

Then(
   "Tôi nhận được trạng thái phản hồi khớp với expected_status mà tôi mong muốn từ {string} ở hàng {string}",
   async function (sheetName, rowIndex) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      this.attach(`Trạng thái phản hồi: ${this.response.status}`);
   }
);

Then("Nếu trạng thái phản hồi 200, thì tôi sẽ nhận được thông tin người dùng đã được cập nhật", function () {
   if (this.response.status === 200) {
      expect(this.response.body).to.have.property("data");
   }
});

Then("Tôi sẽ kiểm tra dữ liệu trả về có đúng với định dạng kiểu JSON không", function () {
   if (this.response && this.response.status === 200) {
      expect(this.response).to.be.json;
      const userData = this.response.body.data;
      const userDataStr = `Dữ liệu người dùng trả về:\n${JSON.stringify(userData, null, 2)}\n`;
      this.attach(userDataStr, "application/json");
   }
});

Then(
   "Tôi sẽ kiểm tra các trường thông tin người dùng đã được cập nhật có đúng với dữ liệu đã gửi lên không đồng thời kiểm tra thông tin token và refresh token có được kèm theo trong dữ liệu trả về không",
   function () {
      if (this.response.status === 200) {
         const userData = this.response.body.data.user;
         const tokens = this.response.body.data.tokens;
         expect(userData).to.have.property("email", this.inputData.email);
         expect(userData).to.have.property("phone", this.inputData.phone);
         expect(userData).to.have.property("fullName", this.inputData.name);
         expect(userData).to.have.property("_id", this.inputData.id);
         expect(userData).to.have.property("bio", this.inputData.bio);
         expect(userData).to.have.property("address");
         expect(userData.address).to.have.property("province", this.inputData.address.province);
         expect(userData.address).to.have.property("district", this.inputData.address.district);
         expect(userData.address).to.have.property("ward", this.inputData.address.ward);
         expect(userData.address).to.have.property("address", this.inputData.address.address);
         expect(tokens).to.have.property("accessToken");
         expect(tokens).to.have.property("refreshToken");
      }
   }
);

Then("Tôi muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds", function (time) {
   this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
   expect(this.duration).to.be.below(Number(time));
});
