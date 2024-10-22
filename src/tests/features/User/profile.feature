Feature: Update User Profile
   Description: This feature will test the update user profile endpoint.
   Scenario Outline: Cập nhật thông tin cá nhân của người dùng
      Given Tôi có dữ liệu Excel người dùng và các Input cập nhật thông tin tương ứng với người dùng từ "<sheet>" ở hàng "<row>"
      When Tôi gửi yêu cầu Http PUT đến Endpoint "/api/v1/user/update" với dữ liệu người dùng đọc từ Excel
      Then Tôi nhận được trạng thái phản hồi khớp với expected_status mà tôi mong muốn từ "<sheet>" ở hàng "<row>"
      And Nếu trạng thái phản hồi 200, thì tôi sẽ nhận được thông tin người dùng đã được cập nhật
      And Tôi sẽ kiểm tra dữ liệu trả về có đúng với định dạng kiểu JSON không
      And Tôi sẽ kiểm tra các trường thông tin người dùng đã được cập nhật có đúng với dữ liệu đã gửi lên không đồng thời kiểm tra thông tin token và refresh token có được kèm theo trong dữ liệu trả về không
      And Tôi muốn kiểm tra mỗi Request chỉ chấp nhận trong thời gian "<time>" milliseconds

      Examples:
         | sheet   | row | time |
         | profile | 1   | 40   |
         | profile | 2   | 40   |
         | profile | 3   | 40   |
         | profile | 4   | 40   |
         | profile | 5   | 40   |
         | profile | 6   | 40   |
         | profile | 7   | 40   |
         | profile | 8   | 40   |
         | profile | 9   | 40   |
         | profile | 10  | 40   |
         | profile | 11  | 40   |
         | profile | 12  | 40   |
         | profile | 13  | 40   |
         | profile | 14  | 40   |
         | profile | 15  | 40   |
         | profile | 16  | 40   |
         | profile | 17  | 40   |
         | profile | 18  | 40   |
         | profile | 19  | 40   |
         | profile | 20  | 40   |
         | profile | 21  | 40   |
         | profile | 22  | 40   |
         | profile | 23  | 40   |
         | profile | 24  | 40   |
         | profile | 25  | 40   |
         | profile | 26  | 40   |
         | profile | 27  | 40   |
         | profile | 28  | 40   |
         | profile | 29  | 40   |
         | profile | 30  | 40   |
         | profile | 31  | 40   |
         | profile | 32  | 40   |
         | profile | 33  | 40   |
         | profile | 34  | 40   |
         | profile | 35  | 40   |
         | profile | 36  | 40   |
         | profile | 37  | 40   |
         | profile | 38  | 40   |
         | profile | 39  | 40   |
         | profile | 40  | 40   |
         | profile | 41  | 40   |
         | profile | 42  | 40   |
         | profile | 43  | 40   |
         | profile | 44  | 40   |
         | profile | 45  | 40   |
         | profile | 46  | 40   |
         | profile | 47  | 40   |
         | profile | 48  | 40   |
         | profile | 49  | 40   |
         | profile | 50  | 40   |
         | profile | 51  | 40   |
         | profile | 52  | 40   |
         | profile | 53  | 40   |
         | profile | 54  | 40   |
         | profile | 55  | 40   |
         | profile | 56  | 40   |
         # | profile | 57  | 40   |
         # | profile | 58  | 40   |
         # | profile | 59  | 40   |
         # | profile | 60  | 40   |
         # | profile | 61  | 40   |
         # | profile | 62  | 40   |
         # | profile | 63  | 40   |
         # | profile | 64  | 40   |
         # | profile | 65  | 40   |
         # | profile | 66  | 40   |
         # | profile | 67  | 40   |
         # | profile | 68  | 40   |
         # | profile | 69  | 40   |
         # | profile | 70  | 40   |
         # | profile | 71  | 40   |