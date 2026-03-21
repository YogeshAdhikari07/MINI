const express = require('express');
const pages = express.Router();
const jwt = require('jsonwebtoken');
const studentAuth = require('../middleware/authStudent');
const adminAuth = require('../middleware/adminAuth');
const teacherAuth = require('../middleware/teacherAuth');
const TeacherSchema = require('../modules/teacher');
const userSchema = require("../modules/user");
const SubjectSchema = require("../modules/semester");
const NoteSchema = require("../modules/notes");
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
pages.get('/teacher', teacherAuth,async (req, res) => {
    const SubjectData =await SubjectSchema.find();
    const noteData = await NoteSchema.find();
    res.render('teacher',{
        subjectData:SubjectData,
        noteData:noteData
    });
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
pages.get("/semester/:id", studentAuth,async (req, res) => {
    try {
        const subject = await SubjectSchema.find({
            semester: req.params.id
        });
        res.render('subjects', {
            subjectData: subject
        });
    }
    catch (err) {
        res.status(503).json({ message: "Server Error!" })
    }
})
//notes page render
pages.get("/notes/:id",async(req,res)=>{
    const notesData = await NoteSchema.find({
        subjectID:req.params.id
    });
    res.render("note",{
        noteData:notesData
    })
})
pages.get("/download/:id", async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file) return res.status(404).send("File not found");

  res.download(file.path, file.originalname);
});
module.exports = pages;