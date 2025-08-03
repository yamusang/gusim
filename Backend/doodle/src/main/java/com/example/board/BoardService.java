// 모든 비즈니스 로직 - 저장, 조회, 수정, 삭제(CRUD)
package com.example.board;

import com.example.doodle.domain.User;
import com.example.doodle.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    // 글 작성
    public void createBoard(BoardRequestDto dto, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        Board board = Board.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .user(user)
                .build();

        boardRepository.save(board);
    }

    // 전체 글 목록 조회
    public List<BoardResponseDto> getAllBoards() {
        return boardRepository.findAll().stream()
                .filter(board -> !board.getIsDeleted()) // 소프트 삭제 제외
                .map(board -> BoardResponseDto.builder()
                        .postId(board.getPostId())
                        .title(board.getTitle())
                        .content(board.getContent())
                        .writerEmail(board.getUser().getEmail())
                        .createdAt(board.getCreatedAt())
                        .viewCount(board.getViewCount())
                        .isDeleted(board.getIsDeleted())
                        .build())
                .collect(Collectors.toList());
    }

    // 상세 조회 (조회수 증가 포함)
    @Transactional
    public BoardResponseDto getBoardById(Long postId) {
        Board board = boardRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("글이 존재하지 않습니다."));

        if (board.getIsDeleted()) {
            throw new RuntimeException("삭제된 글입니다.");
        }

        board.setViewCount(board.getViewCount() + 1);

        return BoardResponseDto.builder()
                .postId(board.getPostId())
                .title(board.getTitle())
                .content(board.getContent())
                .writerEmail(board.getUser().getEmail())
                .createdAt(board.getCreatedAt())
                .viewCount(board.getViewCount())
                .isDeleted(board.getIsDeleted())
                .build();
    }

    // 글 수정
    @Transactional
    public void updateBoard(Long postId, BoardRequestDto dto, String userEmail) {
        Board board = boardRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("글이 존재하지 않습니다."));

        if (!board.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());
    }

    // 글 삭제 (소프트 삭제)
    @Transactional
    public void deleteBoard(Long postId, String userEmail) {
        Board board = boardRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("글이 존재하지 않습니다."));

        if (!board.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        board.setIsDeleted(true);
    }
}
