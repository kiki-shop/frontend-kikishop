# --- Build stage ---
FROM node:20-alpine AS builder

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và lock file
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Cài đặt dependency (ưu tiên dùng npm vì bạn dùng package-lock.json)
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Build ứng dụng
RUN npm run build

# --- Production stage ---
FROM nginx:alpine

# Copy file build từ stage trước vào thư mục Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config nếu cần (nếu bạn dùng React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng mặc định của Nginx
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
