import { apiPage } from "./pageObjests/api/validate_api_page";

declare global {
  namespace Cypress {
    interface Chainable {
      apiRequest(action: string, payload?: any): Chainable<Cypress.Response<any>>;
    }
  }
}

Cypress.Commands.add("apiRequest", (action: string, payload?: any) => {
  switch (action) {
    case "getAll":
      return apiPage.getAllResources();
    case "getById":
      return apiPage.getResourceById(payload.id);
    case "create":
      return apiPage.createResource(payload.name);
    case "update":
      return apiPage.updateResource(payload.id, payload.name);
    case "delete":
      return apiPage.deleteResource(payload.id);
    default:
      throw new Error(`Unknown apiRequest action: ${action}`);
  }
});
