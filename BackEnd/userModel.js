const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    studentId: String,
    section: String,
    date: { type: Date, default: Date.now },
    userProject:{
        projectLink: String
    },
    assessment:{
        percentage: String,
        yearSem: String,
        course: String,
        semStatus: String
    },
    result:{
        attendence: String,
        projectReview: String,
        assessment: String,
        linkedInPost: String,
        semester: String,
        projectMarks: String
    }
    
});

module.exports = mongoose.model("users", userModel);