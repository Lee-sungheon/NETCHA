package com.netcha.movie.data;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "movie_youtube")
public class MovieYoutube {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long no;
	private String title;
    private String thumbnail;
    private String linkUrl;
	
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "movie_id")
	private Movie movie;
    
    public MovieYoutube(Movie movie, String title, String thumbnail, String linkUrl) {
    	this.movie = movie;
    	this.title = title;
    	this.thumbnail = thumbnail;
    	this.linkUrl = linkUrl;
    }
}
