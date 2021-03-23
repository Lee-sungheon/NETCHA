import './DetailInformation.scss'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';


export default function DetailInformation({ movie }) {
  return (
    <>
      <div style={{width: '25%'}}>
        <div className="detail__title">감독</div>
        <p className="detail__people">미셸 공드리</p>

        <div className="detail__title" style={{ marginTop: '1.5vw'}}>배우</div>
        <p className="detail__people">짐 캐리</p>
        <p className="detail__people">케이트 원슬렛</p>
        <p className="detail__people">짐 캐리</p>
        <p className="detail__people">케이트 원슬렛</p>
        <p className="detail__people">짐 캐리</p>
        <p className="detail__people">케이트 원슬렛</p>
        <p className="detail__people">짐 캐리</p>
        <p className="detail__people">케이트 원슬렛</p>
      </div>
      <div style={{width: '75%', display: 'flex'} }>
        <div className="detail__chevron-box" >
          <ChevronLeftIcon className="detail__chevron"/>
        </div>
        <div style={{width: '90%'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
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
        </div>
        <div className="detail__chevron-box">
          <ChevronRightIcon className="detail__chevron"/>
        </div>
      </div>
      
    </>
  )
}

const COMMENT = [
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
  {
    name: '재원',
    content: '기억을 지운다고 잊혀질까요. 마음에 담은 사람인데.. ps. 시간에 쓸려가는 추억을 잠시나마 붙잡아주는 영화이자, 나보다 내 마음을 더 잘 아는 것 같은 영화.'
  },
]