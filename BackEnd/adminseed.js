const userModel = require("./userModel");

const seed = async () => {
    const adminCredientials = {
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin@123",
    }
    try {
        const user = await userModel.findOne({ email: adminCredientials.email });
        if (!user) {
            const user = new userModel(adminCredientials);
            await user.save();
            console.log("Admin created successfully");
        }
        else {
            console.log("Admin already exists");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = seed;