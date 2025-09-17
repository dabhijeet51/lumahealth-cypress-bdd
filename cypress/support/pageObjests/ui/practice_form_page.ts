export class PracticeFormPage {
  readonly locators = {
    firstName: "input#firstName",
    lastName: "input#lastName",
    genderName: "input[name='gender']",
    genderLabelFor: {
      "Male": "label[for='gender-radio-1']",
      "Female": "label[for='gender-radio-2']",
      "Other": "label[for='gender-radio-3']",
    } as Record<"Male"|"Female"|"Other", string>,
    mobile: "input#userNumber",
    submit: "button#submit",
    modalContent: ".modal-content",
  }
  submitEmpty(){ cy.get(this.locators.submit).click() }
  fillMandatoryAndSubmit(data:{firstName:string,lastName:string,gender:"Male"|"Female"|"Other",mobile:string}) {
    cy.get(this.locators.firstName).clear().type(data.firstName)
    cy.get(this.locators.lastName).clear().type(data.lastName)

    const genderLabelSelector = this.locators.genderLabelFor[data.gender]
    cy.get(genderLabelSelector).click()

    cy.get(this.locators.mobile).clear().type(data.mobile)
    cy.get(this.locators.submit).click()
  }
}
export const practiceFormPage = new PracticeFormPage()
