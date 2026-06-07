package com.cok.backend.global.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {
    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String region;

    /**
     * AWS S# 서버와 통신하는 객체 생성
     * 자격 증명을 담는 객체 credentials 생성 후, 주입하여 실제 통신 객체 생성
     *ㄴ
     * @return 실제 s3와 통신하는 객체 반환
     */
    @Bean
    public AmazonS3 s3Client() {
        //자격 증명 담는 객체 credentials
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

        return AmazonS3ClientBuilder.standard()
                //현재는 mvp 개발 단계이기 때문에, application.yml에서 주입받아 사용하는 static 자격증명으로 설정
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(region).build();
    }
}
