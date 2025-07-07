# Contact QR Generator

A modern, professional Contact QR Code Generator built with Next.js 15, React Hook Form, and Tailwind CSS. Transform your contact information into beautiful, scannable QR codes instantly.

## Features

- **Professional Design**: Clean, modern UI with gradient styling
- **Comprehensive Contact Fields**: Support for personal and professional details
- **Social Media Integration**: LinkedIn, Instagram, Facebook links
- **QR Code Generation**: High-quality QR codes with vCard format
- **Download Functionality**: Export QR codes as PNG images
- **Responsive Design**: Works perfectly on desktop and mobile
- **Form Validation**: Built-in validation with React Hook Form
- **TypeScript Support**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form
- **QR Code Generation**: qrcode.react
- **Icons**: Lucide React
- **Font**: Poppins (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/contact-qr-generator.git
cd contact-qr-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Personal Details**: Fill in your title, first name, and last name
2. **Professional Details**: Add your position, company, work email, work phone, and website
3. **Online Presence**: Include your social media profiles (LinkedIn, Instagram, Facebook)
4. **Generate QR Code**: Click the "Generate QR Code" button to create your QR code
5. **Download**: Use the download button to save your QR code as a PNG image

## Project Structure

```
contact-qr-app/
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/contact-qr-generator)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**Santosh Baral**
- Company: [Techzen Corporation Pvt. Ltd.](https://techzeninc.com)

## Acknowledgments

- Built with Next.js and modern React patterns
- Styled with Tailwind CSS for rapid development
- QR code generation powered by qrcode.react
- Icons provided by Lucide React
