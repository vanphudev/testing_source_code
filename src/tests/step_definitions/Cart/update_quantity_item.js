const chai = require('chai');
const chaiHttp = require('chai-http');
const { Given, When, Then } = require('@cucumber/cucumber');
const XLSX = require('xlsx');
const expect = chai.expect;
const { setDefaultTimeout } = require('@cucumber/cucumber');
chai.use(chaiHttp);

setDefaultTimeout(100000);
let startTime;
const file_name = "E:\\Nam4\\KDPM\\Book1.xlsx";
const server = "http://localhost:5555";

// Load Excel data
function getDataFromExcel(sheetName, row) {
   const workbook = XLSX.readFile(file_name);
   const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  return data[row];
}


// Step to load data from Excel
Given('Tôi có dữ liệu người dùng {string} ở hàng {string}', async function (sheet, row) {
   this.userData = await getDataFromExcel(sheet, row);
   if(this.userData)
   {
      this.client_id = this.userData[1]; 
      this.authorization = this.userData[2]; 
      this.expected_status = this.userData[4];
      this.productId = this.userData[3]; 
      this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.userData), "application/json");
    } else {
        throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheet} hàng ${row}`);
    }
});

// Step to send PUT request to increase or decrease quantity
When('Tôi muốn gửi yêu cầu PUT đến {string}', async function (url) {
  const body = {
    productId: this.productId,  
  };

  const headers = {
    client_id: this.client_id,
    authorization: this.authorization
  };

  startTime = new Date().getTime(); // Khởi tạo thời gian bắt đầu
    this.response = await chai.request(server)
        .put(url)
        .set(headers)
        .send(body);
    const endTime = new Date().getTime();
    this.duration = endTime - startTime;
});

// Step to validate response status
Then('Tôi nhận được trạng thái phản hồi với expected_status từ {string} ở hàng {int}', function (sheet, row) {
  const expectedStatus = this.expected_status;
  expect(response).to.have.status(Number(expectedStatus));
});


// Step to validate response content
Then('Nếu trạng thái phản hồi trả về 200, thì tôi sẽ nhận được dữ liệu giỏ hàng của người dùng', function () {
   if (this.response.status === 200) {
      const cart = this.response.body.data.cart;
      const totalItems = this.response.body.data.totalItems;
      expect(cart).to.have.property("_id");
      expect(cart).to.have.property("userId");
      expect(cart).to.have.property("items").that.is.an("array");
      expect(cart).to.have.property("createdAt");
      expect(cart).to.have.property("updatedAt");
      expect(cart).to.have.property("__v");
      expect(totalItems).to.be.a("number");
  } else {
      console.log('Response Body:', this.response.body); // In ra để kiểm tra
  }
});

// Step to validate response time
Then('Tôi mong muốn sẽ kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds', function (time) {
   this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
   expect(this.duration).to.be.below(Number(time));
 });