const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const AuthRoutes = require("../Src/Routes/AuthRoutes");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
mongoose.connect(process.env.DB_URL + "hubx");
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
  });
});

const store = new MongoDBSession({
  uri: process.env.DB_URL + "hubx",
  collection: "sessions",
});

const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours
app.use(
  session({
    name: process.env.COOKIE_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
    },
  })
);

app.use("", AuthRoutes);
