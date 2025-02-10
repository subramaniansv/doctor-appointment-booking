import jwt from 'jsonwebtoken';

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // Look for token in Authorization header
        const token = req.headers['authorization']?.split(' ')[1];
        console.log('Token:', token);  // Check if token is extracted

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default authAdmin;
