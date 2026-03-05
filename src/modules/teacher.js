const mongoose = require('mongoose');
const teacherSchema= mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    }
});
const teacherModel= mongoose.model('teacher',teacherSchema);
module.exports=teacherModel