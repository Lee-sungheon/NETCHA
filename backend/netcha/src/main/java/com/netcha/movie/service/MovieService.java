package com.netcha.movie.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.netcha.movie.data.Movie;
import com.netcha.movie.data.MovieRank;
import com.netcha.movie.data.MovieRankRepository;
import com.netcha.movie.data.MovieRankResponseDto;
import com.netcha.movie.data.MovieRepository;
import com.netcha.movie.data.MovieResponseDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MovieService {
	private final MovieRepository movieRepository;
	private final MovieRankRepository movieRankRepository;
	
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
	
	@Transactional
	public List<MovieResponseDto> findMovieByNewContents(int pageNum) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOrderByOpenDesc(PageRequest.of(pageNum, 40, Direction.DESC, "open"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			movies.add(new MovieResponseDto(m));
		}
		return movies;
	}
	
	@Transactional
	public List<MovieResponseDto> findMovieByTotalView(int pageNum) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOrderByTotalViewDesc("1995-01-01", PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			movies.add(new MovieResponseDto(m));
		}
		return movies;
	}
	
	@Transactional
	public List<MovieRankResponseDto> findMovieRankByUserId(long userId) {
		List<MovieRankResponseDto> movieRankList = new ArrayList<MovieRankResponseDto>();
		List<MovieRank> list = movieRankRepository.findAllByUserId(userId);
		for(int i=0; i<list.size(); i++) movieRankList.add(new MovieRankResponseDto(list.get(i)));
		return movieRankList;
	}
	
	@Transactional
	public List<MovieResponseDto> recommendMovieByRank(long userId) {
		// 유저 아이디에 해당하는 영화 평점 정보 리스트
		List<MovieRankResponseDto> movieRankList = findMovieRankByUserId(userId);
		// 영화 전체 정보
		List<Movie> movieList = movieRepository.findAll();
		Map<String, float[]> ganreValue = new HashMap<String, float[]>();
		for(MovieRankResponseDto mr : movieRankList) {
			for(String ganre : mr.getGanre()) {
				if(!ganreValue.containsKey(ganre)) ganreValue.put(ganre, new float[2]);
				float[] value = ganreValue.get(ganre);
				value[0] += 1;
				value[1] += mr.getRanking();
				ganreValue.put(ganre, value);
			}
		}		
		List<float[]> scoreList = new ArrayList<float[]>();
		for(Movie movie : movieList) {
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
		for(int i=0; i<40; i++) {
			Movie movie = movieRepository.findById((long)scoreList.get(i)[0]).get();
			if(movie.getRating().equals("")) {
				String[] temp = crawling(movie);
				movie.updateCrawling(temp[0], temp[1], temp[2]);
			}
			result.add(new MovieResponseDto(movie));
		}
		return result;
	}

	@Transactional
	public List<MovieResponseDto> findMovieByGanre(int pageNum, String ganre) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByGanreOrderByTotalViewDesc("1995-01-01", ganre, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			movies.add(new MovieResponseDto(m));
		}
		return movies;
	}
	
	@Transactional
	public List<MovieResponseDto> findMovieByKeyword(int pageNum, String keyword) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByKeywordOrderByTotalViewDesc("1995-01-01", keyword, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			movies.add(new MovieResponseDto(m));
		}
		return movies;
	}
	
	@Transactional
	public void updateRank(long userId, long movieNo, float ranking) {
		MovieRank movieRank = movieRankRepository.findByUserIdAndMovieNo(userId, movieNo);
		// 한번도 평점 체크한적 없으면 새로 만들기
		if(movieRank == null) {
			Movie movie = movieRepository.findById(movieNo).get();
			movieRank = movieRankRepository.save(new MovieRank(userId, ranking, movie.getGanre(), movie));
			movie.updateMovieRank(movieRank);
		// 평점 체크한적 있으면 업데이트하기
		} else movieRank.update(ranking);
	}
	
	@Transactional
	public List<MovieResponseDto> findMovieByAvgRank(int pageNum) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOrderByTotalViewDesc("1995-01-01", PageRequest.of(pageNum, 40, Direction.DESC, "avgRank", "totalView"));
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			movies.add(new MovieResponseDto(m));
		}
		return movies;
	}
	
	public void test() {
		MovieRank movieRank = movieRankRepository.findByUserIdAndMovieNo(3, 3);
		if(movieRank == null) System.out.println("null임");
		else System.out.println("아님");
	}
	
//	public void test() {
//		List<Movie> movies = movieRepository.findAll();
//		Set<String> keywords = new HashSet<String>();
//		
//		for(Movie movie : movies) {
//			String[] ks = movie.getKeywords().split(",");
//			for(int j=0; j<ks.length; j++) {
//				keywords.add(ks[j].replace(" ", ""));
//			}
//		}
//		System.out.println(keywords.size());
//	}
}
