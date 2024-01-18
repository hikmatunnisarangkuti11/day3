import Transaction from "../models/TransactionModel.js";

export const getTransactions = async(req, res) =>{
    try {
        const response = await Transaction.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTransactionById = async(req, res) =>{
    try {
        const response = await Transaction.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createTransaction = async(req, res) =>{
    try {
        await Transaction.create(req.body);
        res.status(201).json({msg: "Transaction Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTransaction = async(req, res) =>{
    try {
        await Transaction.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Transaction Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTransaction = async(req, res) =>{
    try {
        await Transaction.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Transaction Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}