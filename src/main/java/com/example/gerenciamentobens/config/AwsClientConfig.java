package com.example.gerenciamentobens.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

@Configuration
public class AwsClientConfig {

    @Bean
    public AmazonS3 amazonS3Client(){
        AWSStaticCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(
                new BasicAWSCredentials("",
                        ""));
        return AmazonS3ClientBuilder.standard()
                .withCredentials(credentialsProvider)
                .withPathStyleAccessEnabled(true)
                .withEndpointConfiguration(
                        new EndpointConfiguration("http://localhost:10000", "us-east-1"))
                .build();
    }

    @Bean
    public DynamoDbEnhancedClient amazonDynamoEnhancedClient(){
        DynamoDbClient dynamoClient = DynamoDbClient.builder()
                .region(Region.US_EAST_1)
                .build();

        return DynamoDbEnhancedClient.builder()
                .dynamoDbClient(dynamoClient)
                .build();
    }
}
