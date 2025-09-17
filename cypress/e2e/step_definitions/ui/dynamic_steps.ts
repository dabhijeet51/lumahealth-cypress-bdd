import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { dynamicPage } from "../../../support/pageObjests/ui/dynamic_page";

When("I navigate to {string} > {string}", (_menu1: string, _menu2: string) => {
  cy.get("div.card-body", { timeout: 10000 }).should("exist");
  dynamicPage
    .getElementsCardLink()
    .scrollIntoView({ easing: "linear", duration: 500 })
    .should("be.visible")
    .click({ force: true });
  dynamicPage
    .getDynamicPropertiesMenu()
    .scrollIntoView({ easing: "linear", duration: 500 })
    .should("be.visible")
    .click({ force: true });
});

Then("I validate dynamic buttons behavior", () => {
  cy.get("h1").contains("Dynamic Properties").scrollIntoView();
  dynamicPage.getEnableButton().should("be.disabled");
  dynamicPage.getColorButton().should("not.have.class", "text-danger");
  dynamicPage.getVisibleButton().should("not.exist");
  cy.wait(6000);
  dynamicPage.getEnableButton().should("not.be.disabled");
  dynamicPage.getColorButton().should("have.class", "text-danger");
  dynamicPage.getVisibleButton().should("exist").and("be.visible");
});
