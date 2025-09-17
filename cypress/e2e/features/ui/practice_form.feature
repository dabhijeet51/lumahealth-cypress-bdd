@UI @Forms
Feature: Practice Form

  Scenario: Submit empty form shows validation
    Given I open the demoqa homepage
    When I navigate using menu to "Forms" and then "Practice Form"
    And I submit the form empty
    Then I should see validation messages

  Scenario: Submit valid form
    Given I open the demoqa homepage
    When I navigate using menu to "Forms" and then "Practice Form"
    And I fill the form with valid data
    Then I should see a successful submission modal
