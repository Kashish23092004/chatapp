import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWTSECRET, { expiresIn: "10d" });
  
  res.cookie("just", token, {
    httpOnly: true,
    secure: false,  // Changed to false for localhost
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 24 * 60 * 60 * 1000
  });
  
  console.log("🍪 Cookie created successfully");
  return token;
};

export default createTokenAndSaveCookie;