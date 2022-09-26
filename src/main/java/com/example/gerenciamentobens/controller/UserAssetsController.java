package com.example.gerenciamentobens.controller;

import com.example.gerenciamentobens.entity.assets.Assets;
import com.example.gerenciamentobens.entity.assets.AssetsRepository;
import com.example.gerenciamentobens.entity.user.User;
import com.example.gerenciamentobens.entity.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/assets")
public class UserAssetsController {

    @Autowired
    private AssetsRepository assetsRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public ResponseEntity<List<Assets>> getAllAssets(){
        List<Assets> allAssets = StreamSupport.stream(assetsRepository.findAll().spliterator(), false).toList();
        return ResponseEntity.ok(allAssets);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Assets>> getAllAssetsFromUser(@AuthenticationPrincipal UserDetails userDetails){
        User user = userRepository.findByUsername(userDetails.getUsername()).get();
        return ResponseEntity.ok(user.getAssets());
    }

}
