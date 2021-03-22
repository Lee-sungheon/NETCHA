import Icon from "@material-ui/core/Icon";

export default function ProfileList(props) {
  return (
    <div>
      profilelist
      <div
        style={{
          width: "100%",
          height: "900px",
        }}
      >
        <div
          style={{
            width: "850px",
            margin: "0 auto",
            marginTop: "200px",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "3rem",
            }}
          >
            Netcha를 시청할 프로필을 선택하세요.
          </div>
          <ul>
            <li>
              <div>
                <a>이미지</a>
                <span>손동민</span>
              </div>
            </li>
            <li>
              <div>
                <a>이미지</a>
                <span>키즈</span>
              </div>
            </li>
            <li>
              <div>
                <Icon
                  className="fa fa-plus-circle"
                  color="secondary"
                  style={{ fontSize: 30 }}
                />
                <span>프로필</span>
              </div>
            </li>
          </ul>
          <button>프로필 관리</button>
        </div>
      </div>
    </div>
  );
}
