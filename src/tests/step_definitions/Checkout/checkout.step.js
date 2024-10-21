// var { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// let apiEndpoint;
// let clientId;
// let authorization;
// let requestBody = {};
// let responseStatus;
// let responseBody;

// // [Given] Sets up the initial state of the system.
// Given(`API endpoint {string}`, (endpoint) => {
//     apiEndpoint = endpoint;
// });

// Given(`client_id la {string}`, (id) => {
//     clientId = id;
// });

// Given(`authorization la {string}`, (auth) => {
//     authorization = auth;
// });

// Given(`userId la {string}`, (userId) => {
//     requestBody.userId = userId;
// });

// Given(`phone la {string}`, (phone) => {
//     requestBody.phone = phone;
// });

// Given(`email la {string}`, (email) => {
//     requestBody.email = email;
// });

// Given(`items bao gom {string} va {string}`, (item1, item2) => {
//     requestBody.items = [item1, item2];
// });

// Given(`totalPrice la {int}`, (total) => {
//     requestBody.totalPrice = total;
// });

// Given(`shippingAddress la {string}`, (address) => {
//     requestBody.shippingAddress = address;
// });

// Given(`paymentMethod la {string}`, (method) => {
//     requestBody.paymentMethod = method;
// });

// Given(`finalPrice la {int}`, (final) => {
//     requestBody.finalPrice = final;
// });

// Given(`note la {string}`, (note) => {
//     requestBody.note = note;
// });

// Given(`voucherId la {string}`, (voucherId) => {
//     requestBody.voucherId = voucherId;
// });

// Given(`discountAmount la {int}`, (amount) => {
//     requestBody.discountAmount = amount;
// });

// // [When] Describes the action or event that triggers the scenario.
// When(`Toi gui yeu cau POST den API`, () => {
//     cy.request({
//         method: 'POST',
//         url: apiEndpoint,
//         headers: {
//             'client_id': clientId,
//             'Authorization': authorization,
//         },
//         body: requestBody
//     }).then((response) => {
//         responseStatus = response.status;
//         responseBody = response.body;
//     });
// });

// When(`Toi gui yeu cau POST den API voi client_id sai va authorization`, () => {
//     clientId = 'invalid_client_id';
//     authorization = 'invalid_authorization';
//     return cy.request({
//         method: 'POST',
//         url: apiEndpoint,
//         headers: {
//             'client_id': clientId,
//             'Authorization': authorization,
//         },
//         body: requestBody,
//         failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx response
//     }).then((response) => {
//         responseStatus = response.status;
//         responseBody = response.body;
//     });
// });

// When(`Toi gui yeu cau POST den API ma khong co client_id`, () => {
//     return cy.request({
//         method: 'POST',
//         url: apiEndpoint,
//         headers: {
//             'Authorization': authorization,
//         },
//         body: requestBody,
//         failOnStatusCode: false
//     }).then((response) => {
//         responseStatus = response.status;
//         responseBody = response.body;
//     });
// });

// When(`Toi gui yeu cau POST den API ma khong co authorization`, () => {
//     return cy.request({
//         method: 'POST',
//         url: apiEndpoint,
//         headers: {
//             'client_id': clientId,
//         },
//         body: requestBody,
//         failOnStatusCode: false
//     }).then((response) => {
//         responseStatus = response.status;
//         responseBody = response.body;
//     });
// });

// When(`Toi gui yeu cau POST den API voi client_id va authorization sai`, () => {
//     clientId = 'invalid_client_id';
//     authorization = 'invalid_authorization';
//     return cy.request({
//         method: 'POST',
//         url: apiEndpoint,
//         headers: {
//             'client_id': clientId,
//             'Authorization': authorization,
//         },
//         body: requestBody,
//         failOnStatusCode: false
//     }).then((response) => {
//         responseStatus = response.status;
//         responseBody = response.body;
//     });
// });

// // [Then] Describes the expected outcome or result of the scenario.
// Then(`Ket qua phai tra ve ma trang thai la {int}`, (status) => {
//     expect(responseStatus).to.eq(status);
// });

// Then(`Ket qua phai co thong diep {string}`, (message) => {
//     expect(responseBody.message).to.eq(message);
// });
