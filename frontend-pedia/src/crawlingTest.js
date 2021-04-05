const request = require('request');
const cheerio = require('cheerio');
const { doesNotThrow } = require('assert');
const fs = require('fs');

const arr = [
  '장영남',
  '박보검',
  '윤희선',
  '마크페란슨',
  '강태우',
  '조우진',
  '김민희',
  '정진영',
  '이자벨위페르',
];

arr.forEach((name) => {
  const url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${encodeURI(
    name
  )}`;

  request(url, (error, response, body) => {
    if (error) throw error;
    let $ = cheerio.load(body);
    let result = $('div.profile_wrap div.big_thumb a img').attr('src');
    result === undefined ? result = `''` : '';
    try {
      fs.appendFile(
        'test1.csv',
        name + ', ' + result + '\r\n',
        function (err) {
          if (err) throw err;
          console.log(`${name} was appended to file!`);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});
