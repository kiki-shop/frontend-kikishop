# 1.0.0

url: https://frontend-kikishop.onrender.com/

# 1. Những chức năng chính ở phiên bản này

### Add

- Release version 1.0.0

### Change

- Không có

### Fix

- Không có

### Remove

- Không có

```
Requirement:
   ✨ node == 23.x
   ✨ npm == 10.9.0
```

# 2. Cách chạy

## Install package

Mở terminal chỉ đến đường dẫn chưa file dự án
Sau đó cài đặt các thư viện phụ thuộc
Để cài đặt các thư viện, chạy lệnh sau:

```
npm install
```

Tạo file .env. có nội dung được ví dụ trong file .env.example

## Example for enviroment Staging

Ví dụ môi trường staging như sau:
Mở file package.json và tìm mục "scripts".
Sau đó, cập nhật các lệnh build, start, và dev để thêm môi trường staging.

```
"scripts": {
  "dev:staging": "dotenv -e .env.staging vite --mode staging --port $VITE_PORT",
  "start:staging": "dotenv -e .env.staging vite preview --port $VITE_PORT",
  "build:staging": "dotenv -e .env.staging vite build --mode staging"
},
```

## Build source

Để build ứng dụng cho môi trường staging:

```
npm run build
```

## Build and Start

Dùng lệnh này để build và chạy dự án cho môi trường staging:

```
npm run dev:staging
```

## Run Dev Mode

```
npm run dev
```

---

# 3. Bảng biến môi trường

Là các thông số đầu vào để chạy

### 3.1 Các biến môi trường để cấu hình app khi chạy

| Tên biến môi trường      | Giá trị               | Mô tả                               |
| ------------------------ | --------------------- | ----------------------------------- |
| VITE_API_ENDPOINT        | http://example/api/v1 | Url API của CXView đang phát triển  |
| VITE_PORT                | 3000                  | Port mà server sẽ lắng nghe         |
