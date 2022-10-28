const firebase = require("../config/firebase");

function authMiddleware(req, res, next) {
  const headerToken = req.headers.authtoken;
  if (!headerToken) {
    return res.send({ message: "No token provided" }).status(401);
  }
  else if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return res.send({ message: "Invalid token" }).status(401);
  }
  const token = headerToken.split(" ")[1];
    firebase
    .auth()
    .verifyIdToken(token)
    .then(() => next())
    .catch(() => res.send({ message: "Could not authorize" }).status(403));
}

module.exports = authMiddleware;