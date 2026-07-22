require('dotenv').config()
const express = require('express')
require('./Db/Connection.js')
const app = express();
const userRoutes = require('./routes/userRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const swapRoutes = require('./routes/swapRoutes.js')
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Server start from here ')
})
app.use('/api',userRoutes)
app.use('/api',productRoutes)
app.use('/api',swapRoutes)
app.use('/api',chatRoutes)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})