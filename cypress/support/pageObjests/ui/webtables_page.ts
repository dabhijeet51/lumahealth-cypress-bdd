export class WebTablesPage {
  readonly locators = {
    addButton: 'button#addNewRecordButton',
    firstName: 'input#firstName',
    lastName: 'input#lastName',
    email: 'input#userEmail',
    age: 'input#age',
    salary: 'input#salary',
    department: 'input#department',
    submit: 'button#submit',
    tableRowGroup: 'div.rt-tr-group',
    tableCell: 'div.rt-td',
    tableBody: 'div.rt-tbody',
    modal: 'div.modal-content div.modal-body',
    userForm: 'form#userForm',
    deleteIcon: 'span[title="Delete"]',
    nextPage: '.pagination-bottom .-next button.-btn',
    previousPage: '.pagination-bottom .-previous button.-btn',
    pageJumpInput: 'div.-pageJump input',
    totalPages: '.pagination-bottom .-totalPages',
  }

  generateRandomEmail(): string {
    const rand = Math.random().toString(36).replace(/[^a-z0-9]+/gi, '').slice(2, 7)
    return `testuser_${rand}@example.com`
  }

  resolveEmailToken(emailToken: string): Cypress.Chainable<string> {
    if (emailToken === 'GENERATED_EMAIL') {
      return cy.get<string>('@generatedEmail')
    }
    return cy.wrap(emailToken)
  }

  addDefaultUserWithEmailToken(emailToken: string) {
    const email = emailToken === 'RANDOM_EMAIL' ? this.generateRandomEmail() : emailToken
    if (emailToken === 'RANDOM_EMAIL') {
      cy.wrap(email).as('generatedEmail')
    }
    const data = { firstName: 'Test', lastName: 'User', email, age: 30, salary: 50000, department: 'QA' }
    this.addUser(data)
  }

  addUserSilent(data: {firstName:string,lastName:string,email:string,age:number,salary:number,department:string}) {
    cy.get(this.locators.addButton).scrollIntoView().click()
    cy.get(this.locators.userForm, { timeout: 10000 }).should('exist').and('be.visible')
    cy.get(this.locators.userForm).within(() => {
      cy.get(this.locators.firstName).clear().type(data.firstName)
      cy.get(this.locators.lastName).clear().type(data.lastName)
      cy.get(this.locators.email).clear().type(data.email)
      cy.get(this.locators.age).clear().type(String(data.age))
      cy.get(this.locators.salary).clear().type(String(data.salary))
      cy.get(this.locators.department).clear().type(data.department)
      cy.get(this.locators.submit).scrollIntoView().click()
    })
    cy.get(this.locators.userForm, { timeout: 10000 }).should('not.exist')
  }

  addUser(data: {firstName:string,lastName:string,email:string,age:number,salary:number,department:string}) {
    cy.get(this.locators.addButton).scrollIntoView().click()
    cy.get(this.locators.userForm, { timeout: 10000 }).should('exist').and('be.visible')
    cy.get(this.locators.userForm).within(() => {
      cy.get(this.locators.firstName).clear().type(data.firstName)
      cy.get(this.locators.lastName).clear().type(data.lastName)
      cy.get(this.locators.email).clear().type(data.email)
      cy.get(this.locators.age).clear().type(String(data.age))
      cy.get(this.locators.salary).clear().type(String(data.salary))
      cy.get(this.locators.department).clear().type(data.department)
      cy.get(this.locators.submit).scrollIntoView().click()
    })
    cy.get(this.locators.userForm, { timeout: 10000 }).should('not.exist')
    cy.get(this.locators.tableBody).contains(this.locators.tableCell, data.email).should('exist')
  }

  findRowByEmail(email: string) {
    return cy.get(this.locators.tableBody).contains(this.locators.tableCell, email).scrollIntoView()
  }

  deleteRowByEmail(email: string) {
    this.findRowByEmail(email)
      .parents(this.locators.tableRowGroup)
      .find(this.locators.deleteIcon)
      .scrollIntoView()
      .click()
    cy.get(this.locators.tableBody).contains(this.locators.tableCell, email).should('not.exist')
  }

  goToNextPage() {
    cy.get(this.locators.nextPage).should('exist').and('not.be.disabled').click()
  }

  goToPreviousPage() {
    cy.get(this.locators.previousPage).should('exist').and('not.be.disabled').click()
  }

  assertOnPage(pageNumber: number) {
    cy.get(this.locators.pageJumpInput).should('have.value', String(pageNumber))
  }

  ensureSecondPageExists(maxTries: number = 11) {
    const tryEnsure = (triesLeft: number) => {
      if (triesLeft <= 0) return
      cy.get('body').then(($body) => {
        const $next = $body.find(this.locators.nextPage)
        if ($next.length && !$next.prop('disabled')) {
          return
        }
        const email = this.generateRandomEmail()
        const data = { firstName: 'Auto', lastName: 'Gen', email, age: 30, salary: 50000, department: 'QA' }
        this.addUserSilent(data)
        tryEnsure(triesLeft - 1)
      })
    }
    tryEnsure(maxTries)
  }

  deleteRowByEmailAcrossPages(email: string) {
    const tryDelete = (): Cypress.Chainable => {
      return cy.get('body').then(() => cy.get(this.locators.tableBody).contains(this.locators.tableCell, email)).then(($cell) => {
        if ($cell.length) {
          cy.wrap($cell)
            .parents(this.locators.tableRowGroup)
            .find(this.locators.deleteIcon)
            .scrollIntoView()
            .click()
          return cy.wrap(true)
        }
        return cy.get('body').then(($body) => {
          const $next = $body.find(this.locators.nextPage)
          const canPaginate = $next.length && !$next.prop('disabled')
          if (!canPaginate) {
            return cy.wrap(false)
          }
          cy.wrap($next).click()
          return tryDelete()
        })
      })
    }
    return tryDelete()
  }

  assertEmailNotPresentAcrossPages(email: string) {
    const verifyPage = (): Cypress.Chainable => {
      cy.get(this.locators.tableBody).contains(this.locators.tableCell, email).should('not.exist')
      return cy.get('body').then(($body) => {
        const $next = $body.find(this.locators.nextPage)
        const canPaginate = $next.length && !$next.prop('disabled')
        if (!canPaginate) {
          return cy.wrap(true)
        }
        cy.wrap($next).click()
        return verifyPage()
      })
    }
    return verifyPage()
  }
}
export const webTablesPage = new WebTablesPage()
