Feature: List Advertisements
  In order to find second hand products to buy
  As a buyer
  I want to list advertisements

  Scenario: List all advertisements
    When I list all available advertisements
    Then I see 0 advertisements
