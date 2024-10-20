Feature: Get User Cart
   Description: This feature will test the get user cart endpoint.
   Scenario Outline: Lấy giỏ hàng của người dùng
      Given Tôi có dữ liệu người dùng từ "<sheet>" ở hàng "<row>"
      When Tôi gửi yêu cầu GET đến "/api/v1/carts/getcart/byuser"
      Then Tôi sẽ nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>"
      And Nếu trạng thái phản hồi là 200, thì tôi sẽ nhận được dữ liệu giỏ hàng của người dùng
      And Tôi sẽ kiểm tra dữ liệu trả về có đúng với định dạng JSON
      And Tôi sẽ kiểm tra các trường thông tin của giỏ hàng của người dùng
      And Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds
      Examples:
         | sheet | row | time |
         | Users | 2   | 800  |
         | Users | 3   | 800  |
         | Users | 4   | 800  |
         | Users | 5   | 800  |
         | Users | 6   | 800  |
         | Users | 7   | 800  |
