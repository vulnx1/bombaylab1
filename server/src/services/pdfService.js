import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pdfDir = path.join(__dirname, '..', '..', 'storage', 'pdfs');

function ensureDir() {
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
}

export async function generatePdf(sample, filename) {
  ensureDir();
  const filePath = path.join(pdfDir, filename);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(20).text('Sample Submission', { align: 'center' }).moveDown();

    const fields = [
      ['Name', sample.name],
      ['Email', sample.email],
      ['Phone', sample.phone || '-'],
      ['Address', sample.address || '-'],
      ['Message', sample.message || '-'],
    ];

    doc.fontSize(12);
    fields.forEach(([label, value]) => {
      doc.text(`${label}: ${value}`);
    });

    if (sample.extra && typeof sample.extra === 'object') {
      doc.moveDown().text('Additional Details:', { underline: true });
      Object.entries(sample.extra).forEach(([k, v]) => {
        doc.text(`${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`);
      });
    }

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
}
