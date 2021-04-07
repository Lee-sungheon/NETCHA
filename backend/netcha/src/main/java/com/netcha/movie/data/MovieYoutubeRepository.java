package com.netcha.movie.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieYoutubeRepository extends JpaRepository<MovieYoutube, Long> {
	public MovieYoutube findByMovieNo(long movieNo);
}
