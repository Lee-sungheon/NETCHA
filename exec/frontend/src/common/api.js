import axios from "axios";

export function callApiMovieList() {
  const url = `netcha/movie/list`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiNewMovieList(pageNum, userId) {
  const url = `netcha/movie/list_newContents?pageNum=${pageNum}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiPopularMovieList(pageNum, userId) {
  const url = `netcha/movie/list_totalView?pageNum=${pageNum}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiContentMovieList(pageNum, id) {
  const url = `netcha/movie/list_recommend?pageNum=${pageNum}&userId=${id}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiMbtiMovieList(pageNum, id) {
  const url = `netcha/movie/list_MBTI?pageNum=${pageNum}&userId=${id}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiSimilarMovieList(movieNo, id) {
  const url = `netcha/movie/list_similar?movieNo=${movieNo}&userId=${id}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiRankMovieList(pageNum, userId) {
  const url = `netcha/movie/list_avgRank?pageNum=${pageNum}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiCountryGanreMovieList(country, ganre, pageNum, userId) {
  const url = `netcha/movie/list_ganreAndCountry?country=${country}&ganre=${ganre}&pageNum=${pageNum}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiGanreMovieList(ganre, pageNum, userId) {
  const url = `netcha/movie/list_ganre?ganre=${ganre}&pageNum=${pageNum}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiCountryMovieList(country, pageNum, userId) {
  const url = `netcha/movie/list_country?country=${country}&pageNum=${pageNum}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiCastMovieList(cast, pageNum, userId) {
  const url = `netcha/movie/list_cast?cast=${cast}&pageNum=${pageNum}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiDirectorMovieList(director, pageNum, userId) {
  const url = `netcha/movie/list_director?director=${director}&pageNum=${pageNum}&userId=${userId}`;
  console.log(director, userId)
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiKeywordMovieList(keyword, pageNum, userId) {
  const url = `netcha/movie/list_keyword?keyword=${keyword}&pageNum=${pageNum}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiEvaluationMovieList(pageNum, id) {
  const url = `netcha/movie/rank_page?pageNum=${pageNum}&userId=${id}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiRequestEvaluation(userId, movieNo, ranking) {
  const url = `netcha/movie/rank_update`;
  const data = {
    userId: userId,
    movieNo: movieNo,
    ranking: ranking,
  };
  return axios
    .post(url, data)
    .then((Response) => {
      console.log(Response.data);
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiDeleteEvaluation(userId, movieNo) {
  const url = `netcha/movie/rank_delete?userId=${userId}&movieNo=${movieNo}`;
  return axios
    .delete(url)
    .then((Response) => {
      console.log(Response.data);
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiRequestZzim(userId, movieNo) {
  const url = `netcha/movie/zzim_update`;
  const data = {
    userId: userId,
    movieNo: movieNo,
  };
  return axios
    .post(url, data)
    .then((Response) => {
      console.log(Response.data);
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiLikeMovieList(pageNum, userId) {
  const url = `netcha/movie/zzim_list?pageNum=${pageNum}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiDeleteZzim(userId, movieNo) {
  const url = `netcha/movie/zzim_delete?movieNo=${movieNo}&userId=${userId}`;
  return axios
    .delete(url)
    .then((Response) => {
      console.log(Response.data);
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiLike(userId, movieNo, like) {
  const url = `netcha/movie/like_update`;
  const data = {
    userId: userId,
    movieNo: movieNo,
    like: like,
  };
  return axios
    .post(url, data)
    .then((Response) => {
      console.log(Response.data);
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiEvaluation(userId) {
  const url = `/netcha/movie/rank_count?userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiMovieReview(movieNo, userId) {
  const url = `netcha/movie/review_list?movieNo=${movieNo}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiMovieDetail(movieNo, userId) {
  const url = `netcha/movie/movie_detail?movieNo=${movieNo}&userId=${userId}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiReview(userId, movieNo, content) {
  const url = `netcha/movie/review_insert`;
  const data = {
    userId: userId,
    movieNo: movieNo,
    content: content,
  };
  return axios
    .post(url, data)
    .then((Response) => {
      console.log(Response.data);
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiReviewLike(userId, reviewNo) {
  const url = `netcha/movie/review_like_insert`;
  const data = {
    userId: userId,
    reviewNo: reviewNo,
  };
  return axios
    .post(url, data)
    .then((Response) => {
      console.log(Response.data);
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiReviewDisLike(userId, reviewNo) {
  const url = `netcha/movie/review_like_delete?reviewNo=${reviewNo}&userId=${userId}`;
  return axios
    .delete(url)
    .then((Response) => {
      console.log(Response.data);
      return Response.data;
    })
    .catch((Error)=>{console.log(Error)})
}

export function callApiIncreaseView(movieNo) {
  const url = `netcha/movie/movie_increaseView`;
  const data = {
    movieNo: movieNo
  }
  return axios.post(url, data)
    .then((Response)=>{
      return Response.data
    })
    .catch((Error)=>{console.log(Error)})
}

export function callApiSearchMovieList(search, pageNum, userId) {
  const url = `netcha/movie/search_total?pageNum=${pageNum}&search=${search}&userId=${userId}`;
  return axios.get(url)
    .then((Response)=>{
      return Response.data
    })
    .catch((Error)=>{console.log(Error)})
}