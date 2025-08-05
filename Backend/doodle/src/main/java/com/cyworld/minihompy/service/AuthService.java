package com.cyworld.minihompy.service;

import com.cyworld.minihompy.dto.AuthRequestDto;
import com.cyworld.minihompy.dto.AuthResponseDto;
import com.cyworld.minihompy.entity.User;
import com.cyworld.minihompy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    
    // 참고: 실제 프로젝트에서는 PasswordEncoder를 사용하여 비밀번호를 해싱하고 검증해야 합니다.
    // 예: private final PasswordEncoder passwordEncoder;

    @Transactional
    public AuthResponseDto login(AuthRequestDto requestDto) {
        User user = userRepository.findByUsername(requestDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        // 비밀번호 검증 (현재는 해싱 없이 평문 비교)
        if (!user.getPasswordHash().equals(requestDto.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        
        user.setLastLoginAt(LocalDateTime.now());
        return new AuthResponseDto(user);
    }
}

// UserRepository에 findByUsername 메서드 추가 필요
// public interface UserRepository extends JpaRepository<User, Long> {
//     Optional<User> findByUsername(String username);
// }