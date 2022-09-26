package com.example.gerenciamentobens.controller;

import com.example.gerenciamentobens.entity.user.User;
import com.example.gerenciamentobens.entity.user.UserRepository;
import com.example.gerenciamentobens.entity.user.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    private final PasswordEncoder encoder;
    private final UserRepository userRepository;

    public UserController(PasswordEncoder encoder, UserRepository userRepository) {
        this.encoder = encoder;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO userData){
        if(userRepository.existsByEmail(userData.getEmail()) || userRepository.existsByUsername(userData.getUsername())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and/or Username already exists");
        }

        User newUser = new User(
                userData.getFullName(),
                userData.getUsername(),
                userData.getEmail(),
                encoder.encode(userData.getPassword())
        );

        userRepository.save(newUser);

        return ResponseEntity.ok(new UserDTO(newUser));
    }

    @GetMapping("")
    public ResponseEntity<UserDTO> getUser(@AuthenticationPrincipal UserDetails userDetails){
        User user = userRepository.findByUsername(userDetails.getUsername()).get();
        return ResponseEntity.ok(new UserDTO(user));
    }

    @DeleteMapping("")
    public void deleteUser(@AuthenticationPrincipal UserDetails userDetails){
        User userData = userRepository.findByUsername(userDetails.getUsername()).get();
        userRepository.deleteById(userData.getId());
    }

    @PutMapping("")
    public ResponseEntity<UserDTO> updateUser(@AuthenticationPrincipal UserDetails userDetails,
                                              @RequestBody UserDTO userDataUpdated){

        if(userRepository.existsByEmail(userDataUpdated.getEmail()) || userRepository.existsByUsername(userDataUpdated.getUsername())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and/or Username already exists!");
        }

        User userData = userRepository.findByUsername(userDetails.getUsername()).get();
        userRepository.save(
                new User(
                        userData.getId(),
                        userDataUpdated.getFullName(),
                        userDataUpdated.getUsername(),
                        userDataUpdated.getEmail(),
                        encoder.encode(userDataUpdated.getPassword())
                )
        );

        return ResponseEntity.ok(userDataUpdated);
    }

}

