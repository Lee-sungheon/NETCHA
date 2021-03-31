package com.netcha.movie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.netcha.movie.data.MovieResponseDto;
import com.netcha.movie.service.MovieService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080")
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
	
	@ApiOperation(value = "새로운 컨텐츠(40개) : 개봉일 얼마 안된 순으로 추천")
	@GetMapping("/list_newContents")
	public ResponseEntity<?> getListByNewContents() {
		List<MovieResponseDto> movies = movieService.findMovieByNewContents();
		System.out.println("새로운 컨텐츠 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "인기 순위(40개) : 누적 조회수 순으로 추천")
	@GetMapping("/list_totalView")
	public ResponseEntity<?> getListByTotalView() {
		List<MovieResponseDto> movies = movieService.findMovieByTotalView();
		System.out.println("인기순위 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	
	@ApiOperation(value = "테스트용 api2", notes = "컨텐츠 기반 추천 테스트")
	@GetMapping("/view")
	public ResponseEntity<?> watchMovie(@RequestParam long userId) {
		List<MovieResponseDto> movies = movieService.recommendMovieByRank(userId);
		System.out.println("컨텐츠 기반 추천 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
}
