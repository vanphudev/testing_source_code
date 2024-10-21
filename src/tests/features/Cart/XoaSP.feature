Feature: Remove Cart Item
   Description: This feature will test the remove item from the user cart endpoint.

   Scenario Outline: Xóa sản phẩm ra khỏi giỏ hàng của người dùng
      Given Tôi đã có dữ liệu người dùng từ "<sheet>" ở hàng "<row>"
      When Tôi muốn gửi yêu cầu DELETE đến "/api/v1/carts/removeitem" với dữ liệu
      Then Tôi nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>"
      And Nếu trạng thái phản hồi là 200, tôi sẽ nhận được thông báo thành công
      And Tôi kiểm tra dữ liệu có đúng với định dạng JSON
      And Tôi kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds

   Examples:
      | sheet       | row | time |
      | Remove_Item | 1   | 1800  |
      | Remove_Item | 2   | 1800  |
      | Remove_Item | 3   | 1800  |
      | Remove_Item | 4   | 1800  |
 
