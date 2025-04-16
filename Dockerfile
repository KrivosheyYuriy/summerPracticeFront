# Этап 1: Сборка приложения React
FROM node:23-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы манифеста (package.json и package-lock.json)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --silent

# Копируем все остальные файлы приложения
COPY . .

# Собираем приложение для production
# ВАЖНО: Проверьте, что эта команда создает директорию 'dist' в корне /app
RUN npm run build

# Этап 2: Обслуживание статических файлов с помощью Nginx
FROM nginx:alpine

# Удаляем стандартный файл конфигурации Nginx (опционально)
RUN rm /etc/nginx/conf.d/default.conf

# Копируем собранные файлы React из этапа сборки
# ВАЖНО: Проверьте, что этот путь соответствует месту, где React создает 'dist'
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 3000
EXPOSE 3000

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]