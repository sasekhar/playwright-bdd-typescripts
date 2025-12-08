import { Given, When, Then, BeforeAll, AfterAll, Before, After, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePageFunctions } from '../../pages/FunctionalLibrary/HomePageFunctions';
import { initBrowser, closeBrowser, getPage } from '../../utils/playwright';
import { ENV } from '../../utils/env';
import * as fs from 'fs';
import * as path from 'path';
import { PassThrough } from 'stream';

// Step definitions
Given('Navigate to build my store login screen', async function() {
  await this.loginPage.navigateToLoginPage();
});

When('provide the mobile number and click on the generate otp button', async function() {
  // Write code here that turns the phrase above into concrete actions
  await this.homePageFunctions.loginToBuildMyStore();
});

Then('the current url should be the login page {string}', async function(expectedUrl: string) {
  const actualUrl = getPage().url();
  expect(actualUrl).toBe(expectedUrl);
});