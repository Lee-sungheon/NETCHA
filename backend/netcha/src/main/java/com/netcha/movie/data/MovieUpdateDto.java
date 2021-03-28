package com.netcha.movie.data;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MovieUpdateDto {
	private String rating;
	private String posterUrl;
	private String imageUrl;
	
	@Builder
	public MovieUpdateDto(String rating, String posterUrl, String imageUrl) {
		this.rating = rating;
		this.posterUrl = posterUrl;
		this.imageUrl = imageUrl;
	}
}
