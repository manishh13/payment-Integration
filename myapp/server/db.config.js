const mongoose = require("mongoose");
const connetDB = async () => {
  await mongoose.connect("mongodb://localhost/razorpay-payment-integration");
  console.log(`${mongoose.connection.host} is established`);
};
module.exports = connetDB;
