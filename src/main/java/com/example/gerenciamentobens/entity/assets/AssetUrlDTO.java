package com.example.gerenciamentobens.entity.assets;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssetUrlDTO {
    private Asset asset;
    private String presignedUrl;
}
