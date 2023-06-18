const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel");
const Image = require("../Models/ImageModel");

// api to register the user
const register = async (req, res) => {
  var { name, email, password } = req.body;
  const user = await User.findOne({ email: email }).exec();
  if (user) {
    res.status(409).json({ message: "User Already Exists" });
  } else {
    // Password Hashing
    const saltRounds = parseInt(process.env.SALT_ROUND || "10");
    password = bcrypt.hashSync(password, saltRounds);

    //Creating User in DB
    const newUser = new User({ name, email, password });
    await newUser.save();
    req.session.user = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    res.status(201).json({
      message: "User Created",
      createdUser: newUser,
      sessionUser: req.session.user,
    });
  }
};

//api to login
const Login = async (req, res) => {
  //   req.session.isAuth = true;
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      console.log(req.session);
      res
        .status(201)
        .json({ message: "login success", sessionUser: req.session.user });
    } else {
      res.status(400).json({ message: "Email and Password doesn't match" });
    }
  } else {
    res.status(409).json({ message: "User not Exists" });
    console.log("User not Exists");
  }
};

//api to logout
const LogOut = async (req, res) => {
  req.session.destroy((err) => {
    res.status(201).json({ message: "Logged out successfully" });
  });
};

const DashBoard = async (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(201).json({ message: "Access", session: req.session });
};

//api for fetch images and view count
const FetchImage = async (req, res) => {
  try {
    await Image.updateMany(
      {
        email: req.body.email,
      },
      {
        $inc: { views: 0.5 },
      },
      {
        multi: true,
      }
    );
    const images = await Image.find({ email: req.body.email });
    return res.status(201).json({ images: images });
  } catch (err) {
    console.log();
    return res.status(500).json({ message: err.message });
  }
};

//api to upload image
const uploadImage = async (req, res) => {
  try {
    const { url, email, title, description } = req.body;
    const image = new Image({ url, email, title, description });
    await image.save();
    res.status(201).json({
      message: "Image Uploaded",
      image: Image,
    });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

module.exports = {
  register,
  Login,
  LogOut,
  DashBoard,
  uploadImage,
  FetchImage,
};
