package com.example.doodle.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity; // JPA(Java Persistence API) 관련 어노테이션
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue; 
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;

@Entity // 이 User 클래스는 DB 테이블
@Getter @Setter
// @Table(name = "user")
@Table(name = "\"USER\"") 

public class User {

    @Id // 기본 키(PK) 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID 값을 자동으로 증가시키겠다는 설정
    private Long id;

    @Column(unique = true) // 👈 중복 방지 설정!
    // 로그인에 필요한 필드(DB 컬럼이 됨)
    private String email; 
    private String password;
    private String username;

    @Column(unique = true)
    private String kakaoId; // 카카오 고유 식별자 (sub)
    
}

/*
JPA : 자바에서 DB를 쉽게 다루게 해주는 표준 인터페이스

CREATE TABLE "USER" (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);
=> JPA + Hibernate 가 이걸 자동으로 생성해서 실행해줌


*/