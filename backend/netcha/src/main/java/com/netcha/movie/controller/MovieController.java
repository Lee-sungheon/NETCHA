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
		List<MovieResponseDto> movies = movieService.findByOpenAndTimeAndMovieId(2020, 120, "F");
		System.out.println(movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
//	@GetMapping("/newContents")
//	public ResponseEntity<?> getListByNewContents() {
//		List<MovieResponseDto> movies = movieService.findMovieByNewContents();
//		return new ResponseEntity<>(movies, HttpStatus.OK);
//	}
	
	@GetMapping("/view")
	public ResponseEntity<?> watchMovie(@RequestParam long no) {
		
		
		return new ResponseEntity<>(movieService.findMovieRankByUserId(1), HttpStatus.OK);
	}
}
