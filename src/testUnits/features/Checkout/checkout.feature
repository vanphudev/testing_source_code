Feature: Kiem tra API checkout voi cac buoc thanh toan
   Scenario Outline: Khong xac thuc duoc nguoi dung
      Given Tôi có dữ liệu người dùng từ "<sheet>" ở hàng "<row>"
      When Tôi gửi yêu cầu POST đến "/api/v1/orders/create"
      Then Tôi sẽ nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>"
      And Nếu trạng thái phản hồi là 419, thì tôi sẽ không được phép thanh toán và yêu cầu đăng nhập lại
      And Dữ liệu trả về có đúng với định dạng JSON
      And Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds
      Examples:
         | sheet          | row | time |
         | checkout_test1 | 1   | 70   |
         | checkout_test1 | 2   | 70   |
         | checkout_test1 | 3   | 70   |
         | checkout_test1 | 4   | 70   |

   Scenario Outline: Xac thuc duoc nguoi dung
      Given Tôi có dữ liệu Excel người dùng từ "<sheet>" ở hàng "<row>" để thực hiện thanh toán
      When Tôi gửi yêu cầu POST đến "/api/v1/orders/create" để tạo đơn hàng
      Then Tôi sẽ nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>" để kiểm tra
      And Nếu trạng thái phản hồi là 201, thì tôi sẽ nhận được trạng thái phản hồi với thông tin đơn hàng đã được tạo thành công
      And Dữ liệu trả về có đúng với định dạng JSON và thông tin người dùng đã được xác thực
      And Tôi mong muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds để kiểm tra
      Examples:
         | sheet          | row | time |
         | checkout_test2 | 1   | 70   |
         | checkout_test2 | 2   | 70   |
         | checkout_test2 | 3   | 70   |
         | checkout_test2 | 4   | 70   |
         | checkout_test2 | 5   | 70   |
         | checkout_test2 | 6   | 70   |
         | checkout_test2 | 7   | 70   |
         | checkout_test2 | 8   | 70   |
         | checkout_test2 | 9   | 70   |
         | checkout_test2 | 10  | 70   |
         | checkout_test2 | 11  | 70   |
         | checkout_test2 | 12  | 70   |
         | checkout_test2 | 13  | 70   |
         | checkout_test2 | 14  | 70   |
         | checkout_test2 | 15  | 70   |
         | checkout_test2 | 16  | 70   |
         | checkout_test2 | 17  | 70   |
         | checkout_test2 | 18  | 70   |
         | checkout_test2 | 19  | 70   |
         | checkout_test2 | 20  | 70   |
         | checkout_test2 | 21  | 70   |
         | checkout_test2 | 22  | 70   |
         | checkout_test2 | 23  | 70   |
         | checkout_test2 | 24  | 70   |
         | checkout_test2 | 25  | 70   |
         | checkout_test2 | 26  | 70   |
         | checkout_test2 | 27  | 70   |
         | checkout_test2 | 28  | 70   |
         | checkout_test2 | 29  | 70   |
         | checkout_test2 | 30  | 70   |
         | checkout_test2 | 31  | 70   |
         | checkout_test2 | 32  | 70   |
         | checkout_test2 | 33  | 70   |



