import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id:userId }, process.env.JWT_SECRETE_KEY, {
    expiresIn: "30d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict",
  }); // 30 days
};

export default generateToken;
