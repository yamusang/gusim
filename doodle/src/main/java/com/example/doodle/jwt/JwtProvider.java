package com.example.doodle.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * JWT 토큰을 생성하고 검증하는 유틸 클래스
 */
@Component
public class JwtProvider {

    // application.properties에 저장된 시크릿 키 주입
    @Value("${jwt.secret}")
    private String secretKeyPlain;

    private Key secretKey;

    // 토큰 유효 시간 (1시간)
    private final long EXPIRATION_TIME = 1000 * 60 * 60L;

    // 초기화 시점에 시크릿 키 암호화 객체로 변환
    @PostConstruct
    public void init() {
        this.secretKey = Keys.hmacShaKeyFor(secretKeyPlain.getBytes());
    }

    /**
     * JWT 토큰 생성
     * @param email 사용자 이메일
     * @return JWT 문자열
     */
    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(email)              // 토큰 주제: 사용자 식별값
                .setIssuedAt(now)               // 발급 시간
                .setExpiration(expiryDate)      // 만료 시간
                .signWith(secretKey, SignatureAlgorithm.HS256) // 암호화 알고리즘 및 키
                .compact();
    }

    /**
     * 토큰에서 사용자 이메일 추출
     */
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject(); // subject에 이메일 담겨 있음
    }

    /**
     * 토큰 유효성 검사
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
            return true; // 예외 없으면 유효함
        } catch (JwtException | IllegalArgumentException e) {
            return false; // 예외 발생 시 무효한 토큰
        }
    }
}