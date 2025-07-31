const mongoose=require('mongoose');

const userSchem=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});
module.exports= mongoose.model("users",userSchem);