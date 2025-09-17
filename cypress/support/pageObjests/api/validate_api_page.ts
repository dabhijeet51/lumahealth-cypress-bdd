export class ApiPage {
  private baseUrl = "https://api.restful-api.dev/objects"; // RESTful API endpoint

  getAllResources() {
    return cy.request("GET", this.baseUrl);
  }

  getResourceById(id: string) {
    return cy.request({
      method: "GET",
      url: `${this.baseUrl}/${id}`,
      failOnStatusCode: false
    });
  }

  createResource(name: string) {
    return cy.request("POST", this.baseUrl, {
      name,
      data: { year: 2025, price: 1000 },
    });
  }

  updateResource(id: string, name: string) {
    return cy.request("PUT", `${this.baseUrl}/${id}`, {
      name,
      data: { updated: true },
    });
  }

  deleteResource(id: string) {
    return cy.request("DELETE", `${this.baseUrl}/${id}`);
  }
}

export const apiPage = new ApiPage();
