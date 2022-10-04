package com.example.gerenciamentobens.entity.validations;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidationDTO {

    @NotNull(message = "Validação deve ser positiva ou negativa")
    private Boolean validation;

    @NotBlank(message = "Justificativa não pode ser vazia")
    private String justification;

    @PositiveOrZero(message = "Id do bem deve ser válido")
    private Long idAsset;

    public Validation toModel(){
        return new Validation(validation, justification, idAsset);
    }
}

