import './commands';
import 'cypress-file-upload';
import './api_commands';

Cypress.on("uncaught:exception", () => {
  return false;
});
