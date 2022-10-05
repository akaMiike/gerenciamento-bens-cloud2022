package com.example.gerenciamentobens.controller;

import com.example.gerenciamentobens.entity.assets.Asset;
import com.example.gerenciamentobens.entity.user.User;
import com.example.gerenciamentobens.entity.user.UserRepository;
import com.example.gerenciamentobens.entity.user.UserDTO;
import com.example.gerenciamentobens.service.DynamoUtilsService;
import com.example.gerenciamentobens.service.S3UtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    private final PasswordEncoder encoder;
    private final UserRepository userRepository;
    private final S3UtilsService s3UtilsService;
    private final DynamoUtilsService dynamoUtilsService;

    @Autowired
    public UserController(PasswordEncoder encoder, UserRepository userRepository, S3UtilsService s3UtilsService, DynamoUtilsService dynamoUtilsService) {
        this.encoder = encoder;
        this.userRepository = userRepository;
        this.s3UtilsService = s3UtilsService;
        this.dynamoUtilsService = dynamoUtilsService;
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

        return ResponseEntity.status(HttpStatus.CREATED).body(new UserDTO(newUser));
    }

    @GetMapping("")
    public ResponseEntity<UserDTO> getUser(Authentication auth){

        if(auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))){
            return ResponseEntity.ok(new UserDTO("Admin", auth.getName() ,"admin@admin.com"));
        }

        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário não encontrado"));
        return ResponseEntity.ok(new UserDTO(user));
    }

    @DeleteMapping(value = {"", "/{username}"})
    public ResponseEntity<User> deleteUser(Authentication auth, @PathVariable(name = "username", required = false) Optional<String> username){
        User userData;

        if(auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) && username.isPresent()){
            userData = userRepository.findByUsername(username.get()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário não encontrado"));
        }

        else{
            userData = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário não encontrado"));
        }

        List<Asset> allAssets = userData.getAssets();

        for(Asset asset : allAssets){
            s3UtilsService.deleteObjectIfExists(asset.getFileReference());
            dynamoUtilsService.deleteAllValidationsFromAsset(asset.getId());
        }

        userRepository.deleteById(userData.getId());
        return ResponseEntity.noContent().build();

    }

    @PutMapping(value = {"","/{username}"})
    public ResponseEntity<UserDTO> updateUser(Authentication auth, @RequestBody UserDTO userDataUpdated, @PathVariable(name = "username", required = false) Optional<String> username){

        if(userRepository.existsByEmail(userDataUpdated.getEmail()) || userRepository.existsByUsername(userDataUpdated.getUsername())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and/or Username already exists!");
        }

        User userData;

        if(auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) && username.isPresent()){
            userData = userRepository.findByUsername(username.get()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário não encontrado"));
        }

        else{
            userData = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário não encontrado"));
        }

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

