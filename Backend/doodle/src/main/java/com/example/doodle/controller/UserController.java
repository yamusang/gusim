package com.example.doodle.controller;

import com.example.doodle.domain.User;
import com.example.doodle.dto.LoginRequest;
import com.example.doodle.dto.SignupRequest;
import com.example.doodle.jwt.JwtProvider;
import com.example.doodle.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private HttpSession session;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        List<User> users = userRepository.findByEmail(request.getEmail());

        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이메일 없음");
        }

        User user = users.get(0);
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호 틀림");
        }

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

    @PostMapping("/kakao-login")
    public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        String state = body.get("state");

        System.out.println("✅ 카카오 로그인 요청 도착: code = " + code + ", state = " + state);

        String savedState = (String) session.getAttribute("kakao_login_state");
        if (savedState != null && !savedState.equals(state)) {
            System.out.println("❌ 상태 불일치: saved=" + savedState + ", received=" + state);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("잘못된 state 값입니다.");
        }

        // 카카오 토큰 요청
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "f06cf639edb35cf75245bd8280da84de"); // 실제 값 유지
        params.add("redirect_uri", "http://localhost:5173/auth/kakao/callback");
        params.add("code", code);
        params.add("scope", "openid");
        params.add("client_secret", "i3JltYOrgQcVgrnrfNpEFHSvbAn8zOyQ"); // 너의 클라이언트 시크릿

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<Map> response;

        try {
            response = restTemplate.postForEntity("https://kauth.kakao.com/oauth/token", request, Map.class);
            System.out.println("✅ 카카오 응답 수신 성공");
            System.out.println("🔍 카카오 응답 내용: " + response.getBody());
        } catch (Exception e) {
            System.err.println("❌ 카카오 토큰 요청 중 예외 발생");
            e.printStackTrace(); // 콘솔에 전체 스택 트레이스 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("카카오 토큰 요청 중 오류 발생");
        }

        if (!response.getStatusCode().is2xxSuccessful()) {
            System.out.println("❌ 카카오 응답 실패 상태 코드: " + response.getStatusCode());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("카카오 토큰 요청 실패");
        }

        Object idTokenObj = response.getBody().get("id_token");
        if (idTokenObj == null) {
            System.out.println("❌ id_token 누락됨 (openid 미설정 가능성)");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("카카오 id_token 없음 (scope=openid 누락?)");
        }

        String idToken = idTokenObj.toString();

        if (!jwtProvider.validateKakaoIdToken(idToken)) {
            System.out.println("❌ ID Token 검증 실패");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 ID Token");
        }

        String kakaoId = jwtProvider.getSubFromKakaoIdToken(idToken);
        System.out.println("✅ 추출된 Kakao ID (sub): " + kakaoId);

        Optional<User> userOpt = userRepository.findByKakaoId(kakaoId);
        User user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
            System.out.println("🔁 기존 유저 로그인: " + user.getId());
        } else {
            user = new User();
            user.setKakaoId(kakaoId);
            userRepository.save(user);
            System.out.println("🆕 새 유저 생성: " + user.getId());
        }

        System.out.println("🔍 최종 user 정보 확인:");
        System.out.println("ID: " + user.getId());
        System.out.println("Email: " + user.getEmail());
        System.out.println("KakaoID: " + user.getKakaoId());

        String token = jwtProvider.generateToken(user.getEmail() == null ? "kakao_" + kakaoId : user.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "userId", user.getId(),
                "message", "카카오 로그인 성공"));
    }
}
