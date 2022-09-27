package com.example.gerenciamentobens.entity.assets;

import com.example.gerenciamentobens.entity.user.User;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.*;
import java.util.List;

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

    public void validateFileFormat() {
        var validContentTypes = List.of("application/pdf", "image/png", "image/jpeg");
        var isFileContentTypeValid = validContentTypes.contains(file.getContentType());

        if (!isFileContentTypeValid) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Valid file format! Accepted formats are: pdf, png and jpeg!");
    }
}
