import jwt from "jsonwebtoken";

require("dotenv").config();

// Used to verify a given JWT, returning either required, invalid or the users ID
export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(422).json({ errors: [{ token: "required" }] });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ errors: [{ token: "invalid" }] });
    }

    req.user = {};
    req.params.user = decoded.id;
    next();
  });
}
