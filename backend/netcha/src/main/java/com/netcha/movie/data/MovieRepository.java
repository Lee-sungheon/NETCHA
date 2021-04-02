package com.netcha.movie.data;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MovieRepository extends JpaRepository<Movie, Long> {
	// test api
	@Query("select m from Movie m where m.open >= :open and m.time >= :time and movie_id = :movieId")
	public List<Movie> findByOpenAndTimeAndMovieId(@Param("open") String open, @Param("time") long time, @Param("movieId") String movieId);
	// 새로운 컨텐츠(40개) : 개봉일 얼마 안된 순으로 추천
	public List<Movie> findByOrderByOpenDesc(Pageable page);
	// 인기 순위(40개) : 누적 조회수 순으로 추천 
	@Query("select m from Movie m where m.open >= :open")
	public List<Movie> findByOrderByTotalViewDesc(@Param("open") String open, Pageable page);
	// 장르별 (40개) : 누적 조회수 순으로 추천
	@Query("select m from Movie m where m.open >= :open and m.ganre like %:ganre%")
	public List<Movie> findByGanreOrderByTotalViewDesc(@Param("open") String open, @Param("ganre") String ganre, Pageable page);
	// 키워드별 (40개) : 누적 조회수 순으로 추천
	@Query("select m from Movie m where m.open >= :open and m.keywords like %:keyword%")
	public List<Movie> findByKeywordOrderByTotalViewDesc(@Param("open") String open, @Param("keyword") String keyword, Pageable page);
	// 나라별 (40개) : 누적 조회수 순으로 추천
	@Query("select m from Movie m where m.open >= :open and m.country like %:country%")
	public List<Movie> findByCountryOrderByTotalViewDesc(@Param("open") String open, @Param("country") String country, Pageable page);

	public List<Movie> findByNoNotIn(List<Long> no, Pageable page);
}