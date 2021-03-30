package com.netcha.movie.data;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MovieRankResponseDto {
	private long no;
	private long userId;
	private long movieId;
	private float rank;
	private String[] ganre;
	
	public MovieRankResponseDto(MovieRank movieRank) {
		this.no = movieRank.getNo();
		this.userId = movieRank.getUserId();
		this.movieId = movieRank.getMovie().getNo();
		this.rank = movieRank.getRank();
		this.ganre = movieRank.getGanre().split(",");
	}
}
