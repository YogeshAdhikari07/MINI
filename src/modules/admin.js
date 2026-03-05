const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
    username:String,
    password:String
});
const adminModule = mongoose.model('heads',adminSchema);
module.exports=adminModule;