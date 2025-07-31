// DB에서 User를 조회/저장/삭제 (특히 이메일로 찾기)

package com.example.doodle.repository;

import com.example.doodle.domain.User;

import java.util.List;
// import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByEmail(String email);
}

/*
UserRepository : User 테이블(DB)과 연결된 DAO(Data Access Object) 역할을 하는 클래스고,
JPA에서는 이걸 반드시 만들어야 User 객체를 DB에 저장/조회/삭제할 수 있어.

UserRepository는 User와 DB를 연결해주는 필수 다리고,
지금 네 회원가입/로그인 기능이 돌아가는 핵심 구성 요소야.


*/