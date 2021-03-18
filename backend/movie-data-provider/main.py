import json
import pandas as pd
import requests
from bs4 import BeautifulSoup

raw = requests.get("https://movie.naver.com/movie/running/current.nhn",
                   headers = {"User-Agent" : "Mozilla/5.0"})

html = BeautifulSoup(raw.text, 'html.parser')
movies = html.select("dl.lst_dsc")

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

def getJsonData():
    with open('kmdb_json.json', 'r',encoding='UTF8') as f:
        return json.load(f)
# json src to python json dumps
def srcToJson(src):
    return json.dumps(src, ensure_ascii=False,indent=2)

# json src to pandas dataframe
def srcToDataFrame(src):
    return pd.DataFrame(src["data"])

def makeNewMovieDataSet(data):
    newMovieData=[]
    for line in data:
        # 모든 영화 데이터를 왓짭만의 데이터셋으로 변환하는 loop
        movieRow=dict()
        movieRow['no']=line['COLUMN2']
        movieRow['title_kor']=line['COLUMN3']
        movieRow['title_eng']=line['COLUMN4']
        movieRow['title_origin']=line['COLUMN5']
        if line['COLUMN8'] is not None:
            movieRow['ganre']=line['COLUMN8'].split(",")
        movieRow['country']=line['COLUMN9']
        movieRow['production_year']=line['COLUMN10']
        movieRow['company']=line['COLUMN11']
        if line['COLUMN12'] is not None:
            movieRow['directors']=line['COLUMN12'].split(",")
        if line['COLUMN13'] is not None:
            movieRow['casts']=line['COLUMN13'].split(",")
        if line['COLUMN14'] is not None:
            movieRow['screenwriters']=line['COLUMN14'].split(",")
        if line['COLUMN20'] is not None:
            movieRow['open']=line['COLUMN20']
        if line['COLUMN22'] is not None:
            movieRow['keywords']=line['COLUMN22'].split(",")
        if line['COLUMN23'] is not None:
            movieRow['scenario']=line['COLUMN23'].split(",")
        '''
        # 원래 데이터베이스에 넣으려했으나 짧은 시간 요청많이하면 크롤링 막아져서 rest api 요청할때 한번 호출하는 방식으로 변경
        # 화면용 이미지 URL
        image_urls=createImageURLs(line['COLUMN2'])
        # 포스터
        poster_url=createPosterURL(line['COLUMN2'])
        if poster_url is not None:
            movieRow['poster_url']=poster_url
        if image_urls is not None:
            movieRow['image_urls']=image_urls
        '''
        newMovieData.append(movieRow)
    return newMovieData

def writeJsonData(filepath,data):
    with open(filepath, "w",-1, "utf-8") as json_file:
        json.dump(data, json_file, ensure_ascii=False,indent=2)
    print("[done] created new dataset")

if __name__=='__main__':
    srcJsonFile=getJsonData()
    header = srcJsonFile["header"]
    origin_movie_data = srcJsonFile["data"]
    newMovieData=makeNewMovieDataSet(origin_movie_data)
    writeJsonData("new_movie_dataset.json", newMovieData)
