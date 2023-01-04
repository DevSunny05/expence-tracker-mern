const express=require("express");
const {createCategories, getCategories, createTransaction, getTransaction, deleteTransaction, getLabel} =require("../controller/controller")

const router=express.Router();

router.post("/api/categories",createCategories)

router.get("/api/categories",getCategories)

router.post("/api/transaction",createTransaction)

router.get("/api/transaction",getTransaction)

router.delete("/api/transaction",deleteTransaction)

router.get("/api/labels",getLabel)



module.exports= router;