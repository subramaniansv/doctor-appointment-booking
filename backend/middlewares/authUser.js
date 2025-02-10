import jwt from 'jsonwebtoken';

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
        
        const token = req.headers['token'];
        console.log('backend'+req.headers);


        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId =token_decoded.id
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default authUser;
