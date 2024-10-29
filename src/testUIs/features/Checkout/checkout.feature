@checkoutFeature
Feature: Đặt hàng sản phẩm

   Scenario Outline: Đặt hàng sản phẩm đã có trong giỏ hàng
      Given Tôi mở trình duyệt và truy cập vào trang đăng nhập của hệ thống.
      And Tôi nhập tên đăng nhập là "<username>" và mật khẩu là "<password>"
      And Tôi nhấn nút đăng nhập
      And Tôi chuyển sang trang giỏ hàng
      And Tôi chọn nhấn nút đặt hàng
      And Tôi chọn tỉnh là "<province>"
      And Tôi chọn quận/huyện là "<district>"
      And Tôi chọn xã là "<ward>"
      And Tôi nhập địa chỉ cụ thể trên đường là "<address>"
      And Tôi nhập các giá trị đầu vào để tiến hành thanh toán name là "<name>", phone là "<phone>", email là "<email>", note là "<note>"
      And Tôi chọn phương thức thanh toán là "<paymentMethod>"
      When Tôi nhấn nút đặt hàng
      Then Nếu đặt hàng thành công, tôi sẽ chuyển đến đơn hàng của tôi
      And Nếu đặt hàng thất bại, tôi sẽ thấy thông báo lỗi trên màn hình về "<errorMessage>"

      Examples:
         | username                    | password      | province      | district       | ward          | address      | name         | phone      | email         | note      | paymentMethod | errorMessage |
         | test.example.0001@gmail.com | P@ss_123_Word | Tỉnh Bắc Ninh | Huyện Gia Bình | Xã Bình Dương | Số 1 Phố Huế | Nguyễn Văn A | 0123456789 | a@example.com | Ghi chú 1 | COD           |              |
# | test.example.0001@gmail.com | P@ss_123_Word | Tỉnh Bắc Ninh | Huyện Tiên Du  | Xã Hiên Vân   | Số 2 Đường Lê Lợi | Trần Thị B   | 0987654321 | b@example.com | Ghi chú 2 | COD           |              |
