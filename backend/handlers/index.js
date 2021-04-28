const express = require('express');
const mongoose = require('mongoose');

const TransactionModel = require('../models/Transaction');
const FriendModel = require("../models/Friend");

const router = express.Router();

const getTransactions = async (req, res) => { 
    TransactionModel.find({}, (err, result) => {
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
}

const deleteTransaction = async (req, res) => { 
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

}

 const addFriend = async (req, res) => {

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
}

const addTransacton = async (req, res) => {
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
}

const getFriends = async (req, res) => {
    FriendModel.find({}, (err, result) => {
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
}

exports.getFriends=getFriends;
exports.addTransacton=addTransacton;
exports.addFriend=addFriend;
exports.deleteTransaction=deleteTransaction;
exports.getTransactions=getTransactions;


exports.router=router;