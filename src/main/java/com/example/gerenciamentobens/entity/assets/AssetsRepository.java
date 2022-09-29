package com.example.gerenciamentobens.entity.assets;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AssetsRepository extends CrudRepository<Asset, Long>, JpaRepository<Asset, Long> {
    Optional<Asset> findByIdAndUserUsername(Long id, String username);
}
