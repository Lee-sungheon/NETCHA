package com.netcha.movie.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRankRepository extends JpaRepository<MovieRank, Long> {
	public List<MovieRank> findAllByMemberSeq(int memberSeq);
	public List<MovieRank> findAllByMovieNo(long movieNo);
	public MovieRank findByMemberSeqAndMovieNo(int memberSeq, long movieNo);
}
