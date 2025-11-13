import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
   console.log("Headers received:", req.headers);
  try {
const authHeader = req.headers['authorization'] || req.headers['Authorization'];
if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ error: "No token provided" });
}
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "SET"; // make sure this matches your login/signup jwt secret

    const decoded = jwt.verify(token, secret);

    req.user = { id: decoded.id, username: decoded.username };
    next(); // ✅ continue to next route
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
