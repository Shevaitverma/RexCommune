const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    id:{
        type: String,
        require: true,
    },
    community:{
        type: String,
        require: true
    },
    user:{
        type: String,
        require: true
    },
    role:{
        type: String,
        require: true
    },
    createdAt:{
        type:Date,
        default:Date(Date.now())
    }
},
)

module.exports = mongoose.model("Member", memberSchema);