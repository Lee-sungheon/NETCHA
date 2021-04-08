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
	// 평가 페이지 (40개) : 평가 안한 영화 누적 조회수 순으로
	@Query("select m from Movie m where m.open >= :open and m.no not in :no")
	public List<Movie> findByNoNotIn(@Param("open") String open, @Param("no") List<Long> no, Pageable page);
	// 평가한 영화 목록 (40개) : 평가 한 영화 누적 조회수 순으로
	@Query("select m from Movie m where m.open >= :open and m.no in :no")
	public List<Movie> findByNoIn(@Param("open") String open, @Param("no") List<Long> no, Pageable page);
	// 장르, 나라 해당 : 누적 조회수 순으로
	@Query("select m from Movie m where m.open >= :open and m.ganre like %:ganre% and m.country like %:country%")
	public List<Movie> findByGanreLikeAndCountryLike(@Param("open") String open, @Param("ganre") String ganre, @Param("country") String country, Pageable page);
	// 감독별 (40개) : 누적 조회수 순으로
	@Query("select m from Movie m where m.open >= :open and m.directors like %:director%")
	public List<Movie> findByDirectorLike(@Param("open") String open, @Param("director") String director, Pageable page);
	// 배우별 (40개) : 누적 조회수 순으로
	@Query("select m from Movie m where m.open >= :open and m.casts like %:cast%")
	public List<Movie> findByCastLike(@Param("open") String open, @Param("cast") String cast, Pageable page);
	// 비슷한 영화 : 입력받은 영화 제외 모든 영화
	@Query("select m from Movie m where m.open >= :open and m.no <> :no")
	public List<Movie> findByNoNot(@Param("open") String open, @Param("no") Long no);
	// 국가별 영화 편수
	@Query("select count(m) from Movie m where m.country like %:country%")
	public long countByCountryLike(@Param("country") String country);
	// 장르별 영화 편수
	@Query("select count(m) from Movie m where m.ganre like %:ganre%")
	public long countByGanreLike(@Param("ganre") String ganre);
	// 2015년 이후 작품
	@Query("select m from Movie m where m.open >= :open")
	public List<Movie> findAllByOpens(@Param("open") String open);
	// 검색어를 포함하는 영화
	@Query("select m from Movie m where m.open >= :open and m.title like %:title%")
	public List<Movie> findByOpenAndTitle(@Param("open") String open, @Param("title") String title);
	@Query("select m from Movie m where m.open >= :open and m.title like %:title%")
	public List<Movie> findByOpenAndTitleAndPage(@Param("open") String open, @Param("title") String title, Pageable page);
	@Query("select m.no from Movie m where m.open >= :open and m.title like %:title%")
	public List<Long> findByNoAndOpenAndTitle(@Param("open") String open, @Param("title") String title);
	@Query("select m from Movie m where m.open >= :open and m.casts like %:cast% and m.no not in :no")
	public List<Movie> findByOpenAndCasts(@Param("open") String open, @Param("cast") String cast, @Param("no") List<Long> no);
	@Query("select m.no from Movie m where m.open >= :open and m.casts like %:cast% and m.no not in :no")
	public List<Long> findByNoOpenAndCasts(@Param("open") String open, @Param("cast") String cast, @Param("no") List<Long> no);
	@Query("select m from Movie m where m.open >= :open and m.directors like %:director% and m.no not in :no")
	public List<Movie> findByOpenAndDirectors(@Param("open") String open, @Param("director") String director, @Param("no") List<Long> no);
	@Query("select m.no from Movie m where m.open >= :open and m.directors like %:director% and m.no not in :no")
	public List<Long> findByNoOpenAndDirectors(@Param("open") String open, @Param("director") String director, @Param("no") List<Long> no);
	// 검색에 포함되는 영화 중 no에 포함 안되는 영화
	@Query("select m from Movie m where m.open >= :open and m.title like %:title% and m.no not in :no")
	public List<Movie> findByOpenAndTitleAndNotNo(@Param("open") String open, @Param("title") String title, @Param("no") List<Long> no);
	@Query("select m.no from Movie m where m.open >= :open and m.title like %:title% and m.no not in :no")
	public List<Long> findByNoOpenAndTitleAndNotNo(@Param("open") String open, @Param("title") String title, @Param("no") List<Long> no);
	@Query("select m from Movie m where m.open >= :open and m.posterUrl = :poster")
	public List<Movie> findByOpenAndPosterUrl(@Param("open") String open, @Param("poster") String poster);
}