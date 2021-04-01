package com.netcha.movie.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRankRepository extends JpaRepository<MovieRank, Long> {
	public List<MovieRank> findAllByUserId(long userId);
	public MovieRank findByUserIdAndMovieNo(long userId, long movieNo);
}
