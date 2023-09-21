const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// ------------ user auth schema ------------
const authSchema = mongoose.Schema({
    id:{
        type: String,
        require: true,
    },
    name:{
        type: String,
        require: [true, "please add a name"]
    },
    email:{
        type: String,
        require: [true, "please add a name"],
        unique: true,
        trim: true,
        match:[
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "please enter a valid email"
        ]
    },
    password:{
        type: String,
        require: [true, "please add a password"],
        minLength: [6, "password must be up to 6 characters"]
    },
    // created_at: {
    //     type: Date,
    //     default: Date.now
    // },
    // updated_at: {
    //     type: Date,
    //     timestamps:true
    // }
},
{
    timestamps:true,
})


module.exports = mongoose.model("Auth", authSchema);