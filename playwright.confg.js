import { defineConfig } from '@playwright/test';
export default defineConfig({
    testDir: './tests', // Folder containing the test files
    use: {
        browserName: 'chromium', // Or 'firefox' or 'webkit'
    },
});
