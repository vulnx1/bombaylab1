import mongoose from 'mongoose';

const SampleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    message: { type: String, trim: true },
    address: { type: String, trim: true },
    extra: { type: Object },
    pdfPath: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Sample', SampleSchema);
