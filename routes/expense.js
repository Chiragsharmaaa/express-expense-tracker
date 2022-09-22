const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');

router.get('/show-expenses', expenseController.getAllExpenses);

router.post('/add-expense', expenseController.postAddExpense);

router.delete('/expense/:id', expenseController.deleteExpense)

module.exports = router;