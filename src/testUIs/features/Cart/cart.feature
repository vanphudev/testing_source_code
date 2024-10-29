@cartFeature
Feature: Thêm sản phẩm vào giỏ hàng

   Background:
      Given Tôi login vào hệ thống với tài khoản "test.example.0002@gmail.com" và mật khẩu "P@ss_123_Word"

   Scenario Outline: Thêm sản phẩm vào giỏ hàng
      Given Tôi có sản phẩm "<product>" cần thêm vào giỏ hàng
      And Tôi chuyển sang trang chi tiết sản phẩm
      And Tôi chọn số lượng sản phẩm là "<quantity>"
      And Tôi nhấn nút thêm vào giỏ hàng
      Then Tôi sẽ chuyển đến trang giỏ hàng và thấy sản phẩm "<product>" với số lượng "<quantity>" trong giỏ hàng

      Examples:
         | product         | quantity |
         | mac_lipstick    | 5        |
         | hada_labo_cream | 2        |
