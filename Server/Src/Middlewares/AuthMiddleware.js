const sessionChecker = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.status(401).json({ message: "not authorized, session failed" });
  }
};

module.exports = sessionChecker;
