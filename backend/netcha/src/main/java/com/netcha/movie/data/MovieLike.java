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
@Table(name = "movie_like")
public class MovieLike {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long no;
	private long likeHate;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "movie_id")
	private Movie movie;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private Member member;
	
	public MovieLike(Member member, long likeHate, Movie movie) {
		this.member = member;
		this.likeHate = likeHate;
		this.movie = movie;
	}
	
	public void update(long likeHate) {
		this.likeHate = likeHate;
	}
}
