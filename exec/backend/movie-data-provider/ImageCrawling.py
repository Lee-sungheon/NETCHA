import requests
from bs4 import BeautifulSoup
import random


def createPosterURL(movie_no):
    base_url = 'https://www.kmdb.or.kr/db/kor/detail/movie/F/'
    response = requests.get(base_url + movie_no)
    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        poster_span = soup.select_one("#fieldset > div.mProfile.type2 > div.mImg1 > span")['style']
        poster_img_tag = poster_span.split(" ")[1]
        poster_img_url = poster_img_tag.replace('url(', '').replace(')', '')
        return poster_img_url.replace("'", "")
    else:
        return None


def createImageURLs(movie_no):
    base_url = 'https://www.kmdb.or.kr/db/kor/detail/movie/F/'
    response = requests.get(base_url + movie_no)
    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        image_span_list = soup.select("#fieldset > div.result-block.mt2 > div.mList8 > ul > li > a > span > span")
        image_url_list = []
        for span in image_span_list:
            image_span = span['style']
            image_url_code = image_span.split(" ")[1]
            image_url_src = image_url_code.replace('url(', '').replace(')', '')
            image_url_list.append(image_url_src.replace("'", ""))
        # 랜덤으로 하나 리턴
        # return image_url_list[random.randrange(0,len(image_url_list))] if len(image_url_list) > 0 else None
        # 모두리턴
        return image_url_list if len(image_url_list) > 0 else None
    else:
        return None


print(createPosterURL("51294")) # 영화 번호로 포스터 요청
print(createImageURLs("51294")) # 영화 이미지들 받아오기
