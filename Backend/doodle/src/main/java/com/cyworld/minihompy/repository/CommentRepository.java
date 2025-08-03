package com.cyworld.minihompy.repository;

import com.cyworld.minihompy.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPostPostIdAndIsDeletedFalseOrderByCreatedAtAsc(Long postId);
    Optional<Comment> findByCommentIdAndIsDeletedFalse(Long commentId);
}
