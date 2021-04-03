package com.netcha.movie.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieReviewRepository extends JpaRepository<MovieReview, Long> {
	public MovieReview findByMemberSeqAndMovieNo(int memberSeq, long movieNo);
}
