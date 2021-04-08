package com.netcha.movie.data;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	private String open;
	private String directors;
	private String casts;
	private String keywords;
	private String rating;
	private String posterUrl;
	private String imageUrl;
	private long totalView;
	private float avgRank;
	
	@JsonIgnore
	@OneToMany(mappedBy = "movie", fetch = FetchType.LAZY)
	private List<MovieRank> movieRank = new ArrayList<MovieRank>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "movie", fetch = FetchType.LAZY)
	private List<MovieLike> movieLike = new ArrayList<MovieLike>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "movie", fetch = FetchType.LAZY)
	private List<MovieZzim> movieZzim = new ArrayList<MovieZzim>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "movie", fetch = FetchType.LAZY)
	private List<MovieYoutube> movieYoutube = new ArrayList<MovieYoutube>();
	
	public void updateCrawling(String rating, String posterUrl, String imageUrl) {
		this.rating = rating;
		this.posterUrl = posterUrl;
		this.imageUrl = imageUrl;
	}
	
	public void updateMovieRank(MovieRank movierank) {
		this.movieRank.add(movierank);
		if(movierank.getMovie() != this) movierank.updateMovie(this);
		float sum = 0;
		for(int i=0; i<movieRank.size(); i++) sum += movieRank.get(i).getRanking();
		this.avgRank = (int)(sum / (float)movieRank.size() * 10) / (float)10;
	}
	
	public void updateAvgRank(float avgRank) {
		this.avgRank = avgRank;
	}
	
	public void updateView() {
		this.totalView += 1;
	}
}
