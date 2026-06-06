package com.cok.backend.global.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3 s3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * S3 서버에 파일 업로드
     * 파일명 중복을 방지하고자, UUID와 결합하여 파일 저장
     * 퍼일 업로드시, 메타데이터가 필요하기에 메타데이터(크기, 타입)도 실어 실제 업로드
     *
     * @param file    업로드할 파일
     * @param dirName 버킷 내 폴더 이름(ex. landing -> landing/에 저장)
     * @return db에 저장할 실제 url
     */
    public String upload(MultipartFile file, String dirName) {
        String fileName = dirName + "/"
                + UUID.randomUUID()
                + "_" + file.getOriginalFilename();

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());

            s3.putObject(bucket, fileName, file.getInputStream(), metadata);
            return s3.getUrl(bucket, fileName).toString();
        } catch (IOException e) {
            throw new RuntimeException("S3 업로드에 실패했습니다.", e);
        }
    }

    /**
     * S3 서버내 파일 삭제
     * 파일 경로를 알아야 삭제를 할 수 있기에, db에 저장된 url을 통해, 파일 경로를 획득 후 삭제
     *
     * @param fileUrl db에 저장된 절대 경로
     */
    public void delete(String fileUrl) {
        String fileName = fileUrl.substring(fileUrl.indexOf(bucket) + bucket.length() + 33);
        log.info("추출된 파일경로: {}", fileName);
        s3.deleteObject(bucket, fileName);
        log.info("s3 삭제 완료: {}", fileName);
    }
}
