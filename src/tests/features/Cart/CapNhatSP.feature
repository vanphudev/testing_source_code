Feature: Update Product Quantity in Cart
   Description: This feature will test the update product quantity API endpoints.

   Scenario Outline: Cập nhật số lượng sản phẩm trong giỏ hàng của người dùng
      Given Tôi có dữ liệu người dùng "<sheet>" ở hàng "<row>"
      When Tôi muốn gửi yêu cầu PUT đến "<url>"
      Then Tôi nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>"
      And Nếu trạng thái phản hồi trả về 200, thì tôi sẽ nhận được dữ liệu giỏ hàng của người dùng
      And Tôi mong muốn sẽ kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds

   Examples:
      | sheet  | row | time | url                                           |
      | Update  | 1   | 1800  | /api/v1/carts/increaseQuantity |
      | Update  | 2   | 1800  | /api/v1/carts/decreaseQuantity |
      | Update  | 4   | 1800  | /api/v1/carts/decreaseQuantity |
      | Update  | 3   | 1800  | /api/v1/carts/increaseQuantity |
      | Update  | 5   | 1800  | /api/v1/carts/increaseQuantity |
      | Update  | 6   | 1800  | /api/v1/carts/decreaseQuantity |
