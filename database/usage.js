const mongoose = require("mongoose");

const schema = new mongoose.Schema({
userId:String,
weekStart:Number,
count:{type:Number,default:0}
});

module.exports = mongoose.model("usage",schema);
