import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the demoqa homepage", () => {
  cy.visit("/");
});

When(
  "I navigate using menu to {string} and then {string}",
  (menu1: string, menu2: string) => {
    cy.navigateToMenu([menu1, menu2]);
  }
);