Feature: Signin User
   Description: This feature will test the signin endpoint.
   Scenario Outline: Đăng nhập tài khoản người dùng
      Given Tôi có dữ liệu Excel người dùng cần đăng nhập vào hệ thống từ "<sheet>" ở hàng "<row>"
      When Tôi gửi yêu cầu đăng nhập theo giao thức Http POST đến endpoint là "/api/v1/user/signin"
      Then Tôi sẽ nhận được trạng thái phản hồi với expected_status trong tập dữ liệu Excel đọc được từ "<sheet>" ở hàng "<row>"
      And Tôi muốn kiểm tra thời gian phản hồi của API endpoint không quá "<time>" milliseconds cho mỗi Request
      And Tôi mong muốn dữ liệu trả về từ API endpoint phải đúng với định dạng JSON đồng thời kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin người dùng đã đăng nhập thành công với Token và Refresh Token.
      Examples:
         | sheet  | row | time |
         | signin | 1   | 40   |
         | signin | 2   | 40   |
         | signin | 3   | 40   |
         | signin | 4   | 40   |
         | signin | 5   | 40   |
         | signin | 6   | 40   |

