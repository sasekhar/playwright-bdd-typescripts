import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class HomePageControls extends BasePage {

// Selectors
  private readonly mobileNumber = '#mobile';
  private readonly generateOtp: string = "//button[@type='button']";
  private readonly profileIcon: string = "//a[@class='ant-dropdown-trigger css-fruyyv']//img[@class='ant-image-img css-xcat2f css-75cpm8']";
  private readonly logOutButton : string = "//span[normalize-space()='Log Out']";

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

  public getprofileIcon(): string {
    return this.profileIcon;
  }

  public getlogOutButton(): string {
    return this.logOutButton;
  }
}