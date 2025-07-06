'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { QRCodeSVG } from 'qrcode.react';
import { Download, User, Mail, Phone, Building, Globe, Linkedin, Instagram, Facebook, QrCode, Sparkles, Star } from 'lucide-react';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  workEmail?: string;
  workPhone?: string;
  website?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

export default function Home() {
  const [qrValue, setQrValue] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const generateVCard = (data: ContactFormData): string => {
    let vcard = 'BEGIN:VCARD\n';
    vcard += 'VERSION:3.0\n';
    vcard += `FN:${data.firstName} ${data.lastName}\n`;
    vcard += `N:${data.lastName};${data.firstName};;;\n`;
    
    if (data.email) {
      vcard += `EMAIL:${data.email}\n`;
    }
    
    if (data.phone) {
      vcard += `TEL:${data.phone}\n`;
    }
    
    if (data.company) {
      vcard += `ORG:${data.company}\n`;
    }
    
    if (data.position) {
      vcard += `TITLE:${data.position}\n`;
    }
    
    if (data.workEmail) {
      vcard += `EMAIL;TYPE=WORK:${data.workEmail}\n`;
    }
    
    if (data.workPhone) {
      vcard += `TEL;TYPE=WORK:${data.workPhone}\n`;
    }
    
    if (data.website) {
      vcard += `URL:${data.website}\n`;
    }
    
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
        const svg = qrRef.current.querySelector('svg');
        if (svg) {
          const svgData = new XMLSerializer().serializeToString(svg);
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          canvas.width = 512;
          canvas.height = 512;
          
          img.onload = () => {
            if (ctx) {
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              
              const link = document.createElement('a');
              link.download = 'contact-qr-code.png';
              link.href = canvas.toDataURL();
              link.click();
            }
          };
          
          img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <QrCode className="w-16 h-16 text-blue-600 mr-4" />
              <Star className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-2">Contact QR Generator</h1>
              <div className="flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-500 mr-2" />
                <span className="text-lg text-purple-600 font-medium">Professional • Modern • Instant</span>
                <Sparkles className="w-6 h-6 text-purple-500 ml-2" />
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your contact information into beautiful, scannable QR codes. 
            <span className="text-blue-600 font-semibold">Share your details instantly</span> with anyone, anywhere!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Contact Information</h2>
                <p className="text-gray-500">Fill in your details below</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      First Name *
                    </label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm font-medium">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Last Name *
                    </label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm font-medium">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-500" />
                      Personal Email
                    </label>
                    <input
                      {...register('email', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm font-medium">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-500" />
                      Personal Phone
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-3 text-blue-600" />
                  Professional Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Company
                    </label>
                    <input
                      {...register('company')}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                      placeholder="Acme Corporation"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Position
                    </label>
                    <input
                      {...register('position')}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Work Email
                    </label>
                    <input
                      {...register('workEmail', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                      placeholder="john@company.com"
                    />
                    {errors.workEmail && (
                      <p className="text-red-500 text-sm font-medium">{errors.workEmail.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Work Phone
                    </label>
                    <input
                      {...register('workPhone')}
                      type="tel"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                      placeholder="+1 (555) 987-6543"
                    />
                  </div>
                </div>
              </div>

              {/* Online Presence */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-purple-600" />
                  Online Presence
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-purple-500" />
                      Website
                    </label>
                    <input
                      {...register('website')}
                      type="url"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg"
                      placeholder="https://www.example.com"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center">
                        <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                        LinkedIn
                      </label>
                      <input
                        {...register('linkedin')}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg"
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center">
                        <Instagram className="w-4 h-4 mr-2 text-pink-500" />
                        Instagram
                      </label>
                      <input
                        {...register('instagram')}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg"
                        placeholder="@johndoe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center">
                        <Facebook className="w-4 h-4 mr-2 text-blue-700" />
                        Facebook
                      </label>
                      <input
                        {...register('facebook')}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg"
                        placeholder="facebook.com/johndoe"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center"
                >
                  <QrCode className="w-6 h-6 mr-3" />
                  Generate QR Code
                </button>
                
                <button
                  type="button"
                  onClick={clearForm}
                  className="bg-gray-200 text-gray-700 py-5 px-8 rounded-2xl font-bold text-lg hover:bg-gray-300 transition-all duration-200 shadow-lg"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* QR Code Preview */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <QrCode className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">QR Code Preview</h2>
                <p className="text-gray-500">Your scannable contact card</p>
              </div>
            </div>
            
            {showPreview && qrValue ? (
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-inner mb-8 border-2 border-gray-100" ref={qrRef}>
                  <QRCodeSVG
                    value={qrValue}
                    size={320}
                    level="M"
                    includeMargin={true}
                    className="mx-auto drop-shadow-lg"
                  />
                </div>
                
                <button
                  onClick={downloadQR}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center mb-6"
                >
                  <Download className="w-6 h-6 mr-3" />
                  Download QR Code
                </button>
                
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">📱 How to use:</h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    Scan this QR code with any smartphone camera or QR reader app to instantly save the contact information to your device!
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <QrCode size={64} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">Ready to Generate!</h3>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Fill out the form and click <span className="font-semibold text-blue-600">&quot;Generate QR Code&quot;</span> to create your personalized contact QR code
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-600 border-t border-gray-200 pt-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-purple-500 mr-3" />
            <p className="text-xl font-semibold">
              Created with ❤️ by <span className="text-gray-800 font-bold">Santosh Baral</span>
            </p>
            <Sparkles className="w-6 h-6 text-purple-500 ml-3" />
          </div>
          <p className="text-lg">
            Powered by{' '}
            <a
              href="https://techzeninc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 underline decoration-2 underline-offset-4"
            >
              Techzen Corporation Pvt. Ltd.
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}