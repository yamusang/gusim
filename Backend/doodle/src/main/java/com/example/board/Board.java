// 게시글 엔티티(DB 테이블 매핑)

package com.example.board;

import java.time.LocalDateTime;

import com.example.doodle.domain.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Table(name ="Posts")
public class Board {
    @Id// PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "post_id")
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // FK
    private User user;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at",  updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "view_count")
    private Integer viewCount = 0;

    @Column(name = "is_deleted")
    private Boolean isDeleted = false;

    @PrePersist // 생성/수정 시 자동 시간 세팅
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.createdAt == null) this.viewCount = 0;
        if (this.createdAt == null) this. isDeleted = false;
    }
    @PreUpdate // 생성/수정 시 자동 시간 세팅
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}

/*
TEXT 타입?
 */