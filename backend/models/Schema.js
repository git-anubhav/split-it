const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  paidBy: {
    type: String,
    required: true,
  },
  // paidFor: {
  //   type: [{ name: String, amount: Number }],
  //   required: true,
  // },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
