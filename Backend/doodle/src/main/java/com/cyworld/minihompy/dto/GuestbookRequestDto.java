package com.cyworld.minihompy.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;

@Getter @Setter
public class GuestbookRequestDto {
    @NotBlank(message = "내용은 필수입니다.")
    private String content;
    private Long writerUserId;
    private Long ownerUserId;
}