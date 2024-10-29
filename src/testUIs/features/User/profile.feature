@profileFeature
Feature: Cập nhật thông tin người dùng

   Scenario Outline: Cập nhật thông tin cá nhân người dùng
      Given Tôi mở trình duyệt và truy cập vào trang đăng nhập của hệ thống.
      And Tôi nhập tên đăng nhập là "<username>" và mật khẩu là "<password>"
      And Tôi nhấn nút đăng nhập
      And Tôi chuyển sang trang cập nhật thông tin cá nhân của người dùng
      And Tôi chọn chức năng cập nhật thông tin cá nhân
      And Tôi nhập tên là "<name>"
      And Tôi nhập email là "<email>"
      And Tôi chọn tỉnh là "<province>"
      And Tôi chọn quận/huyện là "<district>"
      And Tôi chọn xã là "<ward>"
      And Tôi nhập tên đường là "<street>"
      And Tôi nhập mô tả bio là "<bio>"
      When Tôi nhấn nút cập nhật thông tin
      Then Nếu cập nhật thành công, tôi sẽ thấy thông báo xác nhận
      And Nếu cập nhật thất bại, tôi sẽ thấy thông báo lỗi về "<errorMessage>"

      Examples:
         | username                    | password      | name         | email         | province      | district       | ward          | street       | bio                                                               | errorMessage |
         | test.example.0001@gmail.com | P@ss_123_Word | Nguyễn Văn A | a@example.com | Tỉnh Bắc Ninh | Huyện Gia Bình | Xã Bình Dương | Số 1 Phố Huế | Mô tả ngắn gọn 1 nội dung dành cho profile cá nhân của người dùng |              |

