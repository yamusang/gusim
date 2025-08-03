// 글 목록/상세 응답 데이터

package com.example.board;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter; // 데이터들만 가져오기 때문에 no setter

@Getter @Builder
public class BoardResponseDto {
    private Long postId; // 작성자 ID
    private String title; // 게시글 제목
    private String content; // 게시글 내용
    private String writerEmail;     // 작성자 이메일
    private LocalDateTime createdAt; // 게시글 수정 시간
    private int viewCount; // 조회수
    private boolean isDeleted; // 삭제여부
}
