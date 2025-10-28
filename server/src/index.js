import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import './config/mongoose.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/error.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security & parsers
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin, credentials: true }));

// Logging
app.use(morgan('dev'));

// Rate limit (general)
const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

// Static for PDFs (optional, admin routes also allow streaming)
app.use('/static/pdfs', express.static(path.join(__dirname, '..', 'storage', 'pdfs')));

// Routes
app.use('/api', routes);

// 404 and error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
