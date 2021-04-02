import axios from "axios";

export function callApiMovieList() {
  const url = "netcha/movie/list";
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiNewMovieList(pageNum) {
  const url = `netcha/movie/list_newContents?pageNum=${pageNum}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiPopularMovieList(pageNum) {
  const url = `netcha/movie/list_totalView?pageNum=${pageNum}`;
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

export function callApiRankMovieList(pageNum) {
  const url = `netcha/movie/list_avgRank?pageNum=${pageNum}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiGanreMovieList(ganre, pageNum) {
  const url = `netcha/movie/list_ganre?ganre=${ganre}&pageNum=${pageNum}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiCountryMovieList(country, pageNum) {
  const url = `netcha/movie/list_country?country=${country}&pageNum=${pageNum}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}

export function callApiKeywordMovieList(keyword, pageNum) {
  const url = `netcha/movie/list_keyword?keyword=${keyword}&pageNum=${pageNum}`;
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
  const url = `netcha/movie/ranking_page?pageNum=${pageNum}&userId=${id}`;
  return axios
    .get(url)
    .then((Response) => {
      return Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    });
}
