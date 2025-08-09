package com.cyworld.minihompy.service;

import com.cyworld.minihompy.dto.PostRequestDto;
import com.cyworld.minihompy.dto.PostResponseDto;
import com.cyworld.minihompy.entity.Post;
import com.cyworld.minihompy.entity.User;
import com.cyworld.minihompy.repository.PostRepository;
import com.cyworld.minihompy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<PostResponseDto> getAllPosts() {
        return postRepository.findAllByIsDeletedFalseOrderByCreatedAtDesc().stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public PostResponseDto getPostById(Long postId) {
        Post post = postRepository.findByPostIdAndIsDeletedFalse(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        post.setViewCount(post.getViewCount() + 1);
        return new PostResponseDto(post);
    }

    // ✅ 새로 추가: 게시글 생성
    @Transactional
    public PostResponseDto createPost(PostRequestDto dto) {
        // 1) 작성자 조회 (프론트에서 userId 보내는 방식일 때)
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("작성자 정보를 찾을 수 없습니다."));

        // 2) 엔티티 생성
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setUser(user);
        post.setIsDeleted(false);
        if (post.getViewCount() == null) post.setViewCount(0L);

        // 3) 저장
        Post saved = postRepository.save(post);

        // 4) 응답 DTO 변환
        return new PostResponseDto(saved);
    }
}
