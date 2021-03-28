package com.netcha.movie.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.*;

@NoArgsConstructor
@Getter
@Entity
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	private String movieId;
	private String movieSeq;
	private String title;
	private String scenario;
	private String country;
	private String company;
	private Long time;
	private String ganre;
	private Long open;
	private String directors;
	private String casts;
	private String keywords;
	private String rating;
	private String posterUrl;
	private String imageUrl;
	
	public void update(String rating, String posterUrl, String imageUrl) {
		this.rating = rating;
		this.posterUrl = posterUrl;
		this.imageUrl = imageUrl;
	}
}
