const Expenses = require('../models/expense');

exports.getAllExpenses = async (req, res, next) => {
    try {
        let expenses = await Expenses.findAll()
        console.log(expenses);
        res.send(expenses);

    } catch (error) {
        console.log(error);
    };
};

exports.postAddExpense = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        let result = await Expenses.create({
            amount: amount,
            description: description,
            category: category
        });
        res.json(result)
    } catch (error) {
        console.log(error);
    };
};

exports.deleteExpense = async(req, res, next) => {
    try {
        let expenseId = req.params.id;
        let user = await Expenses.findByPk(expenseId);
        await user.destroy();
    } catch (error) {
        console.log(error)
    };
};