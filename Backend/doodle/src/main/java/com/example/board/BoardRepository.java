// DB CRUD 처리 (JpaRepository)
// JPA에서는 DB 처리를 위한 인터페이스
// 게시글 저장, 조회, 삭제 등의 기능을 DB에서 처리할 수 있도록 JpaRepository<Board, Long> 상속받는 인터페이스를 만든다.
package com.example.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    // 기본적인 CRUD는 상속만으로 자동 제공됨
}

/*
 * 
 * 설명:
 * JpaRepository<엔티티명, PK 타입> ← 이 방식으로 선언
 * 
 * findAll(), findById(), save(), deleteById() 등 기본 CRUD 자동 제공
 * 
 * 나중에 필요하면 아래처럼 커스텀 메소드도 추가 가능:
 * 
 * java
 * 코드 복사
 * List<Board> findByUser(User user);
 * List<Board> findByTitleContaining(String keyword);
 */