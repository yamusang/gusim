package com.cyworld.minihompy.repository;

import com.cyworld.minihompy.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    // 여러 댓글 ID에 속한 모든 대댓글을 한 번에 조회
    List<Reply> findAllByComment_CommentIdInAndIsDeletedFalseOrderByCreatedAtAsc(Collection<Long> commentIds);
}
