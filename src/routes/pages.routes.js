const express = require('express');
const pages = express.Router();
const jwt = require('jsonwebtoken');
const studentAuth = require('../middleware/authStudent');
const adminAuth = require('../middleware/adminAuth');
const teacherAuth = require('../middleware/teacherAuth');
const TeacherSchema = require('../modules/teacher');
const userSchema =require("../modules/user");

pages.get('/home',studentAuth,async (req,res)=>{
    const userdata = await userSchema.findOne({
        username:req.user.username
    });
    if(!userdata){
        return res.status(404).json({
            message:'Not able to Fetch Data'
        });
    }
    res.render('home',{
        user:userdata
    });
});
pages.get('/teacher',teacherAuth,(req,res)=>{
    res.render('teacher');
})
pages.get('/admin',adminAuth, async(req,res)=>{
    const teacher = await TeacherSchema.find();
    res.render('admin',{teacherData:teacher});
})
module.exports=pages;