const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = async (req, res, next) => {
  const { key } = req.headers;
  try {
    const verify_token = await jwt.verify(key, process.env.JWT_SECRET_KEY);
    req.user = { id: verify_token.id };
    next();
  } catch (error) {
    if (error.message === "jwt malformed") {
      res.json("Invalid user token");
      return;
    }
    res.json("Invalid user token");
  }
};

module.exports = { verifyTokenMiddleware };
