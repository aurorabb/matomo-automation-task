# Matomo Automation Framework (Playwright/TS)

## Project Overview
This project contains a specialized automation framework designed to verify the core functionalities of the **matomo.org** website. The framework focuses on navigation, resource integrity (broken links/images), and demo accessibility.

### Why Playwright?
**Playwright with TypeScript** was chosen for this project because of its modern approach to web automation, specifically:
* **Auto-waiting:** Eliminates flaky tests by waiting for elements to be actionable.
* **Built-in Request API:** Allows for fast verification of links/images without UI overhead.
* **Native HTML Reporting:** Provides a powerful, zero-config reporting suite that includes step-by-step execution logs and visual attachments.
* **Trace Viewer:** Provides a recording of test failures for easier debugging.



## Framework Structure
The project follows the **Page Object Model (POM)** pattern to ensure the code is maintainable and scalable.

```
matomo-playwright-take-home/
├── page-objects/            <-- Page Object Model (Selectors & Actions)
│   ├── BasePage.ts          <-- Common functions for all pages
│   └── HomePage.ts          <-- Home & Navigation specific logic
├── tests/                   <-- Automated Test Scripts
│   └── home.spec.ts         <-- Tests for site navigation & resource integrity
├── .gitignore               <-- Git ignore rules
├── package-lock.json        <-- Lock file
├── package.json             <-- Project dependencies
├── playwright.config.ts     <-- Framework settings (Browsers, Reports)
└── README.md                <-- Project documentation
```

## How to Run the Tests

### 1. Prerequisites
Ensure [Node.js](https://nodejs.org/) installed.

### 2. Installation
Clone the repository and install dependencies:
```
npm install
```

### 3. Execution
Run all tests in headless mode:
```
npx playwright test
```

To run tests in Headed mode (UI visible):
```
npx playwright test --headed
```

## Viewing the Report
After the tests complete, a professional HTML report is generated automatically. To view it:

```
npx playwright show-report
```
*Note: If a test fails, the report will include a screenshot and a trace of the failure.*

## Assumptions & Strategy
* **Navigation:** I used User-Centric Locators (Roles/Texts) to ensure the tests remain resilient to minor CSS/HTML structure changes.

* **Resource Integrity:** For the "Broken Links/Images" check, I utilized Playwright's APIRequestContext. This fetches the HTTP status codes directly. 

* **Filtering:** I intentionally skipped mailto: links and data: images as these do not require external HTTP requests.

* **Demo Accessibility:** During the discovery phase, I noted there is no direct "Demo" link on the homepage. I implemented a realistic user journey to access the demo, which verifies that the demo remains discoverable through standard navigation paths.