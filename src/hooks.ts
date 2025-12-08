import { Given, When, Then, BeforeAll, AfterAll, Before, After, AfterStep, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { initBrowser, closeBrowser, getPage } from './utils/playwright';
import { ENV } from './utils/env';
import * as fs from 'fs';
import * as path from 'path';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { HomePageFunctions } from './pages/FunctionalLibrary/HomePageFunctions';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let homePageFunctions: HomePageFunctions;

// Set default timeout to 10 seconds
setDefaultTimeout(10000);

// Hooks
BeforeAll({ timeout: 10000 }, async () => {
  // Create test-results/screenshots directory if it doesn't exist
  const screenshotsDir = path.join(process.cwd(), 'test-results', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Create test-results/videos directory if it doesn't exist
  const videosDir = path.join(process.cwd(), 'test-results', 'videos');
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }
});

AfterAll({ timeout: 60000 }, async () => {
  await closeBrowser();
});

// Before({ timeout: 60000 }, async function () {
//   console.log("Before All in The Hooks");
  
//   const page = await initBrowser();
//   // Attach the Playwright page to the Cucumber World so step definitions can access it via `this.page`
//   (this as any).page = page;
//   loginPage = new LoginPage(page);
//   homePageFunctions = new HomePageFunctions(page);
// });

Before({ timeout: 60000 }, async function () {
  console.log("Before All in The Hooks");
  
  const page = await initBrowser();
  // Attach the Playwright page and page objects to the Cucumber World so step definitions can access them
  (this as any).page = page;
  (this as any).loginPage = new LoginPage(page);
  (this as any).homePageFunctions = new HomePageFunctions(page);
});

AfterStep({ timeout: 10000 }, async function (this: any, testCase: ITestCaseHookParameter) {
  try {
    const page = getPage();
    if (!page) return;

    // Capture screenshot after every step
    const screenshot = await getPage().screenshot();
    this.attach(screenshot, 'image/png'); // attach to Cucumber report
  } catch (err) {
    // If browser/page isn't initialized yet, skip silently to avoid breaking the run
    console.warn('AfterStep: unable to take screenshot:', (err as any)?.message || err);
  }
});

// Take a screenshot if a scenario fails
After({ timeout: 5000 }, async function (this: any, testCase: ITestCaseHookParameter) {
  const page = getPage();
  
  if (testCase?.result?.status === 'FAILED') {
    // Take screenshot for failed tests
    const screenshot = await page.screenshot({ 
      path: `test-results/screenshots/failure-${Date.now()}.png`,
      fullPage: true
    });
    this.attach(screenshot, 'image/png');
  } else {
    // Take screenshot for passed tests too
    const screenshot = await page.screenshot({ 
      path: `test-results/screenshots/success-${Date.now()}.png`,
      fullPage: true
    });
    this.attach(screenshot, 'image/png');
  }
  console.log("After Before Logging Out");
  console.log("Home Page Functions get String:", JSON.stringify(this.homePageFunctions));
  if (this.homePageFunctions) {
    console.log("After Before Logging Out --- 1");
    await this.homePageFunctions.logOutBuildMyStoreApp();
    console.log("After Before Logging Out --- 2");
  }
});