package com.example.gerenciamentobens.entity.user;

import com.example.gerenciamentobens.entity.assets.Assets;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "user")
    private List<Assets> assets = new ArrayList<>();

    @Column(name = "password")
    private String password;

    public User(String fullName, String username, String email, String password){
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(Long id, String fullName, String username, String email, String password){
        this.id = id;
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.password = password;
    }

}
