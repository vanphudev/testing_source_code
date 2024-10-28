Feature: Update Product Quantity in Cart
   Description: This feature will test the update product quantity API endpoint by increasing the quantity of a product by 1 in the user's cart.

   Scenario Outline: Cập nhật số lượng sản phẩm trong giỏ hàng của người dùng bằng cách tăng lên 1
      Given Tôi đã có dữ liệu người dùng từ "<sheet>" ở hàng "<row>" cần cập nhật số lượng sản phẩm trong giỏ hàng
      When Tôi gửi yêu cầu HTTP PUT đến "<url>" với dữ liệu cập nhật số lượng sản phẩm là 1 trong giỏ hàng của người dùng
      Then Tôi phải nhận được trạng thái phản hồi khớp với expected_status từ "<sheet>" ở hàng "<row>"
      And Nếu trạng thái phản hồi là 200, tôi sẽ phải nhận được dữ liệu giỏ hàng của người dùng với số lượng sản phẩm đã được tăng lên 1
      And Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds cho mỗi Request mà tôi gửi đi để cập nhật số lượng sản phẩm trong giỏ hàng lên 1 sản phẩm

      Examples:
         | sheet         | row | time |
         | Increase_Item | 1   | 60   |
         | Increase_Item | 2   | 60   |
         | Increase_Item | 3   | 60   |
         | Increase_Item | 4   | 60   |
         | Increase_Item | 5   | 60   |
         | Increase_Item | 6   | 60   |

   Scenario Outline: Cập nhật số lượng sản phẩm trong giỏ hàng của người dùng bằng cách giảm xuống 1
      Given Tôi đã có dữ liệu Excel người dùng từ "<sheet>" ở hàng "<row>" cần cập nhật số lượng sản phẩm trong giỏ hàng của người dùng
      When Tôi gửi yêu cầu HTTP PUT đến "<url>" để giảm số lượng sản phẩm trong giỏ hàng của người dùng xuống 1
      Then Tôi phải nhận được trạng thái phản hồi khớp với expected_status từ "<sheet>" ở hàng "<row>" ứng với giỏ hàng của người dùng
      And Nếu trạng thái phản hồi là 200, tôi sẽ phải nhận được dữ liệu giỏ hàng của người dùng với số lượng sản phẩm đã được giảm xuống 1
      And Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds cho mỗi Request mà tôi gửi đi để cập nhật số lượng sản phẩm trong giỏ hàng giảm xuống 1 sản phẩm

      Examples:
         | sheet         | row | time |
         | Decrease_Item | 1   | 60   |
         | Decrease_Item | 2   | 60   |
         | Decrease_Item | 3   | 60   |
         | Decrease_Item | 4   | 60   |
         | Decrease_Item | 5   | 60   |
         | Decrease_Item | 6   | 60   |

