export class UploadPage {
  readonly locators = {
    download: "a#downloadButton",
    uploadInput: "input#uploadFile",
    uploadedPath: "#uploadedFilePath",
  };

  downloadFile() {
    cy.get(this.locators.download).scrollIntoView().click();
  }

  uploadFile(fileName: string) {
    cy.get(this.locators.uploadInput).attachFile(fileName); // looks in cypress/fixtures
  }

  uploadedName() {
    return cy.get(this.locators.uploadedPath);
  }
}

export const uploadPage = new UploadPage();
