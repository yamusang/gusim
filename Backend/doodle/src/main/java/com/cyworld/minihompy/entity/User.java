package com.cyworld.minihompy.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    @Column(unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginAt;
    private String profilePictureUrl;
    private String miniHompyName;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}