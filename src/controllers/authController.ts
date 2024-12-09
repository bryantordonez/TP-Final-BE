import { Request, Response } from "express";
import UserModel from "../models/AuthModel";
import { userCreateSchema, userLoginSchema} from "./joi/userSchema"


const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email } = req.body;

    const { error } = userCreateSchema.validate({ username, password, email });
    if (error) {
      console.log('/register: userCreateSchema error:', error.details[0].message);
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const newUser = await UserModel.register(username, password, email);
    if (newUser) {
      console.log("authController: register: new user created successfully");
      res.status(201).json(newUser);
      return;
    }

    res.status(201).json(newUser);
  } catch (err: unknown) {
      console.error("authController: register: error:", err);
      res.status(500).json({ error: "Internal server error" });
  }
};


const login = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { username, password } = req.body;

    const { error } = userLoginSchema.validate({ username, password });
    if (error) {
      console.log('/login: userLoginSchema error:', error.details[0].message);
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const token = await UserModel.login(username, password)

    res.status(200).json({ token })
  } catch (err: unknown) {
    console.error("authController: login: error:", err);
    res.status(500).json({ error: "Internal server error" });
}
}

export { register, login }