import jwt from 'jsonwebtoken';

export function requireAdmin(req, res, next) {
  const token = req.cookies?.admin_token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded?.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    req.admin = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
