Feature: Add Product to Cart
   Description: This feature will test the Add Product to Cart API endpoint.
   @Add_Item
   Scenario Outline: Thêm sản phẩm vào giỏ hàng của người dùng
      Given Tôi có dữ liệu Excel chứa thông tin người dùng, sảm phẩm và số lượng sản phẩm từ "<sheet>" ở hàng "<row>" cần thêm vào giỏ hàng
      When Tôi gửi yêu cầu giao thức Http POST đến "/api/v1/carts/additem" với dữ liệu Excel người dùng
      Then Tôi sẽ nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>"
      And Nếu trạng thái phản hồi là 200, thì tôi sẽ nhận được dữ liệu giỏ hàng của người dùng sau khi thêm sản phẩm
      And Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds
      And Tôi mong muốn dữ liệu trả về từ API endpoint phải đúng với định dạng JSON đồng thời kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin người dùng đã thêm sản phẩm vào giỏ hàng thành công.
      Examples:
         | sheet    | row | time |
         | Add_Item | 1   | 50   |
         | Add_Item | 2   | 50   |
         | Add_Item | 3   | 50   |
         | Add_Item | 4   | 50   |
         | Add_Item | 5   | 50   |
         | Add_Item | 6   | 50   |


