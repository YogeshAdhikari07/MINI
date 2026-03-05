const jwt = require("jsonwebtoken");
const teacherAuth = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.render('not');
    }
    try{
        const verified= await jwt.verify(token,process.env.TEACHER_KEY);
        req.user=verified;
        next();
    }
    catch(err){
        res.redirect("/user/teacher-login");
    }
}
module.exports=teacherAuth;