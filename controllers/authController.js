
import userModel from "../models/userModel.js";

import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// POST METHOD FOR REGISTRATION
const registerController = async (req, res) => {
    try {
        // console.log('req.body:', req.body)
        const { name, email, password, phone, address, secretKey } = req.body;
        // validation

        if(!name) {

            return res.status(404).send({
                status : false,
                message : "Name is required",
                navigate : "/register"
            })
        }
        if(!email) {
            return res.status(404).send({

                message : "email is required",
                status : false,
                navigate : "/register"
            })
        }
        if(!password) {
            return res.status(404).send({
                message : "password is required",
                status : false,

                navigate : "/register"
            })
        }
        if(!phone) {
            return res.status(404).send({
                message : "phone number is required",
                status : false,
                navigate : "/register"
            })
        }
        if(!address) {
            return res.status(404).send({
                message : "address is required",
                status : false,
                navigate : "/register"
            })
        }
        if(!secretKey) {
            return res.status(404).send({
                message : "secretKey is required",
                status : false,
                navigate : "/register"
            })
        }

        // Checking. She/He is exisiting user.
        const exisitingUser = await userModel.findOne({email})
        if(exisitingUser) {
            return res.status(200).send({
                status : false,
                message : "Already user has been registered please login..",
                navigate : "/login",
                devMessage : "Already user has been registered please login.."
            })
        }


        // User registration

        // Password hashing
        const hashedPassword = await hashPassword(password);

        console.log("hashedPassword :", hashedPassword);
        // Save
        const user = await new userModel({name, email, phone, address, password : hashedPassword, secretKey : secretKey}).save();
        console.log("user", user);


        res.status(201).send({
            message : "User registered successfully",
            devMessage : "User registered successfully",
            user : user,
            status : true,
            navigate : "/login"
        })

    } catch (error) {
        console.log("error in registerController :", error);
        res.status(500).send({
            message : "Something went wrong, Please try again",
            devMessage : "Error in user registration",
            status : false,
            errorMessage : error.message,
            navigate : "/register"
        })
    }

}

// METHOD POST FOR LOGIN
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('password:', password)
        console.log('email:', email)
        // Validation

        if(!email || !password) {
            return res.status(201).send({
                status : false,
                message : "Please enter email or password",
                navigate : "/login"
            })
        }

        // Check User is exists or not

        const user = await userModel.findOne({email : email});
        // console.log('user:', user)
        if(!user) {
            // console.log('user:', user)
            return res.status(201).send({
                status : false,
                message : "User is not registered, Please do register your self first..",
                navigate : "/register"
            })
        }

        // Password Verification
        const match = await comparePassword(password, user.password);

        if(!match) {
            return res.status(201).send({
                status : false,
                message : "Invalid email or password, Please try again..",
                navigate : "/login"
            })
        }
        
        // Token
        const token = await JWT.sign({_id : user._id}, process.env.JWT_SECRET, {
            expiresIn : "7d",
        })

        res.status(200).send({
            status : true,
            message : "Login has successfully done.",
            user : {

                name : user.name,
                email : user.email,
                address : user.address,
                phone : user.phone,
                role : user.role
            },
            token : token,

            navigate : "/"
        })
    } catch (error) {
        res.status(500).send({
            status : false,
            message : "Something went wrong ! Please try again..",
            devMessage : error.message,
            navigate : "/login"
        })
    }
}

const testController = async (req, res) => {
    try {
        return res.status(200).send({
            status : true,
            message : "Successfully, have done the test part, Thank You"
        })
    } catch (error) {
        return res.status(500).send({
            status : false,
            
            message : "Error in test Controller",
            error : error.message
        })

    }
}

// User Authentication
const userAuthProtectedController = async (req, res) => {
    try {
        // console.log("req.user :", req.user)
        return res.status(200).json({
            status : true,
            protected : true,
        })
    } catch(error) {
        console.log("Error :", error.message);
        return res.status(500).json({
            status : false,

            error : error.message,
            message : "Something went wrong ! Please try again.."
        })
    }
}

// Admin Authentication

const adminAuthProtectedController = async (req, res) => {
    try {
        return res.status(200).json({
            status : true,
            protected : true
        })
    } catch(error) {
        return res.status(500).json({
            status : false,
            error : error.message,
            message : "Something went wrong ! Please try again.."
        })
    }
}

// FORGOT PASSWORD | METHOD : POST
const forgotPasswordController = async (req, res) => {
    try {

        const { email, secretKey, newPassword } = req.body;

        if(!email) {
            return res.status(201).send({
                status : false,
                message : "Email is required",
                navigate : "/forgot-password"
            })
        }
        if(!secretKey) {
            return res.status(201).send({
                status : false,
                message : "Secret Key is required",
                navigate : "/forgot-password"
            })
        }
        if(!newPassword) {
            return res.status(201).send({
                status : false,
                message : "New password is required",
                navigate : "/forgot-password"
            })
        }

        // Check if uesr exists or not

        const user = await userModel.findOne({email : email, secretKey : secretKey});
        console.log('user:', user)


        // Validation
        if(!user) {
            return res.status(201).send({
                status : false,
                message : "Wrong Email or Secret Key",
                navigate : "/forgot-password"
            })
        }

        
        // New password hashed
        const hashedPassword = await hashPassword(newPassword)

        const updatePassword = await userModel.findByIdAndUpdate(user._id, {password : hashedPassword});

        return res.status(200).send({
            status : true,
            message : "Password reset successfully! Thank You",
            navigate : "/login"
        })
    } catch(error) {
        console.log("Error in forgotpassword :", error.message);

        return res.status(500).send({
            status : false,
            devMessage : error.message,
            navigate : "/forgot-password",
            message : "Something went wrong! Please try again.."
        })
    }
}

// FORGOT SECRET KEY | METHOD : POST
const forgotSecretKeyController = async (req, res) => {
    try {

        const { email, newSecretKey } = req.body;

        if(!email) {
            return res.status(201).send({
                status : false,
                message : "Email is required",
                navigate : "/forgot-secret-key"
            })
        }
        if(!newSecretKey) {
            return res.status(201).send({
                status : false,
                message : "New Secret Key is required",
                navigate : "/forgot-secret-key"
            })
        }

        // Check if uesr exists or not

        const user = await userModel.findOne({email : email});
        console.log('user:', user)

        // Validation
        if(!user) {
            return res.status(201).send({
                status : false,
                message : "Wrong Email",
                navigate : "/forgot-secret-key"
            })
        }


        const updatePassword = await userModel.findByIdAndUpdate(user._id, {secretKey : newSecretKey});

        return res.status(200).send({
            status : true,
            message : "Secret key reset successfully! Thank You",
            navigate : "/forgot-password"
        })
    } catch(error) {
        console.log("Error in forgot secret key :", error.message);
        return res.status(500).send({
            status : false,
            devMessage : error.message,
            navigate : "/forgot-secret-key",
            message : "Something went wrong! Please try again.."
        })
    }
}

// Update Profile | METHOD : PUT
const updateProfileController = async (req, res) => { 
    try {
        const { name, address, email } = req.body;
        // console.log('email:', email)
        // console.log('name:', name)
        
        const updateProfile = await userModel.updateOne({_id : req.user._id, email : email}, {name : name, address : address }, { new : true });

        if(!updateProfile) {
            return res.status(200).send({
                status : false,
                message : "Something went wrong please try again"
            })
        }

        res.status(200).send({
            status : true,
            updateProfile : updateProfile
        })
    } catch(error) {
        console.log("error :", error.message);
        res.status(500).send({
            status : false,
            message : error.message

        })

    }
}

export { 

registerController, 
loginController, 
testController, 
userAuthProtectedController, 
adminAuthProtectedController,
forgotPasswordController,  
forgotSecretKeyController,
updateProfileController

};