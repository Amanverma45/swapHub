const productModel = require('../model/productModel')

// add product 
const addProduct = async(req,res)=>{
    try{
        const {  productName, description,category,exchangeFor,
            location,}= req.body
        const product = new productModel({
          productName,
          description,
          category,
          exchangeFor,
          location,
          image: req.file.path,
          owner: req.user.id,
        });
        await product.save()
        res.status(201).json({message:"Product Add Successfully"})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message:"something went wrong"})
    }
}

//  getProduct 
const getProduct = async(req,res)=>{
    try{
        const product = await productModel.find()
        res.status(200).json(product)
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message:"something went wrong"})
    }
}

// delete product 
const deleteProduct = async(req,res)=>{
    try{
        const deleteProduct = await productModel.findByIdAndDelete(req.params.id)
        if(!deleteProduct){
         return res.status(404).json({message:"Product not found"})
        }
         
        res.status(200).json({message:"Product deleted Successfully"})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message:"something went wrong"})
    }
}

// update product 
const updateProduct = async(req,res)=>{
    try{
      const updatedProduct = await productModel.findByIdAndUpdate(req.params.id,req.body,{ new: true })
      if(!updatedProduct){
        return res.status(404).json({message:"Product not found"})
      }
      res.status(200).json({message:"Product Updated Successfully"})
      updatedProduct
    }catch(error){
      console.log(error.message)
      return res.status(500).json({message:"something went wrong "})
    }
}

module.exports = {addProduct,getProduct,deleteProduct,updateProduct}
