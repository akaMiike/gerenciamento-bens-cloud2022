package com.example.gerenciamentobens.entity.assets;

import com.example.gerenciamentobens.entity.user.User;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Data
public class AssetDTO {
    private final MultipartFile file;
    private final String name;
    private final String assetNumber;
    private final String location;

    public Asset toModel(User user, String fileReference) {
        return this.toModel(user, fileReference, null);
    }

    public Asset toModel(User user, String fileReference, Long id) {
        return new Asset(id, fileReference, name, assetNumber, location, user);
    }
}
