package com.cyworld.minihompy.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
public class CommentRequestDto {
    @NotBlank
    private String content;
    private Long userId;
    private Long parentCommentId; // 대댓글의 경우 부모 댓글 ID
}
