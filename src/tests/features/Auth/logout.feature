Feature: Logout User
   Description: Tính năng này sẽ kiểm tra endpoint logout cho phép người dùng đăng xuất khỏi hệ thống.
   Scenario Outline: Đăng xuất tài khoản người dùng
      Given Tôi có dữ liệu người dùng từ file "<sheet>" ở hàng "<row>", bao gồm client_id và authorization.
      When Tôi gửi yêu cầu POST đến "/api/v1/user/logout" với client_id và authorization.
      Then Tôi sẽ nhận được trạng thái phản hồi khớp với expected_status từ file "<sheet>" ở hàng "<row>" và kiểm tra dữ liệu trả về có đúng với định dạng JSON.
      And Tôi sẽ kiểm tra thời gian xử lý của endpoint API không khôbg được quá "<time>" milliseconds cho mỗi Request.
      And Nếu trạng thái phản hồi là 200, tôi sẽ nhận được thông báo logout thành công và phiên làm việc sẽ bị vô hiệu hóa.
      Examples:
         | sheet  | row | time |
         | logout | 1   | 40   |
         | logout | 2   | 40   |
         | logout | 3   | 40   |
         | logout | 4   | 40   |
         | logout | 5   | 40   |
         | logout | 6   | 40   |