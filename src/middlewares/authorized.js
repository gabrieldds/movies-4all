function isAuthorized(...allRoles) {
  return (req, res, next) => {
    const { role } = req.locals;
    if (!role) return res.status(403).send({ message: "user has no role." });

    if (allRoles.includes(role)) {
      return next();
    }

    return res.status(403).send();
  };
}

module.exports = isAuthorized;
