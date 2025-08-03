package com.cyworld.minihompy.controller;

import com.cyworld.minihompy.dto.AuthRequestDto;
import com.cyworld.minihompy.dto.AuthResponseDto;
import com.cyworld.minihompy.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }
}
