package com.example.doodle.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

/**
 * JWT 인증 필터
 * - 모든 요청을 가로채서 JWT 토큰이 있으면 유효한지 검사하고
 * - 인증 객체(SecurityContext)를 생성해서 Spring Security에게 넘겨줌
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    // JwtProvider는 토큰 생성, 검증 기능을 담당하는 유틸 클래스
    public JwtAuthenticationFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    /**
     * 실제 요청을 가로채서 JWT를 검사하는 핵심 메서드
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
                                    throws ServletException, IOException {

        // 요청 헤더에서 JWT 토큰 추출
        String token = resolveToken(request);

        // 토큰이 존재하고 유효한 경우
        if (StringUtils.hasText(token) && jwtProvider.validateToken(token)) {

            // 토큰에서 사용자 정보(email) 꺼냄
            String email = jwtProvider.getEmailFromToken(token);

            // 스프링 시큐리티가 인식할 수 있는 인증 객체 생성
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,                // 사용자명
                            null,                 // 비밀번호 없음 (이미 인증된 상태)
                            Collections.emptyList() // 권한(roles)은 비워둠
                    );

            // 요청의 상세 정보를 인증 객체에 추가
            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            // 시큐리티 컨텍스트에 인증 객체 등록 (이후 컨트롤러에서 사용 가능)
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 다음 필터로 넘김 (계속 진행)
        filterChain.doFilter(request, response);
    }

    /**
     * 요청 헤더에서 Bearer 토큰 추출
     * ex) Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
     */
    private String resolveToken(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (StringUtils.hasText(bearer) && bearer.startsWith("Bearer ")) {
            return bearer.substring(7); // "Bearer " 이후 토큰 부분만 추출
        }
        return null;
    }
}
