# TimeBox Extension Tests

This folder contains automated tests for the TimeBox browser extension.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run all tests:
   ```bash
   npm test
   ```

3. Run specific test file:
   ```bash
   npx jest form-validation.test.js
   ```

## Test Files

- **`form-validation.test.js`** - Example test showing how to test form validation functionality
- **`TESTING_GUIDE.md`** - Comprehensive guide for writing your own tests

## What's Tested

### Current Tests
- ✅ Form validation (empty fields, valid inputs, whitespace handling)

### Future Tests (You can write these!)
- 📝 Form data functions (`getFormValues`, `saveFormData`, `loadFormData`)
- 📝 View management (`ViewSelector`)
- 📝 Data storage operations (chrome storage interactions)
- 📝 Error handling and edge cases
- 📝 Integration tests (complete user flows)

## Testing Pattern

Each test follows the AAA pattern:
- **Arrange**: Set up test conditions
- **Act**: Execute the function being tested  
- **Assert**: Verify the results

## Mock Setup

Tests include mocks for:
- Chrome storage APIs (local and session)
- DOM elements and browser environment

## Next Steps

1. Study the example test in `form-validation.test.js`
2. Read the `TESTING_GUIDE.md` for detailed instructions
3. Export your functions from `main.js` for testing
4. Write your own tests following the established pattern

## Running Tests

- **Normal mode**: `npm test` (runs all tests once)
- **Watch mode**: `npx jest --watch` (auto-reruns on file changes)
- **Coverage**: `npx jest --coverage` (shows test coverage report)

Good luck and happy testing! 🚀