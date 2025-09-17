@UI @WebTables
Feature: Web Tables interactions on demoqa

  Background:
    Given I open the demoqa homepage

  Scenario: Add and delete a user from web tables
    When I navigate using menu to "Elements" and then "Web Tables"
    And I add a new user with email "RANDOM_EMAIL"
    Then I should see the user with email "GENERATED_EMAIL" in the table
    When I delete the user with email "GENERATED_EMAIL"
    Then I should not see the user with email "GENERATED_EMAIL"

  Scenario: Create enough users for a second page and navigate
    When I navigate using menu to "Elements" and then "Web Tables"
    And I ensure there is a second page of results
    And I go to the next page
    Then I should be on page 2
    When I go to the previous page
    Then I should be on page 1
