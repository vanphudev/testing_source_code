@signupFeature
Feature: Signup Page

   Scenario Outline: Đăng ký tài khoản người dùng
      Given Tôi mở trình duyệt và truy cập vào trang đăng ký của hệ thống.
      And Tôi nhập các giá trị đầu vào name là "<name>", phone là "<phone>", email là "<email>", password là "<password>"
      And Tôi nhấn nút hiển thị mật khẩu
      When Tôi nhấn nút đăng ký
      Then Nếu đăng ký thất bại, tôi sẽ thấy thông báo lỗi trên màn hình về "<errorMessage>"

      Examples:
         | name            | phone            | email                  | password   | errorMessage                      |
         | Test User       | 0123456789       | validemail@example.com | Password1! |                                   |
         | Invalid Email   | 0123456789       | invalidemail.com       | Password1! | Email không hợp lệ                |
         | Invalid Phone   | 12345            | test@example.com       | Password1! | Số điện thoại không hợp lệ        |
         | Weak Password   | 0987654321       | test@example.com       | pass       | Mật khẩu phải tối thiểu 6 ký tự   |
         | No Special Char | 0987654321       | test@example.com       | Password1  | Mật khẩu phải chứa ký tự đặc biệt |
         | No Number       | 0987654321       | test@example.com       | Password!  | Mật khẩu phải chứa chữ số         |
         | No Uppercase    | 0987654321       | test@example.com       | password1! | Mật khẩu phải chứa chữ hoa        |
         | No Lowercase    | 0987654321       | test@example.com       | PASSWORD1! | Mật khẩu phải chứa chữ thường     |
         | Valid User      | 0987654321       | test@example.com       | Password1! |                                   |
         | Too Long Phone  | 0123456789012345 | validemail@example.com | Password1! | Số điện thoại không hợp lệ        |
