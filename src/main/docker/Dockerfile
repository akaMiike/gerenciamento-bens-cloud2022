FROM openjdk:19-alpine
ARG JAR_FILE=/target/*.jar
COPY ${JAR_FILE} Gerenciamento-de-bens-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "Gerenciamento-de-bens-0.0.1-SNAPSHOT.jar"]