
import mongoose from "mongoose";

import colors from "colors";
var a = 5;
console.log(a);
var b = 5;
console.log(b);
var c = 5;
const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL);
        
        console.log(`Sucessful database has been connected ${db.connection.host}`.bgGreen.white);

    } catch(error) {
        console.log(`Error in database connection : ${error}`.bgRed.white);
    }
}

export { connectDB };