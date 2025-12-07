import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class HomePageControls extends BasePage {

// Selectors
  private readonly mobileNumber = '#mobile';
  private readonly generateOtp: string = "//button[@type='button']";

  constructor(page: Page) {
    super(page);
  }

  // Public getter so other modules (e.g., HomePageFunctions) can access selectors
  public getMobileNumberSelector(): string {
    return this.mobileNumber;
  }

  public getGenerateOtpSelector(): string {
    return this.generateOtp;
  }

  public getOtInputCells(page: Page, col: number) {
  return page.locator(`(//*[@id="otp"]//input)[${col}]`);
}
}