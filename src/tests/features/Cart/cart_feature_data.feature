Feature: Get User Cart

   Scenario Outline: Get cart by user
      Given I have the client ID "<client_id>" and authorization "<authorization>"
      When I request the cart for the user
      Then the response status should be <expected_status>
      And the response should contain the cart details
      And the response should match the structure of the JSON
      Examples:
         | client_id | authorization | expected_status |
         | 6711e36c2b190e66c89ae202
         | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzExZTM2YzJiMTkwZTY2Yzg5YWUyMDIiLCJlbWFpbCI6Im5ndXllbnZhbnBodS5odWZpQGdtYWlsLmNvbSIsImlhdCI6MTcyOTM1NTUxNSwiZXhwIjoxNzI5Mzk4NzE1fQ.QjFrQ6SFRSjNsshMCqDPEhIOQT8KgGZD27pwCC0teK4
         | 200 |
         | 6711e36c2b190e66c89ae202
         | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzExZTM2YzJiMTkwZTY2Yzg5YWUyMDIiLCJlbWFpbCI6Im5ndXllbnZhbnBodS5odWZpQGdtYWlsLmNvbSIsImlhdCI6MTcyOTM1NTUxNSwiZXhwIjoxNzI5Mzk4NzE1fQ.QjFrQ6SFRSjNsshMCqDPEhIOQT8KgGZD27pwCC0teK4
         | 200 |
