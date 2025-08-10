package com.cyworld.minihompy.controller;

import com.cyworld.minihompy.dto.PostRequestDto;
import com.cyworld.minihompy.dto.PostResponseDto;
import com.cyworld.minihompy.service.PostService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    // 현재 게시글 '조회'기능만 있잖아요🙏
    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponseDto> getPostById(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    @PostMapping
    public ResponseEntity<PostResponseDto> create(@RequestBody @Valid PostRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.createPost(dto));
    }
}

/*
 * @PostController : 현재 클래스 안에 선언된 모든 요청 처리 메소드가 자동으로 JSON 응답을 내보냄.
 * 
 * 
 * 
 */

//  📌 구조 이해
// Controller

// HTTP 요청(프론트에서 들어오는 요청)을 받는 “입구”

// 요청을 직접 처리하지 않고 → 필요한 로직을 Service에 위임

// 여기서 postService는 핵심 로직 처리 담당자

// Service

// 비즈니스 로직(게시글 저장, 조회, 수정 등)을 담당

// 데이터베이스 접근은 Repository에 위임

// 📌 왜 final인가?
// PostService 객체는 Controller의 핵심 의존성

// 한 번 주입되면 절대 바뀌면 안 됨

// 중간에 바뀌면 → 로직이 엉망되거나 NPE 발생 가능

// 그래서 final로 불변성을 보장

// 생성자 주입(@RequiredArgsConstructor) 시 주입 누락 방지 효과도 있음

// 💡 한 줄 요약

// 컨트롤러는 서비스 없이는 동작할 수 없고, 그 서비스는 외부에서 바뀌면 안 되므로 final로 고정한다.