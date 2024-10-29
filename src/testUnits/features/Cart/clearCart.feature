Feature: Delete User Cart
   Description: This feature will test the delete cart API endpoint for removing a user's cart entirely.

   Scenario Outline: Xóa giỏ hàng của người dùng
      Given Tôi đã có dữ liệu Excel người dùng từ "<sheet>" ở hàng "<row>" cần xóa giỏ hàng
      When Tôi gửi yêu cầu HTTP DELETE đến "/api/v1/carts/clear" để xóa giỏ hàng của người dùng
      Then Tôi phải nhận được trạng thái phản hồi khớp với expected_status từ "<sheet>" ở hàng "<row>" ứng với giỏ hàng cần xóa của người dùng
      And Nếu trạng thái phản hồi là 200, tôi sẽ nhận được thông báo thành công về việc giỏ hàng đã được xóa
      And Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds cho mỗi Request mà tôi gửi đi để xóa giỏ hàng của người dùng
      And Tôi mong muốn dữ liệu trả về từ API endpoint phải đúng với định dạng JSON đồng thời kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin người dùng đã xóa giỏ hàng thành công.

      Examples:
         | sheet       | row | time |
         | Remove_Cart | 1   | 60   |
         | Remove_Cart | 2   | 60   |
         | Remove_Cart | 3   | 60   |
