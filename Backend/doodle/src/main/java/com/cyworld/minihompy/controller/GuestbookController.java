package com.cyworld.minihompy.controller;

import com.cyworld.minihompy.dto.GuestbookRequestDto;
import com.cyworld.minihompy.dto.GuestbookResponseDto;
import com.cyworld.minihompy.service.GuestbookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/guestbooks")
@RequiredArgsConstructor
public class GuestbookController {
    private final GuestbookService guestbookService;

    @GetMapping("/{ownerUserId}")
    public ResponseEntity<List<GuestbookResponseDto>> getGuestbookEntries(@PathVariable Long ownerUserId) {
        return ResponseEntity.ok(guestbookService.getGuestbookEntries(ownerUserId));
    }

    @PostMapping
    public ResponseEntity<GuestbookResponseDto> createGuestbookEntry(@Valid @RequestBody GuestbookRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(guestbookService.createGuestbookEntry(requestDto));
    }
}
