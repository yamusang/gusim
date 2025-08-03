package com.cyworld.minihompy.repository;

import com.cyworld.minihompy.entity.Guestbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {
    List<Guestbook> findAllByOwnerUserIdAndIsDeletedFalseOrderByCreatedAtDesc(Long ownerUserId);
}