package com.example.doodle.controller;

import com.example.doodle.domain.User;
import com.example.doodle.dto.LoginRequest;
import com.example.doodle.dto.SignupRequest;
import com.example.doodle.jwt.JwtProvider;
import com.example.doodle.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder; // ✅ 추가
    private final HttpSession session;

    // ✅ 일반 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이메일 없음");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호 틀림");
        }

        String token = jwtProvider.generateToken(user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "로그인 성공");
        response.put("userId", user.getId());
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    // ✅ 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 가입된 이메일입니다.");
        }

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword())); // ✅ 암호화
        newUser.setUsername(request.getUsername());

        userRepository.save(newUser);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "회원가입 성공");
        response.put("userId", newUser.getId());

        return ResponseEntity.ok(response);
    }

    // ✅ 카카오 로그인
    @PostMapping("/kakao-login")
    public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        String state = body.get("state");

        System.out.println("✅ 카카오 로그인 요청 도착: code = " + code + ", state = " + state);

        String savedState = (String) session.getAttribute("kakao_login_state");
        if (savedState != null && !savedState.equals(state)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("잘못된 state 값입니다.");
        }

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "f06cf639edb35cf75245bd8280da84de");
        params.add("redirect_uri", "http://localhost:5173/auth/kakao/callback");
        params.add("code", code);
        params.add("scope", "openid");
        params.add("client_secret", "i3JltYOrgQcVgrnrfNpEFHSvbAn8zOyQ");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<Map> response;

        try {
            response = restTemplate.postForEntity("https://kauth.kakao.com/oauth/token", request, Map.class);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("카카오 토큰 요청 중 오류 발생");
        }

        if (!response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("카카오 토큰 요청 실패");
        }

        Object idTokenObj = response.getBody().get("id_token");
        if (idTokenObj == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("카카오 id_token 없음 (scope=openid 누락?)");
        }

        String idToken = idTokenObj.toString();

        if (!jwtProvider.validateKakaoIdToken(idToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 ID Token");
        }

        String kakaoId = jwtProvider.getSubFromKakaoIdToken(idToken);

        Optional<User> userOpt = userRepository.findByKakaoId(kakaoId);
        User user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            user = new User();
            user.setKakaoId(kakaoId);
            userRepository.save(user);
        }

        String token = jwtProvider.generateToken(user.getEmail() == null ? "kakao_" + kakaoId : user.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "userId", user.getId(),
                "message", "카카오 로그인 성공"
        ));
    }
}
