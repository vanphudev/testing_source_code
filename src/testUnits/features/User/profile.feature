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
         | profile | 1   | 50   |
         | profile | 2   | 50   |
         | profile | 3   | 50   |
         | profile | 4   | 50   |
         | profile | 5   | 50   |
         | profile | 6   | 50   |
         | profile | 7   | 50   |
         | profile | 8   | 50   |
         | profile | 9   | 50   |
         | profile | 10  | 50   |
         | profile | 11  | 50   |
         | profile | 12  | 50   |
         | profile | 13  | 50   |
         | profile | 14  | 50   |
         | profile | 15  | 50   |
         | profile | 16  | 50   |
         | profile | 17  | 50   |
         | profile | 18  | 50   |
         | profile | 19  | 50   |
         | profile | 20  | 50   |
         | profile | 21  | 50   |
         | profile | 22  | 50   |
         | profile | 23  | 50   |
         | profile | 24  | 50   |
         | profile | 25  | 50   |
         | profile | 26  | 50   |
         | profile | 27  | 50   |
         | profile | 28  | 50   |
         | profile | 29  | 50   |
         | profile | 30  | 50   |
         | profile | 31  | 50   |
         | profile | 32  | 50   |
         | profile | 33  | 50   |
         | profile | 34  | 50   |
         | profile | 35  | 50   |
         | profile | 36  | 50   |
         | profile | 37  | 50   |
         | profile | 38  | 50   |
         | profile | 39  | 50   |
         | profile | 40  | 50   |
         | profile | 41  | 50   |
         | profile | 42  | 50   |
         | profile | 43  | 50   |
         | profile | 44  | 50   |
         | profile | 45  | 50   |
         | profile | 46  | 50   |
         | profile | 47  | 50   |
         | profile | 48  | 50   |
         | profile | 49  | 50   |
         | profile | 50  | 50   |
         | profile | 51  | 50   |
         | profile | 52  | 50   |
         | profile | 53  | 50   |
         | profile | 54  | 50   |
         | profile | 55  | 50   |
         | profile | 56  | 50   |
         | profile | 57  | 50   |
         | profile | 58  | 50   |
         | profile | 59  | 50   |
         | profile | 60  | 50   |
         | profile | 61  | 50   |
         | profile | 62  | 50   |
         | profile | 63  | 50   |
         | profile | 64  | 50   |
         | profile | 65  | 50   |
         | profile | 66  | 50   |
# | profile | 67  | 50   |
# | profile | 68  | 50   |
# | profile | 69  | 50   |
# | profile | 70  | 50   |
# | profile | 71  | 50   |