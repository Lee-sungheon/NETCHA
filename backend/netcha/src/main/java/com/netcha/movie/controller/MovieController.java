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

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/movie")
public class MovieController {
	@Autowired
    private MovieService movieService;
	
	@GetMapping("/list")
	public ResponseEntity<?> getList() {
		List<MovieResponseDto> movies = movieService.findByOpenAndTimeAndMovieId("2020-01-01", 120, "F");
		System.out.println("test : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@GetMapping("/list_newContents")
	public ResponseEntity<?> getListByNewContents() {
		List<MovieResponseDto> movies = movieService.findMovieByNewContents();
		System.out.println("새로운 컨텐츠 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@GetMapping("/list_totalView")
	public ResponseEntity<?> getListByTotalView() {
		List<MovieResponseDto> movies = movieService.findMovieByTotalView();
		System.out.println("인기순위 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	
	
	@GetMapping("/view")
	public ResponseEntity<?> watchMovie(@RequestParam long no) {
		
		return new ResponseEntity<>("", HttpStatus.OK);
	}
}
