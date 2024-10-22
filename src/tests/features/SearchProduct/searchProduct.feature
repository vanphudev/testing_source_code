Feature: Search Products
   Description: This feature will test the search products API endpoint based on a search term.
   Scenario Outline: Tìm kiếm sản phẩm theo từ khóa
      Given Tôi đã có dữ liệu Excel từ "<sheet>" ở hàng "<row>" cần tìm kiếm sản phẩm
      When Tôi gửi yêu cầu HTTP GET đến "/products/search" để tìm kiếm sản phẩm theo từ khóa
      Then Tôi phải nhận được trạng thái phản hồi khớp với expected_status từ "<sheet>" ở hàng "<row>" ứng với từ khóa tìm kiếm
      And Nếu thành công trạng thái phản hồi là 200, thì Tôi mong muốn kiểm tra dữ liệu trả về từ API endpoint phải đúng với định dạng JSON đồng thời kiểm tra các trường thông tin trả về từ API endpoint phải có thông tin sản phẩm đã được tìm thấy theo từ khóa tìm kiếm.
      And Tôi mong muốn mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds cho mỗi Request mà tôi gửi đi để tìm kiếm sản phẩm.
      Examples:
         | sheet       | row | time |
         | Search_Item | 1   | 40   |
         | Search_Item | 2   | 40   |
         | Search_Item | 3   | 40   |
         | Search_Item | 4   | 40   |
         | Search_Item | 5   | 40   |
         | Search_Item | 6   | 40   |
         | Search_Item | 7   | 40   |
         | Search_Item | 8   | 40   |
         | Search_Item | 9   | 40   |
         | Search_Item | 10  | 40   |

