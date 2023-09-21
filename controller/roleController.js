const asyncHandler = require("express-async-handler");
const Role = require("../models/roleModel");
const { Generator } = require('snowflake-generator');


//construct a new snowflake Generator
const SnowflakeGenerator = new Generator(1420070400000);

// create role
const createRole = asyncHandler(async(req, res)=>{
    const {name} = req.body;

    // validation
    if(!name){
        res.status(400)
        throw new Error("please choose a name for the role")
    }
    // generate a snowflake
    const Snowflake = SnowflakeGenerator.generate();

    // if role is already created for the snowflake
    const roleExist = await Role.findOne({name})
    if(roleExist){
        res.status(400)
        throw new Error("role is already exist for this user.")
    }

    // create new role
    const role = await Role.create({
        id: Snowflake,
        name
    });

    if(role){
        const {id, name, createdAt, updatedAt} = role;

        res.status(201).json({
            status:true,
            content:{
                data:{
                    id,
                    name,
                    createdAt, 
                    updatedAt
                },
            }
        })

    }

});

// get all roles
const getAll = asyncHandler(async(req, res)=>{
    const role = await Role.findById(req.Role._id);
    if(role){
        const {id, name, createdAt, updatedAt} = role;
        res.status(201).json({
            status:true,
            content:{
                data:{
                    id,
                    name,
                    createdAt,
                    updatedAt
                },
            }
        })
    }else{
        res.status(400);
        throw new Error("role not found");
    }
})

module.exports = {
    createRole,
    getAll
}