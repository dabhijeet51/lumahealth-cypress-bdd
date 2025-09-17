import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { uploadPage } from "../../../support/pageObjests/ui/upload_download_page";

const downloadedFileName = "sampleFile.jpeg";

When("I download the sample file", () => {
  uploadPage.downloadFile();
});

Then("I should see the file in downloads folder", () => {
  cy.readFile(`cypress/downloads/${downloadedFileName}`, { timeout: 15000 }).should("exist");
});

When("I upload the downloaded file", () => {
  const downloadsPath = `cypress/downloads/${downloadedFileName}`;
  const fixturesPath = `cypress/fixtures/${downloadedFileName}`;
  cy.readFile(downloadsPath, "binary").then((fileContent) => {
    cy.writeFile(fixturesPath, fileContent, "binary");
  });
  uploadPage.uploadFile(downloadedFileName);
});

Then("I should see the uploaded file name on the page", () => {
  uploadPage.uploadedName().should("contain.text", downloadedFileName);
});
