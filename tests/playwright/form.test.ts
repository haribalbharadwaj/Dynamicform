import { test, expect } from '@playwright/test';  // Use Playwright's own expect and test functions
import fs from 'fs';
import path from 'path';

test('should validate form JSON generation and download', async ({ page }) => {
  // Navigate to the form page (replace with your Vite app URL if needed)
  await page.goto('http://localhost:5173/');

  // Fill out the form fields (ensure the input names match your form's structure)
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');

  // Listen for the download event
  const [download] = await Promise.all([
    page.waitForEvent('download'), // Wait for the download event
    page.click('button[type="submit"]') // Trigger the form submission
  ]);

  // Capture the download path (Playwright handles file downloads)
  const downloadPath = await download.path();
  console.log(`Downloaded file path: ${downloadPath}`);

  // Read the content of the downloaded JSON file
  const jsonContent = fs.readFileSync(downloadPath, 'utf-8');
  const parsedJSON = JSON.parse(jsonContent);

  // Validate the generated JSON data
  expect(parsedJSON).toHaveProperty('name', 'John Doe');
  expect(parsedJSON).toHaveProperty('email', 'john@example.com');

  // Optionally, take a screenshot for debugging
  await page.screenshot({ path: 'screenshot.png' });
});
