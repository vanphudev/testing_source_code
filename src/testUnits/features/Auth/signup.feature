Feature: Signup User
   Description: This feature will test the signup endpoint for creating a new user account.
   Scenario Outline: Đăng ký tài khoản người dùng mới
      Given Tôi có dữ liệu người dùng từ "<sheet>" ở hàng "<row>"
      When Tôi gửi yêu cầu POST đến "/api/v1/user/signup" với dữ liệu người dùng
      Then Tôi sẽ nhận được trạng thái phản hồi mà endpoint API trả về khớp với expected_status từ "<sheet>" ở hàng "<row>" mà tôi mong muốn
      And Tôi sẽ kiểm tra thời gian phản hồi của endpoint API không quá "<time>" milliseconds
      And Nếu trạng thái phản hồi là 200, tôi sẽ nhận được thông báo thành công
      And Tôi mong muốn dữ liệu trả về từ endpoint API phải đúng với định dạng JSON
      And Tôi mong muốn dữ liệu trả về từ endpoint API phải chứa thông tin người dùng đã đăng ký thành công
      Examples:
         | sheet  | row | time |
         | signup | 1   | 50   |
         | signup | 2   | 50   |
         | signup | 3   | 50   |
         | signup | 4   | 50   |
         | signup | 5   | 50   |
         | signup | 6   | 50   |
         | signup | 7   | 50   |
         | signup | 8   | 50   |
         | signup | 9   | 50   |
         | signup | 10  | 50   |
         | signup | 11  | 50   |
         | signup | 12  | 50   |
         | signup | 13  | 50   |
         | signup | 14  | 50   |
         | signup | 15  | 50   |
         | signup | 16  | 50   |
         | signup | 17  | 50   |
         | signup | 18  | 50   |
         | signup | 19  | 50   |
         | signup | 20  | 50   |
         | signup | 21  | 50   |
         | signup | 22  | 50   |
         | signup | 23  | 50   |
         | signup | 24  | 50   |
         | signup | 25  | 50   |
         | signup | 26  | 50   |
         | signup | 27  | 50   |
         | signup | 28  | 50   |
         | signup | 29  | 50   |
         | signup | 30  | 50   |

