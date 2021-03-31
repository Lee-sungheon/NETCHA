import axios from 'axios';

export function callApiMovieList() {
  const url = '/netcha/movie/list'
  return axios.get(url)
    .then((Response)=>{
      return Response.data
    })
    .catch((Error)=>{console.log(Error)})
}

export function callApiNewMovieList() {
  const url = '/netcha/movie/list_newContents'
  return axios.get(url)
    .then((Response)=>{
      return Response.data
    })
    .catch((Error)=>{console.log(Error)})
}

export function callApiPopularMovieList() {
  const url = '/netcha/movie/list_totalView'
  return axios.get(url)
    .then((Response)=>{
      console.log(Response.data)
      return Response.data
    })
    .catch((Error)=>{console.log(Error)})
}

export function callApiContentMovieList(id) {
  const url = `/netcha/movie/view?userId=${id}`
  return axios.get(url)
    .then((Response)=>{
      return Response.data
    })
    .catch((Error)=>{console.log(Error)})
}