const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// initialize endpoints
const authRoute = require("./routes/authRouter");
const roleRoute = require("./routes/roleRouter");
const communityRoute = require("./routes/communityRouter");
const memberRoute = require("./routes/memberRouter");

const app = express();

// middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

//route 
app.get("/", (req, res)=> {res.send("homepage")});

//routes middleware
app.use("/v1/auth", authRoute);
app.use("/v1/role", roleRoute);
app.use("/v1/community",communityRoute);
app.use("/v1/member",memberRoute);

const PORT = process.env.PORT || 4000;
//connect to db and start server 
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server is running at ${PORT}`);
        })
    })
    .catch((err) => console.log(err));