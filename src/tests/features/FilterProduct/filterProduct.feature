Feature: Filter Products by Category
   Description: This feature will test the filter products API endpoint based on category ID.

   Scenario Outline: Lọc sản phẩm theo loại
      Given Tôi đã có dữ liệu Excel mã loại sản phẩm từ "<sheet>" ở hàng "<row>" cần lọc theo loại sản phẩm đó
      When Tôi gửi yêu cầu HTTP GET đến "/products/filter" để lọc sản phẩm theo loại sản phẩm tương ứng
      Then Tôi phải nhận được trạng thái phản hồi khớp với expected_status từ "<sheet>" ở hàng "<row>" ứng với loại sản phẩm cần lọc
      And Tôi mong muốn kiểm tra dữ liệu trả về từ API endpoint phải đúng với định dạng JSON đồng thời kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin sản phẩm đã được lọc theo loại sản phẩm thành công.
      And Tôi mong muốn mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds cho mỗi Request mà tôi gửi đi để lọc sản phẩm theo loại sản phẩm

      Examples:
         | sheet           | row | time |
         | Filter_Category | 1   | 50   |
         | Filter_Category | 2   | 50   |
         | Filter_Category | 3   | 50   |
         | Filter_Category | 4   | 50   |
         | Filter_Category | 5   | 50   |
         | Filter_Category | 6   | 50   |
