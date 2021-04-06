const request = require("request");
const cheerio = require("cheerio");
const { doesNotThrow } = require("assert");
const fs = require("fs");

// const arr = [
//   '장영남',
//   '박보검',
//   '윤희선',
//   '마크페란슨',
//   '강태우',
//   '조우진',
//   '김민희',
//   '정진영',
//   '이자벨위페르',
// ];

for(let idx = 0; idx < 40; idx++) {
  fs.readFile("result" + idx + ".txt", "utf8", function (err, data) {
    if (err) throw err;
    var arr = data.toString().split("\n");
    const movieNum = arr[0].trim();
    
    for(let i = 1; i < arr.length; i++) {
      const url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${encodeURI("영화감독 " + arr[i])}`;

      request(url, (error, response, body) => {
        if (error) throw error;
        let $ = cheerio.load(body);
        let result = $("div.profile_wrap div.big_thumb a img").attr("src");
        if (result === undefined) {
          result = $("div#main_pack div.same_people li a img").attr("src");
        }
        result === undefined ? (result = `''`) : "";

        try {
          fs.appendFile(
            "test1.csv",
            movieNum + "," + arr[i].trim() + "," + result + "\r\n",
            function (err) {
              if (err) throw err;
            }
          );
        } catch (error) {
          console.error(error);
        }
      });
    }
  });
}

