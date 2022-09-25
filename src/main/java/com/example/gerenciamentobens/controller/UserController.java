package com.example.gerenciamentobens.controller;

import com.example.gerenciamentobens.entity.User;
import com.example.gerenciamentobens.entity.UserRepository;
import com.example.gerenciamentobens.entity.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO userData){
        if(userRepository.existsByEmail(userData.getEmail()) || userRepository.existsByUsername(userData.getUsername())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists");
        }

        User newUser = new User(
                userData.getFullName(),
                userData.getUsername(),
                userData.getEmail(),
                encoder.encode(userData.getPassword())
        );

        userRepository.save(newUser);

        return ResponseEntity.ok(new UserDTO(
                userData.getFullName(),
                userData.getUsername(),
                userData.getEmail()
        ));
    }

}

