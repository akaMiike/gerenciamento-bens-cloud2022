package com.example.gerenciamentobens.controller;

import com.example.gerenciamentobens.entity.validations.Validation;
import com.example.gerenciamentobens.service.DynamoUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/validation")
public class ValidationController {

    @Autowired
    private DynamoUtilsService dynamoUtilsService;

    @GetMapping("/{id}")
    public ResponseEntity<Validation> getValidation(@PathVariable("id") String id){
        return ResponseEntity.ok(dynamoUtilsService.getItem(id));
    }

    /*@PostMapping("")
    public ResponseEntity<Validation> postValidation(@RequestBody)*/
}
