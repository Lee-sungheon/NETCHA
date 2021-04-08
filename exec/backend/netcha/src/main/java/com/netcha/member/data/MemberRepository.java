package com.netcha.member.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Integer> {
	Member findByUserId(String userId);
	List<Member> findAll();
}
