package com.cyworld.minihompy.dto;

import com.cyworld.minihompy.entity.Album;
import com.cyworld.minihompy.entity.Photo;

import lombok.Getter;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class AlbumDetailResponseDto {
    private Long albumId;
    private Long userId;
    private String title;
    private String description;
    private List<PhotoResponseDto> photos;

    public AlbumDetailResponseDto(Album album, List<Photo> photoEntities) {
        this.albumId = album.getAlbumId();
        this.userId = album.getUser().getUserId();
        this.title = album.getTitle();
        this.description = album.getDescription();
        this.photos = photoEntities.stream().map(PhotoResponseDto::new).collect(Collectors.toList());
    }
}