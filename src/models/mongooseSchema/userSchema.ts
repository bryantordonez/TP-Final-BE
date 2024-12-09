import mongoose from "mongoose";

const userSchemaDB = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchemaDB.index({ username: 1, email: 1 }, { unique: true });

export { userSchemaDB }