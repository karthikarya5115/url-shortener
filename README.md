# URL Shortener Project

A sleek and modern URL shortener built with **Spring Boot** (Backend), **React** (Frontend), and **MySQL** (Database).

## Prerequisites

- JDK 17 or higher
- Maven
- Node.js & npm
- MySQL Server

## Getting Started

### 1. Database Setup

1. Create a MySQL database named `urlshortener_db`:
   ```sql
   CREATE DATABASE urlshortener_db;
   ```
2. Update the database credentials in `backend/src/main/resources/application.properties` (username and password).

### 2. Run Backend (Spring Boot)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

### 3. Run Frontend (React)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

## Features

- **Modern UI**: Clean, responsive design with glassmorphism.
- **Short URL Generation**: Automatically generates unique short codes for long URLs.
- **Redirection**: Visit the short URL (e.g., `http://localhost:8080/xyz123`) to be redirected to the original link.
- **Persistence**: All mappings are stored in MySQL.
