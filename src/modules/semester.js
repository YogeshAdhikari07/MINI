const mongoose = require("mongoose");
const semesterSchema = mongoose.Schema({
    subjectName:
    {
        type:String
    },
    subjectCode:{
        type:String
    },
    semester:{
        type:Number
    }
});
const semesterModule = mongoose.model("semester",semesterSchema);
module.exports=semesterModule;