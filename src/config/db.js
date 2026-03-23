const mongoose = require('mongoose');
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
        try{
            await mongoose.connect("mongodb://127.0.0.1:27017/hehe").then(()=>{
            console.log('connected to Localdatabase');
        });
        }
        catch(err){
            console.log(err);
        }
    };
}
module.exports=connectdb