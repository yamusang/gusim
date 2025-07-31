// /signup, /login API 요청 조회
package com.example.doodle.controller;

import com.example.doodle.domain.User;
import com.example.doodle.dto.LoginRequest;
import com.example.doodle.dto.SignupRequest;
import com.example.doodle.jwt.JwtProvider;
import com.example.doodle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*") // 프론트 연결 대비
@RestController // JSON 응답을 주는 컨트롤러
@RequestMapping("/api")

public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider; // ✅ 토큰 발급기 의존성 주입

    @PostMapping("/login") //
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        List<User> users = userRepository.findByEmail(request.getEmail());

        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이메일 없음");
        }

        User user = users.get(0); // 가장 첫번째 사용자 기준
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호 틀림");
        }

        // ✅ JWT 토큰 발급
        String token = jwtProvider.generateToken(user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "로그인 성공");
        response.put("userId", user.getId());
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        List<User> existingUsers = userRepository.findByEmail(request.getEmail());

        if (!existingUsers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 가입된 이메일입니다.");
        }

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());
        newUser.setUsername(request.getUsername());

        userRepository.save(newUser);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "회원가입 성공");
        response.put("userId", newUser.getId());

        return ResponseEntity.ok(response);
    }
}
