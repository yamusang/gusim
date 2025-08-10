package com.cyworld.minihompy.dto;

import com.cyworld.minihompy.entity.Post;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter @Setter
public class PostResponseDto {
    private Long postId;
    private String title;
    private String content;
    private String authorNickname;
    private LocalDateTime createdAt;
    private Long viewCount;

    public PostResponseDto(Post post) {
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.authorNickname = post.getUser().getNickname();
        this.createdAt = post.getCreatedAt();
        this.viewCount = post.getViewCount();
    }
}
