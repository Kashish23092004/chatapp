import jwt from 'jsonwebtoken';
import User from '../Model/User.model.js';

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.just;
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {
      console.log('TOKEN:', token);
      return res.status(401).json({ error: 'Token is not valid' });
    }

    const user = await User.findById(decoded.userId).select('-Password');
    if (!user) {
      return res.status(401).json({ error: 'No user found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('error in secureRoute:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default secureRoute;
