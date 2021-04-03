package com.netcha.movie.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieReviewRepository extends JpaRepository<MovieReview, Long> {
	public MovieReview findByMemberSeqAndMovieNo(int memberSeq, long movieNo);
	public List<MovieReview> findByMovieNo(long movieNo);
}
