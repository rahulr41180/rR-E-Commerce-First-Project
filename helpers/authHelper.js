
import bcrypt from "bcrypt";

// bcrypt Password
const hashPassword = async (password) => {
    try {
        // hashing the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log("error :", error);
    }
}

// decrypt Password
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

export {
    hashPassword,

    comparePassword
}