Feature: Remove Cart Item
   Description: This feature will test the remove item from the user cart API endpoint.

   Scenario Outline: Xóa sản phẩm ra khỏi giỏ hàng của người dùng
      Given Tôi đã có dữ liệu Excel người dùng, sản phẩm từ "<sheet>" ở hàng "<row>" cần xóa khỏi giỏ hàng của người dùng đó
      When Tôi gửi yêu cầu giao thức Http DELETE đến "/api/v1/carts/removeitem" với dữ liệu từ Excel người dùng cần xóa
      Then Tôi nhận được trạng thái phản hồi khớp với expected_status từ "<sheet>" ở hàng "<row>"
      And Nếu trạng thái phản hồi là 200, tôi sẽ nhận được thông báo thành công về việc xóa sản phẩm khỏi giỏ hàng của người dùng
      And Tôi kiểm tra dữ liệu có đúng với định dạng JSON và kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin người dùng đã xóa sản phẩm khỏi giỏ hàng thành công.
      And Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds cho mỗi Request

      Examples:
         | sheet       | row | time |
         | Remove_Item | 1   | 70   |
         | Remove_Item | 2   | 70   |
         | Remove_Item | 3   | 70   |
         | Remove_Item | 4   | 70   |


