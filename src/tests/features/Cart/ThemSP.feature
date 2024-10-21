Feature: Add Product to Cart
  Description: This feature will test the Add Product to Cart API endpoint.

  @Add_Item
  Scenario Outline: Thêm sản phẩm vào giỏ hàng của người dùng
    Given Tôi có dữ liệu người dùng từ "<sheet>" ở hàng "<row>"
    When Tôi gửi yêu cầu POST đến "/api/v1/carts/additem"
    Then Tôi sẽ nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>"
    And Nếu trạng thái phản hồi là 200, thì tôi sẽ nhận được dữ liệu giỏ hàng của người dùng
    And Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds

    Examples:
      | sheet    | row | time |
      | Add_Item | 1   | 1800  |
      | Add_Item | 2   | 1800  |
      | Add_Item | 3   | 1800  |
      | Add_Item | 4   | 1800  |
      | Add_Item | 5   | 1800  |
      | Add_Item | 6   | 1800  |


