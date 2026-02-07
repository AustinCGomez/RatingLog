# Contributing to Timebox

Thank you for your interest in contributing to Timebox! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/timebox.git
   cd timebox
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run tests:
   ```bash
   npm test
   ```

5. Build the extension:
   ```bash
   npm run dev
   ```

6. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## Development Workflow

### Branching
- Use descriptive branch names: `feature/feature-name`, `fix/bug-description`
- Keep branches focused on a single feature or fix

### Code Style
- Follow ESLint configuration
- Use ES6+ features when appropriate
- Keep functions small and focused
- Add JSDoc comments for functions and classes

### Testing
- Write tests for new functionality
- Ensure all tests pass before submitting PR
- Use meaningful test names
- Mock external dependencies (Chrome APIs)

### Commit Messages
- Use present tense: "Add feature" not "Added feature"
- Be descriptive but concise
- Reference issue numbers when applicable

## Submitting Changes

1. Update your branch with latest main:
   ```bash
   git pull upstream main
   ```

2. Run tests and linting:
   ```bash
   npm run validate
   ```

3. Commit your changes with a descriptive message

4. Push to your fork and create a pull request

5. Fill out the PR template completely

## Issue Reporting

When reporting issues, please include:
- Chrome version and OS
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Console errors (if any)

## Project Structure

```
timebox/
├── src/
│   ├── components/     # UI components
│   ├── utils/          # Utility functions
│   └── types/          # Constants and types
├── __tests__/          # Test files
├── dist/              # Build output
└── public/            # Static assets
```

## Code of Conduct

Please be respectful and professional in all interactions. Harassment, discriminatory language, or other inappropriate behavior will not be tolerated.

## Questions?

Feel free to open an issue for questions or join our discussions.