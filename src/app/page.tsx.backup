'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, User, Mail, Phone, Building, Globe, Instagram, Facebook, Linkedin, Trash2 } from 'lucide-react';
import html2canvas from 'html2canvas';

// Validation schema
const contactSchema = z.object({
  title: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  position: z.string().optional(),
  company: z.string().optional(),
  workEmail: z.string().email('Invalid email format').optional().or(z.literal('')),
  workPhone: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactQRGenerator() {
  const [qrValue, setQrValue] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const generateVCard = (data: ContactFormData): string => {
    let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
    
    // Name
    const fullName = `${data.firstName} ${data.lastName}`;
    vcard += `FN:${data.title ? data.title + ' ' : ''}${fullName}\n`;
    vcard += `N:${data.lastName};${data.firstName}${data.title ? ';' + data.title : ''};;\n`;
    
    // Organization
    if (data.company) {
      vcard += `ORG:${data.company}\n`;
    }
    
    // Title/Position
    if (data.position) {
      vcard += `TITLE:${data.position}\n`;
    }
    
    // Work Email
    if (data.workEmail) {
      vcard += `EMAIL;TYPE=WORK:${data.workEmail}\n`;
    }
    
    // Work Phone
    if (data.workPhone) {
      vcard += `TEL;TYPE=WORK:${data.workPhone}\n`;
    }
    
    // Website
    if (data.website) {
      vcard += `URL:${data.website}\n`;
    }
    
    // Social Media
    if (data.linkedin) {
      vcard += `URL;TYPE=LinkedIn:${data.linkedin}\n`;
    }
    
    if (data.instagram) {
      vcard += `URL;TYPE=Instagram:${data.instagram}\n`;
    }
    
    if (data.facebook) {
      vcard += `URL;TYPE=Facebook:${data.facebook}\n`;
    }
    
    vcard += 'END:VCARD';
    return vcard;
  };

  const onSubmit = (data: ContactFormData) => {
    const vcard = generateVCard(data);
    setQrValue(vcard);
    setShowPreview(true);
  };

  const downloadQR = async () => {
    if (qrRef.current) {
      try {
        const canvas = await html2canvas(qrRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
        });
        
        const link = document.createElement('a');
        link.download = 'contact-qr-code.png';
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error downloading QR code:', error);
      }
    }
  };

  const clearForm = () => {
    reset();
    setQrValue('');
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact QR Generator</h1>
          <p className="text-gray-600">Create a scannable QR code for your contact information</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <User className="mr-2" size={24} />
              Contact Information
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <select
                    {...register('title')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    {...register('firstName')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Building className="mr-1" size={16} />
                    Position
                  </label>
                  <input
                    type="text"
                    {...register('position')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Software Engineer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    {...register('company')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tech Company Inc."
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Mail className="mr-1" size={16} />
                    Work Email
                  </label>
                  <input
                    type="email"
                    {...register('workEmail')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@company.com"
                  />
                  {errors.workEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.workEmail.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Phone className="mr-1" size={16} />
                    Work Phone
                  </label>
                  <input
                    type="tel"
                    {...register('workPhone')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Social Media & Website</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Globe className="mr-1" size={16} />
                      Website
                    </label>
                    <input
                      type="url"
                      {...register('website')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Linkedin className="mr-1" size={16} />
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      {...register('linkedin')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Instagram className="mr-1" size={16} />
                      Instagram
                    </label>
                    <input
                      type="url"
                      {...register('instagram')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Facebook className="mr-1" size={16} />
                      Facebook
                    </label>
                    <input
                      type="url"
                      {...register('facebook')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://facebook.com/username"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                >
                  Generate QR Code
                </button>
                
                <button
                  type="button"
                  onClick={clearForm}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
                >
                  <Trash2 size={18} className="mr-2" />
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* QR Code Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">QR Code</h2>
            
            {showPreview && qrValue ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div ref={qrRef} className="bg-white p-4 rounded-lg shadow-sm">
                    <QRCodeCanvas
                      value={qrValue}
                      size={256}
                      level="M"
                      includeMargin={true}
                      className="border border-gray-200 rounded"
                    />
                  </div>
                </div>
                
                <button
                  onClick={downloadQR}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition duration-200 font-medium flex items-center justify-center"
                >
                  <Download size={18} className="mr-2" />
                  Download QR Code
                </button>
                
                {/* vCard Preview */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">vCard Preview:</h3>
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap break-all">
                    {qrValue}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">Fill out the form and click &quot;Generate QR Code&quot; to see your QR code here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p className="mb-2">
            Created by <span className="font-medium">Santosh Baral</span>
          </p>
          <p>
            Powered by{' '}
            <a
              href="https://techzeninc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Techzen Corporation Pvt. Ltd.
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
