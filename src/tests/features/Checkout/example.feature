# // Scenario Outline: Xác thực được người dùng và thanh toán thành công
#     //     Given Tôi có dữ liệu người dùng từ "<sheet>" ở hàng "<row>"
#     //     And Tôi có dữ liệu thanh toán từ "<sheet>" ở hàng "<row_payment>"
#     //     When Tôi gửi yêu cầu POST đến "/api/v1/orders/create" với dữ liệu thanh toán
#     //     Then Tôi sẽ nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>"
#     //     And Nếu trạng thái phản hồi là 200, thì tôi sẽ nhận được dữ liệu đặt hàng của người dùng
#     //     And Tôi kiểm tra dữ liệu trả về có giống với các input đầu vào từ file Excel không

   #  // Examples:
   #  //     | sheet           | row | row_payment | 
   #  //     | checkout_test2  | 2   | 2           | 
   #  //     | checkout_test2  | 3   | 3           | 
   #  //     | checkout_test2  | 4   | 4           | 

   #  // Scenario Outline: Xác thực được người dùng và thanh toán không thành công
   #  //     Given Tôi có dữ liệu người dùng từ "<sheet>" ở hàng "<row>"
   #  //     When Tôi gửi yêu cầu POST đến "/api/v1/orders/create" với dữ liệu thanh toán
   #  //     Then Tôi sẽ nhận được trạng thái phản hồi với expected_status từ "<sheet>" ở hàng "<row>"
   #  //     And Nếu trạng thái phản hồi là 400, thì tôi sẽ nhận được thông báo lỗi tương ứng với input đầu vào

   #  // Examples:
   #  //     | sheet           | row  | 
   #  //     | checkout_test3  | 2    |  
   #  //     | checkout_test3  | 3    | 
   #  //     | checkout_test3  | 4    | 
   #  //     | checkout_test3  | 5    | 
   #  //     | checkout_test3  | 6    | 
   #  //     | checkout_test3  | 7    | 
   #  //     | checkout_test3  | 8    | 
   #  //     | checkout_test3  | 9    | 
   #  //     | checkout_test3  | 10   | 
   #  //     | checkout_test3  | 11   | 
   #  //     | checkout_test3  | 12   | 
   #  //     | checkout_test3  | 13   | 
   #  //     | checkout_test3  | 14   | 
   #  //     | checkout_test3  | 15   | 
   #  //     | checkout_test3  | 16   | 
   #  //     | checkout_test3  | 17   | 
   #  //     | checkout_test3  | 18   | 
   #  //     | checkout_test3  | 19   | 
   #  //     | checkout_test3  | 20   | 
   #  //     | checkout_test3  | 21   | 
   #  //     | checkout_test3  | 22   | 
   #  //     | checkout_test3  | 23   | 
   #  //     | checkout_test3  | 24   | 
   #  //     | checkout_test3  | 25   | 
   #  //     | checkout_test3  | 26   | 
   #  //     | checkout_test3  | 27   | 
   #  //     | checkout_test3  | 28   | 
   #  //     | checkout_test3  | 29   | 
   #  //     | checkout_test3  | 30   | 
   #  //     | checkout_test3  | 31   | 
   #  //     | checkout_test3  | 32   | 
   #  //     | checkout_test3  | 33   |

# Feature: Kiem tra API checkout voi cac buoc thanh toan

#    Scenario: Xac nhan thanh toan khong co tham so hop le
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Khong co thong tin nguoi dung và don hang"

#    Scenario: Xac nhan thanh toan voi day du tham so hop le khong ap ma giam gia
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 200
#       And Ket qua phai co thong diep "Da thanh toan thanh cong"

#    Scenario: Xac nhan thanh toan voi day du tham so hop le co ap ma giam gia
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And voucherId la "652329d438f1f0a827dd2a02"
#       And discountAmount la 175000
#       And finalPrice la 175000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 200
#       And Ket qua phai co thong diep "Da thanh toan thanh cong"

#    Scenario: Email khong dung dinh dang
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001mail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Email khong hop le"

#    Scenario: So dien thoai khong dung dinh dang
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "012rt34566"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "So dien thoai khong hop le"

# #Feature: Kiem tra API checkout voi cac truong hop thieu tham so

#    Scenario: Thieu userId
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "userId la bat buoc"

#    Scenario: Thieu so dien thoai
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "So dien thoai la bat buoc"

#    Scenario: Thieu email
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Email la bat buoc"

#    Scenario: Thieu danh sach san pham
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Danh sach san pham la bat buoc"

#    Scenario: Danh sach san pham co san pham thieu thanh phan id san pham
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC..."
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Thieu id san pham"

#    Scenario: Danh sach san pham co san pham thanh phan id san pham khong ton tai
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC..."
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64xxx80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "ID san pham khong ton tai"   

#    Scenario: Danh sach san pham co san pham thieu thanh phan ten san pham
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC..."
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Thieu ten san pham"

#    Scenario: Danh sach san pham co san pham thieu thanh phan gia san pham
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC..."
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Thieu gia san pham"

#    Scenario: Danh sach san pham co san pham thieu thanh phan so luong san pham
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC..."
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Thieu so luong san pham" 

#    Scenario: Danh sach san pham co san pham thanh phan so luong san pham la 0
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC..."
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 0" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "So luong san pham phai lon hon 0"

#    Scenario: Thieu tong tien hoa don
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 0
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Tong tien hoa don phai lon hon 0"

#    Scenario: Tong tien hoa don bang 0
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 0
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 0
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Tong tien hoa don phai lon hon 0"

#    Scenario: Thieu dia chi nhan hang
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Dia chi nhan hang la bat buoc"

#    Scenario: Dia chi nhan hang thieu thanh phan dia chi
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Dia chi giao hang chua day du"

#    Scenario: Dia chi nhan hang thieu thanh phan xa phuong
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Dia chi giao hang chua day du"

#    Scenario: Dia chi nhan hang thieu thanh phan quan huyen
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Dia chi giao hang chua day du"

#    Scenario: Dia chi nhan hang thieu thanh phan tinh thanh pho
#       Scenario: Dia chi nhan hang thieu thanh phan quan huyen
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Dia chi giao hang chua day du"

#    Scenario: Thieu phuong thuc thanh toan
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And finalPrice la 350000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "Phuong thuc thanh toan la bat buoc"  

#    Scenario: Thieu gia cuoi cung
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "finalPrice la bat buoc"

#    Scenario: Gia cuoi cung lon hon tong hoa don
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 400000
#       And note la "Ghi chu"
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 400
#       And Ket qua phai co thong diep "finalPrice la bat buoc"

#    Scenario: Khong co ghi chu
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       And userId la "6713b547adcb273b0c19f904"
#       And phone la "0123456789"
#       And email la "test.examdplesss0001@gmail.com"
#       And items bao gom "productId: 64b7d80c2f798bca464c1500, name: San pham A, price: 100, quantity: 2" va "productId: 64b7d80c2f798bca464c1501, name: San pham B, price: 150, quantity: 1"
#       And totalPrice la 350000
#       And shippingAddress la "140 Le Trong Tan, phuong Tay Thanh, quan Tan Phu, TP HCM"
#       And paymentMethod la "COD"
#       And finalPrice la 350000
#       When Toi gui yeu cau POST den API 
#       Then Ket qua phai tra ve ma trang thai la 200
#       And Ket qua phai co thong diep "Da thanh toan thanh cong"      

# #Feature: Loi xac thuc nguoi dung
#    Scenario: Khong co client_id trong yeu cau
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la ""
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       When Toi gui yeu cau POST den API voi client_id sai va authorization
#       Then Ket qua phai tra ve ma trang thai la 405
#       And Ket qua phai co thong diep "client_id la bat buoc"

#    Scenario: Client_id khong hop le
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la ""
#       And authorization la "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       When Toi gui yeu cau POST den API ma khong co client_id
#       Then Ket qua phai tra ve ma trang thai la 405
#       And Ket qua phai co thong diep "client_id la bat buoc"   

#    Scenario: Khong co authorization trong yeu cau
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la ""
#       When Toi gui yeu cau POST den API ma khong co authorization
#       Then Ket qua phai tra ve ma trang thai la 405
#       And Ket qua phai co thong diep "authorization la bat buoc"

#    Scenario: Authorization khong hop le
#       Given API endpoint "http://localhost:5555/api/v1/orders/create"
#       And client_id la "6714d097fe1613621f5fbd62"
#       And authorization la "eyXXbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0ZDA5N2ZlMTYxMzYyMWY1ZmJkNjIiLCJlbWFpbCI6InRlc3QuZXhhbWRwMTNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDI0ODE3LCJleHAiOjE3NjA5ODI0MTd9.4B2CUg2bhVGQ_MULWFWOUJzJO40wff5B7RIDRxYVUys"
#       When Toi gui yeu cau POST den API voi client_id va authorization sai
#       Then Ket qua phai tra ve ma trang thai la 405
#       And Ket qua phai co thong diep "authorization khong hop le"
