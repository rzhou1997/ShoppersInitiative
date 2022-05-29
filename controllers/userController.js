const Users = require('../models/userModel')
const Payments = require('../models/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) =>{
        try {
            const {name, email, password} = req.body;//takes all the parameters into said body

            const user = await Users.findOne({email})//checks to find email in database
            if(user) return res.status(400).json({msg: "The email already exists."})//if user is in database we will tell that the user already exists
            /*if the length of the password is less than 6 characters then we will specify that 
            the password needs to be atleast 6 characters long */
            if(password.length < 6) 
                return res.status(400).json({msg: "Password is at least 6 characters long."})

            //if all else is successful then we will encrypt password
            const passwordHash = await bcrypt.hash(password, 10)
            //create a new user
            const newUser = new Users({name, email, password: passwordHash})
            //save user into database
            await newUser.save()

            /*Creating access token and a refresh jwt token */
            const accesstoken = accessOrRefresh({id: newUser._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"11m"})
            const refreshtoken = accessOrRefresh({id: newUser._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
            //creating cookie so that our website can remember who we are
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;//takes parameters as requests
            const user = await Users.findOne({email})//finding email
            if(!user) return res.status(400).json({msg: "User does not exist."})//if email doesn't exist send json response back
            const isMatch = await bcrypt.compare(password, user.password)//comparing password
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})//will send json message back of wrong password if password doesn't match

            //if all goes well and login is successful we'll create a access and refresh token
            const accesstoken = accessOrRefresh({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"11m"})
            const refreshtoken = accessOrRefresh({id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
            //creating cookie so that our website can remember who we are
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',//path of the site
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;//contains token
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})//no token

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{//verifying our token
                if(err) return res.status(400).json({msg: "Please Login or Register"})
                //assigning our token to our id
                const accesstoken = accessOrRefresh({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"11m"})
                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        
    },
    getUser: async (req, res) =>{
        try {
            //finding the user data except the password
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addCart: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    history: async(req, res) =>{
        try {
            const history = await Payments.find({user_id: req.user.id})

            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
 }
const accessOrRefresh = (userId, token, expiry)=>{
    return jwt.sign(userId, token, expiry);
}

module.exports = userCtrl

