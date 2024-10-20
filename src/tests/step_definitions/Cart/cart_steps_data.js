const chai = require("chai");
const chaiHttp = require("chai-http");
const {Given, When, Then} = require("@cucumber/cucumber");
const expect = chai.expect;
const server = "http://localhost:5555"; // Địa chỉ API

chai.use(chaiHttp);

let response;

// Thiết lập giá trị client ID và authorization
let clientId;
let authorization;

Given("I have the client ID {string} and authorization {string}", function (client_id, authorizationToken) {
   clientId = client_id;
   authorization = authorizationToken;
});

When("I request the cart for the user", function () {
   return chai
      .request(server)
      .get(`/api/v1/carts/getcart/byuser`)
      .set("client_id", clientId)
      .set("Authorization", authorization)
      .then((res) => {
         response = res;
      });
});

Then("the response status should be {int}", function (expected_status) {
   expect(response).to.have.status(expected_status);
});

Then("the response should contain the cart details", function () {
   expect(response.body).to.have.property("cartDetails");
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
