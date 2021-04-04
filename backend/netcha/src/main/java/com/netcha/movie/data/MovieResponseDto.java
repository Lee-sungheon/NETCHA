package com.netcha.movie.data;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MovieResponseDto {
	private long no;
	private String movieId;
	private String movieSeq;
	private String title;
	private String scenario;
	private String[] country;
	private String[] company;
	private long time;
	private String[] ganre;
	private String open;
	private String[] directors;
	private String[] casts;
	private String[] keywords;
	private String rating;
	private String posterUrl;
	private String[] imageUrl;
	private long totalView;
	private float avgRank;
	private float userDidRank;
	private int userDidLike;
	private boolean userDidZzim;
	
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
		this.imageUrl = movie.getImageUrl().split(",");
		this.totalView = movie.getTotalView();
		this.avgRank = movie.getAvgRank();
		this.userDidRank = 0;
		this.userDidLike = 0;
		this.userDidZzim = false;
	}
	
	public void userInfo(float isR, int isL, boolean isZ) {
		this.userDidRank = isR;
		this.userDidLike = isL;
		this.userDidZzim = isZ;
	}
}
