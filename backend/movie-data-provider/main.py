import json
import pandas as pd
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
