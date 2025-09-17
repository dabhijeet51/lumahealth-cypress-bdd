import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

let lastResponse: Cypress.Response<any>;

When("I fetch all resources", () => {
  cy.apiRequest("getAll").then((resp) => {
    lastResponse = resp;
  });
});

Then("the response should contain a list of resources", () => {
  expect(lastResponse.status).to.eq(200);
  expect(lastResponse.body).to.be.an("array").and.to.have.length.greaterThan(0);
});

When("I fetch a resource with id {string}", (id: string) => {
  cy.apiRequest("getById", { id }).then((resp) => {
    lastResponse = resp;
  });
});

Then("the response should contain that resource", () => {
  expect(lastResponse.status).to.eq(200);
  expect(lastResponse.body).to.have.property("id");
});

When("I create a new resource with name {string}", (name: string) => {
  cy.apiRequest("create", { name }).then((resp) => {
    expect(resp.status).to.eq(200);
    cy.wrap(resp.body.id).as("createdId");
    lastResponse = resp;
  });
});

Then("I should receive an ID for the new resource", () => {
  expect(lastResponse.status).to.eq(200);
  expect(lastResponse.body).to.have.property("id");
});

Given("I have created a new resource", () => {
  cy.apiRequest("create", { name: "Temp Resource" }).then((resp) => {
    expect(resp.status).to.eq(200);
    cy.wrap(resp.body.id).as("createdId");
    lastResponse = resp;
  });
});

When("I update the resource with name {string}", (name: string) => {
  cy.get("@createdId").then((id) => {
    cy.apiRequest("update", { id, name }).then((resp) => {
      lastResponse = resp;
    });
  });
});

Then("the update should be successful", () => {
  expect(lastResponse.status).to.eq(200);
  expect(lastResponse.body).to.have.property("name", "Updated Resource");
});

When("I delete the resource", () => {
  cy.get("@createdId").then((id) => {
    cy.apiRequest("delete", { id }).then((resp) => {
      expect(resp.status).to.eq(200);
      cy.wrap(id).as("deletedId");
      lastResponse = resp;
    });
  });
});

Then("the resource should no longer exist", () => {
  cy.get("@deletedId").then((id) => {
    cy.apiRequest("getById", { id }).then((resp) => {
      expect(resp.status).to.eq(404);
    });
  });
});
