import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Signup(props) {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/b4d69ed1-965f-49d2-abc2-02d4d0ae6ffb/KR-ko-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
        height: "800px",
      }}
    >
      <div
        style={{
          background: "rgb(0, 0, 0, 0.5)",
          height: "100%",
        }}
      >
        <div
          style={{
            height: "90%",
          }}
        >
          <div
            style={{
              height: "500px",
              width: "950px",
              margin: "0 auto",
              padding: "200px 0",
              color: "white",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              영화, TV 프로그램을
              <br /> 무제한으로.
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                marginTop: "15px",
              }}
            >
              다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.
            </div>
            <form
              style={{
                marginTop: "15px",
              }}
            >
              <h3>
                시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일
                주소를 입력하세요.
              </h3>
              <div
                style={{
                  width: "600px",
                  height: "50px",
                  margin: "25px auto",
                }}
              >
                <TextField
                  label="이메일 주소"
                  InputLabelProps={{
                    color: "secondary",
                  }}
                  variant="filled"
                  style={{
                    backgroundColor: "white",
                    width: "68%",
                    marginBottom: "15px",
                    height: "100%",
                  }}
                />
                <Button
                  variant="contained"
                  style={{
                    width: "30%",
                    backgroundColor: "#e50914",
                    color: "white",
                    height: "100%",

                    marginLeft: "2px",
                    fontSize: "1.5rem",
                  }}
                >
                  시작하기
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
