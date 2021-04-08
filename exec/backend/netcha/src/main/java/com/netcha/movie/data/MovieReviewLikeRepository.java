package com.netcha.movie.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieReviewLikeRepository extends JpaRepository<MovieReviewLike, Long> {
	public MovieReviewLike findByMemberSeqAndMovieReviewNo(int memberSeq, long movieReviewNo);
}
