package com.cyworld.minihompy.repository;

import com.cyworld.minihompy.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findAllByAlbum_AlbumIdAndIsDeletedFalseOrderByCreatedAtAsc(Long albumId);
}
