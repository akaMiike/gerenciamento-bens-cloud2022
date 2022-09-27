package com.example.gerenciamentobens.controller;

import com.example.gerenciamentobens.entity.assets.Asset;
import com.example.gerenciamentobens.entity.assets.AssetDTO;
import com.example.gerenciamentobens.entity.assets.AssetsRepository;
import com.example.gerenciamentobens.entity.user.User;
import com.example.gerenciamentobens.entity.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/assets")
public class UserAssetsController {

    @Autowired
    private AssetsRepository assetsRepository;
    @Autowired
    private UserRepository userRepository;

//    @GetMapping("")
//    public ResponseEntity<List<Assets>> getAllAssets(){
//        List<Assets> allAssets = StreamSupport.stream(assetsRepository.findAll().spliterator(), false).toList();
//        return ResponseEntity.ok(allAssets);
//    }

    @GetMapping("")
    public ResponseEntity<List<Asset>> getAllAssetsFromUser(@AuthenticationPrincipal UserDetails userDetails){
        User user = userRepository.findByUsername(userDetails.getUsername()).get();
        return ResponseEntity.ok(user.getAssets());
    }

    @PostMapping("")
    public ResponseEntity<Asset> insertNewAsset(@AuthenticationPrincipal UserDetails userDetails,
                                                @ModelAttribute AssetDTO assetDTO) {
        assetDTO.validateFileFormat();
        User user = userRepository.findByUsername(userDetails.getUsername()).get();
        var asset = assetDTO.toModel(user, "dummy");
        var createdAsset = assetsRepository.save(asset);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAsset);
    }

    @PutMapping("{id}")
    public ResponseEntity<Asset> updateAsset(@AuthenticationPrincipal UserDetails userDetails,
                                             @ModelAttribute AssetDTO assetDTO,
                                             @PathVariable Long id) {
        assetDTO.validateFileFormat();
        User user = userRepository.findByUsername(userDetails.getUsername()).get();

        var asset = assetDTO.toModel(user, "dummy", id);
        var updatedAsset = assetsRepository.save(asset);
        return ResponseEntity.status(HttpStatus.OK).body(updatedAsset);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Asset> deleteAsset(@PathVariable Long id) {
        assetsRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
