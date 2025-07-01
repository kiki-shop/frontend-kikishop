# --- Build stage ---
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy package files
    COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
    
    # Cài dependencies
    RUN npm install
    
    # Copy toàn bộ source code vào container
    COPY . .
    
    # Nhận biến môi trường từ --build-arg
    ARG VITE_API_ENDPOINT
    ENV VITE_API_ENDPOINT=$VITE_API_ENDPOINT
    
    # Tạo file .env để Vite đọc
    RUN echo "VITE_API_ENDPOINT=$VITE_API_ENDPOINT" > .env
    
    # Build ứng dụng React
    RUN npm run build
    
    # --- Production stage ---
    FROM nginx:alpine
    
    # Copy file build vào nginx
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Copy custom nginx config (React Router SPA)
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    