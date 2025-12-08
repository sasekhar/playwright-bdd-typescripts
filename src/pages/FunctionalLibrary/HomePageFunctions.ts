import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { HomePageControls } from '../ControlLibrary/HomePageControls';
import { Given, When, Then, BeforeAll, AfterAll, Before, After, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';


export class HomePageFunctions extends BasePage {
  private homePageControls: HomePageControls;

  constructor(page: Page) {
    super(page);
    this.homePageControls = new HomePageControls(page);
  }

  async enterMobileNumber(mobile: string) {
    try{
      const selector = this.homePageControls.getMobileNumberSelector();
      await this.page.fill(selector, mobile);
      // this.captureScreenshot('enterMobileNumber');
    }
    catch(error : any){
      console.error("Error entering mobile number: ", error.message); 
    }
  }

  async clickGenerateOtp() {
    try{
      const generateSelector = this.homePageControls.getGenerateOtpSelector?.();
      if (generateSelector) await this.page.click(generateSelector);
      await this.page.waitForLoadState('load');
      // this.captureScreenshot('clickGenerateOtp');
    }
    catch(error : any){
      console.error("Error clicking Generate OTP button: ", error.message);
    }
  }

  // Log out from Build My Store App
  async logOutBuildMyStoreApp() {
    try{
      const getprofileIcon = this.homePageControls.getprofileIcon?.();
      if (getprofileIcon) await this.page.click(getprofileIcon);
      await this.page.waitForTimeout(3000); // Wait for 2 seconds to ensure dropdown is visible
      const getlogOutButton = this.homePageControls.getlogOutButton?.();
      if (getlogOutButton) await this.page.click(getlogOutButton);

      await this.page.waitForLoadState('load');
      // this.captureScreenshot('clickGenerateOtp');
    }
    catch(error : any){
      console.error("Error while logging out build my strore: ", error.message);
    }
  }

  /**
   * Enter mobile number and click on generateOpt button
   */
async loginToBuildMyStore(): Promise<void> {
  await this.enterMobileNumber('9999999999');
  await this.clickGenerateOtp();
  try{
  const digits: number[] = this.getDigits(this.getCurrentDateAsOtp());
  for (let i = 0; i <= this.getDigits(this.getCurrentDateAsOtp()).length-1; i++) {
    console.info("Digit Filled Number "+i+":- ", digits[i]);
    await this.homePageControls.getOtInputCells(this.page, i+1).fill(digits[i].toString());
  }
  await this.page.waitForLoadState('load');
  }catch(error : any){
    console.error("Error entering OTP: ", error.message);
  }
}

getCurrentDateAsOtp(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');       
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);         
  return `${day}${month}${year}`;
}

getDigits(input: string): number[] {
  // Split the string into individual characters and convert each to a number
  return input.split('').map(char => Number(char));
}
}
