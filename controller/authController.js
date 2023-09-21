const Auth = require("../models/authModel");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { Generator } = require('snowflake-generator');


// function to generate jwt token.
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: "1d"})
};

//construct a new snowflake Generator
const SnowflakeGenerator = new Generator(1420070400000);

// signup user route
const signUp = asyncHandler(async(req, res)=>{
    const { name, email, password} = req.body;

    //validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error("please fill  in all required fields")
    }
    if(password.length < 6){
        res.status(400)
        throw new Error("password must be 6 characters")
    }

    // chech if user email already exists
    const userExist = await Auth.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("User email already regestered")
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate a snowflake
    const Snowflake = SnowflakeGenerator.generate();

    // create new user
    const auth = await Auth.create({
        id: Snowflake,
        name,
        email,
        password:hashedPassword
    });

    // generate tokken
    const token = generateToken(auth._id);


    if(auth){
        const {id, name, email, createdAt} = auth;
        res.status(201).json({
            status:true,
            content:{
                data:{
                    id,
                    name,
                    email,
                    createdAt,
                    meta:{
                        token
                    }
                },
            }
        });
    }else{
        res.status(400)
        throw new Error("Invalid user data");
    }

});

// signin user route
const signIn = asyncHandler( async(req, res)=>{
    const {email, password} = req.body;

    // validation request
    if(!email || !password){
        res.status(400);
        throw new Error("please add email and password");
    }

    //check if user exists.
    const auth = await Auth.findOne({email});
    if(!auth){
        res.status(400);
        throw new Error("User not found.");
    }
    
    // check if password is correct.
    const  passwordIsCorrect = await bcrypt.compare(password, auth.password)

    // generate token..
    const token = generateToken(auth._id);
    // send http-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 864000), // 1 day
        sameSite: "none",
        secure: true // if we use https
    });

    if(auth && passwordIsCorrect){
        const {id, name, email, createdAt} = auth;

        // generate token..
        const token = generateToken(auth._id);
        // cookie parser
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 864000), // 1 day
            sameSite: "none",
            secure: true // if we use https
        })
        res.status(201).json({
            status:true,
            content:{
                data:{
                    id,
                    name,
                    email,
                    createdAt,
                    meta:{
                        token
                    }
                },
            }
        });
    } else {
        res.status(400);
        throw new Error("invalid email or password");
    }
});

// me route(currently signed in user, using the access token.)
const me = asyncHandler(async(req, res)=>{
    const auth = await Auth.findById(req.auth._id);
    if(auth){
        const {id, name, email, createdAt} = auth;
        res.status(201).json({
            status:true,
            content:{
                data:{
                    id,
                    name,
                    email,
                    createdAt
                },
            }
        })
    }else{
        res.status(400)
        throw new Error("User not found");
    }

})

module.exports = {
    signIn,
    signUp,
    me
}