require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const cors = require("cors");
const mongoose = require("mongoose");

// IMPORT ROUTES
const GSUsersSigninRoutes = require("./Routes/GS_Users_Signin_Routes");
const GSUsersLoginRoutes = require("./Routes/GS_Users_Login_Routes");

// PORT NUMBER
const PORT = process.env.PORT || 8080;
// PATH
const path = require("path");

// server middleware
app.use(cors());
app.use(express.json());

// --------------------------- CONNECT TO MONGGODB ----------------------
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => console.log("connected to mongodb"));

// ----------------------------- ROUTES -----------------------------------
app.use("/GSUserSignin", GSUsersSigninRoutes);
app.use("/GSUserLogin", GSUsersLoginRoutes);

// -------------------------------- DEPLOYMENT ------------------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Running");
  });
}

// -------------------------------- SOCKET IO ---------------------------
io.on("connection", (socket) => {
  // APPLICANTS
  socket.on("applicants", (data) => {
    io.emit("getApplicants", data);
  });
});

// --------------------------- LISTEN TO PORT ----------------------------
http.listen(PORT, () => console.log(`running on port ${PORT}`));
