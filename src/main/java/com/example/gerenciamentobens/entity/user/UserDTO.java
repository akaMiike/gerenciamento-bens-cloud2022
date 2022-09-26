package com.example.gerenciamentobens.entity.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String fullName;

    @NotBlank(message = "Nome de usuário não pode ser vazio.")
    private String username;

    @Email(message = "O campo email deve possuir formato de email")
    private String email;

    @Size(min = 8, message = "A senha deve possuir no mínimo 8 caracteres")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public UserDTO(User user){
        this.fullName = user.getFullName();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }

    public UserDTO(String fullName, String username, String email) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
    }
}
