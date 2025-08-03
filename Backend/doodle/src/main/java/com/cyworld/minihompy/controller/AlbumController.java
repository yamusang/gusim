package com.cyworld.minihompy.controller;

import com.cyworld.minihompy.dto.AlbumDetailResponseDto;
import com.cyworld.minihompy.dto.AlbumResponseDto;
import com.cyworld.minihompy.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
public class AlbumController {
    
    private final AlbumService albumService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AlbumResponseDto>> getAlbumsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(albumService.getAlbumsByUser(userId));
    }

    @GetMapping("/{albumId}")
    public ResponseEntity<AlbumDetailResponseDto> getPhotosByAlbum(@PathVariable Long albumId) {
        return ResponseEntity.ok(albumService.getPhotosByAlbum(albumId));
    }
}
