package com.cyworld.minihompy.service;

import com.cyworld.minihompy.dto.CommentRequestDto;
import com.cyworld.minihompy.dto.CommentResponseDto;
import com.cyworld.minihompy.entity.Comment;
import com.cyworld.minihompy.entity.Post;
import com.cyworld.minihompy.entity.Reply;
import com.cyworld.minihompy.entity.User;
import com.cyworld.minihompy.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByPost(Long postId) {
        // 1. 해당 게시글의 모든 원본 댓글 조회
        List<Comment> comments = commentRepository.findAllByPostPostIdAndIsDeletedFalseOrderByCreatedAtAsc(postId);
        List<Long> commentIds = comments.stream().map(Comment::getCommentId).collect(Collectors.toList());

        // 2. 원본 댓글들에 달린 모든 대댓글 한 번에 조회 (DB 호출 최소화)
        List<Reply> replies = replyRepository.findAllByComment_CommentIdInAndIsDeletedFalseOrderByCreatedAtAsc(commentIds);

        // 3. 댓글과 대댓글을 공통 DTO로 변환
        List<CommentResponseDto> commentDtos = comments.stream()
                .map(CommentResponseDto::new)
                .collect(Collectors.toList());

        List<CommentResponseDto> replyDtos = replies.stream()
                .map(CommentResponseDto::new)
                .collect(Collectors.toList());
        
        // 4. 계층 구조로 조립
        Map<Long, List<CommentResponseDto>> childrenMap = Stream.concat(commentDtos.stream(), replyDtos.stream())
                .filter(dto -> dto.getParentId() != null)
                .collect(Collectors.groupingBy(CommentResponseDto::getParentId));
        
        commentDtos.forEach(dto -> dto.setChildren(childrenMap.getOrDefault(dto.getId(), List.of())));
        
        return commentDtos;
    }

    @Transactional
    public CommentResponseDto createComment(Long postId, CommentRequestDto requestDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 대댓글인 경우
        if (requestDto.getParentCommentId() != null) {
            Comment parentComment = commentRepository.findById(requestDto.getParentCommentId())
                    .orElseThrow(() -> new IllegalArgumentException("부모 댓글을 찾을 수 없습니다."));
            
            Reply newReply = new Reply();
            newReply.setContent(requestDto.getContent());
            newReply.setUser(user);
            newReply.setComment(parentComment);
            return new CommentResponseDto(replyRepository.save(newReply));
        }
        // 원본 댓글인 경우
        else {
            Comment newComment = new Comment();
            newComment.setContent(requestDto.getContent());
            newComment.setUser(user);
            newComment.setPost(post);
            return new CommentResponseDto(commentRepository.save(newComment));
        }
    }
}
