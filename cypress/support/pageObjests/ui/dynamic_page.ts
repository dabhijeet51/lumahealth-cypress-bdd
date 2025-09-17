export class DynamicPage {
  getElementsCardLink() {
    return cy.get("div.card-body h5:contains('Elements')");
  }
  getDynamicPropertiesMenu() {
    return cy.get("li#item-8 span.text:contains('Dynamic Properties')");
  }
  getEnableButton() {
    return cy.get("#enableAfter");
  }
  getColorButton() {
    return cy.get("#colorChange");
  }
  getVisibleButton() {
    return cy.get("#visibleAfter");
  }
}
export const dynamicPage = new DynamicPage();
