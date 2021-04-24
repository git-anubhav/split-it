const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const TransactionModel = require("./models/Schema");

app.use(express.json()); //middleware to read all requests as json
app.use(cors());

mongoose.connect(
  "mongodb+srv://anubhav:anubhav@split-it.2tqwq.mongodb.net/split-it?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post("/add", async (req, res) => {
  const amount = parseInt(req.body.amount);
  const paidBy = req.body.paidBy;
  const transaction = new TransactionModel({
    amount: amount,
    paidBy: paidBy,
    // paidFor: [
    //   { name: "Anike", amount: 50 },
    //   { name: "Anubhav", amount: 50 },
    // ],
  });
  try {
    await transaction.save();
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("Server @ :3001");
});
