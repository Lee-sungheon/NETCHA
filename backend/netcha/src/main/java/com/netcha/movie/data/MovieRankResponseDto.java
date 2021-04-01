package com.netcha.movie.data;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MovieRankResponseDto {
	private long no;
	private long movieId;
	private long userId;
	private float ranking;
	private String[] ganre;
	
	public MovieRankResponseDto(MovieRank movieRank) {
		this.no = movieRank.getNo();
		this.movieId = movieRank.getMovie().getNo();
		this.userId = movieRank.getUserId();
		this.ranking = movieRank.getRanking();
		this.ganre = movieRank.getGanre().split(",");
	}
}
