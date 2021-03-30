package com.netcha.movie.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MovieRepository extends JpaRepository<Movie, Long> {
	@Query("select m from Movie m where m.open >= :open and m.time >= :time and movie_id = :movieId")
	public List<Movie> findByOpenAndTimeAndMovieId(@Param("open") String open, @Param("time") long time, @Param("movieId") String movieId);
	
	// 새로운 컨텐츠(40개) : 개봉일 얼마 안된 순으로 추천
	public List<Movie> findTop40ByOrderByOpenDesc();
	// 인기 순위(40개) : 누적 조회수 순으로 추천 
	public List<Movie> findTop40ByOrderByTotalViewDesc();
}