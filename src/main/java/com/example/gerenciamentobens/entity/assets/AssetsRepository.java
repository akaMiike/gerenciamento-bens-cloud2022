package com.example.gerenciamentobens.entity.assets;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface AssetsRepository extends CrudRepository<Asset, Long>, JpaRepository<Asset, Long> {

}
