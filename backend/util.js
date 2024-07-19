import jwt from "jsonwebtoken";

// Function to generate a JWT token
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
};

// Middleware to verify a JWT token
export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, decoded) => {
            if (err) return res.sendStatus(401);
            
            req.user = decoded; // Assuming your decoded JWT payload contains user information
            next();
        });
    } catch (error) {
        console.error("JWT verification error (catch block):", error.message);
        res.status(400).json({ message: "Invalid token." });
    }
};
