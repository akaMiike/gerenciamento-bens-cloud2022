package com.example.gerenciamentobens.entity.validations;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@DynamoDbBean
public class Validation {
    private String id;
    private Boolean validation;
    private String justification;
    private String idAsset;

    @DynamoDbPartitionKey
    public String getId() {
        return id;
    }
}
