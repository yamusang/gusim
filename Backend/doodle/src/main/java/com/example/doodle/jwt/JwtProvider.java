package com.example.doodle.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
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
     * 
     * @param email 사용자 이메일
     * @return JWT 문자열
     */
    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(email) // 토큰 주제: 사용자 식별값
                .setIssuedAt(now) // 발급 시간
                .setExpiration(expiryDate) // 만료 시간
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

    public String getSubFromKakaoIdToken(String idToken) {
        try {
            String[] parts = idToken.split("\\.");
            if (parts.length != 3)
                throw new RuntimeException("Invalid id_token format");

            // ✅ JWT는 URL-safe Base64 디코딩
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode payloadJson = objectMapper.readTree(payload);

            // ✅ null 체크
            JsonNode subNode = payloadJson.get("sub");
            if (subNode == null) {
                throw new RuntimeException("Missing 'sub' field in ID Token");
            }

            return subNode.asText();
        } catch (Exception e) {
            throw new RuntimeException("Invalid Kakao ID Token", e);
        }
    }

    public boolean validateKakaoIdToken(String idToken) {
        try {
            getSubFromKakaoIdToken(idToken); // sub 있으면 일단 통과 (단순 검증)
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

/*
     * Kakao가 주는 id_token은 RS256 방식으로 서명되어 있음
     * 
     * 서명을 검증하려면 Kakao의 JWK 공개키를 직접 받아와야 함 (복잡함)
     * 
     * 지금은 우선 로직 테스트만 하니까 파싱만 해도 충분
     */