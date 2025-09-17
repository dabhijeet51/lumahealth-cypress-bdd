import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the demoqa homepage", () => {
  cy.visit("/", { timeout: 120000 });
  cy.get('body', { timeout: 30000 }).should('be.visible');
});

When(
  "I navigate using menu to {string} and then {string}",
  (menu1: string, menu2: string) => {
    cy.navigateToMenu([menu1, menu2]);
  }
);