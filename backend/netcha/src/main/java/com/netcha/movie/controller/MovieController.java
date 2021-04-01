package com.netcha.movie.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.netcha.movie.data.MovieResponseDto;
import com.netcha.movie.service.MovieService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"}, allowCredentials = "true")
@RequestMapping("/movie")
public class MovieController {
	@Autowired
    private MovieService movieService;
	
	@ApiOperation(value = "테스트용 api", notes = "40개정도 더미데이터 전송")
	@GetMapping("/list")
	public ResponseEntity<?> getList() {
		List<MovieResponseDto> movies = movieService.findByOpenAndTimeAndMovieId("2020-01-01", 120, "F");
		System.out.println("test : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "컨텐츠 기반 추천 (40개) : 컨텐츠 기반 추천 알고리즘", notes = "입력값 : userId(유저고유번호), pageNum(페이지 번호(0번부터 시작))")
	@GetMapping("/list_recommend")
	public ResponseEntity<?> getListByRecommendContents(@RequestParam long userId, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.recommendMovieByRank(userId, pageNum);
		System.out.println("컨텐츠 기반 추천 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}

	
	@ApiOperation(value = "새로운 컨텐츠 (40개) : 개봉일 얼마 안된 순으로 추천", notes = "입력값 : pageNum(페이지 번호(0번부터 시작))")
	@GetMapping("/list_newContents")
	public ResponseEntity<?> getListByNewContents(@RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByNewContents((int)pageNum);
		System.out.println("새로운 컨텐츠 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "인기 순위 (40개) : 누적 조회수 순으로 추천", notes = "입력값 : pageNum(페이지 번호(0번부터 시작))")
	@GetMapping("/list_totalView")
	public ResponseEntity<?> getListByTotalView(@RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByTotalView((int)pageNum);
		System.out.println("인기순위 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "장르별 (40개) : 장르별 누적 조회수 순으로 추천", notes = "입력값 : ganre(장르명), pageNum(페이지 번호(0번부터 시작))")
	@GetMapping("/list_ganre")
	public ResponseEntity<?> getListByGanre(@RequestParam String ganre, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByGanre((int)pageNum, ganre);
		System.out.println("장르별 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "키워드별 (40개) : 장르별 누적 조회수 순으로 추천", notes = "입력값 : keyword(키워드명), pageNum(페이지 번호(0번부터 시작))")
	@GetMapping("/list_keyword")
	public ResponseEntity<?> getListByKeyword(@RequestParam String keyword, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByKeyword((int)pageNum, keyword);
		System.out.println("키워드별 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "평점 순 (40개) : 평점 순, 누적 조회수 순으로 추천", notes = "입력값 : pageNum(페이지 번호(0번부터 시작))")
	@GetMapping("/list_avgRank")
	public ResponseEntity<?> getListByAvgRank(@RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByAvgRank((int)pageNum);
		System.out.println("평점 순 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "평점 매기기(신규, 수정 포함)", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호), ranking(평점(0~5))")
	@PostMapping("/update_rank")
	public ResponseEntity<?> updateRank(@RequestBody Map<String, String> param) {
		long userId = Long.parseLong(param.get("userId"));
		long movieNo = Long.parseLong(param.get("movieNo"));
		float ranking = Float.parseFloat(param.get("ranking"));
		movieService.updateRank(userId, movieNo, ranking);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	
	
	
	@GetMapping("/test")
	public ResponseEntity<?> test() {
		movieService.test();
		return new ResponseEntity<>("", HttpStatus.OK);
	}
}
