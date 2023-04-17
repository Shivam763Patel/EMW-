/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //GET: Page for add transcation to account
    addTransactionPage: async (req, res) => {
        const id = req.params.id;
        console.log("add tr page open", id);
        await Account.findOne({ id: id }).exec(function (err, result) {
            console.log(result);
            if (err) {
                return err;
            }
            console.log("add tr page data", result);
            const acc = result.accountid;
            return res.view("addTransaction", { articles: result, all: acc });
        });
    },

    //POST: Add transcation data into account

    addTransaction: async (req, res) => {
        console.log("data add tr");
        const id = req.params.id;
        console.log("for add transaction id", id);

        console.log("for transaction into account");

        const result = await Transaction.create({
            transactionid: id,
            accountType: req.body.accountType,
            transactionAmount: req.body.transactionAmount,
            transactionDate: req.body.transactionDate,
        }).fetch();

        console.log("rs data", result);

        // const id = result.transactionid
        console.log(id);

        const account = await Account.findOne(id);
        let amount;

        if (result.accountType == "Income") {
            amount = account.accountBalance + result.transactionAmount;
        } else {
            amount = account.accountBalance - result.transactionAmount;
        }

        if (amount <= 0) {
            return res.status(200).json({
                Message: "Account has insufficient balance",
                accBalance: account.accountBalance,
            });
        }

        await Account.updateOne({ id: id }, { accountBalance: amount });

        return res.redirect(`/dashboarduser/tr/${id}`);
    },

    viewTranscation: async function (req, res) {
        try {
            const uuserid = req.params.id;

            console.log("userid", uuserid);

            const user = await Transaction.find({
                where: { transactionid: uuserid },
            }).sort([{ createdAt: "DESC" }]);

            //  const { page , limit} = req.query

            //     // const pagedata = await Transaction.find({}).skip(skip*limit).limit(limit)

            //     if (page && limit) {
            // const result = await Transaction.find({}).limit(limit*1).skip(page * limit)

            const id = req.user.userid;
            console.log("data new", id);
            return res.view("transactionPage", {
                transactionid: user,
                all: id,
            });
        } catch (err) {
            console.log(err);
        }
    },

    //GET: Edit transcation page

    editUserTransactionpage: async (req, res) => {
        const id = req.params.id;

        await Transaction.findOne({ id: id }).exec(function (err, result) {
            console.log(result);
            if (err) {
                return err;
            }

            const data = result.transactionid;
            console.log("transaction id", data);
            return res.view("editUserTransaction", {
                articles: result,
                all: data,
            });
        });
    },

    editUserTransaction: async (req, res) => {
        const id = req.params.id;
        console.log("Updated id", id);

        const { transactionid, transactionAmount } = await Transaction.findOne({
            id: id,
        });

        const account = await Account.findOne({ id: transactionid });
        
        let amount = req.body.transactionAmount;
        let newBal;

        if (req.body.accountType == "Income") {
            newBal = amount - transactionAmount;
        } else {
            newBal = transactionAmount - amount;
        }

       newBal = parseInt(account.accountBalance + newBal)
        
       if (newBal < 0) {
        return res.status(200).json({
            Message: "Account has insufficient balance",
            accBalance: account.accountBalance,
        });
    }

        await Account.updateOne(
            { id: transactionid },
            { accountBalance: newBal }
        );

        const result = await Transaction.updateOne(
            {
                id: id,
            },
            {
                accountType: req.body.accountType,
                transactionAmount: req.body.transactionAmount,
                transactionDate: req.body.transactionDate,
            }
        ).fetch();

        console.log("Updated data", result);
        const edituserid = result.transactionid;
        console.log(edituserid);

        return res.redirect(`/dashboarduser/tr/${edituserid}`);
    },

    //Delete account for user
    deleteUserTranscation: async (req, res) => {
        const id = req.params.id;

        console.log("id tr ", id);

        const data = await Transaction.findOne({ id: id });

        const account = await Account.findOne({ id: data.transactionid });
        let amount;

        if (data.accountType == "Income") {
            amount = account.accountBalance - data.transactionAmount;
        } else {
            amount = account.accountBalance + data.transactionAmount;
        }

        if (amount < 0) {
            return res.status(200).json({
                Message: "Account has insufficient balance",
                accBalance: account.accountBalance,
            });
        }

        await Account.updateOne(
            { id: data.transactionid },
            { accountBalance: amount }
        );

        await Transaction.destroy({ id: id }).then(async (result) => {
            return res.redirect(`/dashboarduser/tr/${data.transactionid}`);
        });
    },
};
