package com.cyworld.minihompy.service;

import com.cyworld.minihompy.dto.GuestbookRequestDto;
import com.cyworld.minihompy.dto.GuestbookResponseDto;
import com.cyworld.minihompy.entity.Guestbook;
import com.cyworld.minihompy.entity.User;
import com.cyworld.minihompy.repository.GuestbookRepository;
import com.cyworld.minihompy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GuestbookService {
    private final GuestbookRepository guestbookRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<GuestbookResponseDto> getGuestbookEntries(Long ownerUserId) {
        return guestbookRepository.findAllByOwnerUserIdAndIsDeletedFalseOrderByCreatedAtDesc(ownerUserId).stream()
                .map(GuestbookResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public GuestbookResponseDto createGuestbookEntry(GuestbookRequestDto requestDto) {
        User writer = userRepository.findById(requestDto.getWriterUserId())
                .orElseThrow(() -> new IllegalArgumentException("작성자를 찾을 수 없습니다."));
        User owner = userRepository.findById(requestDto.getOwnerUserId())
                .orElseThrow(() -> new IllegalArgumentException("방명록 주인을 찾을 수 없습니다."));

        Guestbook guestbook = new Guestbook();
        guestbook.setContent(requestDto.getContent());
        guestbook.setWriter(writer);
        guestbook.setOwner(owner);

        Guestbook savedEntry = guestbookRepository.save(guestbook);
        return new GuestbookResponseDto(savedEntry);
    }
}