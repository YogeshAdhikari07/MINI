const express = require('express');
const pages = express.Router();
const jwt = require('jsonwebtoken');
const studentAuth = require('../middleware/authStudent');
const adminAuth = require('../middleware/adminAuth');
const teacherAuth = require('../middleware/teacherAuth');
const TeacherSchema = require('../modules/teacher');
const userSchema = require("../modules/user");
const SubjectSchema = require("../modules/semester");

pages.get('/home', studentAuth, async (req, res) => {
    const userdata = await userSchema.findOne({
        username: req.user.username
    });
    if (!userdata) {
        return res.status(404).json({
            message: 'Not able to Fetch Data'
        });
    }
    res.render('home', {
        user: userdata
    });
});
pages.get('/teacher', teacherAuth, (req, res) => {
    res.render('teacher');
})
pages.get('/admin', adminAuth, async (req, res) => {
    try {
        const teacher = await TeacherSchema.find();
        const subject = await SubjectSchema.find();
        res.render('admin', {
            teacherData: teacher,
            SubjectData: subject
        });
    }
    catch (err) {
        res.status(503).json({ message: "Server Error!" })
    }
})
//Notes
//Semester Calls
pages.get("/semester/:id", studentAuth, (req, res) => {
    console.log(req.params.id);
    res.send(req.params.id);
})
module.exports = pages;