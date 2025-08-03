package com.cyworld.minihompy.repository;

import com.cyworld.minihompy.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByIsDeletedFalseOrderByCreatedAtDesc();
    Optional<Post> findByPostIdAndIsDeletedFalse(Long postId);
}