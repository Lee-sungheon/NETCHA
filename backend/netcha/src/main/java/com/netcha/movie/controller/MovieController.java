package com.netcha.movie.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.netcha.movie.data.MovieResponseDto;
import com.netcha.movie.data.MovieReviewDto;
import com.netcha.movie.service.MovieService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001","https://netcha.netlify.app"}, allowCredentials = "true")
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
	
	//   리스트 API   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	@ApiOperation(value = "컨텐츠 기반 추천 (40개) : 컨텐츠 기반 추천 알고리즘", notes = "입력값 : userId(유저고유번호), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_recommend")
	public ResponseEntity<?> getListByRecommendContents(@RequestParam long userId, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.recommendMovieByRank((int)userId, pageNum);
		System.out.println("컨텐츠 기반 추천 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "MBTI 기반 추천 (40개) : MBTI 기반 추천 알고리즘", notes = "입력값 : userId(유저고유번호), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_MBTI")
	public ResponseEntity<?> getListByRecommendMBTI(@RequestParam long userId, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.recommendMovieByMBTI((int)userId, pageNum);
		System.out.println("MBTI 기반 추천 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "비슷한 영화 추천 (??개) : 국가, 장르, 키워드가 비슷한 영화 추천", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_similar")
	public ResponseEntity<?> getListByRecommendSimilar(@RequestParam long userId, @RequestParam long movieNo) {
		List<MovieResponseDto> movies = movieService.recommendMovieBySimilar((int)userId, movieNo, 0, 16);
		System.out.println("비슷한 영화 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "새로운 컨텐츠 (40개) : 개봉일 얼마 안된 순으로 추천", notes = "입력값 : userId(유저고유번호), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_newContents")
	public ResponseEntity<?> getListByNewContents(@RequestParam long userId, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByNewContents((int)userId, (int)pageNum);
		System.out.println("새로운 컨텐츠 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "인기 순위 (40개) : 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_totalView")
	public ResponseEntity<?> getListByTotalView(@RequestParam long userId, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByTotalView((int)userId, (int)pageNum);
		System.out.println("인기순위 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "장르별 (40개) : 장르별 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), ganre(장르명), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_ganre")
	public ResponseEntity<?> getListByGanre(@RequestParam long userId, @RequestParam String ganre, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByGanre((int)userId, (int)pageNum, ganre);
		System.out.println("장르별 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "키워드별 (40개) : 장르별 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), keyword(키워드명), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_keyword")
	public ResponseEntity<?> getListByKeyword(@RequestParam long userId, @RequestParam String keyword, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByKeyword((int)userId, (int)pageNum, keyword);
		System.out.println("키워드별 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "나라별 (40개) : 나라별 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), country(나라명), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_country")
	public ResponseEntity<?> getListByCountry(@RequestParam long userId, @RequestParam String country, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByCountry((int)userId, (int)pageNum, country);
		System.out.println("나라별 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "평점 순 (40개) : 평점 순, 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_avgRank")
	public ResponseEntity<?> getListByAvgRank(@RequestParam long userId, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByAvgRank((int)userId, (int)pageNum);
		System.out.println("평점 순 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "장르, 나라별 (40개) : 장르+나라별 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), ganre(장르명), country(나라명), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_ganreAndCountry")
	public ResponseEntity<?> getListByGanreAndCountry(@RequestParam long userId, @RequestParam String ganre, @RequestParam String country, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByGanreAndCountry((int)userId, (int)pageNum, ganre, country);
		System.out.println("장르+나라별 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "감독별 (40개) : 감독별 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), director(감독명)\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_director")
	public ResponseEntity<?> getListByDirector(@RequestParam long userId, @RequestParam String director) {
		List<MovieResponseDto> movies = movieService.findMovieByDirector((int)userId, director);
		System.out.println("감독별 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "배우별 (40개) : 배우별 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), cast(배우명)\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/list_cast")
	public ResponseEntity<?> getListByCast(@RequestParam long userId, @RequestParam String cast) {
		List<MovieResponseDto> movies = movieService.findMovieByCast((int)userId, cast);
		System.out.println("배우별 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	//  평점 관련 API   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	@ApiOperation(value = "평점 매기기(신규, 수정 포함)", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호), ranking(평점(0~5))")
	@PostMapping("/rank_update")
	public ResponseEntity<?> updateRank(@RequestBody Map<String, String> param) {
		int userId = Integer.parseInt(param.get("userId"));
		long movieNo = Long.parseLong(param.get("movieNo"));
		float ranking = Float.parseFloat(param.get("ranking"));
		movieService.updateRank(userId, movieNo, ranking);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "평점 삭제", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호)")
	@DeleteMapping("/rank_delete")
	public ResponseEntity<?> deleteRank(@RequestParam long userId, @RequestParam long movieNo) {
		movieService.deleteRank((int)userId, movieNo);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "평가하기 페이지 (40개) : 평가한적 없는 영화, 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/rank_page")
	public ResponseEntity<?> getListRankingPage(@RequestParam long userId, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.findMovieByNoNotInNo((int)userId, (int)pageNum);
		System.out.println("평가하기 페이지 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "내가 평가한 영화 목록 (40개) : 평가한 영화 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/rank_list")
	public ResponseEntity<?> getListRanking(@RequestParam long userId, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.listRank((int)userId, (int)pageNum);
		System.out.println("평가한 영화 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	@ApiOperation(value = "내가 평가한 영화 개수 : 평가한 영화 개수", notes = "입력값 : userId(유저고유번호)")
	@GetMapping("/rank_count")
	public ResponseEntity<?> getCountRanking(@RequestParam long userId) {
		int count = movieService.getCntByRank((int)userId);
		return new ResponseEntity<>(count, HttpStatus.OK);
	}
	
	//  영화 좋아요/싫어요 관련 API   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	@ApiOperation(value = "좋아요 (추가,수정,삭제 포함) : 그냥 좋아요는 1, 싫어요는 -1 보내면 알아서 추가,수정,삭제", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호), like(좋아요:1, 싫어요:-1)")
	@PostMapping("/like_update")
	public ResponseEntity<?> updateLike(@RequestBody Map<String, String> param) {
		int userId = Integer.parseInt(param.get("userId"));
		long movieNo = Long.parseLong(param.get("movieNo"));
		long like = Long.parseLong(param.get("like"));
		movieService.updateLike(userId, movieNo, like);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	//  영화 찜하기 관련 API   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	@ApiOperation(value = "찜하기", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호)")
	@PostMapping("/zzim_update")
	public ResponseEntity<?> updateZzim(@RequestBody Map<String, String> param) {
		int userId = Integer.parseInt(param.get("userId"));
		long movieNo = Long.parseLong(param.get("movieNo"));
		movieService.updateZzim(userId, movieNo);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "찜하기 취소", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호)")
	@DeleteMapping("/zzim_delete")
	public ResponseEntity<?> deleteZzim(@RequestParam long userId, @RequestParam long movieNo) {
		movieService.deleteZzim((int)userId, movieNo);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "내가 찜한 영화 목록 (40개) : 찜한 영화 누적 조회수 순으로 추천", notes = "입력값 : userId(유저고유번호), pageNum(페이지 번호(0번부터 시작))\n출력값 : 영화정보, userDidRank(평가했으면 점수, 안했으면 0), userDidLike(좋아요:1,싫어요:-1,안함:0), userDidZzim(찜했냐)")
	@GetMapping("/zzim_list")
	public ResponseEntity<?> getListZzim(@RequestParam long userId, @RequestParam long pageNum) {
		List<MovieResponseDto> movies = movieService.listZzim((int)userId, (int)pageNum);
		System.out.println("찜한 영화 : "+movies.size());
		return new ResponseEntity<>(movies, HttpStatus.OK);
	}
	
	//  영화 리뷰 관련 API   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	@ApiOperation(value = "리뷰 달기", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호), content(내용)")
	@PostMapping("/review_insert")
	public ResponseEntity<?> insertReview(@RequestBody Map<String, String> param) {
		int userId = Integer.parseInt(param.get("userId"));
		long movieNo = Long.parseLong(param.get("movieNo"));
		String content = param.get("content");
		movieService.insertReview(userId, movieNo, content);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "리뷰 수정", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호), content(내용)")
	@PatchMapping("/review_update")
	public ResponseEntity<?> updateReview(@RequestBody Map<String, String> param) {
		int userId = Integer.parseInt(param.get("userId"));
		long movieNo = Long.parseLong(param.get("movieNo"));
		String content = param.get("content");
		movieService.updateReview(userId, movieNo, content);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "리뷰 삭제", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호)")
	@DeleteMapping("/review_delete")
	public ResponseEntity<?> deleteReview(@RequestParam long userId, @RequestParam long movieNo) {
		movieService.deleteReview((int)userId, movieNo);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "리뷰 좋아요 달기", notes = "입력값 : userId(유저고유번호), reviewNo(리뷰고유번호)")
	@PostMapping("/review_like_insert")
	public ResponseEntity<?> insertReviewLike(@RequestBody Map<String, String> param) {
		int userId = Integer.parseInt(param.get("userId"));
		long reviewNo = Long.parseLong(param.get("reviewNo"));
		movieService.insertReviewLike(userId, reviewNo);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "리뷰 좋아요 취소", notes = "입력값 : userId(유저고유번호), reviewNo(리뷰고유번호)")
	@DeleteMapping("/review_like_delete")
	public ResponseEntity<?> insertReviewLike(@RequestParam long userId, @RequestParam long reviewNo) {
		movieService.deleteReviewLike((int)userId, reviewNo);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}
	
	@ApiOperation(value = "내가 작성한 리뷰 목록", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호)")
	@GetMapping("/review_list")
	public ResponseEntity<?> getListReview(@RequestParam long userId, @RequestParam long movieNo) {
		List<MovieReviewDto> result = movieService.listReview((int)userId, movieNo);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	//  넷챠피디아 API   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	@ApiOperation(value = "영화 상세정보", notes = "입력값 : userId(유저고유번호), movieNo(영화고유번호)")
	@GetMapping("/movie_detail")
	public ResponseEntity<?> getMovieDetail(@RequestParam long userId, @RequestParam long movieNo) {
		Map<String, Object> result = movieService.getMovieDetail((int)userId, movieNo);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	
	@GetMapping("/test")
	public ResponseEntity<?> test() {
		movieService.test();
		return new ResponseEntity<>("", HttpStatus.OK);
	}
}
