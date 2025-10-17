const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '10d' }
  );

  res.cookie('just', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
    maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
  });

  return token;
};
export default createTokenAndSaveCookie;
