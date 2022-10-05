package com.example.gerenciamentobens.service;

import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import com.example.gerenciamentobens.entity.validations.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.enhanced.dynamodb.*;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

import java.util.Iterator;
import java.util.List;

@Service
public class DynamoUtilsService {

    @Autowired
    private DynamoDbEnhancedClient dynamoDbEnhancedClient;

    public List<Validation> getAllItemsFromAsset(Long idAsset){
        try{
            DynamoDbTable<Validation> table = dynamoDbEnhancedClient.table("Validation", TableSchema.fromBean(Validation.class));

            Expression expression = Expression.builder()
                .expression("idAsset = :idAsset")
                .putExpressionValue(":idAsset", AttributeValue.fromN(idAsset.toString()))
                .build();

            ScanEnhancedRequest scan = ScanEnhancedRequest.builder()
                    .filterExpression(expression)
                    .build();

            return table.scan(scan).items().stream().toList();

        } catch(DynamoDbException e ){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        }
    }

    public Validation putItem(Validation validation){
        try{
            DynamoDbTable<Validation> table = dynamoDbEnhancedClient.table("Validation", TableSchema.fromBean(Validation.class));
            table.putItem(validation);
            return validation;
        } catch(DynamoDbException e ){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Erro ao inserir o log de validação do DynamoDB");
        }
    }

    public void deleteItem(String id){
        try{
            DynamoDbTable<Validation> table = dynamoDbEnhancedClient.table("Validation", TableSchema.fromBean(Validation.class));
            Key key = Key.builder()
                    .partitionValue(id)
                    .build();

            Validation deletedValidation = table.deleteItem(key);

            if(deletedValidation == null){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Log de validação não encontrado.");
            }

        } catch(DynamoDbException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao excluir o log de validação do Dynamo");
        }
    }

    public void deleteAllValidationsFromAsset(Long idAsset){
        DynamoDbTable<Validation> table = dynamoDbEnhancedClient.table("Validation", TableSchema.fromBean(Validation.class));
        List<Validation> allValidations = getAllItemsFromAsset(idAsset);

        for(Validation result : allValidations){
            table.deleteItem(Key.builder().partitionValue(result.getId()).build());
        }

    }
}
