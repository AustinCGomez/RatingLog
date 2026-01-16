// test-extension.js
// Simple test script for Chrome extension - NO FUNCTIONS, just step-by-step code

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Get the current folder path (where your extension files are)
const extensionPath = __dirname;

console.log('Starting tests...\n');

// Check if manifest.json exists in the folder
const manifestPath = path.join(extensionPath, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.log('✗ manifest.json not found');
  process.exit(1); // Stop if no manifest
}
console.log('✓ manifest.json found');

// Start the main test code
(async () => {
  
  // Launch Chrome browser with your extension loaded
  const browser = await puppeteer.launch({
    headless: false, // Show the browser window (set to true to hide it)
    args: [
      `--disable-extensions-except=${extensionPath}`, // Only load our extension
      `--load-extension=${extensionPath}`, // Load the extension
    ]
  });
  console.log('✓ Browser launched with extension');

  // Create a new page/tab in the browser
  const page = await browser.newPage();

  // Go to the Chrome extensions page
  await page.goto('chrome://extensions/');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second for page to load

  // Find the extension ID by looking for "Timebox" in the extension name
  const extensionId = await page.evaluate(() => {
    // Get all installed extensions from the page
    const extensions = document.querySelector('extensions-manager')
      ?.shadowRoot.querySelector('extensions-item-list')
      ?.shadowRoot.querySelectorAll('extensions-item');
    
    // Loop through extensions to find ours
    for (let ext of extensions || []) {
      const name = ext.shadowRoot.querySelector('#name')?.textContent;
      if (name && name.includes('Timebox')) {
        return ext.id; // Return the ID if we found it
      }
    }
    return null; // Return null if not found
  });

  // If extension wasn't found, stop the tests
  if (!extensionId) {
    console.log('✗ Extension not found');
    return;
  }
  console.log('✓ Extension found:', extensionId);

  // Open the extension popup page
  const popupUrl = `chrome-extension://${extensionId}/frontend.html`;
  await page.goto(popupUrl);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for popup to load
  console.log('✓ Extension popup opened');

  // ========================================
  // START OF TESTS - ADD YOUR TESTS HERE
  // ========================================

  console.log('\n--- Test 1: Click Log Hours Button ---');
  // Wait until the "Log Hours" button appears on the page
  await page.waitForSelector('#btn-open-logger', { visible: true });
  // Click the button
  await page.click('#btn-open-logger');
  // Wait half a second for the view to change
  await new Promise(resolve => setTimeout(resolve, 500));
  // Check if the logger view is now visible (not hidden)
  const loggerVisible = await page.evaluate(() => {
    return !document.getElementById('view-logger').classList.contains('hidden');
  });
  // Print result
  if (loggerVisible) {
    console.log('✓ Log Hours button works - view is visible');
  } else {
    console.log('✗ Log Hours button failed - view is still hidden');
  }

  console.log('\n--- Test 2: Fill Out the Form ---');
  // Type into the Start Time field
  await page.type('#StartTime', '13:00');
  // Type into the End Time field
  await page.type('#EndTime', '17:00');
  // Type into the Date field
  await page.type('#Date', '2026-01-15');
  // Type into the Tasks Completed field
  await page.type('#TasksCompleted', 'Built automated tests for TimeBox extension');
  console.log('✓ Form filled with test data');

  console.log('\n--- Test 3: Save the Data ---');
  // Listen for any alerts or dialogs that might appear
  page.on('dialog', async dialog => {
    console.log('  Alert appeared:', dialog.message());
    await dialog.accept(); // Auto-click OK on any alerts
  });
  
  // Click the save button
  await page.click('#btn-save-data');
  console.log('✓ Save button clicked');
  
  // Wait longer for the save operation to complete
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds instead of 1

  console.log('\n--- Test 4: Check if Data Saved to Storage ---');
  // Check Chrome storage to see if the data was actually saved
  const savedData = await page.evaluate(async () => {
    // This runs inside the browser to access Chrome storage
    return new Promise((resolve) => {
      chrome.storage.local.get('tasks', (result) => {
        resolve(result.tasks || []); // Get the tasks array or empty array
      });
    });
  });
  
  // Show ALL saved data for debugging
  console.log('  Total entries in storage:', savedData.length);
  
  // Check if we got any saved data
  if (savedData.length > 0) {
    console.log('✓ Data saved successfully to storage');
    console.log('  Latest entry:', savedData[savedData.length - 1]); // Show the last saved item
    // Show all entries for debugging
    console.log('  All entries:', JSON.stringify(savedData, null, 2));
  } else {
    console.log('✗ No data found in storage');
    console.log('  This could mean:');
    console.log('    - The save button uses a different storage key');
    console.log('    - The save operation needs more time');
    console.log('    - There is a validation error preventing save');
  }

  console.log('\n--- Test 5: Click Settings Button ---');
  try {
    // Check if the settings button exists first
    const settingsButtonExists = await page.$('#btn-open-settings') !== null;
    if (!settingsButtonExists) {
      console.log('✗ Settings button not found - check the button ID');
    } else {
      // Click the settings button
      await page.click('#btn-open-settings');
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 500));
      // Check if settings view is visible
      const settingsVisible = await page.evaluate(() => {
        const viewElement = document.getElementById('view-settings');
        if (!viewElement) return false;
        return !viewElement.classList.contains('hidden');
      });
      if (settingsVisible) {
        console.log('✓ Settings button works - view is visible');
      } else {
        console.log('✗ Settings button failed - view is still hidden');
      }
    }
  } catch (error) {
    console.log('✗ Settings test failed:', error.message);
  }

  // ========================================
  // ADD MORE TESTS HERE
  // ========================================
  // 
  // To add a new test, copy this template:
  //
  // console.log('\n--- Test X: Your Test Name ---');
  // await page.click('#your-button-id'); // Click something
  // await new Promise(resolve => setTimeout(resolve, 500)); // Wait
  // const result = await page.evaluate(() => {
  //   // Check something on the page
  //   return document.getElementById('something').textContent === 'expected';
  // });
  // if (result) {
  //   console.log('✓ Test passed');
  // } else {
  //   console.log('✗ Test failed');
  // }

  // ========================================
  // END OF TESTS
  // ========================================

  console.log('\n===================');
  console.log('All tests completed!');
  console.log('===================');

  // Keep browser open so you can see the results
  // To close automatically, uncomment the line below:
  // await browser.close();

})();