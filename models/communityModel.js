const mongoose = require("mongoose");

const communitySchema = mongoose.Schema({
    id:{
        type: String,
        require: true,
    },
    name:{
        type: String,
    },
    slug:{
        type:String,
        require: true,
    },
    owner:{
        type: String,
        require: true,
    }
},
{
    timestamps:true,
})

module.exports = mongoose.model("Community", communitySchema);