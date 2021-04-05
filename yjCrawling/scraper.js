const scraper = (actorName) => {
  const axios = require("axios");
  const cheerio = require("cheerio");

  // axios를 활용해 AJAX로 HTML 문서를 가져오는 함수 구현
  async function getHTML() {
    try {
      return await axios.get(
        `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=영화배우+${actorName}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  // getHTML 함수 실행 후 데이터에서
  // body > main > div > section > ul > li > article > h2 > a
  // 에 속하는 제목을 actorImgList에 저장
  getHTML()
    .then((html) => {
      console.dir(html);
      const $ = cheerio.load(html.data);
      // ul.list--posts를 찾고 그 children 노드를 bodyList에 저장
      return $("div.profile_wrap")
        .children("div.big_thumb")
        .find("a img")
        .attr("src");
    })
    .then(
        // (res) => console.log(res);
        fileWrite(res)
        ); 

  function fileWrite(data) {
    var fs = require("fs");
    fs.appendFile("result.txt", data, "utf8", function(error) {
      console.log("write end");
    });
  }
};

export default scraper;
