import jwt from "jsonwebtoken";

export const jwtToken = {
  generateToken({ id, email, roleId }) {
    return jwt.sign({ id, email, roleId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  },
  verifyToken(token) {
    let decoded;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      decoded = user;
    });
    return decoded;
  },
};

