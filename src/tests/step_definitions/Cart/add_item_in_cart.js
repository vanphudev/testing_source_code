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
Given('Tôi có dữ liệu người dùng từ {string} ở hàng {string}', async function (sheet, row) {
    this.userData = await getDataFromExcel(sheet, row);
    if (this.userData) {
        this.client_id = this.userData[1];
        this.authorization = this.userData[2];
        this.expected_status = this.userData[5];
        this.productId = this.userData[3];
        this.quantity = this.userData[4];
        this.attach("Dữ liệu đọc từ file Excel: " + JSON.stringify(this.userData), "application/json");
    } else {
        throw new Error(`Không tìm thấy dữ liệu ở sheet ${sheet} hàng ${row}`);
    }
});

// Step to send POST request
When('Tôi gửi yêu cầu POST đến {string}', async function (url) {
    const body = {
        productId: this.productId,
        quantity: this.quantity
    };

    const headers = {
        client_id: this.client_id,
        authorization: this.authorization
    };

    startTime = new Date().getTime(); // Khởi tạo thời gian bắt đầu
    this.response = await chai.request(server)
        .post(url)
        .set(headers)
        .send(body);
    const endTime = new Date().getTime();
    this.duration = endTime - startTime;
});

// Step to validate response status
Then('Tôi sẽ nhận được trạng thái phản hồi với expected_status từ {string} ở hàng {string}', function (sheet, row) {
    const expectedStatus = Number(this.expected_status);
    if (isNaN(expectedStatus)) {
        throw new Error(`Expected status không hợp lệ: "${this.expected_status}"`);
    }

    console.log('Expected Status:', expectedStatus);
    console.log('Response Status:', this.response.status); // In ra status

    expect(this.response).to.have.status(expectedStatus);
});

// Step to validate response content
Then('Nếu trạng thái phản hồi là 200, thì tôi sẽ nhận được dữ liệu giỏ hàng của người dùng', function () {
    if (this.response.status === 200) {
        const cart = this.response.body.data.cart; // Lấy cart từ phản hồi
        expect(cart).to.be.an('object');
        expect(cart.items).to.be.an('array');
        expect(cart).to.have.property("_id");
        expect(cart).to.have.property("userId");
        expect(cart).to.have.property("createdAt");
        expect(cart).to.have.property("updatedAt");
        expect(cart).to.have.property("__v");
    } else {
        console.log('Response Body:', this.response.body); // In ra để kiểm tra
    }
});

// Step to check request execution time
Then("Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian {string} milliseconds", function (time) {
    this.attach(`Thời gian thực thi: ${this.duration} milliseconds`);
    expect(this.duration).to.be.below(Number(time));
});
