// 글 작성/수정 요청 데이터

package com.example.board;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter

public class BoardRequestDto {
    private String title;
    private String content;
}