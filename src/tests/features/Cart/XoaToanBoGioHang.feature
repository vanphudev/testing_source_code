# Feature: Xoa toan bo gio hang

#   Scenario: Xoa toan bo gio hang thanh cong voi client_id va Authorization token hop le
#     Given API endpoint la "http://localhost:5555/api/v1/carts/clear"
#     And client_id la "valid_client_id"
#     And Authorization token la "valid_authorization_token"
#     When gui yeu cau POST den API voi client_id va Authorization token
#     Then ma trang thai phan hoi phai la 200
#     And noi dung phan hoi phai chua thong bao "Gio hang da duoc xoa thanh cong"

#   Scenario: Xoa toan bo gio hang that bai khi khong co Authorization token
#     Given API endpoint la "http://localhost:5555/api/v1/carts/clear"
#     And client_id la "valid_client_id"
#     And Authorization token khong duoc cung cap
#     When gui yeu cau POST den API ma khong co Authorization token
#     Then ma trang thai phan hoi phai la 401
#     And noi dung phan hoi phai chua thong bao loi "Truy cap bi tu choi"

#   Scenario: Xoa toan bo gio hang that bai voi client_id khong hop le
#     Given API endpoint la "http://localhost:5555/api/v1/carts/clear"
#     And client_id la "invalid_client_id"
#     And Authorization token la "valid_authorization_token"
#     When gui yeu cau POST den API voi client_id khong hop le
#     Then ma trang thai phan hoi phai la 404
#     And noi dung phan hoi phai chua thong bao loi "Khong tim thay gio hang cho client_id"

#   Scenario: Xoa toan bo gio hang that bai khi Authorization token het han
#     Given API endpoint la "http://localhost:5555/api/v1/carts/clear"
#     And client_id la "valid_client_id"
#     And Authorization token la "expired_authorization_token"
#     When gui yeu cau POST den API voi Authorization token het han
#     Then ma trang thai phan hoi phai la 403
#     And noi dung phan hoi phai chua thong bao loi "Authorization token het han"