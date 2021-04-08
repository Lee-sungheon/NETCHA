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
@Table(name = "movie_review_like")
public class MovieReviewLike {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long no;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private Member member;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "review_no")
	private MovieReview movieReview;
	
	public MovieReviewLike(Member member, MovieReview movieReview) {
		this.member = member;
		this.movieReview = movieReview;
	}
}
