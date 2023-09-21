const asyncHandler = require("express-async-handler");
const Auth = require('../models/authModel');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            res.status(401);
            throw new Error("Not authorized, please login");
        }

        // verify tokken..
        const verifyed = jwt.verify(token, process.env.JWT_SECRET);
        // get user id from token 
        const auth= await Auth.findById(verifyed.id).select("-password");
         
        if(!auth) {
            res.status(401)
            throw new Error("User not found");
        }
        req.auth = auth;
        next();


    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, please login");
    }
});

module.exports = protect;