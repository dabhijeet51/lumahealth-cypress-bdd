@API
Feature: RESTful API Testing

  Scenario: Fetch all resources
    When I fetch all resources
    Then the response should contain a list of resources

  Scenario: Fetch a single resource by ID
    When I fetch a resource with id "1"
    Then the response should contain that resource

  Scenario: Create a new resource
    When I create a new resource with name "Demo Resource"
    Then I should receive an ID for the new resource

  Scenario: Update an existing resource
    Given I have created a new resource
    When I update the resource with name "Updated Resource"
    Then the update should be successful

  Scenario: Delete an existing resource
    Given I have created a new resource
    When I delete the resource
    Then the resource should no longer exist
