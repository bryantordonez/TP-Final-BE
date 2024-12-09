import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { userSchemaDB } from "./mongooseSchema/userSchema";

process.loadEnvFile();

const JWT_SECRET = process.env.JWT_SECRET || "";

const User = mongoose.model("user", userSchemaDB);

const register = async (username: string, password: string, email: string) => {
  try {
    const newUser = await User.create({ 
      username, 
      password: await bcryptjs.hash(password, 10), 
      email 
    });
    return {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("AuthModel: register: Error:", err.message);
    }
    throw new Error("Internal server error");
  }
};

const login = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
  
    if (!user.password || !(await bcryptjs.compare(password, user.password))) {
      throw new Error("Incorrect username or password");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("token created successfully");
    return token;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("AuthModel: login: Error:", err.message);
    }
    throw new Error("Internal server error");
  }
};

export default { User, register, login }