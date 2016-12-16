Feature: List Advertisements
  In order to find second hand products to buy
  As a buyer
  I want to list advertisements

  Scenario: List all advertisements when none yet
    Given I'm in the home page
    Then I see 0 advertisements

  Scenario: List all advertisements when one created
    Given I sign in as "user" with password "password"
    When I create an advertisement with title "Test" and price 10
    And I go back to home
    Then I see 1 advertisements

  Scenario: List all advertisements when one and then deleted
    Given I'm in the home page
    And I see 1 advertisements
    And I'm signed in as "user"
    When I browse details for advertisement listed in position 1
    And I delete the advertisement
    Then I see 0 advertisements
