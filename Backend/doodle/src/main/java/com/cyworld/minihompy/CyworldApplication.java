package com.cyworld.minihompy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing // Auditing 기능을 활성화하여 엔티티의 생성/수정 시간을 자동 관리합니다.
public class CyworldApplication {

    public static void main(String[] args) {
        SpringApplication.run(CyworldApplication.class, args);
    }

}