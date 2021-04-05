const axios = require("axios"); 
const cheerio = require("cheerio"); 
const log = console.log; 
const getHtml = async (name) => { 
    try { 
        const str = encodeURIComponent('https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=영화배우+');
        return await axios.get(`${str}${encodeURIComponent(name)}`);
    } catch (error) { 
        console.error(error); 
    } 
}; 

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
  
let resultArr = []; 
// arr.forEach((name) => {
    getHtml("신세경") 
    .then(html => { 
        log(html);
        const $ = cheerio.load(html.data); 
        let src = $("div.profile_wrap div.big_thumb a img").attr("src");
        resultArr.push(src);

        return resultArr; 
    }) 
    .then(res => log(res));
// });
