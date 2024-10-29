@signupFeature
Feature: Search Product

   Scenario Outline: Tìm kiếm sản phẩm
      Given Tôi mở trình duyệt và truy cập vào trang chính của hệ thống.
      And Tôi nhập từ khóa tìm kiếm là "<keyword>" vào ô tìm kiếm
      When Tôi nhấn nút tìm kiếm sản phẩm
      Then Tôi sẽ thấy kết quả tìm kiếm trang sản phẩm hiển thị
      And Tôi sẽ thấy sản phẩm "<product>" trong kết quả tìm kiếm

      Examples:
         | keyword  | product                |
         | Son môi  | Son môi MAC            |
         | Phấn phủ | Phấn phủ Laura Mercier |