import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { practiceFormPage } from "../../../support/pageObjests/ui/practice_form_page";

When("I submit the form empty", () => {
  practiceFormPage.submitEmpty();
});

Then("I should see validation messages", () => {
  const l = practiceFormPage.locators;
  cy.get(`${l.firstName}:invalid, ${l.lastName}:invalid, ${l.genderName}:invalid, ${l.mobile}:invalid`).should("exist");
});

When("I fill the form with valid data", () => {
  const data = {
    firstName: "Demo",
    lastName: "User",
    gender: "Male" as const,
    mobile: "9999999999",
  };
  practiceFormPage.fillMandatoryAndSubmit(data);
});

Then("I should see a successful submission modal", () => {
  cy.get(practiceFormPage.locators.modalContent).should("be.visible");
});


