const mongoose = require('mongoose')
const swapModel = new mongoose.Schema({
    sender:{
        type:String
        //  type:mongoose.Schema.Types.ObjectId,
        //  ref:'user'
    },
    receiver:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'user'
        type:String
    },
    requestedProduct:{
    //    type:mongoose.Schema.Types.ObjectId,
    //    ref:'product'
         type:String
    },
    offeredProduct:{
    //    type:mongoose.Schema.Types.ObjectId,
    //    ref:'product'
    type:String
    },
    status:{
     type:String,
     default:'pending'
    }
},{
    timestamps:true
})
const Swap = mongoose.model('swap',swapModel)
module.exports = Swap