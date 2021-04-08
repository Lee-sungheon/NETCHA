package com.netcha.movie.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.netcha.member.data.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "movie_review")
public class MovieReview {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long no;
	private String userNickname;
	private String content;
	@Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date regtime;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "movie_id")
	private Movie movie;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private Member member;
	
	@JsonIgnore
	@OneToMany(mappedBy = "movieReview", fetch = FetchType.LAZY)
	List<MovieReviewLike> movieReviewLike = new ArrayList<MovieReviewLike>();
	
	public MovieReview(Member member, Movie movie, String content) {
		this.member = member;
		this.userNickname = member.getNickname();
		this.movie = movie;
		this.content = content;
	}
	
	public void update(String content) {
		this.content = content;
	}
}
