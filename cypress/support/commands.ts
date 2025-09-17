Cypress.Commands.add('navigateToMenu', (menuPath: string[]) => {
  cy.get('header').should('exist')
  cy.contains('div.card-body h5', menuPath[0]).click()
  if(menuPath.length > 1) {
    cy.contains('li span', menuPath[1]).click({force: true})
  }
})
declare global {
  namespace Cypress {
    interface Chainable {
      navigateToMenu(menuPath: string[]): Chainable<void>
    }
  }
}

export {}