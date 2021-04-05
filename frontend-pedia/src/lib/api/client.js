import axios from 'axios';

const host = 'http://j4d105.p.ssafy.io:9000/netcha';
// const host = 'http://localhost:9000/netcha';

const client = axios.create({
  baseURL: host,
  withCredentials: true,
});

export default client;

// axios 객체 생성
// export default axios.create({
//     baseURL: 'http://localhost:8081/springboot/',
//     headers: {
//       'Content-type': 'application/json',
//     },
//   });

/*
  글로벌 설정 예시:
  
  // API 주소를 다른 곳으로 사용함
  client.defaults.baseURL = 'https://external-api-server.com/' 
  // 헤더 설정
  client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';
  // 인터셉터 설정
  axios.intercepter.response.use(\
    response => {
      // 요청 성공 시 특정 작업 수행
      return response;
    }, 
    error => {
      // 요청 실패 시 특정 작업 수행
      return Promise.reject(error);
    }
  })  
*/
