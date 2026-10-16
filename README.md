# MOS365.info — Landing page (bản thiết kế lại)

Bản làm lại đẹp hơn của trang [mos365.info](https://mos365.info/) — landing page khóa học luyện thi chứng chỉ MOS 2019/365.

## Công nghệ

- **HTML5 + CSS3 + JavaScript thuần** — không framework, không build step.
- Font **Be Vietnam Pro** (Google Fonts), hỗ trợ tiếng Việt đầy đủ.
- Toàn bộ hình ảnh lưu local trong `assets/images/`.

## Cấu trúc

```
mos365-web/
├── index.html              # Toàn bộ nội dung trang
├── assets/
│   ├── favicon.svg         # Favicon logo "M"
│   ├── mos-gioi-thieu.mp4  # Video giới thiệu (dọc 720x1280, 69 giây)
│   ├── css/style.css       # Design system + responsive
│   ├── js/main.js          # Menu mobile, tabs, video, đếm số, form, toast
│   └── images/             # 15 hình (hero, phần mềm, chứng chỉ, học viên, poster video)
└── README.md
```

## Điểm nổi bật của bản thiết kế mới

- **Hero** 2 cột với ảnh sinh viên UEH, thẻ nổi (floating cards) và khối thống kê đếm số động.
- **5 thẻ khóa học** chuẩn màu Microsoft (Word xanh dương, Excel xanh lá, PowerPoint cam đỏ) + ribbon EXPERT.
- **Tabs tương tác** xem giao diện phần mềm luyện đề Word / Excel / PowerPoint.
- **Section Video giới thiệu** (nền tối): khung điện thoại dọc 9:16 phát video vlog sinh viên UEH, nút play gradient có hiệu ứng pulse, poster trích từ chính video; video chỉ tải khi người dùng bấm play (`preload="none"`).
- **Thư viện ảnh "Góc học viên"** 6 hình với caption trượt khi hover.
- **Form đăng ký** đầy đủ (họ tên, email, SĐT, chọn phiên bản MOS 2019/365, chọn khóa học, ghi chú) có kiểm tra hợp lệ và toast xác nhận.
- Sticky header kính mờ, nút gọi hotline nổi, nút về đầu trang, hiệu ứng reveal khi cuộn.
- Responsive hoàn chỉnh (desktop / tablet / mobile) và tôn trọng `prefers-reduced-motion`.

## Chạy thử

Mở trực tiếp `index.html` trong trình duyệt, hoặc dùng server tĩnh:

```bash
npx serve .
# hoặc
python -m http.server
```

## Lưu ý

- Form đăng ký hiện **chưa gắn backend** — dữ liệu được in ra `console.log` và hiển thị toast xác nhận. Cần nối API/Google Sheet/hệ thống CRM khi triển khai thật.
- Nội dung, hình ảnh và thông tin liên hệ (hotline 0946 600 589) lấy từ trang gốc mos365.info.
