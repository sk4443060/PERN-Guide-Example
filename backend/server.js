import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import dotenv from "dotenv";
// import pool from "./db.js";

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  //   origin: "http://localhost:3000",
  origin: "*",
  //   optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

/*
⚠️ NOTE:
Express 5 me `express.json()` recommended hai
body-parser ab optional ho gaya hai
Learning ke liye rakhna theek hai
*/
app.use(bodyParser.json());

// ✅ ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/my", (req, res) => {
  res.send("Shubham Kumar");
});

app.get("/test", (req, res) => {
  res.send("Test OK");
});

// ✅ ERROR HANDLING MIDDLEWARE HAMESHA ROUTES KE BAAD
app.use((err, req, res, next) => {
  // ⚠️ Express ka rule:
  //      Jis middleware me 4 arguments hote hain, wahi error middleware hota hai
  //      err → jo error aaya
  //      req → request object
  //      res → response object
  //      next → next middleware
  //      Agar err nahi hota → Express isko error middleware maanega hi nahi

  console.error(err.stack);
  // 👉 Ye:
  // error ka full trace print karta hai
  // bataata hai error:
  // kis file me
  // kis line pe
  // kis function me

  res.status(500).json({ error: "Internal Server Error" });

  // EXAMPLE:
  // app.get("/users", async (req, res, next) => {
  // try {
  //     const users = await db.query("SELECT * FROM users");
  //     res.json(users);
  // } catch (err) {
  //     next(err); // 👈 error yahin bheja
  // }
  // });

  // Agar aapka code me error aata hai, toh Express is error middleware ko call karega
  // Aur yeh middleware error ka stack trace print karega, aur client ko 500 Internal Server Error bhejega
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
