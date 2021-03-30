package com.netcha.movie.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.netcha.movie.data.Movie;
import com.netcha.movie.data.MovieRank;
import com.netcha.movie.data.MovieRankRepository;
import com.netcha.movie.data.MovieRankResponseDto;
import com.netcha.movie.data.MovieRepository;
import com.netcha.movie.data.MovieResponseDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MovieService {
	private final MovieRepository movieRepository;
	private final MovieRankRepository movieRankRepository;
	
	@Transactional
	public String[] crawling(Movie m) {
		String[] result = new String[3];
		try {
			String url = "https://www.kmdb.or.kr/db/kor/detail/movie/";
			url += m.getMovieId() + "/" + m.getMovieSeq();
			// rating 크롤링
			Document doc = Jsoup.connect(url).get();
			Elements fieldset = doc.select("#fieldset");
			String rating = fieldset.select("div.mProfile.type2").select("div.tx1").select("a.txtBlue").text();
			// image 2개 크롤링
			Elements image_ele = fieldset.select("div.result-block.mt2").select("div.mList8").select("ul").select("li");
			String image = "";
			if(image_ele.size() == 0) image = "default";
			else {
				image = image_ele.get(0).select("span.mImg1").select("span").attr("style").split(" ")[1].replace("url(", "").replace(")", "").replace("'","");
				if(image_ele.size() >= 2) image += "," + image_ele.get(1).select("span.mImg1").select("span").attr("style").split(" ")[1].replace("url(", "").replace(")", "").replace("'","");
			}
			// poster 크롤링
			url += "/own/image";
			doc = Jsoup.connect(url).get();
			fieldset = doc.select("#fieldset");
			String poster = "";
			Elements poster_ele = fieldset.select("div.result-block.pt1").select("div.mList8.type3").select("ul").select("li");
			if(poster_ele.size() == 0) poster = "default";
			else poster = poster_ele.select("span.mImg1").select("span").attr("style").split(" ")[1].replace("url(", "").replace(")", "").replace("'","");
			System.out.println(rating+" "+poster+" "+image);
			result[0] = rating;
			result[1] = poster;
			result[2] = image;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	@Transactional
	public List<MovieResponseDto> findByOpenAndTimeAndMovieId(long open, long time, String movieId) {
		System.out.println(open+" "+time+" "+movieId);
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOpenAndTimeAndMovieId(open, time, movieId);
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateRPI(result[0], result[1], result[2]);
			}
			movies.add(new MovieResponseDto(m));
		}
		return movies;
	}
	
//	@Transactional
//	public List<MovieResponseDto> findMovieByNewContents() {
//		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
//		List<Movie> movieR = movieRepository.findAllByOpen();
//		for(Movie m : movieR) {
//			if(m.getRating().equals("")) {
//				String[] result = crawling(m);
//				m.updateRPI(result[0], result[1], result[2]);
//			}
//			movies.add(new MovieResponseDto(m));
//		}
//		return movies;
//	}
	
	@Transactional
	public List<MovieRankResponseDto> findMovieRankByUserId(long userId) {
		List<MovieRankResponseDto> movieRankList = new ArrayList<MovieRankResponseDto>();
		List<MovieRank> list = movieRankRepository.findAllByUserId(userId);
		for(int i=0; i<list.size(); i++) movieRankList.add(new MovieRankResponseDto(list.get(i)));
		return movieRankList;
	}
	
	@Transactional
	public List<MovieResponseDto> findAllMovie() {
		List<MovieResponseDto> movieList = new ArrayList<MovieResponseDto>();
		List<Movie> list = movieRepository.findAll();
		for(int i=0; i<list.size(); i++) movieList.add(new MovieResponseDto(list.get(i)));
		return movieList;
	}
	
	@Transactional
	public List<MovieResponseDto> recommendMovieByRank(long userId) {
		// 유저 아이디에 해당하는 영화 평점 정보 리스트
		List<MovieRankResponseDto> movieRankList = findMovieRankByUserId(userId);
		// 영화 전체 정보
		List<MovieResponseDto> movieList = findAllMovie();
		
		return null;
	}
	
}
