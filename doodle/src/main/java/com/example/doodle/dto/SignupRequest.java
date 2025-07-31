// 회원가입 요청에서 email, password 담을 DTO

package com.example.doodle.dto;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SignupRequest {
    private String email;
    private String password;
    private String username;

    // public SignupRequest() {}

    // public String getEmail() {
    //     return email;
    // }

    // public void setEmail(String email) {
    //     this.email = email;
    // }

    // public String getPassword() {
    //     return password;
    // }

    // public void setPassword(String password) {
    //     this.password = password;
    // }
}

/*
DTO(Date Transfer Object)

*/