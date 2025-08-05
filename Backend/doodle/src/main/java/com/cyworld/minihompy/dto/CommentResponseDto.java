package com.cyworld.minihompy.dto;

import com.cyworld.minihompy.entity.Comment;
import com.cyworld.minihompy.entity.Reply;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CommentResponseDto {
    private Long id; // Comment와 Reply의 ID를 공통으로 사용
    private String content;
    private String authorNickname;
    private LocalDateTime createdAt;
    private Long parentId; // 부모의 ID (최상위 댓글은 null)
    private List<CommentResponseDto> children = new ArrayList<>();

    // Comment 엔티티로부터 DTO 생성
    public CommentResponseDto(Comment comment) {
        this.id = comment.getCommentId();
        this.content = comment.getContent();
        this.authorNickname = comment.getUser().getNickname();
        this.createdAt = comment.getCreatedAt();
        this.parentId = null; // 최상위 댓글
    }

    // Reply 엔티티로부터 DTO 생성
    public CommentResponseDto(Reply reply) {
        this.id = reply.getReplyId(); // 실제 Reply ID는 프론트에서 중요하지 않음
        this.content = reply.getContent();
        this.authorNickname = reply.getUser().getNickname();
        this.createdAt = reply.getCreatedAt();
        this.parentId = reply.getComment().getCommentId(); // 부모는 항상 Comment
    }
}
