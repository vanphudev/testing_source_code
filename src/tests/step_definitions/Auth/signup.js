const {Given, When, Then} = require("@cucumber/cucumber");
const chai = require('chai');
const chaiHttp = require('chai-http');
const xlsx = require('xlsx');
const expect = chai.expect;
chai.use(chaiHttp);

let userData;
let response;
let endTime;

let startTime;
const file_name = "D:\\code\\DoAnKDPM\\Book1.xlsx";
const server = "http://localhost:5555";
const path = require("path");


 async function readDataFromExcel(sheetName, rowIndex) {
    const workbook = await xlsx.readFile(file_name);
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    return data[rowIndex];
 }

Given('Tôi có dữ liệu người dùng từ {string} ở hàng {string}', async function (sheet, row) {
    const rowData = await readDataFromExcel(sheet, row);
    userData = {
        email: rowData.email,
        fullName: rowData.fullName, 
        phone: rowData.phone,
        password: rowData.password
    };
    this.expacted_status=rowData.expacted_status
});

When('Tôi gửi yêu cầu POST đến {string}',async function (endpoint) {
    startTime = new Date().getTime();
    await chai.request(server)
        .post(endpoint)
        .send(userData)
        .end((err, res) => {
            if (err) done(err);
            response = res;
            endTime = new Date().getTime();
            done();
        });
});

Then('Tôi sẽ nhận được trạng thái phản hồi với expected_status từ {string} ở hàng {string}', function (sheet, row) {
    
    expect(response).to.have.status(this.expacted_status);
});

Then('Tôi sẽ kiểm tra thời gian phản hồi không quá {int} milliseconds', function (time) {
    const responseTime = endTime - startTime;
    expect(responseTime).to.be.below(time);
});
