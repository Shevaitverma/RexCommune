const asyncHandler = require("express-async-handler");
const { Generator } = require('snowflake-generator');
const Member = require("../models/memberModel");

//construct a new snowflake Generator
const SnowflakeGenerator = new Generator(1420070400000);

// add member
const addMember = asyncHandler(async(req, res)=>{

    const {community, user, role} = req.body;

    // validate 
    if(!community || !user || !role){
        res.status(400)
        throw new Error("Please fill required fields");
    }

    // check if member exist
    const memberExist = await Member.findOne({community})
    if(memberExist){
        res.status(400)
        throw new Error("member is already exists..")
    }

    // generate a snowflake
    const Snowflake = SnowflakeGenerator.generate();
    
    // create new member 
    const member = await Member.create({
        id:Snowflake,
        community,
        user,
        role
    })
    if (member){
        const {id, community, user, role, createdAt, updatedAt} = member;

        res.status(201).json({
            status:true,
            content:{
                data:{
                    id,
                    community,
                    user,
                    role,
                    createdAt, 
                    updatedAt
                },
            }
        })

    }

})

// remove member
const removeMember = asyncHandler(async(req, res)=>{
    const member = await Member.findById(req.params.id);
    //if member dosen't exist
    if(!member){
        res.status(404);
        throw new Error("Member not found");
    }
    // match member to its user
    if(member.user.toString() !== req.user.id){
        res.status(404);
        throw new Error("user not authorized");
    }
    await member.remove();
    res.status(200).json({message: "sucessfully deleted.."})
})

module.exports = {
    addMember,
    removeMember
}