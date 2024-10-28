const {Given, When, Then} = require("@cucumber/cucumber");
const chai = require("chai");
const chaiHttp = require("chai-http");
const xlsx = require("xlsx");
const expect = chai.expect;
require("dotenv").config();
chai.use(chaiHttp);

let startTime;
const file_name = process.env.FILE_NAME_REVIEW;
const server = process.env.SERVER;

async function readDataFromExcel(sheetName, rowIndex) {
   const workbook = await xlsx.readFile(file_name);
   const sheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(sheet);
   return data[rowIndex];
}

Given(
   "Tôi có dữ liệu Excel về đánh giá sản phẩm và các Input tương ứng từ {string} ở hàng {int}",
   async function (sheetName, rowIndex) {
      this.rowData = await readDataFromExcel(sheetName, rowIndex - 1);
      if (this.rowData) {
         this.client_id = this.rowData.client_id === "null" ? null : this.rowData.client_id;
         this.authorization = this.rowData.authorization === "null" ? null : this.rowData.authorization;
         this.expected_status = this.rowData.expected_status;
         this.inputData = {
            productId: this.rowData.productId,
            rating: this.rowData.rating,
            comment: this.rowData.comment,
            userId: this.rowData.userId,
         };
         this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.rowData), "application/json");
      } else {
         throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheetName} hàng ${rowIndex}`);
      }
   }
);

When(
   "Tôi gửi yêu cầu Http POST đến Endpoint {string} với dữ liệu đánh giá sản phẩm đọc từ Excel",
   async function (endpoint) {
      startTime = new Date().getTime();
      try {
         let res;
         if (this.authorization === null) {
            res = await chai.request(server).post(endpoint).set("client_id", this.client_id).send(this.inputData);
         } else if (this.client_id === null) {
            res = await chai
               .request(server)
               .post(endpoint)
               .set("authorization", this.authorization)
               .send(this.inputData);
         } else if (this.client_id === null && this.authorization === null) {
            res = await chai.request(server).post(endpoint).send(this.inputData);
         } else {
            res = await chai
               .request(server)
               .post(endpoint)
               .set("client_id", this.client_id)
               .set("authorization", this.authorization)
               .send(this.inputData);
         }
         this.response = res;
         const endTime = new Date().getTime();
         this.duration = endTime - startTime;
      } catch (err) {
         throw new Error(err);
      }
   }
);

Then(
   "Tôi nhận được trạng thái phản hồi khớp với expected_status mà tôi mong muốn từ {string} ở hàng {int}",
   async function (sheetName, rowIndex) {
      expect(this.response).to.have.status(parseInt(this.expected_status));
      this.attach(`Trạng thái phản hồi: ${this.response.status}`, "text/plain");
   }
);

Then(
   "Nếu trạng thái phản hồi 200, thì tôi sẽ nhận được thông tin đánh giá sản phẩm đã được tạo thành công",
   function () {
      if (this.response.status === 200) {
         expect(this.response.body).to.have.property("data");
      }
   }
);

Then("Tôi sẽ kiểm tra dữ liệu trả về có đúng với định dạng JSON không", function () {
   if (this.response && this.response.status === 200) {
      expect(this.response).to.be.json;
      const reviewData = this.response.body.data;
      const reviewDataStr = `Dữ liệu đánh giá sản phẩm trả về:\n${JSON.stringify(reviewData, null, 2)}\n`;
      this.attach(reviewDataStr, "application/json");
   }
});

Then("Tôi sẽ kiểm tra các trường thông tin đánh giá sản phẩm có đúng với dữ liệu đã gửi lên không", function () {
   if (this.response.status === 200) {
      const reviewData = this.response.body.data;
      expect(reviewData).to.have.property("productId", this.inputData.productId);
      expect(reviewData).to.have.property("rating", this.inputData.rating);
      expect(reviewData).to.have.property("comment", this.inputData.comment);
      expect(reviewData).to.have.property("userId", this.inputData.userId);
   }
});

Then("Tôi muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {int} milliseconds", function (time) {
   this.attach(`Thời gian thực thi: ${this.duration} milliseconds`, "text/plain");
   expect(this.duration).to.be.below(Number(time));
});
