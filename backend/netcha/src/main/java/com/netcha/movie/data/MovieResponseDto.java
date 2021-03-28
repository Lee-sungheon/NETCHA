package com.netcha.movie.data;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MovieResponseDto {
	private Long no;
	private String movieId;
	private String movieSeq;
	private String title;
	private String scenario;
	private String[] country;
	private String[] company;
	private Long time;
	private String[] ganre;
	private Long open;
	private String[] directors;
	private String[] casts;
	private String[] keywords;
	private String rating;
	private String posterUrl;
	private String imageUrl;
	
	public MovieResponseDto(Movie movie) {
		this.no = movie.getNo();
		this.movieId = movie.getMovieId();
		this.movieSeq = movie.getMovieSeq();
		this.title = movie.getTitle();
		this.scenario = movie.getScenario();
		this.country = movie.getCountry().split(",");
		this.company = movie.getCompany().split(",");
		this.time = movie.getTime();
		this.ganre = movie.getGanre().split(",");
		this.open = movie.getOpen();
		this.directors = movie.getDirectors().split(",");
		this.casts = movie.getCasts().split(",");
		this.keywords = movie.getKeywords().split(",");
		this.rating = movie.getRating();
		this.posterUrl = movie.getPosterUrl();
		this.imageUrl = movie.getImageUrl();
	}
}
