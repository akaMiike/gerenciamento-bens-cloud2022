package com.example.gerenciamentobens.service;

import com.example.gerenciamentobens.entity.validations.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

@Service
public class DynamoUtilsService {

    @Autowired
    private DynamoDbEnhancedClient dynamoDbEnhancedClient;

    public Validation getItem(String id){
        try{
            DynamoDbTable<Validation> table = dynamoDbEnhancedClient.table("Validation", TableSchema.fromBean(Validation.class));
            Key key = Key.builder()
                    .partitionValue(id)
                    .build();
            return table.getItem(key);
        } catch(DynamoDbException e ){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Erro ao obter o log de validação do DynamoDB");
        }
    }
}
