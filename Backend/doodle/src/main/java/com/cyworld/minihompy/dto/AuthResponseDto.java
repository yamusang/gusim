package com.cyworld.minihompy.dto;

import com.cyworld.minihompy.entity.User;
import lombok.Getter;

@Getter
public class AuthResponseDto {
    private Long userId;
    private String nickname;
    private String miniHompyName;

    public AuthResponseDto(User user) {
        this.userId = user.getUserId();
        this.nickname = user.getNickname();
        this.miniHompyName = user.getMiniHompyName();
    }
}
