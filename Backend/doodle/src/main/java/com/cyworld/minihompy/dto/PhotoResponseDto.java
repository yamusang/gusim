package com.cyworld.minihompy.dto;

import com.cyworld.minihompy.entity.Photo;
import lombok.Getter;

@Getter
public class PhotoResponseDto {
    private Long photoId;
    private String photoUrl;
    private String caption;

    public PhotoResponseDto(Photo photo) {
        this.photoId = photo.getPhotoId();
        this.photoUrl = photo.getPhotoUrl();
        this.caption = photo.getCaption();
    }
}