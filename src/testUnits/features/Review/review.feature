Feature: Review Product
   Description: This feature will test the product review endpoint.

   Scenario Outline: Người dùng đánh giá sản phẩm
      Given Tôi có dữ liệu Excel về đánh giá sản phẩm và các Input tương ứng từ "<sheet>" ở hàng "<row>"
      When Tôi gửi yêu cầu Http POST đến Endpoint "/api/v1/orders/rateproduct" với dữ liệu đánh giá sản phẩm đọc từ Excel
      Then Tôi nhận được trạng thái phản hồi khớp với expected_status mà tôi mong muốn từ "<sheet>" ở hàng "<row>"
      And Nếu trạng thái phản hồi 200, thì tôi sẽ nhận được thông tin đánh giá sản phẩm đã được tạo thành công
      And Tôi sẽ kiểm tra dữ liệu trả về có đúng với định dạng JSON không
      And Tôi sẽ kiểm tra các trường thông tin đánh giá sản phẩm có đúng với dữ liệu đã gửi lên không
      And Tôi muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds
      Examples:
         | sheet  | row | time |
         | review | 1   | 50   |
         | review | 2   | 50   |
         | review | 3   | 50   |
         | review | 4   | 50   |
         | review | 5   | 50   |
         | review | 6   | 50   |
         | review | 7   | 50   |
         | review | 8   | 50   |
         | review | 9   | 50   |
         | review | 10  | 50   |
         | review | 11  | 50   |
         | review | 12  | 50   |
         | review | 13  | 50   |
         | review | 14  | 50   |
         | review | 15  | 50   |
         | review | 16  | 50   |
         | review | 17  | 50   |
         | review | 18  | 50   |
         | review | 19  | 50   |
         | review | 20  | 50   |