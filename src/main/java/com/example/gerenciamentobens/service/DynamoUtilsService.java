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
            Validation validation = table.getItem(key);

            if(validation == null){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Log de validação não encontrado.");
            }

            return validation;
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
}
