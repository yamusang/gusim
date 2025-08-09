package com.cyworld.minihompy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PostRequestDto {
    @NotBlank
    private String title;
    @NotBlank
    private String content;

    // 작성자 식별자 (프론트에서 user.user_id 보냄)
    @NotNull
    private Long userId;
}