
# Timebox

A simple and accurate time tracking Chrome extension designed for freelancers to keep track of their working hours.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) 
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?style=for-the-badge&logo=google-chrome)

## Features

- ⏰ **Time Tracking**: Log start and end times with descriptions
- 📅 **Date Management**: Track hours across different dates
- 💾 **Local Storage**: All data stored locally in your browser
- 🗂️ **History View**: View all logged time entries
- ⚙️ **Settings**: Manage your time tracking data
- 🧪 **Tested**: Comprehensive test coverage for reliability

## Quick Start

### For Users

1. **Download the extension** from the [Chrome Web Store](https://chrome.google.com/webstore) (coming soon)
2. **Or install manually**:
   - Download the latest release from the [Releases](https://github.com/AustinCGomez/Timebox/releases) page
   - Extract the ZIP file
   - Open Chrome and go to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extracted folder

### For Developers

```bash
# Clone the repository
git clone https://github.com/AustinCGomez/Timebox.git
cd Timebox

# Install dependencies
npm install

# Run tests
npm test

# Build for development
npm run dev

# Build for production
npm run build
```

Load the `dist` folder as an unpacked extension in Chrome for development.

## Development

### Project Structure

```
timebox/
├── src/
│   ├── components/     # UI components and views
│   │   ├── ViewManager.js
│   │   └── TimeEntryForm.js
│   ├── utils/          # Utility functions
│   │   ├── storage.js
│   │   └── validator.js
│   └── types/          # Constants and type definitions
│       └── constants.js
├── __tests__/          # Test files
├── dist/              # Build output
└── public/            # Static assets (HTML, CSS, images)
```

### Available Scripts

- `npm run dev` - Build and prepare for development
- `npm run build` - Build for production
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run validate` - Run both linting and tests

### Technology Stack

- **Vanilla JavaScript** (ES6+ modules)
- **Chrome Extension Manifest V3**
- **Jest** for testing
- **ESLint** for code quality

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Development setup
- Code style guidelines
- Submitting pull requests
- Reporting issues

## Installation for Development

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Google Chrome

### Steps

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/Timebox.git
   cd Timebox
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the development build**:
   ```bash
   npm run dev
   ```

5. **Load in Chrome**:
   - Open Chrome → `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" → select `dist` folder

## Browser Support

- ✅ Google Chrome (Manifest V3)
- 🔄 Microsoft Edge (coming soon)
- 🔄 Firefox (planned)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Issues and Support

Found a bug? Have a suggestion? Please:

1. Check existing [Issues](https://github.com/AustinCGomez/Timebox/issues)
2. If no duplicate exists, create a new issue with:
   - **Issue description**
   - **Steps to reproduce**
   - **Expected vs actual behavior**
   - **Browser/OS version**
   - **Screenshots (optional but helpful)**

## Roadmap

- [ ] Chrome Web Store release
- [ ] Microsoft Edge support
- [ ] Firefox support
- [ ] Data export/import
- [ ] Time analytics dashboard
- [ ] Project-based time tracking

## Acknowledgments

Thanks to all contributors who help make Timebox better for freelancers everywhere!
