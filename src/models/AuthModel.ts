import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { userSchemaDB } from "./mongooseSchema/userSchema";

process.loadEnvFile();

const JWT_SECRET = process.env.JWT_SECRET || "";

const User = mongoose.model("user", userSchemaDB);

const register = async (username: String, password: any, email: String) => { //review any
  try {
    const newUser = await User.create({ 
      username, 
      password: await bcryptjs.hash(password, 10), 
      email 
    });
    return newUser;
  } catch (err: any) { //review any
    console.log("AuthModel: register: Error: ", err.message);
    throw new Error("Internal server error");
  }
}

const login = async (username: String, password: any) => { //review any
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      throw new Error("Incorrect username or password");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("token created successfully");
    return token;
  } catch (err: any) { //review any
    console.log("AuthModel: login: Error: ", err.message);
    throw new Error("Internal server error");
  }
}

export default { User, register, login }