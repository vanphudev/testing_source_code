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



