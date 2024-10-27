const { response } = require("express");
const userModel = require("./userModel");
const loginUser = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password, userName, userPassword } = req.body
        if (email && password) {

            const user = await userModel.findOne({ email })
            if (!user) {
                return res.status(201).json({ message: "User not found", success: false })
            }
            if (password !== user.password) {
                return res.status(201).json({ message: "Invalid Crediantials", success: false })
            }

            res.status(200).json({ message: "Login successfully", success: true })

        }
        else {
            const studentId = userPassword
            const user = await userModel.findOne({ studentId })
            if (!user) {
                return res.status(201).json({ message: "User not found", success: false })
            }
            if (user.name === userName) {
                res.status(200).json({ message: "Login successfully", success: true, user })
            }
            else {
                res.status(201).json({ message: "Invalid Crediantials", success: false })
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching users!!" })
    }
}

const addStudents = async (req, res) => {
    try {
        const { name, studentId, section } = req.body
        console.log(req.body);

        // check if user already exists
        const user = await userModel.findOne({ studentId })
        if (user) {
            return res.status(201).json({ message: "User already exists", success: false })
        }

        const newuser = new userModel({ name, studentId, section })
        await newuser.save()
        res.status(200).json({ message: "User added successfully", success: true })
    }
    catch (err) {
        res.status(500).json({ message: "Error adding user!!" })
    }
}

const addAttendence = async (req, res) => {
    try {
        const { name, date, studentId, section } = req.body
        console.log(req.body);
        const attendenceDate = date
        // check if user already exists
        const user = await userModel.findOne({ studentId })
        if (user) {
            if (user.date === attendenceDate) {
                return res.status(201).json({ message: "Attendence already exists", success: false })
            }
            else {
                await user.updateOne({ $set: { date: attendenceDate } })
                await user.save()
                return res.status(200).json({ message: "Attendence added successfully", success: true })
            }
        }

        console.log('First if');
        return res.status(201).json({ message: "User not found", success: false })
    }
    catch (err) {
        res.status(500).json({ message: "Error adding user!!" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).json({ users, success: true })
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching users!!" })
    }
}

const addAssessment = async (req, res) => {
    try {
        const { studentId, percentage, yearSem, course, semStatus } = req.body
        console.log(req.body);

        // check if user already exists
        const user = await userModel.findOne({ studentId })
        if (!user) {
            return res.status(201).json({ message: "Student not found", success: false })
        }
        console.log('First if');

        if (user.assessment.yearSem === yearSem) {
            return res.status(201).json({ message: "Assessment score already exists", success: false })
        }
        console.log('second if');

        await user.updateOne({ $set: { assessment: { percentage, yearSem, course, semStatus } } })
        await user.save()
        console.log('Last if');

        res.status(200).json({ message: "Add Assessment scorrer successfully", success: true })
    }
    catch (err) {
        res.status(500).json({ message: "Error adding user!!" })
    }

}

const addResult = async (req, res) => {
    try {
        const { studentId, attendence, projectReview, assessment, linkedInPost, semester, projectMarks } = req.body
        console.log(req.body);
        console.log('projectMarks', projectMarks);
        console.log(linkedInPost);


        // check if user already exists
        const user = await userModel.findOne({ studentId })
        if (!user) {
            return res.status(201).json({ message: "Student not found", success: false })
        }
        console.log('First if');

        if (user.result.semester === semester) {
            return res.status(201).json({ message: "Result score already exists", success: false })
        }
        console.log('second if');

        await user.updateOne({ $set: { result: { attendence, projectReview, assessment, linkedInPost, semester, projectMarks } } })
        await user.save()
        console.log('Last if');

        res.status(200).json({ message: "Add Semester Result scorrer successfully", success: true })
    }
    catch (err) {
        res.status(500).json({ message: "Error adding user!!" })
    }
}

const updateResult = async (req, res) => {
    try {
        const { studentId, attendence, projectReview, assessment, linkedInPost, semester, projectMarks } = req.body
        const { userId } = req.params
        const user = await userModel.findOne({ _id: userId })
        if (!user) {
            console.log('not found')
            return res.status(201).json({ message: "Student not found", success: false })
        }
        console.log('update')
        console.log(studentId)
        user.result = { attendence, projectReview, assessment, linkedInPost, semester, projectMarks }
        user.studentId = studentId
        await user.save()
        res.status(200).json({ message: "Update Semester Result scorrer successfully", success: true })
    }
    catch (err) {
        res.status(500).json({ message: "Error adding user!!" })
    }
}
const deleteResult = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await userModel.findByIdAndDelete(userId)
        if (!user) {
            return res.status(201).json({ message: "Student not found", success: false })
        }
        res.status(200).json({ message: "Delete Result scorrer successfully", success: true })
    }
    catch (err) {
        res.status(500).json({ message: "Error adding user!!" })
    }
}
const deleteAssessment = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await userModel.findById(userId)
        user.assessment = null
        await user.save()
        if (!user) {
            return res.status(201).json({ message: "Student not found", success: false })
        }
        res.status(200).json({ message: "Delete Assessment scorrer successfully", success: true })
    }
    catch (err) {
        res.status(500).json({ message: "Error adding user!!" })
    }
}
const updateAssessment = async (req,res)=>{
    try{
        const {studentId,percentage,yearSem,course,semStatus} = req.body
        console.log(req.body);
        // check if already exists
        const {userId} = req.params
        const user = await userModel.findOne({ _id: userId })
        if (!user) {
            console.log('not found')
            return res.status(201).json({ message: "Student not found", success: false })
        }
        console.log('update')
        console.log(studentId)
        user.assessment = { studentId,percentage,yearSem,course,semStatus }
        user.studentId = studentId
        await user.save()
        res.status(200).json({message:"Update Semester Assessment successfully!!",success:true})   
    }
    catch{
        res.status(500).json({ message: "Error adding user!!" })
    }

}
const userProject = async (req,res) =>{
    try {
        const { userId } = req.params
        const {data} = req.body
        console.log(userId);
        
        console.log(data);
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(201).json({message:"Student Not Found!!", success:false});
        }
        if(user.name === data.uname){
          user.userProject.projectLink = data.projectLink
          await user.save()
          return res.status(200).json({message:"Your Project added successfully!!",success:true})
        }
         res.status(201).json({message:"Student Not Found!!", success:false});
        
    }
    catch (err) {
        res.status(500).json({ message: "Error adding user!!" })
    }
   
}

module.exports = { loginUser, addStudents, addAttendence, getAllUsers,deleteAssessment, addAssessment, addResult, updateResult, deleteResult,userProject,updateAssessment }