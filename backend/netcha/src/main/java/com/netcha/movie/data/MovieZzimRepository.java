package com.netcha.movie.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieZzimRepository extends JpaRepository<MovieZzim, Long> {
	public List<MovieZzim> findAllByMemberSeq(int memberSeq);
	public MovieZzim findByMemberSeqAndMovieNo(int memberSeq, long movieNo);
	public long countByMemberSeq(int memberSeq);
}
