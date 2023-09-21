const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    id:{
        type: String,
        require: true,
    },
    name:{
        type: String,
        require: [true, "please add a name"]
    },
},
{
    timestamps:true,
})

module.exports = mongoose.model("Role", roleSchema);