const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connetDB = require("./db.config");
const crypto = require("crypto");
const { OrderModel, $where } = require("./Order.models");
const port = 5000;
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.KEYID,
  key_secret: process.env.KEYSECRET,
});

//db connection
connetDB();
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

//routes
app.post("/payment/checkout", async (req, res) => {
  const { name, amount } = req.body;
  const order = await razorpay.orders.create({
    amount: Number(amount * 100),
    currency: "INR",
    receipt: "order_1234567890",
  });
  await OrderModel.create({ order_id: order.id, amount: amount, name: name });
  console.log({ order });
  res.json(order);
});
app.post("/payment/payment-varification", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body_data = razorpay_order_id + "|" + razorpay_payment_id;
  const expect = crypto
    .createHmac("sha256", process.env.KEYSECRET)
    .update(body_data)
    .digest("hex");
  const isValid = expect;
  if (isValid) {
    await OrderModel.findOne(
      { order_id: razorpay_order_id },
      {
        $set: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
      }
    );
    console.log("Payment Successful");
    res.redirect(
      `http://localhost:3000/success?payment_id=${razorpay_payment_id}`
    );
    return;
  } else {
    res.redirect("http://localhost:3000/failed");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
