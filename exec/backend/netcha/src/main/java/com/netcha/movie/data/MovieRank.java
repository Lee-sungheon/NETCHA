package com.netcha.movie.data;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.netcha.member.data.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "movie_rank")
public class MovieRank {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long no;
	private float ranking;
	private String ganre;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "movie_id")
	private Movie movie;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private Member member;
	
	public MovieRank(Member member, float ranking, String ganre, Movie movie) {
		this.member = member;
		this.ranking = ranking;
		this.ganre = ganre;
		this.movie = movie;
	}
	
	public void update(float ranking) {
		this.ranking = ranking;
		float sum = 0;
		for(int i=0; i<movie.getMovieRank().size(); i++) sum += movie.getMovieRank().get(i).getRanking();
		movie.updateAvgRank((int)(sum / (float)movie.getMovieRank().size() * 10) / (float)10);
	}
	
	public void updateMovie(Movie movie) {
		this.movie = movie;
		if(!movie.getMovieRank().contains(this))
			movie.getMovieRank().add(this);
	}
}
