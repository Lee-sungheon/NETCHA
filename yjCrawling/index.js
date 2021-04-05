
const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");
const PORT = 4000;
const app = express();

app.use(cors());

const getHtml = async (actorName) => {
  try {
    return await axios.get(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=영화배우+${actorName}`);
  } catch (error) {
    console.error(error);
  }
};

let resultArr = [];
const arr = [
  "박혁민",
  "이우진",
  "박영서",
  "김응수",
  "설경구",
  "허기호",
  "유해진",
  "탁트인",
  "김건호",
];

arr.forEach((actorName) => {
  getHtml(actorName)
    .then((html) => {
      const $ = cheerio.load(html.data);
      let src = $("div.profile_wrap div.big_thumb a img").attr("src");
      resultArr.push(src);

      return resultArr;
    })
    .then((res) => console.log(res));
  
});
  
  // app.listen(PORT, () =>
  //   console.log(`Example app listening at http://localhost:${PORT}`)
  // );
  



// export default (app, http) => {
 
//   app.use(express.json())
//   // app.use(cors({
//   //   origin: 'http://localhost:8080',
//   //   credentials: true,
//   // }))
 
//   // app.post('/check', (req, res) => {
//   //   let id = req.body.id
//   //   let link = req.body.link
 
//   //   savePeopleImage(id, link).then( product => {
//   //     res.json(product)
//   //   }).catch( err => console.log(err) )
//   // })

//   const arr = [
//     "박혁민",
//     "이우진",
//     "박영서",
//     "김응수",
//     "설경구",
//     "허기호",
//     "유해진",
//     "탁트인",
//     "김건호"
//   ];

//   arr.forEach((name) => {
//     scraper(name);
//   });





  
// }