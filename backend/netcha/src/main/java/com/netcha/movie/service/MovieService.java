package com.netcha.movie.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.netcha.member.data.Member;
import com.netcha.member.data.MemberRepository;
import com.netcha.movie.data.Movie;
import com.netcha.movie.data.MovieLike;
import com.netcha.movie.data.MovieLikeRepository;
import com.netcha.movie.data.MovieRank;
import com.netcha.movie.data.MovieRankRepository;
import com.netcha.movie.data.MovieRepository;
import com.netcha.movie.data.MovieResponseDto;
import com.netcha.movie.data.MovieZzim;
import com.netcha.movie.data.MovieZzimRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MovieService {
	private final MovieRepository movieRepository;
	private final MovieRankRepository movieRankRepository;
	private final MovieLikeRepository movieLikeRepository;
	private final MovieZzimRepository movieZzimRepository;
	private final MemberRepository memberRepository;
	
	// 크롤링
	@Transactional
	public String[] crawling(Movie m) {
		String[] result = new String[3];
		try {
			String url = "https://www.kmdb.or.kr/db/kor/detail/movie/";
			url += m.getMovieId() + "/" + m.getMovieSeq();
			// rating 크롤링
			Document doc = Jsoup.connect(url).get();
			Elements fieldset = doc.select("#fieldset");
			String rating = fieldset.select("div.mProfile.type2").select("div.tx1").select("a.txtBlue").text();
			// image 2개 크롤링
			Elements image_ele = fieldset.select("div.result-block.mt2").select("div.mList8").select("ul").select("li");
			String image = "";
			if(image_ele.size() == 0) image = "default";
			else {
				image = image_ele.get(0).select("span.mImg1").select("span").attr("style").split(" ")[1].replace("url(", "").replace(")", "").replace("'","");
				if(image_ele.size() >= 2) image += "," + image_ele.get(1).select("span.mImg1").select("span").attr("style").split(" ")[1].replace("url(", "").replace(")", "").replace("'","");
			}
			// poster 크롤링
			url += "/own/image";
			doc = Jsoup.connect(url).get();
			fieldset = doc.select("#fieldset");
			String poster = "";
			Elements poster_ele = fieldset.select("div.result-block.pt1").select("div.mList8.type3").select("ul").select("li");
			if(poster_ele.size() == 0) poster = "default";
			else poster = poster_ele.select("span.mImg1").select("span").attr("style").split(" ")[1].replace("url(", "").replace(")", "").replace("'","");
			System.out.println(rating+" "+poster+" "+image);
			result[0] = rating;
			result[1] = poster;
			result[2] = image;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	// 테스트용
	@Transactional
	public List<MovieResponseDto> findByOpenAndTimeAndMovieId(String open, long time, String movieId) {
		System.out.println(open+" "+time+" "+movieId);
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOpenAndTimeAndMovieId(open, time, movieId);
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			movies.add(new MovieResponseDto(m));
		}
		return movies;
	}
	
	// 새로운 컨텐츠
	@Transactional
	public List<MovieResponseDto> findMovieByNewContents(int userId, int pageNum) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOrderByOpenDesc(PageRequest.of(pageNum, 40, Direction.DESC, "open"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = true;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 인기 순위 
	@Transactional
	public List<MovieResponseDto> findMovieByTotalView(int userId, int pageNum) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOrderByTotalViewDesc("1995-01-01", PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = true;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 컨텐츠 기반 추천
	@Transactional
	public List<MovieResponseDto> recommendMovieByRank(int userId, long pageNum) {
		// 유저 아이디에 해당하는 영화 평점 정보 리스트
		List<MovieRank> movieRankList = movieRankRepository.findAllByMemberSeq(userId);
		// 영화 전체 정보
		List<Movie> movieList = movieRepository.findAll();
		Map<String, float[]> ganreValue = new HashMap<String, float[]>();
		for(MovieRank mr : movieRankList) {
			String[] ganres = mr.getGanre().split(",");
			for(String ganre : ganres) {
				if(!ganreValue.containsKey(ganre)) ganreValue.put(ganre, new float[2]);
				float[] value = ganreValue.get(ganre);
				value[0] += 1;
				value[1] += mr.getRanking();
				ganreValue.put(ganre, value);
			}
		}		
		List<float[]> scoreList = new ArrayList<float[]>();
		for(Movie movie : movieList) {
			if(movie.getOpen().compareTo("1995-01-01") < 0) continue;
			float score = 0;
			String[] ganres = movie.getGanre().split(",");
			for(int i=1; i<=ganres.length; i++) {
				String ganre = ganres[i-1];
				if(ganreValue.containsKey(ganre))
					score += (1*Math.pow(0.9, i))*(ganreValue.get(ganre)[1]/ganreValue.get(ganre)[0]);
			}
			float[] obj = new float[2];
			obj[0] = movie.getNo();
			obj[1] = score;
			scoreList.add(obj);
		}
		scoreList.sort(new Comparator<float[]>() {
			@Override
			public int compare(float[] o1, float[] o2) {
				return Float.compare(o2[1], o1[1]);
			}
		});
		List<MovieResponseDto> result = new ArrayList<MovieResponseDto>();
		int idx = (int)pageNum*40;
		for(int i=idx; i<idx+40; i++) {
			Movie m = movieRepository.findById((long)scoreList.get(i)[0]).get();
			if(m.getRating().equals("")) {
				String[] temp = crawling(m);
				m.updateCrawling(temp[0], temp[1], temp[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = true;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			result.add(movie);
		}
		return result;
	}
	
	// 장르별 
	@Transactional
	public List<MovieResponseDto> findMovieByGanre(int userId, int pageNum, String ganre) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByGanreOrderByTotalViewDesc("1995-01-01", ganre, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = true;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 키워드별
	@Transactional
	public List<MovieResponseDto> findMovieByKeyword(int userId, int pageNum, String keyword) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByKeywordOrderByTotalViewDesc("1995-01-01", keyword, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = true;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 나라별
	@Transactional
	public List<MovieResponseDto> findMovieByCountry(int userId, int pageNum, String country) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByCountryOrderByTotalViewDesc("1995-01-01", country, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = true;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 평점 순 
	@Transactional
	public List<MovieResponseDto> findMovieByAvgRank(int userId, int pageNum) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOrderByTotalViewDesc("1995-01-01", PageRequest.of(pageNum, 40, Direction.DESC, "avgRank", "totalView"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = true;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 장르, 나라별
	@Transactional
	public List<MovieResponseDto> findMovieByGanreAndCountry(int userId, int pageNum, String ganre, String country) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByGanreLikeAndCountryLike(ganre, country, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = true;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 감독별
	@Transactional
	public List<MovieResponseDto> findMovieByDirector(int userId, String director) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByDirectorLike(director);
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = true;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 배우별
	@Transactional
	public List<MovieResponseDto> findMovieByCast(int userId, String cast) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByCastLike(cast);
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = true;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 평가하기
	@Transactional
	public void updateRank(int userId, long movieNo, float ranking) {
		MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, movieNo);
		// 한번도 평점 체크한적 없으면 새로 만들기
		if(movieRank == null) {
			Movie movie = movieRepository.findById(movieNo).get();
			Member member = memberRepository.findById(userId).get();
			movieRank = movieRankRepository.save(new MovieRank(member, ranking, movie.getGanre(), movie));
			movie.updateMovieRank(movieRank);
		// 평점 체크한적 있으면 업데이트하기
		} else movieRank.update(ranking);
	}
	
	// 평가 삭제
	@Transactional
	public void deleteRank(int userId, long movieNo) {
		movieRankRepository.delete(movieRankRepository.findByMemberSeqAndMovieNo(userId, movieNo));
	}
	
	// 평가하기 페이지
	@Transactional
	public List<MovieResponseDto> findMovieByNoNotInNo(int userId, int pageNum) {
		List<MovieRank> movieRanks = movieRankRepository.findAllByMemberSeq(userId);
		List<Movie> movieR = null;
		// 평가한적이 없으면 조회수 순
		if(movieRanks.size() == 0) {
			Page<Movie> moviePages = movieRepository.findAll(PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
			movieR = moviePages.getContent();
		} else { // 평가한 영화는 제외
			List<Long> movieNos = new ArrayList<Long>();
			for(int i=0; i<movieRanks.size(); i++) movieNos.add(movieRanks.get(i).getMovie().getNo());
			movieR = movieRepository.findByNoNotIn(movieNos, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		}
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			boolean mr = false;
			int ml = 0;
			boolean mz = false;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		Collections.shuffle(movies);
		return movies;
	}
	
	// 좋아요/싫어요
	@Transactional
	public void updateLike(int userId, long movieNo, long like) {
		MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, movieNo);
		if(movieLike == null) {
			// 좋아요, 싫어요 한적 없으면 추가
			Movie movie = movieRepository.findById(movieNo).get();
			Member member = memberRepository.findById(userId).get();
			movieLikeRepository.save(new MovieLike(member, like, movie));
		} else {
			// 같은거 누르면 삭제
			if(movieLike.getLikeHate() == like) movieLikeRepository.delete(movieLike);
			// 다른거 누르면 수정
			else movieLike.update(like);
		}
	}
	
	// 찜하기
	@Transactional
	public void updateZzim(int userId, long movieNo) {
		Movie movie = movieRepository.findById(movieNo).get();
		Member member = memberRepository.findById(userId).get();
		movieZzimRepository.save(new MovieZzim(member, movie));
	}
	
	// 찜하기 취소
	@Transactional
	public void deleteZzim(int userId, long movieNo) {
		movieZzimRepository.delete(movieZzimRepository.findByMemberSeqAndMovieNo(userId, movieNo));
	}
	
	
	
	public void test() {
		Movie movie = movieRepository.findById((long)3).get();
		for(MovieRank mr : movie.getMovieRank()) {
			System.out.println(mr.getMember().getNickname()+" "+mr.getMovie().getNo());
		}
	}
}
