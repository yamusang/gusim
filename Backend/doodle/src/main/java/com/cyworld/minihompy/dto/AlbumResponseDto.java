package com.cyworld.minihompy.dto;

import com.cyworld.minihompy.entity.Album;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class AlbumResponseDto {
    private Long albumId;
    private String title;
    private String description;
    private LocalDateTime createdAt;

    public AlbumResponseDto(Album album) {
        this.albumId = album.getAlbumId();
        this.title = album.getTitle();
        this.description = album.getDescription();
        this.createdAt = album.getCreatedAt();
    }
}
