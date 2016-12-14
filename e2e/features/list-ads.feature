Feature: List Advertisements
  In order to find second hand products to buy
  As a buyer
  I want to list advertisements

  Scenario: List all advertisements when none
    When I list all available advertisements
    Then I see 0 advertisements

  Scenario: List all advertisements when one created
    Given I sign in as "user1" with password "pass4admin"
    When I create an advertisement with title "Test" and price 10
    And I go back to home
    Then I see 1 advertisements
