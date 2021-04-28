const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const TransactionModel = require("./models/Transaction");
const FriendModel = require("./models/Friend");

app.use(express.json()); //middleware to read all requests as json
app.use(cors());

mongoose.connect(
  "mongodb+srv://anubhav:anubhav@split-it.2tqwq.mongodb.net/split-it?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post("/add-transaction", async (req, res) => {
  const amount = req.body.amount;
  const paidBy = req.body.paidBy;
  const title = req.body.title;
  const date = req.body.date;
  const paidFor = req.body.paidFor;

  const transaction = new TransactionModel({
    title: title,
    amount: amount,
    paidBy: paidBy,
    date: date,
    paidFor: paidFor,
  });
  try {
    await transaction.save();
    res.send(transaction);
  } catch (err) {
    res.send(err);
  }
});

app.get("/all-transactions", async (req, res) => {
  TransactionModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.post("/add-friend", async (req, res) => {
  const name = req.body.name;
  const friend = new FriendModel({
    name: name,
  });
  try {
    await friend.save();
    res.send(friend);
  } catch (err) {
    res.send(err);
  }
});

app.get("/all-friends", async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/all-transactions/:id", async (req,res)=>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No transaction with id: ${id}`);
    mongoose.set('useFindAndModify', false);
    await TransactionModel.findByIdAndRemove(id,(err,result)=>{
      if(err){
        res.status(400).send(err);
      }else{
        res.send(result);
      }
    });

    // res.json({ message: "Post deleted successfully." });
});

app.listen(3001, () => {
  console.log("Server @ :3001");
});
