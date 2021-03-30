package com.netcha.movie.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MovieRepository extends JpaRepository<Movie, Long> {
	@Query("select m from Movie m where m.open >= :open and m.time >= :time and movie_id = :movieId")
	public List<Movie> findByOpenAndTimeAndMovieId(@Param("open") long open, @Param("time") long time, @Param("movieId") String movieId);
	
//	@Query("select m from Movie m order by open desc limit 40")
//	public List<Movie> findAllByOpen();
}