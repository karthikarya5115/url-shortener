# Stage 1: Build the backend and frontend
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the entire project
COPY . .

# Fix: Ensure frontend is built first then move it where Maven expects it to be
# Run Maven - our plugin will now find everything in the right place
RUN mvn clean install -DskipTests -f backend/pom.xml

# Stage 2: Run the application
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/backend/target/url-shortener-0.0.1-SNAPSHOT.jar app.jar

# Expose the port
EXPOSE 8080

# Command to run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
