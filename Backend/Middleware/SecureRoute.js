import jwt from 'jsonwebtoken';
import User from '../Model/User.model.js';

const secureRoute = async (req, res, next) => {
  try {
    console.log('🔐 SecureRoute middleware called');
    console.log('🍪 All cookies:', req.cookies);
    
    const token = req.cookies.just;
    
    if (!token) {
      console.log('❌ No token found');
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    console.log('🎫 Token found:', token.substring(0, 20) + '...');

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWTSECRET);
      console.log('✅ Token decoded:', decoded);
    } catch (error) {
      console.log('❌ Token verification failed:', error.message);
      return res.status(401).json({ error: 'Token is not valid' });
    }

    const user = await User.findById(decoded.userId).select('-Password');
    if (!user) {
      console.log('❌ No user found for ID:', decoded.userId);
      return res.status(401).json({ error: 'No user found' });
    }

    console.log('✅ User authenticated:', user.Email);
    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Error in secureRoute:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default secureRoute;