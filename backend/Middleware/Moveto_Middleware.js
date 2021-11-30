const movetoMiddleware = (req, res, next) => {
  const { reason } = req.body;

  const error = { isError: true, errorMessage: "" };

  if (!reason) {
    error.errorMessage = "Please provide a reason";
    res.json(error);
    return;
  }

  next();
};

module.exports = { movetoMiddleware };
