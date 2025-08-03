package com.cyworld.minihompy.controller;

import com.cyworld.minihompy.dto.CommentRequestDto;
import com.cyworld.minihompy.dto.CommentResponseDto;
import com.cyworld.minihompy.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentResponseDto>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }

    @PostMapping
    public ResponseEntity<CommentResponseDto> createComment(@PathVariable Long postId, @Valid @RequestBody CommentRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createComment(postId, requestDto));
    }
}
