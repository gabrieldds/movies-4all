const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ message: "Unauthorized" });

  if (!authorization.startsWith("Bearer"))
    return res.status(401).send({ message: "Unauthorized" });

  const bearer = authorization.split(" ");
  if (bearer.length !== 2)
    return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(bearer[1], secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    const { role } = decoded;
    req.locals = { role, ...req.locals };
    return next();
  });
}

module.exports = isAuthenticated;
