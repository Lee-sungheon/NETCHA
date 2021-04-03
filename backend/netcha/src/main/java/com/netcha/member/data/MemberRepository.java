package com.netcha.member.data;

import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Integer> {
	Member findByUserId(String userId);

}
