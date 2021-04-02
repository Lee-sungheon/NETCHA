package com.netcha.movie.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieZzimRepository extends JpaRepository<MovieZzim, Long> {
	public MovieZzim findByMemberSeqAndMovieNo(int memberSeq, long movieNo);
}
