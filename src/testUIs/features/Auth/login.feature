# @loginFeature
# Feature: Đăng nhập
#    Để sử dụng các chức năng của hệ thống bán hàng Beauty Store, người dùng cần phải đăng nhập vào hệ thống.
#    Scenario Outline: Đăng nhập vào hệ thống với tài khoản từ file Excel
#       Given Tôi mở trình duyệt và truy cập vào trang đăng nhập của hệ thống bán hàng Beauty Store.
#       And Tôi có dữ liệu người dùng từ file Excel tại sheet "<sheet>" và row "<row>".
#       When Tôi nhập username và password vào 2 input form đăng nhập.
#       And Tôi nhấn nút hiển thị mật khẩu để kiểm tra mật khẩu đã nhập.
#       And Tôi nhấn nút đăng nhập.
#       Then Nếu đăng nhập thành công, tôi sẽ thấy trang chính của hệ thống bán hàng Beauty Store.
#       Then Nếu đăng nhập thất bại, tôi sẽ thấy thông báo lỗi trên màn hình của trình duyệt "Invalid username or password".

#       Examples:
#          | sheet  | row |
#          | signin | 1   |
#          | signin | 2   |
#          | signin | 3   |
#          | signin | 4   |
#          | signin | 5   |
#          | signin | 6   |

