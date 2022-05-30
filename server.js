require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const userRoute = require('./routes/user')
const categpryRoute = require('./routes/categories')
const uploadRoute = require('./routes/upload')
const productRoute = require('./routes/product')
const paymentRoute = require('./routes/payment')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/user', userRoute)
app.use('/category', categpryRoute)
app.use('/upload', uploadRoute)
app.use('/product', productRoute)
app.use('/payment', paymentRoute)



// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

/*Using this middleware to say our express application is using this directory 
as our static folder*/
app.use(express.static(path.join(__dirname, "/client/build")));

/*When the application gets any request because we're using a asterix here, it'll 
redirect us to this path which is our client, and it'll check our build foler which 
heroku will create for us, and it'll take the index.html inside our build folder and 
it'll just display on the browser*/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});



const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})

