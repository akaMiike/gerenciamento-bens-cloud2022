package com.example.gerenciamentobens.entity.validations;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

import java.time.ZonedDateTime;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@DynamoDbBean
public class Validation {
    private String id;
    private Boolean validation;
    private String justification;
    private Long idAsset;
    private ZonedDateTime createdAt = ZonedDateTime.now();

    public Validation(Boolean validation, String justification, Long idAsset){
        this.id = UUID.randomUUID().toString();
        this.validation = validation;
        this.justification = justification;
        this.idAsset = idAsset;

    }

    @DynamoDbPartitionKey
    public String getId() {
        return id;
    }
}
