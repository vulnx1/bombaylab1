import { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form@7.55.0';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { Upload, CheckCircle2, Send, FileCheck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  organization: string;
  department: string;
  requirements: string;
  file: FileList;
  captcha: boolean;
}

export function SubmitSamplePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>();

  const department = watch('department');
  const captcha = watch('captcha');

  const onSubmit = (data: FormData) => {
    if (!captcha) {
      toast.error('Please complete the CAPTCHA verification');
      return;
    }

    if (data.file && data.file[0] && data.file[0].size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    console.log('Form Data:', data);
    setIsSubmitted(true);
    toast.success('Sample submission received! We will contact you soon.');
    reset();
    setFileName('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        e.target.value = '';
        setFileName('');
        return;
      }
      setFileName(file.name);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen" style={{ backgroundColor: '#718096' }}>
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-2xl shadow-2xl"
              style={{ backgroundColor: '#E2E8F0' }}
            >
              <CheckCircle2 className="w-24 h-24 mx-auto mb-6" style={{ color: '#10B981' }} />
              <h2 className="text-4xl sm:text-5xl mb-4 font-poppins" style={{ color: '#2C5282' }}>
                Thank You!
              </h2>
              <p className="text-lg mb-6" style={{ color: '#212529' }}>
                Your sample submission has been received successfully. Our expert team will review your request and contact you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  style={{ backgroundColor: '#4B7BE5' }}
                  className="text-white hover:opacity-90"
                  size="lg"
                >
                  Submit Another Sample
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20" style={{ backgroundColor: '#718096' }}>
      {/* Hero Banner */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1691935152210-35ae500d91d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpc3QlMjBtZXRhbCUyMHRlc3Rpbmd8ZW58MXx8fHwxNzYxNjU3NDYxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Sample Testing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FileCheck className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-white" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 font-poppins text-white">
              Submit Your Sample
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto">
              Fast, accurate, and reliable testing services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12" style={{ backgroundColor: '#E2E8F0' }}>
              <div className="text-center mb-8">
                <Send className="w-12 h-12 mx-auto mb-4" style={{ color: '#4B7BE5' }} />
                <h2 className="text-3xl sm:text-4xl mb-4 font-poppins" style={{ color: '#2C5282' }}>
                  Request Testing Services
                </h2>
                <p className="text-base sm:text-lg" style={{ color: '#212529' }}>
                  Fill out the form below with your sample details
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" style={{ color: '#2C5282' }}>
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      {...register('fullName', { required: 'Full name is required' })}
                      className="mt-2 bg-white border-gray-300"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" style={{ color: '#2C5282' }}>
                      Email ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="mt-2 bg-white border-gray-300"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Mobile Number */}
                  <div>
                    <Label htmlFor="mobile" style={{ color: '#2C5282' }}>
                      Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      {...register('mobile', {
                        required: 'Mobile number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Please enter a valid 10-digit mobile number',
                        },
                      })}
                      className="mt-2 bg-white border-gray-300"
                      placeholder="10-digit mobile number"
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                    )}
                  </div>

                  {/* Organization */}
                  <div>
                    <Label htmlFor="organization" style={{ color: '#2C5282' }}>
                      Organization <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="organization"
                      {...register('organization', { required: 'Organization is required' })}
                      className="mt-2 bg-white border-gray-300"
                      placeholder="Your company or institution name"
                    />
                    {errors.organization && (
                      <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
                    )}
                  </div>
                </div>

                {/* Department */}
                <div>
                  <Label htmlFor="department" style={{ color: '#2C5282' }}>
                    Testing Department <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => setValue('department', value)}
                    value={department}
                  >
                    <SelectTrigger className="mt-2 bg-white border-gray-300">
                      <SelectValue placeholder="Select testing department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metals">Metals Testing</SelectItem>
                      <SelectItem value="minerals">Minerals & Ores Testing</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">Please select a department</p>
                  )}
                </div>

                {/* Requirements */}
                <div>
                  <Label htmlFor="requirements" style={{ color: '#2C5282' }}>
                    Testing Requirements <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="requirements"
                    {...register('requirements', {
                      required: 'Please describe your requirements',
                    })}
                    className="mt-2 bg-white border-gray-300 min-h-32"
                    placeholder="Describe your testing requirements, sample details, and any specific analysis needed..."
                  />
                  {errors.requirements && (
                    <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <Label htmlFor="file" style={{ color: '#2C5282' }}>
                    Upload Supporting Documents (Max 10MB) <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <label
                      htmlFor="file"
                      className="flex items-center justify-center w-full px-4 py-8 bg-white border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 group"
                      style={{ borderColor: '#4B7BE5' }}
                    >
                      <div className="text-center">
                        <Upload className="mx-auto mb-3 group-hover:scale-110 transition-transform" style={{ color: '#4B7BE5', width: 40, height: 40 }} />
                        <p className="mb-2" style={{ color: '#212529' }}>
                          {fileName || 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, DOC, DOCX, or images (max 10MB)
                        </p>
                      </div>
                    </label>
                    <input
                      id="file"
                      type="file"
                      {...register('file', { required: 'Please upload a file' })}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
                  {errors.file && (
                    <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
                  )}
                </div>

                {/* CAPTCHA */}
                <div className="flex items-start space-x-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(75, 123, 229, 0.1)' }}>
                  <Checkbox
                    id="captcha"
                    checked={captcha}
                    onCheckedChange={(checked) => setValue('captcha', checked as boolean)}
                  />
                  <div>
                    <Label
                      htmlFor="captcha"
                      className="cursor-pointer"
                      style={{ color: '#2C5282' }}
                    >
                      I'm not a robot <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">Verify you are human to proceed</p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full text-white hover:opacity-90 transition-opacity text-lg py-7"
                  style={{ backgroundColor: '#4B7BE5' }}
                >
                  <Send className="mr-2" />
                  Submit Sample Request
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
