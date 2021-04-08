package com.netcha.movie.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieYoutubeRepository extends JpaRepository<MovieYoutube, Long> {
	public List<MovieYoutube> findByMovieNo(long movieNo);
}
