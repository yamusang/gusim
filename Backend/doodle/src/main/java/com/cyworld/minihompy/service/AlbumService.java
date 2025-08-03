package com.cyworld.minihompy.service;

import com.cyworld.minihompy.dto.AlbumDetailResponseDto;
import com.cyworld.minihompy.dto.AlbumResponseDto;
import com.cyworld.minihompy.entity.Album;
import com.cyworld.minihompy.entity.Photo;
import com.cyworld.minihompy.repository.AlbumRepository;
import com.cyworld.minihompy.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final PhotoRepository photoRepository;

    @Transactional(readOnly = true)
    public List<AlbumResponseDto> getAlbumsByUser(Long userId) {
        return albumRepository.findAllByUserUserIdOrderByCreatedAtDesc(userId).stream()
                .map(AlbumResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AlbumDetailResponseDto getPhotosByAlbum(Long albumId) {
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new IllegalArgumentException("앨범을 찾을 수 없습니다."));
        List<Photo> photos = photoRepository.findAllByAlbum_AlbumIdAndIsDeletedFalseOrderByCreatedAtAsc(albumId);
        
        return new AlbumDetailResponseDto(album, photos);
    }
}
