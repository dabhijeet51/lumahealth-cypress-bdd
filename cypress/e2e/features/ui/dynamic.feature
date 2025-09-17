@UI @Dynamic
Feature: Dynamic Properties
  Verify that the dynamic buttons on DemoQA behave as expected

  Scenario: Buttons change properties over time
    Given I open the demoqa homepage
    When I navigate to "Elements" > "Dynamic Properties"
    Then I validate dynamic buttons behavior
