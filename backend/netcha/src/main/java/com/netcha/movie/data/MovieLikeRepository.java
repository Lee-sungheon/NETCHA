package com.netcha.movie.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieLikeRepository extends JpaRepository<MovieLike, Long> {
	public List<MovieLike> findAllByMemberSeq(int memberSeq);
	public MovieLike findByMemberSeqAndMovieNo(int memberSeq, long movieNo);
}
