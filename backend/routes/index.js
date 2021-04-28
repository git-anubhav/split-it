const express = require('express');

const { deleteTransaction, getTransactions, addFriend, getFriends, addTransacton } = require('../handlers');

const router = express.Router();

router.get('/all-friends',  getFriends);
router.post('/add-transaction', addTransacton );
router.post('/add-friend', addFriend);
router.delete('/delete-transaction/:id', deleteTransaction);
router.get('/all-transactions', getTransactions);

module.exports= router;