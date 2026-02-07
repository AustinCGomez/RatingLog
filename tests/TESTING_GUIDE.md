# TimeBox Extension Testing Guide

## How to Run Tests

### 1. Install Dependencies (if not already done)
```bash
cd tests
npm install
```

### 2. Run All Tests
```bash
cd tests
npm test
```

### 3. Run Specific Test File
```bash
cd tests
npx jest form-validation.test.js
```

### 4. Run Tests in Watch Mode (auto-reruns on file changes)
```bash
cd tests
npx jest --watch
```

## Test Structure Explanation

### Basic Test Pattern
```javascript
test('descriptive test name', () => {
  // Arrange: Set up the test conditions
  // Act: Execute the function being tested
  // Assert: Verify the results
});
```

### Test Groups (describe blocks)
```javascript
describe('Feature being tested', () => {
  test('specific scenario', () => {
    // test implementation
  });
});
```

## How to Test Your Other Functions

### 1. Export Functions from main.js
First, you need to make your functions available for testing. Add this to the end of `src/main.js`:

```javascript
// Export functions for testing (only runs in test environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getFormValues,
    saveFormData,
    loadFormData,
    clearTempFormData,
    ViewSelector,
    validateTime,
    NewEntry,
    ResetField
  };
}
```

### 2. Import Functions in Test File
```javascript
// At the top of your test file
const {
  getFormValues,
  saveFormData,
  loadFormData,
  // ... other functions
} = require('../src/main.js');
```

### 3. Test Example for getFormValues()
```javascript
describe('getFormValues() Tests', () => {
  test('should return empty object when form is empty', () => {
    // Arrange
    document.getElementById('StartTime').value = '';
    document.getElementById('EndTime').value = '';
    document.getElementById('Date').value = '';
    document.getElementById('TasksCompleted').value = '';
    
    // Act
    const result = getFormValues();
    
    // Assert
    expect(result).toEqual({
      start: '',
      end: '',
      date: '',
      description: ''
    });
  });

  test('should return form values when form is filled', () => {
    // Arrange
    document.getElementById('StartTime').value = '09:00';
    document.getElementById('EndTime').value = '17:00';
    document.getElementById('Date').value = '2026-02-07';
    document.getElementById('TasksCompleted').value = 'Test task';
    
    // Act
    const result = getFormValues();
    
    // Assert
    expect(result).toEqual({
      start: '09:00',
      end: '17:00',
      date: '2026-02-07',
      description: 'Test task'
    });
  });
});
```

## Testing Chrome Storage Functions

### Mock Chrome Storage (already included in example)
```javascript
global.chrome = {
  storage: {
    local: {
      data: {},
      get: function(key, callback) {
        callback({ [key]: this.data[key] || [] });
      },
      set: function(data, callback) {
        Object.assign(this.data, data);
        callback();
      }
    },
    session: {
      data: {},
      get: function(key, callback) {
        callback({ [key]: this.data[key] });
      },
      set: function(data, callback) {
        Object.assign(this.data, data);
        callback();
      },
      remove: function(key, callback) {
        delete this.data[key];
        callback();
      }
    }
  }
};
```

### Test Example for saveFormData()
```javascript
describe('saveFormData() Tests', () => {
  test('should save form data to chrome storage session', () => {
    // Arrange
    const mockSet = jest.fn();
    chrome.storage.session.set = mockSet;
    
    // Fill form with test data
    document.getElementById('StartTime').value = '09:00';
    document.getElementById('EndTime').value = '17:00';
    document.getElementById('Date').value = '2026-02-07';
    document.getElementById('TasksCompleted').value = 'Test task';
    
    // Act
    saveFormData();
    
    // Assert
    expect(mockSet).toHaveBeenCalledWith({
      tempFormData: {
        start: '09:00',
        end: '17:00',
        date: '2026-02-07',
        description: 'Test task'
      }
    }, expect.any(Function));
  });
});
```

## Common Jest Matchers

### Basic Assertions
```javascript
expect(value).toBe(expected);           // Strict equality (===)
expect(value).toEqual(expected);        // Deep equality for objects/arrays
expect(value).toBeTruthy();             // Truthy value
expect(value).toBeFalsy();              // Falsy value
expect(value).toBeNull();               // Null value
expect(value).toBeUndefined();          // Undefined value
```

### String Assertions
```javascript
expect(string).toContain(substring);    // Contains substring
expect(string).toMatch(pattern);        // Matches regex
expect(string).toBe(expected);          // Exact match
```

### Array/Object Assertions
```javascript
expect(array).toHaveLength(length);     // Array length
expect(array).toContain(item);          // Contains item
expect(object).toHaveProperty(key);     // Has property
expect(object).toEqual(expected);       // Deep equality
```

### Function Assertions
```javascript
expect(fn).toHaveBeenCalled();          // Function was called
expect(fn).toHaveBeenCalledWith(args);    // Called with specific args
expect(fn).toHaveBeenCalledTimes(count); // Called specific number of times
```

## Testing Best Practices

### 1. Test Naming
- Use descriptive names that explain what the test does
- Follow pattern: "should [expected behavior] when [condition]"
- Example: "should show error when StartTime is empty"

### 2. Test Structure (AAA Pattern)
- **Arrange**: Set up test conditions and inputs
- **Act**: Execute the function being tested
- **Assert**: Verify the results are correct

### 3. Test Independence
- Each test should run independently
- Don't rely on state from other tests
- Clean up after each test if needed

### 4. Test Coverage
- Test happy path (normal operation)
- Test error conditions
- Test edge cases (empty, null, extreme values)

## Next Steps for You

1. **Run the example test**: `cd tests && npm test form-validation.test.js`
2. **Study the pattern**: Understand how mocks, DOM setup, and assertions work
3. **Export your functions**: Add module.exports to main.js
4. **Write your own tests**: Start with simple functions like getFormValues()
5. **Expand coverage**: Add tests for storage functions, view management, etc.

## Troubleshooting

### "module not found" errors
- Make sure paths are correct in require() statements
- Check that files exist in expected locations

### "chrome is not defined" errors
- Make sure chrome mock is included at top of test file
- Check that global.chrome is set before tests run

### DOM element errors
- Make sure document.body.innerHTML is set before tests
- Check that element IDs match between test and actual code

Good luck with your testing! Start simple and build up complexity as you get more comfortable.