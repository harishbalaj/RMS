//REST API
const express = require('express')
const router = express.Router()
const {loginUser, addStudents, addAttendence, getAllUsers, addAssessment,deleteAssessment, addResult, updateResult, deleteResult, userProject, updateAssessment} = require('./usersController')

//API
router.post("/login", loginUser)
router.post("/addStudents", addStudents)
router.post("/addAttendence", addAttendence)
router.post("/addAssessment", addAssessment)
router.post("/addResult", addResult)
router.post("/userProject/:userId",userProject)
router.put("/updateResult/:userId", updateResult)
router.put("updateAssessment/:userId",updateAssessment)
router.delete("/deleteResult/:userId", deleteResult)
router.delete("/deleteAssessment/:userId", deleteAssessment)
router.get("/getAllUsers", getAllUsers)

module.exports = router