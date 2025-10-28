import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Sample from '../models/Sample.js';

export async function adminLogin(req, res) {
  const { username, password } = req.body || {};
  const envUser = process.env.ADMIN_USERNAME;
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  if (!envUser || !envHash) {
    return res.status(500).json({ error: 'Admin credentials not configured' });
  }
  if (username !== envUser) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const ok = await bcrypt.compare(password || '', envHash);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ role: 'admin', sub: envUser }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 2 * 60 * 60 * 1000,
  });
  return res.json({ ok: true });
}

export async function listSamples(req, res) {
  const items = await Sample.find().sort({ createdAt: -1 }).lean();
  return res.json({ items });
}

export async function getSample(req, res) {
  const item = await Sample.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ error: 'Not found' });
  return res.json({ item });
}

export async function getSamplePdf(req, res) {
  const item = await Sample.findById(req.params.id).lean();
  if (!item || !item.pdfPath) return res.status(404).json({ error: 'PDF not found' });
  if (!fs.existsSync(item.pdfPath)) return res.status(404).json({ error: 'PDF missing on disk' });
  return res.sendFile(item.pdfPath);
}
