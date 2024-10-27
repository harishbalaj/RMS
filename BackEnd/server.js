const seed = require("./adminseed.js");
const {loginUser} = require("./usersController.js")
const userRouter = require('./userRouter.js')
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const PORT = process.env.PORT || 5001;



// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/rms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log("Database connected successfully");

    await seed();
   
}).catch((err) => {
    console.log("database connect error:" + err.message);
})

app.use(cors());
app.use(bodyParser.json());

//REST API
app.use("/",userRouter)

// app.post("/login",loginUser)

    
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});