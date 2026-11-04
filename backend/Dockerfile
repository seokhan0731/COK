# `docker build -t cok-backend .`
# 루트에 넣으면 다른 컨텍스트들도 읽어야 하니, backend 디렉터리에 배치시킴

# 빌드 단계(JAR 생성)
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# 라이브러리 다운로드
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon

COPY src src

# 링킹 이후, JAR 생성
RUN ./gradlew bootJar --no-daemon

# 실행 단계(JRE로 빌드 단계에서 만든 JAR 실행)
FROM eclipse-temurin:21-jre
WORKDIR /app

# java 실행을 위해서는 jar만 존재하면 되니까, jar만 별도로 챙기기
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080

# 컨테이너 기동시, java -jar app.jar이 실행된다.
ENTRYPOINT ["java","-jar","app.jar"]