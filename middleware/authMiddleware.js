
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    console.log('Auth Header:', req.headers.authorization);   

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};
