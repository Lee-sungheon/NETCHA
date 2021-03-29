package com.netcha.movie.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.netcha.movie.data.Movie;
import com.netcha.movie.data.MovieRepository;
import com.netcha.movie.data.MovieResponseDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MovieService {
	private final MovieRepository movieRepository;
	
	@Transactional
	public List<MovieResponseDto> findByOpenAndTimeAndMovieId(long open, long time, String movieId) {
		System.out.println(open+" "+time+" "+movieId);
		List<MovieResponseDto> movies = new ArrayList<MovieResponseDto>();
		List<Movie> movieR = movieRepository.findByOpenAndTimeAndMovieId(open, time, movieId);
		for(Movie m : movieR) {
			if(m.getRating().equals("")) {
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
					
					m.update(rating, poster, image);
				} catch (IOException e) {
					e.printStackTrace();
				}
// 				Open API 사용
//				String urls = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=R52YTRFQ12W0U368FG27&detail=Y&";
//				URL url;
//				try {
//					url = new URL(urls + "movieId=" + m.getMovieId() + "&movieSeq=" + m.getMovieSeq());
//					HttpURLConnection con = (HttpURLConnection) url.openConnection(); 
//					con.setRequestMethod("GET"); 
//					BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream())); 
//					String inputLine; 
//					StringBuffer response = new StringBuffer(); 
//					while ((inputLine = in.readLine()) != null) 
//						response.append(inputLine); 
//					in.close();
//					System.out.println(response.toString());
//					JsonParser parser = new JsonParser();
//					JsonElement element = parser.parse(response.toString());
//					String rating = element.getAsJsonObject().get("Data").getAsJsonArray().get(0).getAsJsonObject().get("Result").getAsJsonArray().get(0).getAsJsonObject().get("rating").toString().replace("\"", "");
//					String poster = element.getAsJsonObject().get("Data").getAsJsonArray().get(0).getAsJsonObject().get("Result").getAsJsonArray().get(0).getAsJsonObject().get("posters").toString().replace("\"", "").split("[|]")[0];
//					String image = element.getAsJsonObject().get("Data").getAsJsonArray().get(0).getAsJsonObject().get("Result").getAsJsonArray().get(0).getAsJsonObject().get("stlls").toString().replace("\"", "").split("[|]")[0];
//					if(rating.equals("")) rating = "등급 제한 없음";
//					if(poster.equals("")) poster = "default";
//					if(image.equals("")) image = "default";
//					m.update(rating, poster, image);
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
			}
			movies.add(new MovieResponseDto(m));
		}
		return movies;
	}
}
