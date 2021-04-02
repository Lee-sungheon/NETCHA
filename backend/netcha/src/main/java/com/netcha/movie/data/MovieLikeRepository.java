package com.netcha.movie.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieLikeRepository extends JpaRepository<MovieLike, Long> {
	public MovieLike findByMemberSeqAndMovieNo(int memberSeq, long movieNo);
}
