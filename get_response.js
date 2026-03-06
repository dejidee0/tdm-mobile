const fs = require('fs');
const json = JSON.parse(fs.readFileSync('swagger.json'));
let r1 = json.paths['/api/v1/Checkout/payment']?.post?.responses['200'];
console.log("CheckoutPayment:", JSON.stringify(r1, null, 2));

let r2 = json.paths['/api/v1/Orders/{orderId}/payment']?.put?.responses['200'];
console.log("OrderPayment:", JSON.stringify(r2, null, 2));
