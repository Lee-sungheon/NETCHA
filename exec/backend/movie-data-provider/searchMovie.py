import requests
import json

def searchMovieDetail(movieId, movieSeq):
    url = 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=R52YTRFQ12W0U368FG27&detail=Y&'
    res = requests.get(url+'movieId='+movieId+'&movieSeq='+movieSeq)
    # print(res.text)
    resObj = json.loads(res.text)
    detail = ""
    rating = resObj["Data"][0]["Result"][0]["rating"]
    if rating == "": detail = ","
    else: detail = rating + ","
    # print(rating)
    poster_url = resObj["Data"][0]["Result"][0]["posters"]
    if poster_url == "": detail += ","
    else:
        poster_url = poster_url.split('|')[0]
        detail += poster_url + ","
        # print(poster_url)
    image_url = resObj["Data"][0]["Result"][0]["stlls"]
    if image_url != "":
        image_url = image_url.split('|')[0]
        detail += image_url
        # print(image_url)
    return detail

if __name__=='__main__':
    print(searchMovieDetail("F","51294"))