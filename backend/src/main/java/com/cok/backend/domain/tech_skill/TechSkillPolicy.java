package com.cok.backend.domain.tech_skill;

import com.cok.backend.domain.job.JobPolicy;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.EnumMap;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public enum TechSkillPolicy {
    // ========== [백엔드 개발자] ==========
    SPRING_BOOT_BACKEND(TechSkill.SPRING_BOOT, JobPolicy.BACKEND, 3),
    DJANGO_BACKEND(TechSkill.DJANGO, JobPolicy.BACKEND, 3),
    FASTAPI_BACKEND(TechSkill.FASTAPI, JobPolicy.BACKEND, 3),
    EXPRESS_BACKEND(TechSkill.EXPRESS, JobPolicy.BACKEND, 3),
    NESTJS_BACKEND(TechSkill.NESTJS, JobPolicy.BACKEND, 3),
    JPA_BACKEND(TechSkill.JPA, JobPolicy.BACKEND, 1),
    TYPEORM_BACKEND(TechSkill.TYPEORM, JobPolicy.BACKEND, 1),

    // ========== [프론트엔드 개발자] ==========
    REACT_FRONTEND(TechSkill.REACT, JobPolicy.FRONTEND, 3),
    VUE_FRONTEND(TechSkill.VUE, JobPolicy.FRONTEND, 3),
    NEXT_FRONTEND(TechSkill.NEXT, JobPolicy.FRONTEND, 3),
    NEXT_BACKEND(TechSkill.NEXT, JobPolicy.BACKEND, 1),
    SVELTE_FRONTEND(TechSkill.SVELTE, JobPolicy.FRONTEND, 3),
    STYLED_COMPONENTS_FRONTEND(TechSkill.STYLED_COMPONENTS, JobPolicy.FRONTEND, 1),
    TAILWINDCSS_FRONTEND(TechSkill.TAILWINDCSS, JobPolicy.FRONTEND, 1),

    // ========== [모바일 개발자] ==========
    FLUTTER_MOBILE(TechSkill.FLUTTER, JobPolicy.MOBILE, 3),
    REACT_NATIVE_MOBILE(TechSkill.REACT_NATIVE, JobPolicy.MOBILE, 3),
    EXPO_MOBILE(TechSkill.EXPO, JobPolicy.MOBILE, 3),
    SWIFT_MOBILE(TechSkill.SWIFT, JobPolicy.MOBILE, 3),
    KOTLIN_MOBILE(TechSkill.KOTLIN, JobPolicy.MOBILE, 3),
    KOTLIN_BACKEND(TechSkill.KOTLIN, JobPolicy.BACKEND, 1),

    // ========== [AI/ML 엔지니어] ==========
    PYTORCH_AI_ML(TechSkill.PYTORCH, JobPolicy.AI_ML, 3),
    TENSORFLOW_AI_ML(TechSkill.TENSORFLOW, JobPolicy.AI_ML, 3),
    KERAS_AI_ML(TechSkill.KERAS, JobPolicy.AI_ML, 3),
    TRANSFORMERS_AI_ML(TechSkill.TRANSFORMERS, JobPolicy.AI_ML, 3),
    SCIKIT_LEARN_AI_ML(TechSkill.SCIKIT_LEARN, JobPolicy.AI_ML, 3),
    SCIKIT_LEARN_DATA(TechSkill.SCIKIT_LEARN, JobPolicy.DATA, 1),

    // ========== [DevOps 엔지니어] ==========
    DOCKER_DEVOPS(TechSkill.DOCKER, JobPolicy.DEVOPS, 3),
    DOCKER_BACKEND(TechSkill.DOCKER, JobPolicy.BACKEND, 1),
    DOCKER_DATA(TechSkill.DOCKER, JobPolicy.DATA, 1),
    KUBERNETES_DEVOPS(TechSkill.KUBERNETES, JobPolicy.DEVOPS, 3),
    KUBERNETES_BACKEND(TechSkill.KUBERNETES, JobPolicy.BACKEND, 1),
    TERRAFORM_DEVOPS(TechSkill.TERRAFORM, JobPolicy.DEVOPS, 3),
    ANSIBLE_DEVOPS(TechSkill.ANSIBLE, JobPolicy.DEVOPS, 3),
    AWS_SDK_DEVOPS(TechSkill.AWS_SDK, JobPolicy.DEVOPS, 1),
    AWS_SDK_BACKEND(TechSkill.AWS_SDK, JobPolicy.BACKEND, 1),

    // ========== [데이터 엔지니어] ==========
    SPARK_DATA(TechSkill.SPARK, JobPolicy.DATA, 3),
    HADOOP_DATA(TechSkill.HADOOP, JobPolicy.DATA, 3),
    AIRFLOW_DATA(TechSkill.AIRFLOW, JobPolicy.DATA, 3),
    KAFKA_DATA(TechSkill.KAFKA, JobPolicy.DATA, 3),
    KAFKA_BACKEND(TechSkill.KAFKA, JobPolicy.BACKEND, 3), // 백엔드 메시지 큐 교집합
    PANDAS_DATA(TechSkill.PANDAS, JobPolicy.DATA, 1),
    PANDAS_AI_ML(TechSkill.PANDAS, JobPolicy.AI_ML, 1),
    SQLALCHEMY_DATA(TechSkill.SQLALCHEMY, JobPolicy.DATA, 1),
    SQLALCHEMY_BACKEND(TechSkill.SQLALCHEMY, JobPolicy.BACKEND, 1),

    // ========== [시스템/임베디드 개발자] ==========
    CMAKE_SYSTEM_EMBEDDED(TechSkill.CMAKE, JobPolicy.SYSTEM_EMBEDDED, 3),
    LINUX_SYSTEM_EMBEDDED(TechSkill.LINUX, JobPolicy.SYSTEM_EMBEDDED, 3),
    FREERTOS_SYSTEM_EMBEDDED(TechSkill.FREERTOS, JobPolicy.SYSTEM_EMBEDDED, 3),
    ARDUINO_SYSTEM_EMBEDDED(TechSkill.ARDUINO, JobPolicy.SYSTEM_EMBEDDED, 3),
    MAKE_SYSTEM_EMBEDDED(TechSkill.MAKE, JobPolicy.SYSTEM_EMBEDDED, 1),

    // ========== [그래픽스 엔지니어] ==========
    UNITY_GRAPHICS(TechSkill.UNITY, JobPolicy.GRAPHICS, 3),
    UNREAL_GRAPHICS(TechSkill.UNREAL, JobPolicy.GRAPHICS, 3),
    THREE_JS_GRAPHICS(TechSkill.THREE_JS, JobPolicy.GRAPHICS, 3),
    THREE_JS_FRONTEND(TechSkill.THREE_JS, JobPolicy.FRONTEND, 1),
    WEBGL_GRAPHICS(TechSkill.WEBGL, JobPolicy.GRAPHICS, 3),
    WEBGL_FRONTEND(TechSkill.WEBGL, JobPolicy.FRONTEND, 1),
    OPENGL_GRAPHICS(TechSkill.OPENGL, JobPolicy.GRAPHICS, 3),
    OPENGL_SYSTEM_EMBEDDED(TechSkill.OPENGL, JobPolicy.SYSTEM_EMBEDDED, 1),
    VULKAN_GRAPHICS(TechSkill.VULKAN, JobPolicy.GRAPHICS, 3),
    VULKAN_SYSTEM_EMBEDDED(TechSkill.VULKAN, JobPolicy.SYSTEM_EMBEDDED, 1),

    // ========== [블록체인 엔지니어] ==========
    SOLIDITY_BLOCKCHAIN(TechSkill.SOLIDITY, JobPolicy.BLOCKCHAIN, 3),
    HARDHAT_BLOCKCHAIN(TechSkill.HARDHAT, JobPolicy.BLOCKCHAIN, 3),
    TRUFFLE_BLOCKCHAIN(TechSkill.TRUFFLE, JobPolicy.BLOCKCHAIN, 3),
    ETHERS_JS_BLOCKCHAIN(TechSkill.ETHERS_JS, JobPolicy.BLOCKCHAIN, 3),
    ETHERS_JS_FRONTEND(TechSkill.ETHERS_JS, JobPolicy.FRONTEND, 1),
    WEB3_JS_BLOCKCHAIN(TechSkill.WEB3_JS, JobPolicy.BLOCKCHAIN, 3),
    WEB3_JS_FRONTEND(TechSkill.WEB3_JS, JobPolicy.FRONTEND, 1),

    // ========== [영상/음성 엔지니어 (Media)] ==========
    FFMPEG_MEDIA(TechSkill.FFMPEG, JobPolicy.MEDIA, 3),
    FFMPEG_BACKEND(TechSkill.FFMPEG, JobPolicy.BACKEND, 1),
    WEBRTC_MEDIA(TechSkill.WEBRTC, JobPolicy.MEDIA, 3),
    WEBRTC_FRONTEND(TechSkill.WEBRTC, JobPolicy.FRONTEND, 1),
    GSTREAMER_MEDIA(TechSkill.GSTREAMER, JobPolicy.MEDIA, 3),
    OPENCV_MEDIA(TechSkill.OPENCV, JobPolicy.MEDIA, 3),
    OPENCV_AI_ML(TechSkill.OPENCV, JobPolicy.AI_ML, 3),
    LIBROSA_MEDIA(TechSkill.LIBROSA, JobPolicy.MEDIA, 3),
    LIBROSA_AI_ML(TechSkill.LIBROSA, JobPolicy.AI_ML, 1);

    // ---------------------------------------------------------

    private final TechSkill skill;
    private final JobPolicy job;
    private final double score;

    private static final Map<TechSkill, Map<JobPolicy, Double>> LOOKUP = new EnumMap<>(TechSkill.class);

    static {
        for (TechSkillPolicy policy : values()) {
            LOOKUP.computeIfAbsent(policy.getSkill(), k -> new EnumMap<>(JobPolicy.class))
                    .put(policy.getJob(), policy.getScore());
        }
    }

    /**
     * 룩업에 따른 점수 반환
     * TechSkillPolicy가 점수가 부여된 필드들만 존재하기에,
     * key(skill)값에 따른 map이 없다면, 빈 map
     * 첫 번쨰 getORDefault에서 갖고온 map(job:점수)에서 점수를 부여받는 직무가 없다면, 0점 부여
     *
     * @param skill 기술스택
     * @param job   마스터직무
     * @return 기술스택, 직무에 따른 부여 점수
     */
    public static double getScore(TechSkill skill, JobPolicy job) {
        return LOOKUP.getOrDefault(skill, Collections.emptyMap())
                .getOrDefault(job, 0.0);
    }
}
