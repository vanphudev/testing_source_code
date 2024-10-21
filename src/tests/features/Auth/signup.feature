Feature: Signup User
  Description: This feature will test the signup endpoint.

  Scenario Outline: Đăng ký tài khoản người dùng
    Given Tôi có dữ liệu người dùng từ "<sheet>" ở hàng "<row>"
    When Tôi gửi yêu cầu POST đến "/api/v1/user/signup"
    Then Tôi sẽ nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>"
    And Tôi sẽ kiểm tra thời gian phản hồi không quá "<time>" milliseconds

    Examples:
      | sheet | row | time |
      | signup | 1   | 50  |
      | signup | 2   | 50  |
      | signup | 3   | 50  |
      | signup | 4   | 50  |
      | signup | 5   | 50  |
      | signup | 6   | 50  |
      | signup | 7   | 50  |
      | signup | 8   | 50  |
      | signup | 9   | 50  |
      | signup | 10   | 50  |
      | signup | 11   | 50  |
      | signup | 12   | 50  |
      | signup | 13   | 50  |
      | signup | 14   | 50  |
      | signup | 15   | 50  |
      | signup | 16   | 50  |
      | signup | 17   | 50  |
      | signup | 18   | 50  |
      | signup | 19   | 50  |
      | signup | 20   | 50  |
      | signup | 21   | 50  |
      | signup | 22   | 50  |
      | signup | 23   | 50  |
      | signup | 24   | 50  |
      | signup | 25   | 50  |
      | signup | 26   | 50  |
      | signup | 27   | 50  |
      | signup | 28   | 50  |
      | signup | 29   | 50  |
      | signup | 30   | 50  |

