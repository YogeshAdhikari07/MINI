const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectdb(){
    try
    {
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('connected');
    });
    }
    catch(err)
    {
        console.log(err);
    };
}
module.exports=connectdb