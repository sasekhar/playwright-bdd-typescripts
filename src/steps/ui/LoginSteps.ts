import { Given, When, Then, BeforeAll, AfterAll, Before, After, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePageFunctions } from '../../pages/FunctionalLibrary/HomePageFunctions';
import { InventoryPage } from '../../pages/InventoryPage';
import { initBrowser, closeBrowser, getPage } from '../../utils/playwright';
import { ENV } from '../../utils/env';
import * as fs from 'fs';
import * as path from 'path';
import { PassThrough } from 'stream';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let homePageFunctions:HomePageFunctions;

// Step definitions
Given('Initiate required instances to execute the test', async function() {
  const page = await initBrowser();
  // Attach the Playwright page to the Cucumber World so step definitions can access it via `this.page`
  (this as any).page = page;
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  homePageFunctions = new HomePageFunctions(page);
});

  Given('Navigate to build my store login screen', async function() {
    await loginPage.navigateToLoginPage();
  });

  When('provide the mobile number and click on the generate otp button', async function() {
    // Write code here that turns the phrase above into concrete actions
    await homePageFunctions.loginToBuildMyStore();
  });

  Then('the page title should be {string}', async function(expectedTitle: string) {
    const actualTitle = await loginPage.getPageTitle();
    expect(actualTitle).toBe(expectedTitle);
  });

  Then('the current url should be the login page {string}', async function(expectedUrl: string) {
    const actualUrl = getPage().url();
    expect(actualUrl).toBe(expectedUrl);
  });

  Then('the login logo should be displayed', async function() {
    const isLogoDisplayed = await loginPage.isLogoDisplayed();
    expect(isLogoDisplayed).toBe(true);
    
    // // Take screenshot of the logo
    // const screenshot = await getPage().screenshot();
    // this.attach(screenshot, 'image/png');
  });

  When('I login with valid credentials', async function() {
    await loginPage.login(ENV.STANDARD_USER, ENV.PASSWORD);
  });

  When('I login with username {string} and password {string}', async function(username: string, password: string) {
    await loginPage.login(username, password);
    
  });

  Then('I should be redirected to the inventory page', async function() {
    const isOnInventoryPage = await inventoryPage.isOnInventoryPage();
    expect(isOnInventoryPage).toBe(true);
    
    // Take screenshot of inventory page
    const screenshot = await getPage().screenshot();
    this.attach(screenshot, 'image/png');
  });

  Then('I should see an error message {string}', async function(expectedErrorMessage: string) {
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
  });