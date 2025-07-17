import axios from "axios";
import { Builder, By, until } from "selenium-webdriver";

(async function formSubmitBot() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://wafid.com/book-appointment/");

    console.log("getting token from captcha service...");
    let token = "";
    const config = {
      params: {
        siteKey: "6LflPAwnAAAAAL2wBGi6tSyGUyj-xFvftINOR9xp",
      },
    };
    const res = await axios.get("http://localhost:3001/api/getToken", config);
    if (res.status === 200 || res.data.success === true) {
      token = res.data.recaptchaToken;
    } else {
      return;
    }
    console.log(res.data, "Got token.");
    // Select a country (e.g., Pakistan)
    await driver.wait(until.elementLocated(By.id("id_country")), 10000); // Wait for the dropdown to be available
    let countryDropdown = await driver.findElement(By.id("id_country"));
    await countryDropdown.click();

    // Select a country by visible text (e.g., 'Pakistan')
    let countryOption = await driver.findElement(
      By.xpath("//option[contains(text(), 'Bangladesh')]")
    );
    await countryOption.click();

    // Select a city (e.g., Pakistan)
    await driver.wait(until.elementLocated(By.id("id_city")), 10000); // Wait for the dropdown to be available
    let cityDropdown = await driver.findElement(By.id("id_city"));
    await cityDropdown.click();
    let cityOption = await driver.findElement(
      By.xpath("//option[contains(text(), 'Dhaka')]")
    );
    await cityOption.click();

    // Select a traveling Country (e.g., Pakistan)
    await driver.wait(until.elementLocated(By.id("id_traveled_country")), 10000); // Wait for the dropdown to be available
    let travelingCountryDropdown = await driver.findElement(
      By.id("id_traveled_country")
    );
    await travelingCountryDropdown.click();
    let travelingCountryOption = await driver.findElement(
      By.xpath("//option[contains(text(), 'Saudi Arabia')]")
    );
    await travelingCountryOption.click();

    await driver.wait(until.elementLocated(By.id("id_first_name")), 10000); // Wait for the First Name field and enter text
    let firstName = await driver.findElement(By.id("id_first_name"));
    await firstName.sendKeys("Shahin");

    await driver.wait(until.elementLocated(By.id("id_last_name")), 10000); // Wait for the Last Name field and enter text
    let lastName = await driver.findElement(By.id("id_last_name"));
    await lastName.sendKeys("Reza");

    await driver.wait(until.elementLocated(By.id("id_dob")), 10000); // Wait for the Date of Birth field and enter a date
    let dobField = await driver.findElement(By.id("id_dob"));
    await dobField.click();
    await dobField.sendKeys("10/10/1990");

    // Select a gender
    await driver.wait(until.elementLocated(By.id("id_gender")), 10000); // Wait for the dropdown to be available
    let genderDropdown = await driver.findElement(By.id("id_gender"));
    await genderDropdown.click();
    let genderOption = await driver.findElement(
      By.xpath("//option[contains(text(), 'Male')]")
    );
    await genderOption.click();
    // Select a marital status
    await driver.wait(until.elementLocated(By.id("id_marital_status")), 10000); // Wait for the dropdown to be available
    let maritalDropdown = await driver.findElement(By.id("id_marital_status"));
    await maritalDropdown.click();
    let maritalOption = await driver.findElement(
      By.xpath("//option[contains(text(), 'Married')]")
    );
    await maritalOption.click();

    await driver.wait(until.elementLocated(By.id("id_passport")), 10000); // Wait for the First Name field and enter text
    let passport = await driver.findElement(By.id("id_passport"));
    await passport.sendKeys("1565423447387681234563");

    await driver.wait(until.elementLocated(By.id("id_confirm_passport")), 10000); // Wait for the Last Name field and enter text
    let confirmPassport = await driver.findElement(
      By.id("id_confirm_passport")
    );
    await confirmPassport.sendKeys("1565423447387681234563");

    await driver.wait(
      until.elementLocated(By.id("id_passport_issue_date")),
      10000
    ); // Wait for the Date of Birth field and enter a date
    let passportIssueDate = await driver.findElement(
      By.id("id_passport_issue_date")
    );
    await passportIssueDate.click();
    await passportIssueDate.clear();
    await passportIssueDate.sendKeys("01/21/2023");

    await driver.wait(
      until.elementLocated(By.id("id_passport_issue_place")),
      10000
    ); // Wait for the First Name field and enter text
    let passportIssuePlace = await driver.findElement(
      By.id("id_passport_issue_place")
    );
    await passportIssuePlace.sendKeys("Bangalore");

    await driver.wait(
      until.elementLocated(By.id("id_passport_expiry_on")),
      10000
    ); // Wait for the Date of Birth field and enter a date
    let passportExpiryDate = await driver.findElement(
      By.id("id_passport_expiry_on")
    );
    await passportExpiryDate.click();
    await passportExpiryDate.clear();
    await passportExpiryDate.sendKeys("2/10/2026");

    // Select a visa type
    await driver.wait(until.elementLocated(By.id("id_visa_type")), 10000); // Wait for the dropdown to be available
    let visaTypeDropdown = await driver.findElement(By.id("id_visa_type"));
    await visaTypeDropdown.click();
    let visaTypeOption = await driver.findElement(
      By.xpath("//option[contains(text(), 'Family Visa')]")
    );
    await visaTypeOption.click();

    await driver.wait(until.elementLocated(By.id("id_email")), 10000); // Wait for the First Name field and enter text
    let email = await driver.findElement(By.id("id_email"));
    await email.sendKeys("shahin@gmail.com");

    await driver.wait(until.elementLocated(By.id("id_phone")), 10000); // Wait for the First Name field and enter text
    let phone = await driver.findElement(By.id("id_phone"));
    await phone.sendKeys("+123456789");

    await driver.wait(until.elementLocated(By.id("id_national_id")), 10000); // Wait for the First Name field and enter text
    let national = await driver.findElement(By.id("id_national_id"));
    await national.sendKeys("29381");

    // Select a visa type
    await driver.wait(until.elementLocated(By.id("id_applied_position")), 10000);
    let positionDropdown = await driver.findElement(
      By.id("id_applied_position")
    );
    await positionDropdown.click();

    try {
      // Try to find the option in the dropdown
      let positionOption = await driver.findElement(
        By.xpath("//option[contains(text(), 'Teacher')]")
      );
      await positionOption.click();
    } catch (error) {
      console.log("Desired position not found. Entering manually...");

      // If the position is not found, enter in the "Other" field
      await driver.wait(
        until.elementLocated(By.id("id_applied_position_other")),
        10000
      );
      let other = await driver.findElement(By.id("id_applied_position_other"));
      await other.sendKeys("IT recruiter");
      await driver.wait(
        until.elementLocated(By.id("id_applied_position_is_other")),
        10000
      );
      let otherCheckBox = await driver.findElement(
        By.id("id_applied_position_is_other")
      );
      await otherCheckBox.click();
    }

    await driver.wait(until.elementLocated(By.id("id_confirm")), 10000);
    let confirmCheckbox = await driver.findElement(By.id("id_confirm"));
    await driver.executeScript("arguments[0].click();", confirmCheckbox);

    await driver.wait(until.elementLocated(By.id("id_captcha")), 10000);
    const recaptcha = await driver.findElement(By.id("id_captcha"));
    // await driver.executeScript(
    //   "arguments[0].setAttribute('type', 'text');",
    //   recaptcha
    // );
    // await recaptcha.sendKeys(token);
    await driver.executeScript(
      "arguments[0].value = arguments[1];",
      recaptcha,
      token
    );
    // await driver.executeScript(
    //   "arguments[0].dispatchEvent(new Event('change'));",
    //   recaptcha
    // );
    await driver.wait(
      until.elementLocated(By.xpath("//button[@type='submit']")),
      10000
    );
    let submit = await driver.findElement(By.xpath("//button[@type='submit']"));
    await submit.click();

    await driver.wait(
      until.elementLocated(By.id("id_card_holder_name")),
      10000
    );
    let cardHolderName = await driver.findElement(By.id("id_card_holder_name"));
    await cardHolderName.sendKeys("Shahin Reza");

    await driver.wait(until.elementLocated(By.id("id_card_number")), 10000);
    let cardNumber = await driver.findElement(By.id("id_card_number"));
    await cardNumber.sendKeys("4221094107300863");

    await driver.wait(until.elementLocated(By.id("id_expiry_date")), 10000);
    let expireDate = await driver.findElement(By.id("id_expiry_date"));
    await expireDate.sendKeys("0529");

    await driver.wait(
      until.elementLocated(By.id("id_card_security_code")),
      10000
    );
    let cardSecurityCode = await driver.findElement(
      By.id("id_card_security_code")
    );
    await cardSecurityCode.sendKeys("785");

    await driver.wait(
      until.elementLocated(By.xpath("//button[@type='submit']")),
      10000
    );
    let paymentSubmit = await driver.findElement(
      By.xpath("//button[@type='submit']")
    );
    await paymentSubmit.click();
  } catch (error) {
    console.error("Error submitting the form:", error);
  } finally {
    // await driver.quit();
  }
})();
