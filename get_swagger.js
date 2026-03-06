const fs = require('fs');
const json = JSON.parse(fs.readFileSync('swagger.json'));
let schemas = json.components.schemas;
const keys = Object.keys(schemas);
const checkoutPayment = keys.find(k => k.endsWith('CheckoutPaymentDetailsDto'));
console.log(JSON.stringify(schemas[checkoutPayment], null, 2));
