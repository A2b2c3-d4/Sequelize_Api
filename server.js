import express from "express";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is listening on port------- ${port}`);
});

// app.get("/test", (req,res) => {
//   return res.status(200).json({ data: "TEST " });
// });
