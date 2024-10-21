Feature: Get User Cart
   Description: This feature will test the get user cart endpoint.
   @C
   Scenario Outline: Lấy giỏ hàng của người dùng
      Given Tôi có dữ liệu người dùng từ "<sheet>" hàng "<row>"
      When Tôi gửi yêu cầu GET đến đường dẫn "/api/v1/carts/getcart/byuser"
      Then Tôi nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>"
      And Nếu trạng thái phản hồi 200, thì tôi sẽ nhận được dữ liệu giỏ hàng của người dùng
      And Tôi sẽ kiểm tra dữ liệu trả về có đúng với định dạng kiểu JSON
      And Tôi sẽ kiểm tra các trường thông tin giỏ hàng của người dùng
      And Tôi muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds
      Examples:
         | sheet | row | time |
         | Users | 1   | 1800 |
         | Users | 2   | 1800 |
         | Users | 3   | 1800 |

