
const model=require("../model/model.js")

// get categories
const getCategories=async(req,res)=>{
    let data=await model.Categories.find({})

    let filter_data=await data.map((v)=>Object.assign({},{type:v.type,color:v.color}))

    return res.json(filter_data)
}


// post categories
const createCategories=async(req,res)=>{
    const create=new model.Categories({
        type:"Investment",
        color:"#FCBE44"
    })

    try {
        await create.save();
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:error})
    }
    return res.status(200).json({message:create})   
}

// create transaction
const createTransaction=async(req,res)=>{
    const {name,type,amount}=req.body;
    let transaction;

    try {
        transaction=new model.Transaction(
            {name,type, amount,date:new Date()}
        )
        await transaction.save();
    } catch (error) {
        console.log(error)
    }

    if(!transaction){
        return res.status(500).json({message:"unable to cerate transaction"})
    }

    return res.status(200).json({transaction})


}

// get transaction
const getTransaction=async(req,res)=>{
    let data;
    try {
         data=await model.Transaction.find()
    } catch (error) {
        console.log(error)
    }
    if(!data){
        return res.status(404).json({message:"data not found"})
    }
    return res.status(200).json({data})
}

// delete transaction
const deleteTransaction=async(req,res)=>{
    let transaction

    try {
        transaction=await model.Transaction.deleteOne(req.body)
    } catch (err) {
        console.log(err)
    }

    if(!transaction){
        return res.status(404).json({message:"unable ti delete"})
    }

    return res.status(200).json({message:"product successfullu deleted"})
}

// get label data
const getLabel=async(req,res)=>{
    model.Transaction.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"type",
                foreignField:"type",
                as:"categories_info"

            }
        },
        {
            $unwind:"$categories_info"
        }
    ]).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).json({message:"lookup collection erroe"})
    })
}

exports.createCategories=createCategories;
exports.getCategories=getCategories;
exports.createTransaction=createTransaction;
exports.getTransaction=getTransaction;
exports.deleteTransaction=deleteTransaction
exports.getLabel=getLabel