import mongoose from "mongoose";

process.loadEnvFile();

const URI_DB = process.env.URI_DB;

if (!URI_DB) {
    throw new Error("Database URI is not defined. Set 'URI_DB' in .env");
}

const connectDb = async (uri = URI_DB) => {
    try {
        await mongoose.connect(uri);
        console.log("Database connection successful");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Database connection failed:", error.message);
        } else {
            console.error("Unknown error occurred while connecting to the database");
        }
        process.exit(1);
    }
};

const disconnectDb = async () => {
    try {
        await mongoose.disconnect();
        console.log("Database disconnection successful");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error while disconnecting from the database:", error.message);
        } else {
            console.error("Unknown error occurred while disconnecting from the database");
        }
    }
};

export { connectDb, disconnectDb };