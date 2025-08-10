package com.cyworld.minihompy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(scanBasePackages = {
    "c.cyworld.minihompy",
    "com.cyworld.minihompy"   // 🔥 com 패키지도 함께 스캔!
})
@EnableJpaAuditing
public class CyworldApplication {
    public static void main(String[] args) {
        SpringApplication.run(CyworldApplication.class, args);
    }
}
