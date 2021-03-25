import './SimilarMovie.scss'
import { useEffect, useState } from 'react';
import cx from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


export default function SimilarMovie({ movie }) {
  const [ index, SetIndex ] = useState(1)
  const [ similarList,setSimilarList ] = useState([])
  useEffect(() => {
    const movies = SIMILARMOVIES.slice((index-1)*4, index*4)
    setSimilarList(movies)
  }, [index])
  function indexLeft() {
    if (index > 1) {
      SetIndex(index-1)
    }
  }
  function indexRight() {
    if (index <= SIMILARMOVIES.length/4) {
      SetIndex(index+1)
    }
  }

  return (
    <>
      <div className="similar__container" >
        <div className="similar__area" >
          <div className="similar__chevron-box-left" 
            onClick={indexLeft}
            style={index > 1 ? {visibility: 'visible'}:{visibility: 'hidden'}}
          >
            <ChevronLeftIcon className="similar__chevron" />
          </div>
          <div className="similar__chevron-box-right" 
            onClick={indexRight}
            style={index < SIMILARMOVIES.length/4 ? {visibility: 'visible'}:{visibility: 'hidden'}}
          >
            <ChevronRightIcon className="similar__chevron" />
          </div>
          <ul style={{padding: '0', margin: '0'}}>
            {similarList.map((item, idx) => (
              <li 
                key={item.id}
                className={cx('similar__list', { 'similar__index': idx !== 0})} 
              >
                <div className="similar__img-box">
                  <div className="similar__background"  style={{backgroundImage: `url(${item.imageBg})`}} />
                  <div className="similar__play-box">
                    ▶
                    {/* <PlayArrowIcon className="similar__play-icon"/> */}
                  </div>
                </div>
                <div className="similar__text-box">
                  <div className="similar__title">{item.title}</div>
                  <div className="similar__info">전체 • 2시간 10분</div>
                  <div className="similar__description">
                    {item.description.slice(0,120)}
                    {item.description.length > 120 && <span>...</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

const SIMILARMOVIES = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 4,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 5,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 6,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 7,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 8,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 9,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 10,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 11,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
  {
    id: 12,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
    description: "짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.짐 고든 형사, 하비 덴트 검사와 함께 고담시의 범죄와 부정부패를 없애려는 배트맨. 그런 그의 앞에 보라색 양복을 입고 짙게 화장을 한 미치광이 살인 광대 조커가 등장한다.",
  },
];