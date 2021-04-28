const  express = require( "express");
const  mongoose = require( "mongoose");
const  router = require( "./routes/index.js");
const  TransactionModel = require( "./models/Transaction.js");
const  FriendModel = require("./models/Friend.js");

const app = express();
const cors = require("cors");

app.use(express.json()); //middleware to read all requests as json
app.use(cors());

mongoose.connect(
  "mongodb+srv://anubhav:anubhav@split-it.2tqwq.mongodb.net/split-it?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/",router);

app.listen(3001, () => {
  console.log("Server @ :3001");
});
