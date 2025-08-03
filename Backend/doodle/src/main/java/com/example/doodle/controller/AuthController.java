package com.example.doodle.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // JWT는 서버 세션이 없으므로 단순 응답만
        return ResponseEntity.ok("로그아웃 완료");
    }
}
