package com.cyworld.minihompy.repository;

import com.cyworld.minihompy.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findAllByUserUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Album> findByAlbumIdAndUserUserId(Long albumId, Long userId);
}