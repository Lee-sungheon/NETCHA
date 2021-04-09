package com.netcha.movie.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
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
import com.netcha.movie.data.MovieReview;
import com.netcha.movie.data.MovieReviewDto;
import com.netcha.movie.data.MovieReviewLike;
import com.netcha.movie.data.MovieReviewLikeRepository;
import com.netcha.movie.data.MovieReviewRepository;
import com.netcha.movie.data.MovieYoutube;
import com.netcha.movie.data.MovieYoutubeRepository;
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
	private final MovieReviewRepository movieReviewRepository;
	private final MovieReviewLikeRepository movieReviewLikeRepository;
	private final MovieYoutubeRepository movieYoutubeRepository;
	private final MemberRepository memberRepository;
	private List<Long> searchNos = null;
	private List<Movie> searchMovies = null;
	
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
			System.out.println("("+m.getTitle()+")"+rating+" "+poster+" "+image);
			result[0] = rating;
			result[1] = poster;
			result[2] = image;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	// 이미지 크롤링
	@Transactional
	public List<String[]> imageCrawling(Movie m) {
		List<String[]> result = new ArrayList<String[]>();
		try {
			String url = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=영화+";
			url += m.getTitle();
			Document doc = Jsoup.connect(url).get();
			Elements divArea = doc.select("div.cm_content_area._cm_content_area_casting");
			if(divArea == null) return null;
			Elements list = divArea.select("ul.list").select("li");
			
			for(Element li : list) {
				String name = li.select("img").attr("alt");
				String role = "";
				String image = "default";
				if(!name.equals("이미지 준비중")) image = li.select("img").attr("src");
				else name = li.select("div.title_box").select("strong.name.type_ell_2._html_ellipsis").select("span").text();
				Elements sub = li.select("div.title_box").select("span.sub_text.type_ell_2._html_ellipsis");
				if(sub != null) role = sub.select("._text").html();
				
				result.add(new String[] {name, role, image});
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
//	// 테스트용
//	@Transactional
//	public List<MovieResponseDto> findByOpenAndTimeAndMovieId(String open, long time, String movieId) {
//		System.out.println(open+" "+time+" "+movieId);
//		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
//		List<Movie> movieR = movieRepository.findByOpenAndTimeAndMovieId(open, time, movieId);
//		for(Movie m : movieR) {
//			if(m.getPosterUrl().equals("")) {
//				String[] result = crawling(m);
//				m.updateCrawling(result[0], result[1], result[2]);
//			}
//			movies.add(new MovieResponseDto(m));
//		}
//		return movies;
//	}
	
	// 새로운 컨텐츠
	@Transactional
	public List<MovieResponseDto> findMovieByNewContents(int userId, int pageNum) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOrderByOpenDesc(PageRequest.of(pageNum, 40, Direction.DESC, "open"));
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			if(userId != -1) {
				MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieRank != null) mr = movieRank.getRanking();
				MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieLike != null) ml = (int)movieLike.getLikeHate();
				MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieZzim != null) mz = true;
			}
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 인기 순위 
	@Transactional
	public List<MovieResponseDto> findMovieByTotalView(int userId, int pageNum) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOrderByTotalViewDesc("2015-01-01", PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			if(userId != -1) {
				MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieRank != null) mr = movieRank.getRanking();
				MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieLike != null) ml = (int)movieLike.getLikeHate();
				MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieZzim != null) mz = true;
			}
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
			if(movie.getOpen().compareTo("2015-01-01") < 0) continue;
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
		if(idx >= scoreList.size()) return null;
		int last = idx+40;
		if(last >= scoreList.size()) last = scoreList.size();
		for(int i=idx; i<last; i++) {
			Movie m = movieRepository.findById((long)scoreList.get(i)[0]).get();
			if(m.getPosterUrl().equals("")) {
				String[] temp = crawling(m);
				m.updateCrawling(temp[0], temp[1], temp[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = movieRank.getRanking();
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			result.add(movie);
		}
		return result;
	}
	
	// MBTI 기반 추천
	@Transactional
	public List<MovieResponseDto> recommendMovieByMBTI(int userId, long pageNum) {
		Member member = memberRepository.findById(userId).get();
		Map<String, String[]> mbti = new HashMap<String, String[]>();
		mbti.put("ESTJ", new String[] {"액션", "멜로/로맨스"});
		mbti.put("ESTP", new String[] {"전쟁", "범죄"});
	    mbti.put("ESFJ", new String[] {"가족", "코미디"});
	    mbti.put("ESFP", new String[] {"음악", "모험"});
	    mbti.put("ENTJ", new String[] {"스릴러", "범죄"});
	    mbti.put("ENTP", new String[] {"다큐멘터리", "미스터리"});
	    mbti.put("ENFJ", new String[] {"액션", "드라마"});
	    mbti.put("ENFP", new String[] {"판타지", "액션"});
	    mbti.put("ISTJ", new String[] {"다큐멘터리", "가족"});
	    mbti.put("ISTP", new String[] {"SF", "액션"});
	    mbti.put("ISFJ", new String[] {"멜로/로맨스", "애니메이션"});
	    mbti.put("ISFP", new String[] {"멜로/로맨스", "판타지"}); 
	    mbti.put("INTJ", new String[] {"SF", "판타지"});
	    mbti.put("INTP", new String[] {"SF", "미스터리"});
	    mbti.put("INFJ", new String[] {"드라마", "역사"});
	    mbti.put("INFP", new String[] {"공포", "스릴러"});
	    
	    Map<String, Integer> userMbti = new HashMap<String, Integer>();
	    userMbti.put(mbti.get(member.getMbti())[0], 6);
	    userMbti.put(mbti.get(member.getMbti())[1], 4);
	    
	    List<Movie> movieList = movieRepository.findAll();
	    List<int[]> scoreList = new ArrayList<int[]>();
	    for(Movie movie : movieList) {
			if(movie.getOpen().compareTo("2015-01-01") < 0) continue;
			int score = 0;
			String[] ganres = movie.getGanre().split(",");
			for(String ganre : ganres)
				if(userMbti.containsKey(ganre)) score += userMbti.get(ganre);
			scoreList.add(new int[] {(int)movie.getNo(), score});
	    }
	    scoreList.sort(new Comparator<int[]>() {
			@Override
			public int compare(int[] o1, int[] o2) {
				return Integer.compare(o2[1], o1[1]);
			}
		});
	    
		List<MovieResponseDto> result = new ArrayList<MovieResponseDto>();
		int idx = (int)pageNum*40;
		if(idx >= scoreList.size()) return null;
		int last = idx+40;
		if(last >= scoreList.size()) last = scoreList.size();
		for(int i=idx; i<last; i++) {
			Movie m = movieRepository.findById((long)scoreList.get(i)[0]).get();
			if(m.getPosterUrl().equals("")) {
				String[] temp = crawling(m);
				m.updateCrawling(temp[0], temp[1], temp[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = movieRank.getRanking();
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			result.add(movie);
		}
		return result;
	}
	
	// 비슷한 영화
	@Transactional
	public List<MovieResponseDto> recommendMovieBySimilar(int userId, long movieNo, long pageNum, int pageCnt) {
		Movie selectMovie = movieRepository.findById(movieNo).get();
		String[] companies = selectMovie.getCompany().split(",");
		Map<String, Integer> companyMap = new HashMap<String, Integer>();
		String[] countries = selectMovie.getCountry().split(",");
		Map<String, Integer> countryMap = new HashMap<String, Integer>();
		String[] ganres = selectMovie.getGanre().split(",");
		Map<String, Integer> ganreMap = new HashMap<String, Integer>();
		String[] keywords = selectMovie.getKeywords().split(",");
		Map<String, Integer> keywordMap = new HashMap<String, Integer>();
		for(String company : companies) companyMap.put(company, 100); 
		for(String country : countries) countryMap.put(country, 50);
		for(String ganre : ganres) ganreMap.put(ganre, 10);
		for(String keyword : keywords) keywordMap.put(keyword, 5);
		
		List<Movie> movieList = movieRepository.findByNoNot("2015-01-01", movieNo);
	    List<int[]> scoreList = new ArrayList<int[]>();
	    for(Movie movie : movieList) {
	    	if(movie.getOpen().compareTo("2015-01-01") < 0) continue;
	    	int score = 0;
	    	String[] cps = movie.getCompany().split(",");
	    	for(String cp : cps)
	    		if(companyMap.containsKey(cp)) score += companyMap.get(cp);
	    	String[] cs = movie.getCountry().split(",");
	    	for(String c : cs) 
	    		if(countryMap.containsKey(c)) score += countryMap.get(c);
	    	String[] gs = movie.getGanre().split(",");
	    	for(String g : gs)
	    		if(ganreMap.containsKey(g)) score += ganreMap.get(g);
	    	if(keywords.length != 0) {
	    		String[] ks = movie.getKeywords().split(",");
	    		for(String k : ks)
	    			if(keywordMap.containsKey(k)) score += keywordMap.get(k);
	    	}
	    	scoreList.add(new int[] {(int)movie.getNo(), score});
	    }	
	    scoreList.sort(new Comparator<int[]>() {
			@Override
			public int compare(int[] o1, int[] o2) {
				return Integer.compare(o2[1], o1[1]);
			}
		});
	    List<MovieResponseDto> result = new ArrayList<MovieResponseDto>();
		int idx = (int)pageNum*pageCnt;
		if(idx >= scoreList.size()) return null;
		int last = idx+pageCnt;
		if(last >= scoreList.size()) last = scoreList.size();
		for(int i=idx; i<last; i++) {
			Movie m = movieRepository.findById((long)scoreList.get(i)[0]).get();
			if(m.getPosterUrl().equals("")) {
				String[] temp = crawling(m);
				m.updateCrawling(temp[0], temp[1], temp[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieRank != null) mr = movieRank.getRanking();
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
		List<Movie> movieR = movieRepository.findByGanreOrderByTotalViewDesc("2015-01-01", ganre, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			if(userId != -1) {
				MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieRank != null) mr = movieRank.getRanking();
				MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieLike != null) ml = (int)movieLike.getLikeHate();
				MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieZzim != null) mz = true;
			}
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 키워드별
	@Transactional
	public List<MovieResponseDto> findMovieByKeyword(int userId, int pageNum, String keyword) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByKeywordOrderByTotalViewDesc("2015-01-01", keyword, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			if(userId != -1) {
				MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieRank != null) mr = movieRank.getRanking();
				MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieLike != null) ml = (int)movieLike.getLikeHate();
				MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieZzim != null) mz = true;
			}
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 나라별
	@Transactional
	public List<MovieResponseDto> findMovieByCountry(int userId, int pageNum, String country) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByCountryOrderByTotalViewDesc("2015-01-01", country, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			if(userId != -1) {
				MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieRank != null) mr = movieRank.getRanking();
				MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieLike != null) ml = (int)movieLike.getLikeHate();
				MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieZzim != null) mz = true;
			}
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 평점 순 
	@Transactional
	public List<MovieResponseDto> findMovieByAvgRank(int userId, int pageNum) {
		List<Movie> movieR = movieRepository.findAllByOpens("2015-01-01");
		List<float[]> scoreList = new ArrayList<float[]>();
		for(Movie m : movieR) {
			if(m.getMovieRank().size() == 0) scoreList.add(new float[] {(float)m.getNo(), 0});
			else scoreList.add(new float[] {(float)m.getNo(), m.getAvgRank()*m.getMovieRank().size()});
		}
		
		scoreList.sort(new Comparator<float[]>() {
			@Override
			public int compare(float[] o1, float[] o2) {
				return Float.compare(o2[1], o1[1]);
			}
		});
		List<MovieResponseDto> result = new ArrayList<MovieResponseDto>();
		int idx = (int)pageNum*40;
		if(idx >= scoreList.size()) return null;
		int last = idx+40;
		if(last >= scoreList.size()) last = scoreList.size();
		for(int i=idx; i<last; i++) {
			Movie m = movieRepository.findById((long)scoreList.get(i)[0]).get();
			if(m.getPosterUrl().equals("")) {
				String[] temp = crawling(m);
				m.updateCrawling(temp[0], temp[1], temp[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			if(userId != -1) {
				MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieRank != null) mr = movieRank.getRanking();
				MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieLike != null) ml = (int)movieLike.getLikeHate();
				MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieZzim != null) mz = true;
			}
			movie.userInfo(mr, ml, mz);
			result.add(movie);
		}
		return result;
	}
	
	// 장르, 나라별
	@Transactional
	public List<MovieResponseDto> findMovieByGanreAndCountry(int userId, int pageNum, String ganre, String country) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByGanreLikeAndCountryLike("2015-01-01", ganre, country, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			if(userId != -1) {
				MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieRank != null) mr = movieRank.getRanking();
				MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieLike != null) ml = (int)movieLike.getLikeHate();
				MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieZzim != null) mz = true;
			}
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 감독별
	@Transactional
	public List<MovieResponseDto> findMovieByDirector(int userId, String director, int pageNum) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByDirectorLike("2015-01-01", director, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			if(userId != -1) {
				MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieRank != null) mr = movieRank.getRanking();
				MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieLike != null) ml = (int)movieLike.getLikeHate();
				MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieZzim != null) mz = true;
			}
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 배우별
	@Transactional
	public List<MovieResponseDto> findMovieByCast(int userId, String cast, int pageNum) {
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByCastLike("2015-01-01", cast, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			if(userId != -1) {
				MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieRank != null) mr = movieRank.getRanking();
				MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieLike != null) ml = (int)movieLike.getLikeHate();
				MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
				if(movieZzim != null) mz = true;
			}
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 평가하기
	@Transactional
	public void updateRank(int userId, long movieNo, float ranking) {
		if(ranking > 0) {
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
	}
	
	// 평가 삭제
	@Transactional
	public void deleteRank(int userId, long movieNo) {
		MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, movieNo);
		if(movieRank != null) movieRankRepository.delete(movieRank);
	}
	
	// 평가 목록
	@Transactional
	public List<MovieResponseDto> listRank(int userId, int pageNum) {
		List<MovieRank> movieRanks = movieRankRepository.findAllByMemberSeq(userId);
		List<Long> movieNos = new ArrayList<Long>();
		List<Float> rankFloat = new ArrayList<Float>();
		for(int i=0; i<movieRanks.size(); i++) {
			movieNos.add(movieRanks.get(i).getMovie().getNo());
			rankFloat.add(movieRanks.get(i).getRanking());
		}
		List<Movie> movieR = movieRepository.findByNoIn("2015-01-01", movieNos, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 평가하기 페이지
	@Transactional
	public List<MovieResponseDto> findMovieByNoNotInNo(int userId, int pageNum) {
		List<MovieRank> movieRanks = movieRankRepository.findAllByMemberSeq(userId);
		List<Movie> movieR = null;
		// 평가한적이 없으면 조회수 순
		if(movieRanks.size() == 0) {
			movieR = movieRepository.findByOrderByTotalViewDesc("2015-01-01", PageRequest.of(pageNum, 40));
		} else { // 평가한 영화는 제외
			List<Long> movieNos = new ArrayList<Long>();
			for(int i=0; i<movieRanks.size(); i++) movieNos.add(movieRanks.get(i).getMovie().getNo());
			movieR = movieRepository.findByNoNotIn("2015-01-01", movieNos, PageRequest.of(pageNum, 40));
		}
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
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
	
	// 사용자의 영화 평가 개수
	@Transactional
	public int getCntByRank(int userId) {
		return movieRankRepository.findAllByMemberSeq(userId).size();
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
		MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, movieNo);
		if(movieZzim == null) {
			Movie movie = movieRepository.findById(movieNo).get();
			Member member = memberRepository.findById(userId).get();
			movieZzimRepository.save(new MovieZzim(member, movie));			
		}
	}
	
	// 찜하기 취소
	@Transactional
	public void deleteZzim(int userId, long movieNo) {
		MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, movieNo);
		if(movieZzim != null)
			movieZzimRepository.delete(movieZzim);
	}
	
	// 찜한 목록
	@Transactional
	public List<MovieResponseDto> listZzim(int userId, int pageNum) {
		List<MovieZzim> movieZzims = movieZzimRepository.findAllByMemberSeq(userId);
		List<Long> movieNos = new ArrayList<Long>();
		for(int i=0; i<movieZzims.size(); i++) movieNos.add(movieZzims.get(i).getMovie().getNo());
		List<Movie> movieR = movieRepository.findByNoIn("2015-01-01", movieNos, PageRequest.of(pageNum, 40, Direction.DESC, "totalView"));
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		for(Movie m : movieR) {
			if(m.getPosterUrl().equals("")) {
				String[] result = crawling(m);
				m.updateCrawling(result[0], result[1], result[2]);
			}
			MovieResponseDto movie = new MovieResponseDto(m);
			float mr = 0;
			int ml = 0;
			boolean mz = false;
			MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieLike != null) ml = (int)movieLike.getLikeHate();
			MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
			if(movieZzim != null) mz = true;
			movie.userInfo(mr, ml, mz);
			movies.add(movie);
		}
		return movies;
	}
	
	// 리뷰 달기
	@Transactional
	public void insertReview(int userId, long movieNo, String content) {
		MovieReview movieReview = movieReviewRepository.findByMemberSeqAndMovieNo(userId, movieNo);
		if(movieReview == null) {
			Movie movie = movieRepository.findById(movieNo).get();
			Member member = memberRepository.findById(userId).get();
			movieReview = new MovieReview(member, movie, content);
			movieReviewRepository.save(movieReview);
		}
	}
	
	// 리뷰 수정
	@Transactional
	public void updateReview(int userId, long movieNo, String content) {
		MovieReview movieReview = movieReviewRepository.findByMemberSeqAndMovieNo(userId, movieNo);
		if(movieReview != null) 
			movieReview.update(content);
	}
	
	// 리뷰 삭제
	@Transactional
	public void deleteReview(int userId, long movieNo) {
		MovieReview movieReview = movieReviewRepository.findByMemberSeqAndMovieNo(userId, movieNo);
		if(movieReview != null) 
			movieReviewRepository.delete(movieReview);
	}
	
	// 리뷰 좋아요
	@Transactional
	public void insertReviewLike(int userId, long reviewNo) {
		MovieReviewLike movieReviewLike = movieReviewLikeRepository.findByMemberSeqAndMovieReviewNo(userId, reviewNo);
		if(movieReviewLike == null) {
			Member member = memberRepository.findById(userId).get();
			MovieReview movieReview = movieReviewRepository.findById(reviewNo).get();
			movieReviewLike = new MovieReviewLike(member, movieReview);
			movieReviewLikeRepository.save(movieReviewLike);
		}			
	}
	
	// 리뷰 좋아요 취소
	@Transactional
	public void deleteReviewLike(int userId, long reviewNo) {
		MovieReviewLike movieReviewLike = movieReviewLikeRepository.findByMemberSeqAndMovieReviewNo(userId, reviewNo);
		if(movieReviewLike != null) 
			movieReviewLikeRepository.delete(movieReviewLike);
	}
	
	// 리뷰 목록
	@Transactional
	public List<MovieReviewDto> listReview(int userId, long movieNo) {
		List<MovieReview> movieReviews = movieReviewRepository.findByMovieNo(movieNo);
		List<MovieReviewDto> result = new ArrayList<MovieReviewDto>();
		for(MovieReview mr : movieReviews) {
			MovieReviewDto mrd = new MovieReviewDto(mr);
			MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(mr.getMember().getSeq(), movieNo);
			MovieReviewLike movieLike = movieReviewLikeRepository.findByMemberSeqAndMovieReviewNo(userId, mr.getNo());
			boolean mine = false;
			boolean like = false;
			if(mr.getMember().getSeq() == userId) mine = true;
			if(movieLike != null) like = true; 
			if(movieRank != null) mrd.update(mine, like, movieRank.getRanking());
			else mrd.update(mine, like, 0);
			result.add(mrd);
		}
		return result;
	}
	
	// 영화 상세정보
	@Transactional
	public Map<String, Object> getMovieDetail(int userId, long movieNo) {
		Map<String, Object> result = new HashMap<String, Object>();
		
		Movie movie = movieRepository.findById(movieNo).get();
		float mr = 0;
		int ml = 0;
		boolean mz = false;
		
		MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, movieNo);
		if(movieRank == null)
			result.put("user_rank", -1);
		else {
			mr = movieRank.getRanking();
			result.put("user_rank", movieRank.getRanking());
		}
		
		MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, movie.getNo());
		if(movieLike != null) ml = (int)movieLike.getLikeHate();
		MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, movie.getNo());
		if(movieZzim != null) mz = true;
		
		MovieReview movieReview = movieReviewRepository.findByMemberSeqAndMovieNo(userId, movieNo);
		if(movieReview == null) result.put("user_review", null);
		else result.put("user_review", movieReview.getContent());
		
		result.put("movie_review", listReview(userId, movieNo));

		MovieResponseDto movieDto = new MovieResponseDto(movie);
		movieDto.userInfo(mr, ml, mz);
		result.put("movie_info", movieDto);
		
		Map<Float, Integer> userRank = getRankByMovie(movieNo);
		result.put("movie_rank", userRank);
		
		List<String[]> actors = imageCrawling(movie);
		result.put("actors", actors);
		//result.put("similar_movie", recommendMovieBySimilar(userId, movieNo, 0, 16));
		
		return result;
	}
	
	// 영화별 평점 현황
	@Transactional
	public Map<Float, Integer> getRankByMovie(long movieNo) {
		List<MovieRank> ranks = movieRankRepository.findAllByMovieNo(movieNo);
		Map<Float, Integer> userRank = new HashMap<Float, Integer>();
		userRank.put((float)0.5, 0);
		userRank.put((float)1, 0);
		userRank.put((float)1.5, 0);
		userRank.put((float)2, 0);
		userRank.put((float)2.5, 0);
		userRank.put((float)3, 0);
		userRank.put((float)3.5, 0);
		userRank.put((float)4, 0);
		userRank.put((float)4.5, 0);
		userRank.put((float)5, 0);
		for(MovieRank rank : ranks) userRank.put(rank.getRanking(), userRank.get(rank.getRanking()) + 1);
		return userRank;
	}
	
	// 사용자 선호 감독, 배우, 국가, 장르, 태그
	@Transactional
	public Map<String, Object> userFavor(int userId, int ord) {
		Map<String, Object> answer = new HashMap<String, Object>();
		List<MovieRank> ranks = movieRankRepository.findAllByMemberSeq(userId);
		List<MovieLike> likes = movieLikeRepository.findAllByMemberSeq(userId);
		List<MovieZzim> zzims = movieZzimRepository.findAllByMemberSeq(userId);
		
		Map<String, Integer> favorDirector = new HashMap<String, Integer>();
		Map<String, Integer> favorCast = new HashMap<String, Integer>();
		Map<String, Integer> favorCountry = new HashMap<String, Integer>();
		Map<String, Integer> favorGanre = new HashMap<String, Integer>();
		Map<String, Integer> favorKeyword = new HashMap<String, Integer>();
		
		switch(ord) {
		case 1:
			for(MovieRank mr : ranks) {
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorDirector.merge(k, v, (v1, v2) -> v1+v2));
			}
			for(MovieLike mr : likes) {
				if(mr.getLikeHate() < 0) continue;
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorDirector.merge(k, v, (v1, v2) -> v1+v2));
			}
			for(MovieZzim mr : zzims) {
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorDirector.merge(k, v, (v1, v2) -> v1+v2));
			}
			break;
		case 2:
			for(MovieRank mr : ranks) {
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorCast.merge(k, v, (v1, v2) -> v1+v2));
			}
			for(MovieLike mr : likes) {
				if(mr.getLikeHate() < 0) continue;
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorCast.merge(k, v, (v1, v2) -> v1+v2));
			}
			for(MovieZzim mr : zzims) {
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorCast.merge(k, v, (v1, v2) -> v1+v2));
			}
			break;
		case 3:
			for(MovieRank mr : ranks) {
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorCountry.merge(k, v, (v1, v2) -> v1+v2));
			}
			for(MovieLike mr : likes) {
				if(mr.getLikeHate() < 0) continue;
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorCountry.merge(k, v, (v1, v2) -> v1+v2));
			}
			for(MovieZzim mr : zzims) {
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorCountry.merge(k, v, (v1, v2) -> v1+v2));
			}
			break;
		case 4:
			for(MovieRank mr : ranks) {
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorGanre.merge(k, v, (v1, v2) -> v1+v2));
			}
			for(MovieLike mr : likes) {
				if(mr.getLikeHate() < 0) continue;
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorGanre.merge(k, v, (v1, v2) -> v1+v2));
			}
			for(MovieZzim mr : zzims) {
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorGanre.merge(k, v, (v1, v2) -> v1+v2));
			}
			break;
		case 5:
			for(MovieRank mr : ranks) {
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				if(movie.getKeywords().equals("")) continue;
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorKeyword.merge(k, v, (v1, v2) -> v1+v2));
			}
			for(MovieLike mr : likes) {
				if(mr.getLikeHate() < 0) continue;
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				if(movie.getKeywords().equals("")) continue;
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorKeyword.merge(k, v, (v1, v2) -> v1+v2));
			}
			for(MovieZzim mr : zzims) {
				Movie movie = movieRepository.findById(mr.getMovie().getNo()).get();
				if(movie.getKeywords().equals("")) continue;
				Map<String, Integer> map = findFavor(movie, ord);
				map.forEach((k,v) -> favorKeyword.merge(k, v, (v1, v2) -> v1+v2));
			}
		}
		List<String> result = new ArrayList<String>();
		switch(ord) {
		case 1: 
			List<Entry<String, Integer>> list_entry = new ArrayList<Entry<String,Integer>>(favorDirector.entrySet());
			Collections.sort(list_entry, new Comparator<Entry<String, Integer>>() {
				@Override
				public int compare(Entry<String, Integer> o1, Entry<String, Integer> o2) {
					return o2.getValue().compareTo(o1.getValue());
				}
			});
			int size = 9;
			if(list_entry.size() < 9) size = list_entry.size();
			for(int i=0; i<size; i++) {
				Entry<String, Integer> entry = list_entry.get(i);
				result.add(entry.getKey());
			}
			answer.put("director", result);
			break;
		case 2: 
			list_entry = new ArrayList<Entry<String,Integer>>(favorCast.entrySet());
			Collections.sort(list_entry, new Comparator<Entry<String, Integer>>() {
				@Override
				public int compare(Entry<String, Integer> o1, Entry<String, Integer> o2) {
					return o2.getValue().compareTo(o1.getValue());
				}
			});
			size = 9;
			if(list_entry.size() < 9) size = list_entry.size();
			for(int i=0; i<size; i++) {
				Entry<String, Integer> entry = list_entry.get(i);
				result.add(entry.getKey());
			}
			answer.put("cast", result);
			break;
		case 3: 
			List<Integer> count = new ArrayList<Integer>();
			list_entry = new ArrayList<Entry<String,Integer>>(favorCountry.entrySet());
			Collections.sort(list_entry, new Comparator<Entry<String, Integer>>() {
				@Override
				public int compare(Entry<String, Integer> o1, Entry<String, Integer> o2) {
					return o2.getValue().compareTo(o1.getValue());
				}
			});
			size = 3;
			if(list_entry.size() < 3) size = list_entry.size();
			for(int i=0; i<size; i++) {
				Entry<String, Integer> entry = list_entry.get(i);
				result.add(entry.getKey());
				count.add(entry.getValue()/3);
			}
			answer.put("country", result);
			answer.put("count", count);
			break;
		case 4: 
			count = new ArrayList<Integer>();
			list_entry = new ArrayList<Entry<String,Integer>>(favorGanre.entrySet());
			Collections.sort(list_entry, new Comparator<Entry<String, Integer>>() {
				@Override
				public int compare(Entry<String, Integer> o1, Entry<String, Integer> o2) {
					return o2.getValue().compareTo(o1.getValue());
				}
			});
			size = 3;
			if(list_entry.size() < 3) size = list_entry.size();
			for(int i=0; i<size; i++) {
				Entry<String, Integer> entry = list_entry.get(i);
				result.add(entry.getKey());
				count.add(entry.getValue()/3);
			}
			answer.put("ganre", result);
			answer.put("count", count);
			break;
		case 5: 
			list_entry = new ArrayList<Entry<String,Integer>>(favorKeyword.entrySet());
			Map<String, Integer> maps = new HashMap<String, Integer>();
			Collections.sort(list_entry, new Comparator<Entry<String, Integer>>() {
				@Override
				public int compare(Entry<String, Integer> o1, Entry<String, Integer> o2) {
					return o2.getValue().compareTo(o1.getValue());
				}
			});
			size = 9;
			if(list_entry.size() < 9) size = list_entry.size();
			for(int i=0; i<size; i++) {
				Entry<String, Integer> entry = list_entry.get(i);
				maps.put(entry.getKey(), entry.getValue()*100);
			}
			answer.put("keyword", maps);
		}
		return answer;
	}
	
	public Map<String, Integer> findFavor(Movie movie, int ord) {
		Map<String, Integer> favorDirector = new HashMap<String, Integer>();
		Map<String, Integer> favorCast = new HashMap<String, Integer>();
		Map<String, Integer> favorCountry = new HashMap<String, Integer>();
		Map<String, Integer> favorGanre = new HashMap<String, Integer>();
		Map<String, Integer> favorKeyword = new HashMap<String, Integer>();
			
		switch(ord) {
		case 1:
			String[] directors = movie.getDirectors().split(",");
			for(String director : directors) {
				String dr = director.split("\\(")[0].replace(" ", "");
				if(favorDirector.containsKey(dr)) favorDirector.put(dr, favorDirector.get(dr)+1);
				else favorDirector.put(dr, 1);
			}
			break;
		case 2:
			String[] casts = movie.getCasts().split(",");
			for(String cast : casts) {
				String ct = cast.split("\\(")[0].replace(" ", "");
				if(favorCast.containsKey(ct)) favorCast.put(ct, favorCast.get(ct)+1);
				else favorCast.put(ct, 1);
			}
			break;
		case 3:
			String[] countrys = movie.getCountry().split(",");
			for(String country : countrys) {
				String ctr = country.split("\\(")[0].replace(" ", "");
				if(favorCountry.containsKey(ctr)) favorCountry.put(ctr, favorCountry.get(ctr)+1);
				else favorCountry.put(ctr, 1);
			}
			break;
		case 4:
			String[] ganres = movie.getGanre().split(",");
			for(String ganre : ganres) {
				if(favorGanre.containsKey(ganre)) favorGanre.put(ganre, favorGanre.get(ganre)+1);
				else favorGanre.put(ganre, 1);
			}
			break;
		case 5:
			String[] keywords = movie.getKeywords().split(",");
			for(String keyword : keywords) {
				String kd = keyword.split("\\(")[0].replace(" ", "");
				if(favorKeyword.containsKey(kd)) favorKeyword.put(kd, favorKeyword.get(kd)+1);
				else favorKeyword.put(kd, 1);
			}
		}
		
		switch(ord) {
		case 1: return favorDirector;
		case 2: return favorCast;
		case 3: return favorCountry;
		case 4: return favorGanre;
		case 5: return favorKeyword;
		}
		return null;
	}
	
	// 사용자 평점 리스트
	@Transactional
	public int[] getRankByUser(int userId) {
		List<MovieRank> ranks = movieRankRepository.findAllByMemberSeq(userId);
		int[] userRank = new int[10];
		for(MovieRank rank : ranks) {
			if(rank.getRanking() == 0.5) userRank[0] += 1;
			else if(rank.getRanking() == 1) userRank[1] += 1;
			else if(rank.getRanking() == 1.5) userRank[2] += 1;
			else if(rank.getRanking() == 2) userRank[3] += 1;
			else if(rank.getRanking() == 2.5) userRank[4] += 1;
			else if(rank.getRanking() == 3) userRank[5] += 1;
			else if(rank.getRanking() == 3.5) userRank[6] += 1;
			else if(rank.getRanking() == 4) userRank[7] += 1;
			else if(rank.getRanking() == 4.5) userRank[8] += 1;
			else if(rank.getRanking() == 5) userRank[9] += 1;
		}
		return userRank;
	}
	
	// 찜목록 수
	@Transactional
	public long getCountZzimByUser(int userId) {
		return movieZzimRepository.countByMemberSeq(userId);
	}
	
	// 리뷰번호에 해당하는 상세 리뷰
	@Transactional
	public MovieReviewDto getMovieReviewByReviewNo(int userId, long reviewNo) {
		MovieReview movieReview = movieReviewRepository.findById(reviewNo).get();
		MovieReviewDto result = new MovieReviewDto(movieReview);
		MovieReviewLike like = movieReviewLikeRepository.findByMemberSeqAndMovieReviewNo(userId, reviewNo);
		MovieRank rank = movieRankRepository.findByMemberSeqAndMovieNo(userId, movieReview.getMovie().getNo());
		boolean isMine = false;
		boolean isMyLike = false;
		if(movieReview.getMember().getSeq() == userId) isMine = true;
		if(like != null) isMyLike = true;
		if(rank != null) result.update(isMine, isMyLike, rank.getRanking());
		else result.update(isMine, isMyLike, 0);
		return result;
	}
	
	// 검색 : 제목, 배우, 감독 포함 검색
	@Transactional
	public List<MovieResponseDto> searchTotalMovie(int userId, int pageNum, String search) {
		for(int i=0; i<search.length(); i++) {
			if(search.charAt(i) >= 'ㄱ' && search.charAt(i) <= 'ㅎ') search = search.replace(String.valueOf(search.charAt(i)), "");
			else if(search.charAt(i) >= 'ㅏ' && search.charAt(i) <= 'ㅣ') search = search.replace(String.valueOf(search.charAt(i)), "");
		}
		
		if(!search.equals("")) {
			searchMovies = new ArrayList<Movie>();
			searchMovies = movieRepository.findByOpenAndTitle("2015-01-01", search);
			searchNos = new ArrayList<Long>();
			searchNos.add((long) 0);
			searchNos.addAll(movieRepository.findByNoAndOpenAndTitle("2015-01-01", search));
			
			searchMovies.addAll(movieRepository.findByOpenAndCasts("2015-01-01", search, searchNos));
			searchNos.addAll(movieRepository.findByNoOpenAndCasts("2015-01-01", search, searchNos));
			
			searchMovies.addAll(movieRepository.findByOpenAndDirectors("2015-01-01", search, searchNos));
			searchNos.addAll(movieRepository.findByNoOpenAndDirectors("2015-01-01", search, searchNos));				
			
			List<MovieResponseDto> resultMovie = new ArrayList<MovieResponseDto>();
			
			int[] arr = new int[search.length()];
			for(int i=0; i<arr.length; i++) arr[i] = i;
			int[] result = null;
			int size = arr.length;
			while(searchMovies.isEmpty() && size > arr.length-2) {
				size -= 1;
				result = new int[size];
				makeComp(0, 0, arr, result, search);
			}
			if(searchMovies.isEmpty()) return null;
			// 비슷한 영화 찾기
			if(searchMovies.size() < 40) {
				for(int i=0; i<searchMovies.size(); i++) {
					Movie m = searchMovies.get(i);
					if(m.getPosterUrl().equals("")) {
						String[] temp = crawling(m);
						m.updateCrawling(temp[0], temp[1], temp[2]);
					}
					MovieResponseDto movie = new MovieResponseDto(m);
					float mr = 0;
					int ml = 0;
					boolean mz = false;
					if(userId != -1) {
						MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
						if(movieRank != null) mr = movieRank.getRanking();
						MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
						if(movieLike != null) ml = (int)movieLike.getLikeHate();
						MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
						if(movieZzim != null) mz = true;
					}
					movie.userInfo(mr, ml, mz);
					resultMovie.add(movie);
				}
				for(int i=0; i<searchMovies.size(); i++) {
					List<MovieResponseDto> similar = recommendMovieBySimilar(userId, searchMovies.get(i).getNo(), 0, 5);
					for(int j=similar.size()-1; j>=0; j--) {
						if(searchNos.contains(similar.get(j).getNo())) similar.remove(j);
						else searchNos.add(similar.get(j).getNo());
					}
					resultMovie.addAll(similar);
				}
				
				if(pageNum*40 > resultMovie.size()) return null;
				int idx = pageNum*40;
				int last = idx+40;
				if(last >= resultMovie.size()) last = resultMovie.size();
				return resultMovie.subList(idx, last);
			} else {
				int idx = pageNum*40;
				if(idx >= searchMovies.size()) return null;
				int last = idx+40;
				if(last >= searchMovies.size()) last = searchMovies.size();
				for(int i=idx; i<last; i++) {
					Movie m = searchMovies.get(i);
					if(m.getPosterUrl().equals("")) {
						String[] temp = crawling(m);
						m.updateCrawling(temp[0], temp[1], temp[2]);
					}
					MovieResponseDto movie = new MovieResponseDto(m);
					float mr = 0;
					int ml = 0;
					boolean mz = false;
					if(userId != -1) {
						MovieRank movieRank = movieRankRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
						if(movieRank != null) mr = movieRank.getRanking();
						MovieLike movieLike = movieLikeRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
						if(movieLike != null) ml = (int)movieLike.getLikeHate();
						MovieZzim movieZzim = movieZzimRepository.findByMemberSeqAndMovieNo(userId, m.getNo());
						if(movieZzim != null) mz = true;
					}
					movie.userInfo(mr, ml, mz);
					resultMovie.add(movie);
				}
				return resultMovie;
			}
		}
		return null;
	}
	
	public void makeComp(int begin, int cnt, int[] arr, int[] result, String search) {
		if(cnt == result.length) {
			if(searchMovies.size() >= 40) return;
			String s = "";
			for(int i=0; i<result.length; i++) s += String.valueOf(search.charAt(result[i]));
			System.out.println(s);
			searchMovies.addAll(movieRepository.findByOpenAndTitleAndNotNo("2015-01-01", s, searchNos));
			searchNos.addAll(movieRepository.findByNoOpenAndTitleAndNotNo("2015-01-01", s, searchNos));
			return;
		}
		
		for(int i=begin; i<arr.length; i++) {
			result[cnt] = arr[i];
			makeComp(i+1, cnt+1, arr, result, search);
		}
	}
	
	// 영화 제목 검색
	@Transactional
	public List<String> searchMovieByTitle(String search) {
		for(int i=0; i<search.length(); i++) {
			if(search.charAt(i) >= 'ㄱ' && search.charAt(i) <= 'ㅎ') search = search.replace(String.valueOf(search.charAt(i)), "");
			else if(search.charAt(i) >= 'ㅏ' && search.charAt(i) <= 'ㅣ') search = search.replace(String.valueOf(search.charAt(i)), "");
		}
		List<Movie> movies = movieRepository.findByOpenAndTitleAndPage("2015-01-01", search, PageRequest.of(0, 5));
		List<String> result = new ArrayList<String>();
		for(int i=0; i<movies.size(); i++) result.add(movies.get(i).getTitle());
		return result;
	}
	
	// 조회수 증가
	@Transactional
	public void updateView(long movieNo) {
		Movie movie = movieRepository.findById(movieNo).get();
		movie.updateView();
	}
	
	// 유튜브 링크 보내기
	@Transactional
	public List<Map<String, Object>> getYouTubeLink(long movieNo) {
//		List<MovieYoutube> movieYoutube = movieYoutubeRepository.findByMovieNo(movieNo);
//		if(movieYoutube.size() == 0) return null;
//		else return movieYoutube;
		Movie movie = movieRepository.findById(movieNo).get();
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for(int i=0; i<movie.getMovieYoutube().size(); i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("no", movie.getMovieYoutube().get(i).getNo());
			map.put("title", movie.getMovieYoutube().get(i).getTitle());
			map.put("thumbnail", movie.getMovieYoutube().get(i).getThumbnail());
			map.put("url", movie.getMovieYoutube().get(i).getLinkUrl());
			map.put("movieNo", movie.getMovieYoutube().get(i).getMovie().getNo());
			result.add(map);
		}
		return result;
	}
	
	// 유튜브 링크 받기
	@Transactional
	public void postYoutubeLike(List<Map<String, String>> movieYoutubes) {
		List<MovieYoutube> temp = movieYoutubeRepository.findByMovieNo(Long.parseLong(movieYoutubes.get(0).get("movieNo")));
		if(temp.size() == 0) {
			for(int i=0; i<movieYoutubes.size(); i++) {
				long movieNo = Long.parseLong(movieYoutubes.get(i).get("movieNo"));
				String title = movieYoutubes.get(i).get("title");
				String thumbnail = movieYoutubes.get(i).get("thumbnail");
				String url = movieYoutubes.get(i).get("url");
				Movie movie = movieRepository.findById(movieNo).get();
				movieYoutubeRepository.save(new MovieYoutube(movie, title, thumbnail, url));
			}
		}
	}
	
	
	
	@Transactional
	public void DBdump() {
		Map<Float, String[]> doReview = new HashMap<Float, String[]>();
		doReview.put((float)0.5, new String[] {"이건 안보는게 더 낫겠다 ㅋㅋ", "시간아까움..", "시간 버리고 싶은 사람한테 강추!"});
		doReview.put((float)1, new String[] {"넘 별로;", "최하점은 아닌거같아서 1점줌", "안본 눈 삽니다~"});
		doReview.put((float)1.5, new String[] {"2점까진 아니고 1점보단 낫다 ㅋㅋ","제작비 어디로 감~","스토리 누가씀?"});
		doReview.put((float)2, new String[] {"딱 이정도 영화","두번 볼 정도는 아닌듯 ㅋㅋ","재밌을려고 하면 재미없어지는 영화"});
		doReview.put((float)2.5, new String[] {"CG가 너무 티나..","스토리가 너무 빈약함","이 배우진으로 이정도 밖에.."});
		doReview.put((float)3, new String[] {"개연성이 부족한데 나름 볼만함","시간 때우기에 적합","두번은 볼만한듯 ㅋㅋ"});
		doReview.put((float)3.5, new String[] {"재밌지만 조금 아쉬운 영화","제작비 조금만 더쓰지 ㅜ","배우들이 좋아서 이정도 준다.."});
		doReview.put((float)4, new String[] {"배우들 연기력 대박 ㄷㄷ","결말 조금만 더 좋았으면 5점 줬을듯","간만에 재밌었네 ㅋㅋ"});
		doReview.put((float)4.5, new String[] {"감동적이야 ㅜㅜ","나중에 한번더 봐야지!!","스토리 개연성이 너무 좋다!"});
		doReview.put((float)5, new String[] {"진짜 최고의 영화!!","6점있었으면 6점 줬다 ㄷㄷ","10번째 보는중인데 아직도 재밌음ㅋㅋ"});
		
		Float[] doRank = {(float) 0.5, (float)1, (float)1.5, (float)2, (float)2.5, (float)3, (float)3.5, (float)4, (float)4.5, (float)5};
		
		
		List<Member> memberList = memberRepository.findAll();
		for(Member member : memberList) {
			if(member.getMbti().equals("") || member.getUserId().substring(0, 4).equals("test")) continue;
			List<MovieResponseDto> newContents = findMovieByNewContents(member.getSeq(), 0);
			for(MovieResponseDto movie : newContents) {
				if(movie.getUserDidRank() == 0) {
					int r = (int)(Math.random()*3);
					int idx = 0;
					if(r == 0) idx = (int)(Math.random()*5);
					else idx = (int)(Math.random()*5)+5;
					updateRank(member.getSeq(), movie.getNo(), doRank[idx]);
				}
				MovieRank rank = movieRankRepository.findByMemberSeqAndMovieNo(member.getSeq(), movie.getNo());
				
				if(!movie.isUserDidZzim()) 
					if(rank.getRanking() >= 3) 
						updateZzim(member.getSeq(), movie.getNo());
				
				if(movie.getUserDidLike() == 0) {
					if(rank.getRanking() >= 4) updateLike(member.getSeq(), movie.getNo(), 1);
					else if(rank.getRanking() <=1.5) updateLike(member.getSeq(), movie.getNo(), -1);
				}
				
				MovieReview review = movieReviewRepository.findByMemberSeqAndMovieNo(member.getSeq(), movie.getNo());
				if(review == null) {
					int randoms = (int)(Math.random()*3);
					insertReview(member.getSeq(), movie.getNo(), doReview.get(rank.getRanking())[randoms]);
				}
				
				List<MovieReview> reviews = movieReviewRepository.findByMovieNo(movie.getNo());
				for(MovieReview r : reviews) {
					int randoms = (int)(Math.random()*2);
					MovieReviewLike rl = movieReviewLikeRepository.findByMemberSeqAndMovieReviewNo(member.getSeq(), r.getNo());
					if(rl == null && randoms == 1) insertReviewLike(member.getSeq(), r.getNo());
				}
			}
			
			List<MovieResponseDto> totalViews = findMovieByTotalView(member.getSeq(), 0);
			for(MovieResponseDto movie : totalViews) {
				if(movie.getUserDidRank() == 0) {
					int r = (int)(Math.random()*3);
					int idx = 0;
					if(r == 0) idx = (int)(Math.random()*5);
					else idx = (int)(Math.random()*5)+5;
					updateRank(member.getSeq(), movie.getNo(), doRank[idx]);
				}
				MovieRank rank = movieRankRepository.findByMemberSeqAndMovieNo(member.getSeq(), movie.getNo());
				
				if(!movie.isUserDidZzim()) 
					if(rank.getRanking() >= 3) 
						updateZzim(member.getSeq(), movie.getNo());
				
				if(movie.getUserDidLike() == 0) {
					if(rank.getRanking() >= 4) updateLike(member.getSeq(), movie.getNo(), 1);
					else if(rank.getRanking() <=1.5) updateLike(member.getSeq(), movie.getNo(), -1);
				}
				
				MovieReview review = movieReviewRepository.findByMemberSeqAndMovieNo(member.getSeq(), movie.getNo());
				if(review == null) {
					int randoms = (int)(Math.random()*3);
					insertReview(member.getSeq(), movie.getNo(), doReview.get(rank.getRanking())[randoms]);
				}
				
				List<MovieReview> reviews = movieReviewRepository.findByMovieNo(movie.getNo());
				for(MovieReview r : reviews) {
					int randoms = (int)(Math.random()*2);
					MovieReviewLike rl = movieReviewLikeRepository.findByMemberSeqAndMovieReviewNo(member.getSeq(), r.getNo());
					if(rl == null && randoms == 1) insertReviewLike(member.getSeq(), r.getNo());
				}
			}
		}
	}
	
	@Transactional
	public void test() {
		DBdump();
	}
}
