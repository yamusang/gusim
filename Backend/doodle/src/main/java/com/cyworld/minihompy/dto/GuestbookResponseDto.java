package com.cyworld.minihompy.dto;

import com.cyworld.minihompy.entity.Guestbook;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
public class GuestbookResponseDto {
    private Long entryId;
    private String content;
    private String writerNickname;
    private String ownerNickname;
    private LocalDateTime createdAt;
    private Boolean isPrivate;

    public GuestbookResponseDto(Guestbook guestbook) {
        this.entryId = guestbook.getEntryId();
        this.content = guestbook.getContent();
        this.writerNickname = guestbook.getWriter().getNickname();
        this.ownerNickname = guestbook.getOwner().getNickname();
        this.createdAt = guestbook.getCreatedAt();
        this.isPrivate = guestbook.getIsPrivate();
    }
}