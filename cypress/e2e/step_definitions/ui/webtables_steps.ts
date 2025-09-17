import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { webTablesPage } from "../../../support/pageObjests/ui/webtables_page";

When("I add a new user with email {string}", (emailToken: string) => {
  webTablesPage.addDefaultUserWithEmailToken(emailToken)
});

Then("I should see the user with email {string} in the table", (emailToken: string) => {
  webTablesPage.resolveEmailToken(emailToken).then((email) => {
    webTablesPage.findRowByEmail(String(email)).should("exist");
  })
});

When("I delete the user with email {string}", (emailToken: string) => {
  webTablesPage.resolveEmailToken(emailToken).then((email) => {
    webTablesPage.deleteRowByEmailAcrossPages(String(email));
  })
});

Then("I should not see the user with email {string}", (emailToken: string) => {
  webTablesPage.resolveEmailToken(emailToken).then((email) => {
    webTablesPage.assertEmailNotPresentAcrossPages(String(email));
  })
});

When("I ensure there is a second page of results", () => {
  webTablesPage.ensureSecondPageExists();
});

When("I go to the next page", () => {
  webTablesPage.goToNextPage();
});

When("I go to the previous page", () => {
  webTablesPage.goToPreviousPage();
});

Then("I should be on page {int}", (num: number) => {
  webTablesPage.assertOnPage(num);
});


