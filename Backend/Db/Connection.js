require('dotenv').config() 
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);   // if mongodb is not connected yhen use both lines

const mongoose = require('mongoose')
const Db = process.env.MONGO_URL
console.log(process.env.MONGO_URL)
mongoose.connect(Db)
.then(()=> {
   console.log('mongodb connected successfully')})
.catch((error)=>{
   console.log(error)
})