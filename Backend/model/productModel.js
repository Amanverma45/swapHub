const mongoose = require('mongoose')
const { type } = require('node:os')
const { ref } = require('node:process')
const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    category:String,
    condition:String,
    image:String,
    // owner:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'user'
    // },
    owner:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})
const Product = mongoose.model('product',productSchema)
module.exports = Product 