import { z } from 'zod';
import dayjs from 'dayjs';
import Sample from '../models/Sample.js';
import { generatePdf } from '../services/pdfService.js';
import { sendOwnerEmail, sendAckEmail } from '../services/emailService.js';

const SampleSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal('')),
  message: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  extra: z.record(z.any()).optional(),
});

export async function createSample(req, res, next) {
  try {
    const parsed = SampleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() });
    }

    const sample = await Sample.create(parsed.data);

    // Generate PDF
    const pdfFilename = `sample-${dayjs().format('YYYYMMDD-HHmmss')}-${sample._id}.pdf`;
    const pdfPath = await generatePdf(sample, pdfFilename);

    sample.pdfPath = pdfPath;
    await sample.save();

    // Send email to owner with PDF attached
    await sendOwnerEmail(sample, pdfPath);

    // Optional acknowledgment email to submitter
    if (String(process.env.SEND_ACK).toLowerCase() === 'true') {
      await sendAckEmail(sample);
    }

    return res.status(201).json({ id: sample._id, status: 'ok' });
  } catch (err) {
    return next(err);
  }
}
