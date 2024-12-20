import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
process.loadEnvFile()

//const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token: string | undefined = req.headers.authorization?.split(" ")[1]
    if (!token) {
      res.status(401).json({ error: "Access denied" })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    (req as any).user = decoded;
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export { auth }