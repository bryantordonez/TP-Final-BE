import express from "express";
import { connectDb } from "./src/config/DBconfig";
import { transactionRoutes } from "./src/routes/transactionRoutes"
import { authRoutes } from "./src/routes/authRoutes"

process.loadEnvFile();

const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json());
app.use("/api/auth", authRoutes); //ok
app.use("/api", transactionRoutes);

app.listen(PORT, () => {
  connectDb()
  console.log("Server is listening on port http://localhost:" + PORT)
})