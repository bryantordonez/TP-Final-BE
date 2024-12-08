import mongoose from "mongoose";

const userSchemaDB = new mongoose.Schema({ //review
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
  }, { versionKey: false })

  export { userSchemaDB }