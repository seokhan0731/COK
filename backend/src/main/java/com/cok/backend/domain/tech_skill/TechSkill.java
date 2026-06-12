package com.cok.backend.domain.tech_skill;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.*;

@Getter
@RequiredArgsConstructor
public enum TechSkill {
    SPRING_BOOT(Set.of(
            "spring-boot",
            "spring-boot-starter",
            "spring-boot-starter-web",
            "spring-boot-starter-data-jpa",
            "spring-boot-starter-security",
            "spring-boot-starter-validation",
            "spring-boot-starter-actuator"
    ), true),

    DJANGO(Set.of(
            "django"
    ), true),

    FASTAPI(Set.of(
            "fastapi"
    ), true),

    EXPRESS(Set.of(
            "express"
    ), true),

    NESTJS(Set.of(
            "@nestjs/core",
            "@nestjs/common",
            "@nestjs/platform-express"
    ), true),

    JPA(Set.of(
            "spring-boot-starter-data-jpa",
            "hibernate-core",
            "hibernate",
            "jakarta.persistence-api",
            "javax.persistence-api"
    ), true),

    TYPEORM(Set.of(
            "typeorm"
    ), true),

    REACT(Set.of(
            "react"
    ), true),

    VUE(Set.of(
            "vue"
    ), true),

    NEXT(Set.of(
            "next"
    ), true),

    SVELTE(Set.of(
            "svelte"
    ), true),

    STYLED_COMPONENTS(Set.of(
            "styled-components"
    ), true),

    TAILWINDCSS(Set.of(
            "tailwindcss"
    ), true),

    FLUTTER(Set.of(
            "flutter"
    ), false),

    REACT_NATIVE(Set.of(
            "react-native"
    ), true),

    EXPO(Set.of(
            "expo"
    ), true),

    SWIFT(Set.of(
            "swift"
    ), false),

    KOTLIN(Set.of(
            "kotlin",
            "org.jetbrains.kotlin.jvm",
            "org.jetbrains.kotlin.android"
    ), true),

    PYTORCH(Set.of(
            "torch"
    ), true),

    TENSORFLOW(Set.of(
            "tensorflow"
    ), true),

    KERAS(Set.of(
            "keras"
    ), true),

    TRANSFORMERS(Set.of(
            "transformers"
    ), true),

    SCIKIT_LEARN(Set.of(
            "scikit-learn",
            "sklearn"
    ), true),

    DOCKER(Set.of(
            "docker"
    ), true),

    KUBERNETES(Set.of(
            "kubernetes"
    ), false),

    TERRAFORM(Set.of(
            "terraform"
    ), true),

    ANSIBLE(Set.of(
            "ansible"
    ), false),

    AWS_SDK(Set.of(
            "@aws-sdk/client-s3",
            "@aws-sdk/client-dynamodb",
            "@aws-sdk/client-sqs",
            "aws-sdk",
            "software.amazon.awssdk",
            "aws-java-sdk",
            "boto3"
    ), true),

    SPARK(Set.of(
            "spark-core",
            "spark-sql",
            "spark-streaming",
            "pyspark"
    ), true),

    HADOOP(Set.of(
            "hadoop-common",
            "hadoop-client",
            "hadoop-hdfs"
    ), true),

    AIRFLOW(Set.of(
            "apache-airflow"
    ), true),

    KAFKA(Set.of(
            "spring-kafka",
            "kafka-clients",
            "kafkajs",
            "confluent-kafka",
            "kafka-python"
    ), true),

    PANDAS(Set.of(
            "pandas"
    ), true),

    SQLALCHEMY(Set.of(
            "sqlalchemy"
    ), true),

    CMAKE(Set.of(
            "cmake"
    ), false),

    LINUX(Set.of(
            "linux"
    ), false),

    FREERTOS(Set.of(
            "freertos"
    ), true),

    ARDUINO(Set.of(
            "arduino"
    ), true),

    MAKE(Set.of(
            "make"
    ), true),

    UNITY(Set.of(
            "com.unity",
            "unity"
    ), false),

    UNREAL(Set.of(
            "unreal"
    ), false),

    THREE_JS(Set.of(
            "three"
    ), true),

    WEBGL(Set.of(
            "webgl"
    ), false),

    OPENGL(Set.of(
            "opengl"
    ), false),

    VULKAN(Set.of(
            "vulkan"
    ), false),

    SOLIDITY(Set.of(
            "solidity"
    ), true),

    HARDHAT(Set.of(
            "hardhat"
    ), true),

    TRUFFLE(Set.of(
            "truffle"
    ), true),

    ETHERS_JS(Set.of(
            "ethers"
    ), true),

    WEB3_JS(Set.of(
            "web3"
    ), true),

    FFMPEG(Set.of(
            "ffmpeg",
            "ffmpeg-python"
    ), true),

    WEBRTC(Set.of(
            "webrtc",
            "simple-peer",
            "peerjs"
    ), true),

    GSTREAMER(Set.of(
            "gstreamer"
    ), false),

    OPENCV(Set.of(
            "opencv",
            "opencv-python",
            "opencv-contrib-python"
    ), true),

    LIBROSA(Set.of(
            "librosa"
    ), true);
    private final Set<String> aliases;
    private final boolean autoDetected;

    //자동으로 탐지 불가능한 기술스택 모음
    private static final List<TechSkill> MANUAL_SELECT_SKILLS =
            Arrays.stream(values())
                    .filter(skill -> !skill.isAutoDetected())
                    .toList();

    //매번 alias를 기술스택을 다 돌아서 매핑하기보단, 메모리에 올라오는 시점부터 룩업 테이블 생성
    private static final Map<String, Set<TechSkill>> LOOKUP = new HashMap<>();

    static {
        for (TechSkill skill : values()) {
            for (String alias : skill.getAliases()) {
                LOOKUP.computeIfAbsent(alias.toLowerCase(), k -> new HashSet<>())
                        .add(skill);
            }
        }
    }

    public static Set<TechSkill> from(String alias) {
        return LOOKUP.getOrDefault(alias.toLowerCase(), Set.of());
    }

    public static List<TechSkill> getManualSelectSkills() {
        return MANUAL_SELECT_SKILLS;
    }
}
