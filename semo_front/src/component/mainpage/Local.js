import { useState } from "react";
import "./localmap.css";
import { useNavigate } from "react-router-dom";

const Local = (props) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(null);

  const {
    busan,
    daegu,
    daejeon,
    gangwon,
    gwangju,
    gyeonggi,
    incheon,
    jeju,
    north_chungcheong,
    north_gyeongsang,
    north_jeolla,
    sejong,
    seoul,
    south_chungcheong,
    south_gyeongsang,
    south_jeolla,
    ulsan,
  } = props;

  // 부산 중앙 좌표
  const busanTextX = props.busanCenter.x;
  const busanTextY = props.busanCenter.y;

  // 대구 중앙 좌표
  const daeguTextX = props.daeguCenter.x;
  const daeguTextY = props.daeguCenter.y;

  // 대전 중앙 좌표
  const daejeonTextX = props.daejeonCenter.x;
  const daejeonTextY = props.daejeonCenter.y;

  // 강원 중앙 좌표
  const gangwonTextX = props.gangwonCenter.x;
  const gangwonTextY = props.gangwonCenter.y;

  // 광주 중앙 좌표
  const gwangjuTextX = props.gwangjuCenter.x;
  const gwangjuTextY = props.gwangjuCenter.y;

  // 경기 중앙 좌표
  const gyeonggiTextX = props.gyeonggiCenter.x;
  const gyeonggiTextY = props.gyeonggiCenter.y;

  // 인천 중앙 좌표
  const incheonTextX = props.incheonCenter.x;
  const incheonTextY = props.incheonCenter.y;

  // 제주 중앙 좌표
  const jejuTextX = props.jejuCenter.x;
  const jejuTextY = props.jejuCenter.y;

  // 충북 중앙 좌표
  const north_chungcheongTextX = props.north_chungcheongCenter.x;
  const north_chungcheongTextY = props.north_chungcheongCenter.y;

  // 경북 중앙 좌표
  const north_gyeongsangTextX = props.north_gyeongsangCenter.x;
  const north_gyeongsangTextY = props.north_gyeongsangCenter.y;

  // 전북 중앙 좌표
  const north_jeollaTextX = props.north_jeollaCenter.x;
  const north_jeollaTextY = props.north_jeollaCenter.y;

  // 세종 중앙 좌표
  const sejongTextX = props.sejongCenter.x;
  const sejongTextY = props.sejongCenter.y;

  // 서울 중앙 좌표
  const seoulTextX = props.seoulCenter.x;
  const seoulTextY = props.seoulCenter.y;

  // 충남 중앙 좌표
  const south_chungcheongTextX = props.south_chungcheongCenter.x;
  const south_chungcheongTextY = props.south_chungcheongCenter.y;

  // 경남 중앙 좌표
  const south_gyeongsangTextX = props.south_gyeongsangCenter.x;
  const south_gyeongsangTextY = props.south_gyeongsangCenter.y;

  // 전남 중앙 좌표
  const south_jeollaTextX = props.south_jeollaCenter.x;
  const south_jeollaTextY = props.south_jeollaCenter.y;

  // 울산 중앙 좌표
  const ulsanTextX = props.ulsanCenter.x;
  const ulsanTextY = props.ulsanCenter.y;

  //클릭 시 지역모임 찾기
  const search = (e) => {
    const localName = e.target.getAttribute("name");
    navigate("local", { state: { searchContent: localName } });
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 524 631"
        className="svgmap"
      >
        <path
          className="local" //부산
          id="busan"
          name="부산"
          d={busan}
          onMouseOver={() => setIsHovered("부산")}
          onMouseOut={() => setIsHovered(null)}
          onClick={search}
        />

        <path
          className="local" //대구
          id="daegu"
          name="Daegu"
          d={daegu}
          onMouseEnter={() => setIsHovered("대구")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //대전
          id="daejeon"
          name="Daejeon"
          d={daejeon}
          onMouseEnter={() => setIsHovered("대전")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //강원
          id="gangwon"
          name="Gangwon"
          d={gangwon}
          onMouseEnter={() => setIsHovered("강원")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //광주
          id="gwangju"
          name="Gwangju"
          d={gwangju}
          onMouseEnter={() => setIsHovered("광주")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //경기
          id="gyeonggi"
          name="경기"
          d={gyeonggi}
          onMouseEnter={() => setIsHovered("경기")}
          onMouseLeave={() => setIsHovered(false)}
          onClick={search}
        />

        <path
          className="local" //인천
          id="incheon"
          name="Incheon"
          d={incheon}
          onMouseEnter={() => setIsHovered("인천")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //제주
          id="jeju"
          name="Jeju"
          d={jeju}
          onMouseEnter={() => setIsHovered("제주")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //충청북도
          id="north-chungcheong"
          name="North Chungcheong"
          d={north_chungcheong}
          onMouseEnter={() => setIsHovered("충북")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //경상북도
          id="north-gyeongsang"
          name="North Gyeongsang"
          d={north_gyeongsang}
          onMouseEnter={() => setIsHovered("경북")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //전라북도
          id="north-jeolla"
          name="North Jeolla"
          d={north_jeolla}
          onMouseEnter={() => setIsHovered("전북")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //세종
          id="sejong"
          name="Sejong"
          d={sejong}
          onMouseEnter={() => setIsHovered("세종")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //서울
          id="seoul"
          name="서울"
          d={seoul}
          onMouseEnter={() => setIsHovered("서울")}
          onMouseLeave={() => setIsHovered(false)}
          onClick={search}
        />

        <path
          className="local" //충청남도
          id="south-chungcheong"
          name="South Chungcheong"
          d={south_chungcheong}
          onMouseEnter={() => setIsHovered("충남")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //경상남도
          id="south-gyeongsang"
          name="South Gyeongsang"
          d={south_gyeongsang}
          onMouseEnter={() => setIsHovered("경남")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //전라남도
          id="south-jeolla"
          name="South Jeolla"
          d={south_jeolla}
          onMouseEnter={() => setIsHovered("전남")}
          onMouseLeave={() => setIsHovered(false)}
        />

        <path
          className="local" //울산
          id="ulsan"
          name="Ulsan"
          d={ulsan}
          onMouseEnter={() => setIsHovered("울산")}
          onMouseLeave={() => setIsHovered(false)}
        />
        <>
          <text
            x={busanTextX}
            y={busanTextY * 1.05}
            visibility={isHovered === "부산" ? "visible" : "hidden"}
          >
            📍 부산
          </text>
          <text
            x={daeguTextX}
            y={daeguTextY}
            visibility={isHovered === "대구" ? "visible" : "hidden"}
          >
            📍 대구
          </text>
          <text
            x={daejeonTextX * 0.95}
            y={daejeonTextY * 1.08}
            visibility={isHovered === "대전" ? "visible" : "hidden"}
          >
            📍 대전
          </text>
          <text
            x={gangwonTextX * 0.95}
            y={gangwonTextY * 120}
            visibility={isHovered === "강원" ? "visible" : "hidden"}
          >
            📍 강원
          </text>
          <text
            x={gwangjuTextX * 0.9}
            y={gwangjuTextY * 1.02}
            visibility={isHovered === "광주" ? "visible" : "hidden"}
          >
            📍 광주
          </text>
          <text
            x={gyeonggiTextX * 8}
            y={gyeonggiTextY * 3}
            visibility={isHovered === "경기" ? "visible" : "hidden"}
          >
            📍 경기
          </text>
          <text
            x={incheonTextX * 1.2}
            y={incheonTextY * 1.1}
            visibility={isHovered === "인천" ? "visible" : "hidden"}
          >
            📍 인천
          </text>
          <text
            x={jejuTextX * 0.7}
            y={jejuTextY * 1.03}
            visibility={isHovered === "제주" ? "visible" : "hidden"}
          >
            📍 제주
          </text>
          <text
            x={north_chungcheongTextX * 0.95}
            y={north_chungcheongTextY * 0.8}
            visibility={isHovered === "충북" ? "visible" : "hidden"}
          >
            📍 충북
          </text>
          <text
            x={north_gyeongsangTextX}
            y={north_gyeongsangTextY * 1.23}
            visibility={isHovered === "경북" ? "visible" : "hidden"}
          >
            📍 경북
          </text>
          <text
            x={north_jeollaTextX * 1.22}
            y={north_jeollaTextY * 1.15}
            visibility={isHovered === "전북" ? "visible" : "hidden"}
          >
            📍 전북
          </text>
          <text
            x={sejongTextX * 0.95}
            y={sejongTextY * 1.1}
            visibility={isHovered === "세종" ? "visible" : "hidden"}
          >
            📍 세종
          </text>
          <text
            x={seoulTextX * 1.1}
            y={seoulTextY * 1.03}
            visibility={isHovered === "서울" ? "visible" : "hidden"}
          >
            📍 서울
          </text>
          <text
            x={south_chungcheongTextX * 1.4}
            y={south_chungcheongTextY * 1.2}
            visibility={isHovered === "충남" ? "visible" : "hidden"}
          >
            📍 충남
          </text>
          <text
            x={south_gyeongsangTextX * 1.5}
            y={south_gyeongsangTextY * 1.23}
            visibility={isHovered === "경남" ? "visible" : "hidden"}
          >
            📍 경남
          </text>
          <text
            x={south_jeollaTextX * 3}
            y={south_jeollaTextY * 1.03}
            visibility={isHovered === "전남" ? "visible" : "hidden"}
          >
            📍 전남
          </text>
          <text
            x={ulsanTextX}
            y={ulsanTextY * 1.07}
            visibility={isHovered === "울산" ? "visible" : "hidden"}
          >
            📍 울산
          </text>
        </>
      </svg>
    </div>
  );
};
export default Local;
