import { useEffect, useState } from 'react';
import './DetailInformation.scss'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

export default function DetailInformation({ movie }) {
  const [ index, SetIndex ] = useState(1)
  const [ commentList1,setCommentList1 ] = useState([])
  const [ commentList2,setCommentList2 ] = useState([])
  useEffect(() => {
    const comments = COMMENTS.slice((index-1)*4, index*4)
    setCommentList1(comments.slice(0, 2))
    setCommentList2(comments.slice(2, 4))
  }, [index])
  function indexLeft() {
    if (index > 1) {
      SetIndex(index-1)
    }
  }
  function indexRight() {
    if (index <= COMMENTS.length/4) {
      SetIndex(index+1)
    }
  }
  return (
    <>
      <div style={{width: '20%'}}>
        <div className="detail__title">감독</div>
        <p className="detail__people"><span className="detail__people__member">{ movie.directors[0] }</span></p>

        <div className="detail__title" style={{ marginTop: '1.5vw'}}>배우</div>
        { movie.casts.slice(0, 10).map((member) => (
          <p className="detail__people" key={member}><span className="detail__people__member">{member.split('(')[0]}</span></p>
        ))}
      </div>
      <div style={{width: '80%', display: 'flex'} }>
        <div className="detail__chevron-box" 
          onClick={indexLeft}
          style={index > 1 ? {visibility: 'visible'}:{visibility: 'hidden'}}
        >
          <ChevronLeftIcon className="detail__chevron"/>
        </div>
        <div style={{width: '90%'}}>
          <div style={{display: 'flex', alignItems: 'center', marginLeft: '2.5vw'}}>
            <div className="detail__title" style={{ marginRight: '0.5vw' }}>평균 별점</div>
            <Rating 
              name="custom-empty"
              precision={0.2} 
              value={4.2}
              style={{color: 'white'}}
              readOnly
              emptyIcon={<StarBorderIcon fontSize="inherit" style={{color: 'gray'}} />}
            />
            <div className="detail__title" style={{ marginLeft: '0.5vw' }}>4.2</div>
            <div className="detail__people" style={{ marginLeft: '1vw', lineHeight: '2vw'}}>525256명</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', margin: '0.625vw 1vw 0px'}}>
              {commentList1.map((comment, index) => (
                <div style={{display: 'flex', flex: '1 1 0%',  flexDirection: 'column', margin: '0px 1.64062vw 0.625vw'}} key={comment.id}>
                  <div className="detail__people">{comment.name}</div>
                  <div className="detail__comment" >
                    {comment.content.slice(0,60)}
                    {comment.content.length > 60 && <span>...</span>}
                    {comment.content.length > 60 && <span className="detail__more" >더보기</span>}
                  </div>
                  <div className="detail__thumb" >
                    <ThumbUpAltOutlinedIcon style={{height: '1.3vw', cursor: 'pointer'}}/>
                    <span style={{marginLeft: '0.4vw'}}>7</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display: 'flex', margin: '0.625vw 1vw 0px'}}>
              {commentList2.map((comment) => (
                <div style={{display: 'flex', flex: '1 1 0%',  flexDirection: 'column', margin: '0px 1.64062vw 0.625vw'}} key={comment.id}>
                  <div className="detail__people">{comment.name}</div>
                  <div className="detail__comment" >
                    {comment.content.slice(0,60)}
                    {comment.content.length > 60 && <span>...</span>}
                    {comment.content.length > 60 && <span className="detail__more" >더보기</span>}
                  </div>
                  <div className="detail__thumb" >
                    <ThumbUpAltOutlinedIcon style={{height: '1.3vw', cursor: 'pointer'}}/>
                    <span style={{marginLeft: '0.4vw'}}>7</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        <div className="detail__chevron-box" 
          onClick={indexRight}
          style={index < COMMENTS.length/4 ? {visibility: 'visible'}:{visibility: 'hidden'}}
        >
          <ChevronRightIcon className="detail__chevron" />
        </div>
      </div>
      
    </>
  )
}

const COMMENTS = [
  {
    id: 1,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. '
  },
  {
    id: 2,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 3,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 4,
    name: '재원',
    content: '기억을 지운다고 시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 5,
    name: '성헌',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 6,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은  영화.'
  },
  {
    id: 7,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 8,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 9,
    name: '동민',
    content: '기억을 지잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 10,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 11,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 12,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 13,
    name: '태완',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 14,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    id: 15,
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
]