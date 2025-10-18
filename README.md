# Playwright Sample Automation

This project demonstrates automated UI testing using [Playwright](https://playwright.dev/) and TypeScript, following the Page Object Model (POM) pattern.

## Features
- Page Object Model for maintainable and scalable tests
- Banner blocking for cleaner test runs
- Sample tests for demoqa.com Text Box and Checkbox pages
- Multi-browser support (Chrome and Firefox)
- Playwright HTML test reports

## Project Structure
```
├── pages/                # Page Object classes
├── tests/                # Test specs
├── playwright.config.ts  # Playwright configuration
├── package.json          # Project metadata and dependencies
```

## How to Run
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run all tests:**
   ```sh
   npx playwright test
   ```
3. **View HTML report:**
   ```sh
   npx playwright show-report
   ```

## Customization
- Add new page objects in the `pages/` folder.
- Write new test specs in the `tests/` folder, using the page objects.
- Update `playwright.config.ts` for browser or test options.

## Requirements
- Node.js >= 16
- npm
