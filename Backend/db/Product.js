const mongoose=require('mongoose');

const productSchem=new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
});
module.exports = mongoose.model("Product", productSchem);

