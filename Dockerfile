# Используем Node.js в качестве базового образа
FROM node:18 as build-deps

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Сборка приложения
RUN npm run build

# Используем Nginx в качестве базового образа для развертывания
FROM nginx:latest

# Копируем статические файлы из сборки React в рабочую директорию Nginx
COPY --from=build-deps /app/build /usr/share/nginx/html

# Копируем настройки Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Экспортируем порт, который будет использоваться в контейнере
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
