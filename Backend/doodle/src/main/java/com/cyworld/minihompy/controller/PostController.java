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