# CV Editor

A professional CV/Resume builder and editor with real-time preview and PDF export functionality.

## Features

- 📝 **Real-time editing** - Edit your CV content with instant preview
- 🎨 **Multiple styles** - Choose between professional styled and plain formats
- 📄 **PDF export** - Export your CV as a PDF for printing or sharing
- 💾 **In-browser storage** - Your changes are preserved during your session
- 📱 **Responsive design** - Works on desktop, tablet, and mobile devices
- ⚡ **Fast and lightweight** - Built with modern web technologies

## Live Demo

Visit the live application: [CV Editor](https://yourusername.github.io/cv-editor/)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cv-editor.git
cd cv-editor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to GitHub Pages

1. Update the `base` in `vite.config.js` to match your repository name
2. Run the deployment command:
```bash
npm run deploy
```

This will build the project and deploy it to GitHub Pages.

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **GitHub Pages** - Hosting

## Project Structure

```
cv-editor/
├── public/
├── src/
│   ├── components/
│   │   └── CVEditor.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Usage

1. **Edit Mode**: Click the "Edit" button to modify your CV content
2. **Preview**: Click "Preview" to see how your CV will look
3. **Style Selection**: Choose between "Professional Styled" and "Plain Professional" formats
4. **Export**: Click "Export PDF" to download or print your CV

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.