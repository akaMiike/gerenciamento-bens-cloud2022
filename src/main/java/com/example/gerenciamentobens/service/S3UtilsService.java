package com.example.gerenciamentobens.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.net.URL;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class S3UtilsService {

    @Value("${aws.s3.bucket-name}")
    String bucketName;

    /* Create a new S3 Object or update if an object with the same name already exists */
    public void createOrUpdateObject(AmazonS3 s3, MultipartFile file, String filePath){
        try{
            ObjectMetadata fileMetadata = new ObjectMetadata();
            fileMetadata.setContentLength(file.getSize());
            fileMetadata.setContentType(file.getContentType());

            s3.putObject(bucketName, filePath, file.getInputStream(), fileMetadata);
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Houve um erro ao realizar o upload do arquivo para a S3");
        }
    }

    public String generatePreSignedObjectUrl(AmazonS3 s3, String filePath){
        Date expiration = new Date();
        long expTimeMillis = Instant.now().toEpochMilli();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);

        GeneratePresignedUrlRequest presignedUrlRequest =  new GeneratePresignedUrlRequest(bucketName,filePath)
                .withMethod(HttpMethod.GET)
                .withExpiration(expiration);

        URL url = s3.generatePresignedUrl(presignedUrlRequest);
        return url.toString();
    }

    public void deleteObjectIfExists(AmazonS3 s3, String objectName){
        try{
            s3.deleteObject(bucketName,objectName);
        } catch(AmazonServiceException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Erro ao deletar o arquivo do S3");
        }
    }
}
