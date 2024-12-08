import mongoose from "mongoose";

process.loadEnvFile();

const URI_DB = process.env.URI_DB || ""; //review el ""

const connectDb = async () => {
    try{
        await mongoose.connect(URI_DB)
        console.log("Database connection success")
    } catch (error) {
        console.log("Database connection failed")
    }
}

export { connectDb }