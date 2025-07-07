'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { QRCodeSVG } from 'qrcode.react';
import { Download, User, Mail, Phone, Building, Globe, Linkedin, Instagram, Facebook, QrCode, ChevronDown } from 'lucide-react';

// Add Poppins font
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

interface ContactFormData {
  title: string;
  firstName: string;
  lastName: string;
  position: string;
  company: string;
  workEmail: string;
  workPhone: string;
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
    
    const fullName = data.title ? `${data.title} ${data.firstName} ${data.lastName}` : `${data.firstName} ${data.lastName}`;
    vcard += `FN:${fullName}\n`;
    vcard += `N:${data.lastName};${data.firstName};;;\n`;
    
    if (data.position) {
      vcard += `TITLE:${data.position}\n`;
    }
    
    if (data.company) {
      vcard += `ORG:${data.company}\n`;
    }
    
    if (data.workEmail) {
      vcard += `EMAIL;TYPE=WORK:${data.workEmail}\n`;
    }
    
    if (data.workPhone) {
      vcard += `TEL;TYPE=WORK:${data.workPhone}\n`;
    }
    
    if (data.website) {
      vcard += `URL;TYPE=Website:${data.website}\n`;
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
    <div className="min-h-screen bg-white flex justify-center p-8" style={{fontFamily: 'Poppins, sans-serif'}}>
      <div className="w-4/5 max-w-4xl bg-white rounded-xl shadow-lg p-8 text-center" style={{boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'}}>
        {/* Header */}
        <div className="mb-8">
          <div className="logo mb-4">
            <div className="w-30 h-30 mx-auto mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">TC</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{
            background: 'linear-gradient(45deg, #6a00f4, #ec008c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Contact TZ QR Generator</h1>
          <p className="text-lg text-gray-600 mb-8">
            Create a scannable QR code for your contact information
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold inline-block pb-2 mb-4" style={{
            borderBottom: '2px solid #6a00f4',
            marginBottom: '1rem'
          }}>Personal Details</h3>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2 text-purple-600" />
                Title
              </label>
              <div className="relative">
                <select
                  {...register('title')}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* First Name */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2 text-purple-600" />
                First Name
              </label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            {/* Last Name */}
            <label className="flex items-center text-sm font-medium text-gray-700">
              <User className="w-4 h-4 mr-2 text-purple-600" />
              Last Name
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          
          {/* Professional Details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold inline-block pb-2 mb-4" style={{
              borderBottom: '2px solid #6a00f4',
              marginBottom: '1rem'
            }}>Professional Details</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Position */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Building className="w-4 h-4 mr-2 text-purple-600" />
                Position
              </label>
              <input
                {...register('position')}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
                placeholder="Software Engineer"
              />
              {errors.position && (
                <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>
              )}
            </div>
            
            {/* Company */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Building className="w-4 h-4 mr-2 text-purple-600" />
                Company
              </label>
              <input
                 {...register('company')}
                 className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
                 placeholder="Tech Company Inc."
               />
               {errors.company && (
                 <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
               )}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Work Email */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-purple-600" />
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
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
                placeholder="san@company.com"
              />
              {errors.workEmail && (
                <p className="text-red-500 text-xs mt-1">{errors.workEmail.message}</p>
              )}
            </div>
            
            {/* Work Phone */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-purple-600" />
                Work Phone
              </label>
              <input
                {...register('workPhone')}
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
                placeholder="+977 (01) 123-4567"
              />
              {errors.workPhone && (
                <p className="text-red-500 text-xs mt-1">{errors.workPhone.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            {/* Website */}
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Globe className="w-4 h-4 mr-2 text-purple-600" />
              Website
            </label>
            <input
               type="url"
               {...register('website')}
               className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
               placeholder="https://yourwebsite.com"
             />
          </div>
          
          {/* Online Presence */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold inline-block pb-2 mb-4" style={{
              borderBottom: '2px solid #6a00f4',
              marginBottom: '1rem'
            }}>Social Network</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* LinkedIn */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Linkedin className="w-4 h-4 mr-2 text-purple-600" />
                LinkedIn
              </label>
              <input
                {...register('linkedin')}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            
            {/* Instagram */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Instagram className="w-4 h-4 mr-2 text-purple-600" />
                Instagram
              </label>
              <input
                {...register('instagram')}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            {/* Facebook */}
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Facebook className="w-4 h-4 mr-2 text-purple-600" />
              Facebook
            </label>
            <input
              {...register('facebook')}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
              placeholder="https://facebook.com/username"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 justify-center">
            <button
              type="submit"
              className="text-white border-none py-3 px-6 rounded-lg cursor-pointer"
              style={{
                background: 'linear-gradient(45deg, #6a00f4, #ec008c)'
              }}
            >
              Generate QR Code
            </button>
            
            <button
              type="button"
              onClick={clearForm}
              className="bg-transparent py-3 px-6 rounded-lg cursor-pointer"
              style={{
                border: '2px solid #6a00f4',
                color: '#6a00f4'
              }}
            >
              Clear
            </button>
          </div>
        </form>
        
        {/* QR Code Preview */}
        {showPreview && qrValue ? (
          <div className="mt-8 p-8 rounded-lg text-center" style={{
            border: '2px dashed #6a00f4'
          }}>
            <div className="mb-6" ref={qrRef}>
              <QRCodeSVG
                value={qrValue}
                size={200}
                level="M"
                includeMargin={true}
                className="mx-auto"
              />
            </div>
            
            <button
              onClick={downloadQR}
              className="text-white border-none py-3 px-6 rounded-lg cursor-pointer inline-flex items-center"
              style={{
                background: 'linear-gradient(45deg, #6a00f4, #ec008c)'
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </button>
          </div>
        ) : (
          <div className="mt-8 p-8 rounded-lg text-center" style={{
            border: '2px dashed #6a00f4'
          }}>
            <p className="text-gray-500">Fill out the form and click "Generate QR Code" to see your QR code here</p>
          </div>
        )}
        
        {/* Footer */}
        <footer className="mt-8 text-sm text-gray-500">
          <p className="mb-2">
            Created with ❤️ by TZ
          </p>
          <p>
            Powered by{' '}
            <a
              href="https://techzeninc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800"
            >
              Techzen Corporation Pvt. Ltd.
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}