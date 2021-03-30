package com.netcha.movie.data;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.*;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "movie")
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long no;
	private String movieId;
	private String movieSeq;
	private String title;
	private String scenario;
	private String country;
	private String company;
	private long time;
	private String ganre;
	private long open;
	private String directors;
	private String casts;
	private String keywords;
	private String rating;
	private String posterUrl;
	private String imageUrl;
	private long totalView;
	
	@OneToMany(mappedBy = "movie")
	private List<MovieRank> movieRank = new ArrayList<MovieRank>();
	
	public void updateRPI(String rating, String posterUrl, String imageUrl) {
		this.rating = rating;
		this.posterUrl = posterUrl;
		this.imageUrl = imageUrl;
	}
	
	public void updateView() {
		this.totalView += 1;
	}
}
