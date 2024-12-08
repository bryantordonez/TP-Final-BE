import { Request, Response } from "express";
import UserModel from "../models/AuthModel";
import { userCreateSchema, userLoginSchema} from "./joi/userSchema"


const register = async (req: Request, res: Response): Promise<any> => { //review any
  try {
    const { username, password, email } = req.body;

    const { error } = userCreateSchema.validate({ username, password, email });
    if (error) {
      console.log('/register: userCreateSchema error:', error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const newUser = await UserModel.register(username, password, email);

    res.json(newUser);
  } catch (error: any) {
    console.log('Internal server error:', error.message); 
    res.status(500).json({ error: error.message });
  }
}

const login = async (req: Request, res: Response) : Promise<any> => { //review any
  try {
    const { username, password } = req.body;

    const { error } = userLoginSchema.validate({ username, password });
    if (error) {
      console.log('/login: userLoginSchema error:', error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const token = await UserModel.login(username, password)

    res.json({ token })
  } catch (error: any) {
    res.status(401).json({ status: 401, error: error.message });
  }
}

export { register, login }