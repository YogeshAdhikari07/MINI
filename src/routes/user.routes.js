const express = require("express");
const user = express.Router();
const userSchema = require("../modules/user");
const bcrypt = require("bcrypt");
const teacherSchema = require("../modules/teacher");
const adminModule = require("../modules/admin");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
//Student Routes
// 1)Student Signup
user.get("/sign", (req, res) => {
    res.render("sign");
});
user.post("/sign", async (req, res) => {
    const { username, email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10);
    try {
        await userSchema.create({
            username: username,
            email: email,
            password: encryptedPass,
        });
    } catch (err) {
        res.status(404).json(err);
    }
    const student = await userSchema.findOne({
        username:username,
        email:email
    });
    const token = jwt.sign({
        id:student._id,
        username:student.username
    },process.env.SECRET_KEY,{expiresIn:'2h'});
    res.cookie("token",token, {
        httpOnly: true,   // can't access from JS (security)
        secure: false,    // true in production (HTTPS)
    })
    res.redirect('/page/home')

});
// 2)Student Login
user.get("/Studentlogin", (req, res) => {
    res.render("studentLogin");
});
user.post("/Studentlogin", async (req, res) => {
    const { username, password } = req.body;
    const student = await userSchema.findOne({
        username: username,
    });
    if (!student) {
        res.status(404).json({
            message: "Not Found!",
        });
    } else {
        const isPassCorrect = await bcrypt.compare(password, student.password);
        if (!isPassCorrect) {
            res.status(404).json({
                message: "Not Found!",
            });
        } else {
            const token= jwt.sign({
                id:student._id,
                username:username,
            },process.env.SECRET_KEY,{expiresIn:'24h'});
            res.cookie('token',token,{
                httpOnly: true,   // can't access from JS (security)
                secure: false,
            })
            res.redirect("/page/home");
        }
    }
});
//Teacher Routes
// 1)Teacher Login
user.get("/teacher-login",(req, res) => {
    res.render("teacherLogin");
});
user.post("/teacherLogin", async (req, res) => {
    const { username,password } = req.body;
    const teacher = await teacherSchema.findOne({
        username:username
    });
    if (!teacher) {
        return res.status(404).json({
            message: "Not Found!",
        });
    } else {
        if (await bcrypt.compare(password, teacher.password)) {
            const token = await jwt.sign({
                id:teacher._id,
                username:teacher.username
            },process.env.TEACHER_KEY,{expiresIn:'2h'});
            res.cookie('token',token,{
                httpOnly:true,
                secure:false
            });
            res.redirect("/page/teacher");
        } else {
            return res.status(404).json({
                message: "Not Found",
            });
        }
    }
});
// 2)Teacher Registration
user.post('/teacherRegister',async(req,res)=>{
    const {username,password}=req.body;
    const encryptedpassword = await bcrypt.hash(password,10);
    try{
        await teacherSchema.create({
            username:username,
            password:encryptedpassword
        })
        return res.status(200).json({
            message:"Saved!"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Server Error!'
        })
    }
});
//Admin Routes
//Admin Login
user.get("/adminLogin", (req, res) => {
    res.render("adminlogin");
});
user.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    const admin = await adminModule.findOne({
        username:username
    });
    if (!admin) {
        return res.status(404).json({ message: "Not Found!" });
    }else {
        const checkpass = await bcrypt.compare(password,admin.password);
        if (!checkpass) {
            return res.status(404).json({ message: "Not Found!" });
        }
        else {
            const token= jwt.sign({
                id:admin._id,
                username:username,
            },process.env.ADMIN_KEY,{expiresIn:'2h'});
            res.cookie('token',token,{
                httpOnly: true,   // can't access from JS (security)
                secure: false,
            })
            res.redirect('/page/admin')
        }
    }
});
//Logout
user.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});
module.exports = user;
