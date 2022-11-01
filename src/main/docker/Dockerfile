FROM maven:3-amazoncorretto-19 as build_jar

COPY pom.xml .
RUN mvn dependency:resolve

COPY src src
RUN mvn package -DskipTests

FROM openjdk:19-alpine
ARG JAR_FILE=target/*.jar
COPY --from=build_jar ${JAR_FILE} Gerenciamento-de-bens-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "Gerenciamento-de-bens-0.0.1-SNAPSHOT.jar"]