import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

const PopularGroupImg = (props) => {
  const groupDetail = props.groupDetail;
  const [activeIndex, setActiveIndex] = useState(0); // 현재 슬라이드 인덱스 저장

  const navigate = useNavigate();
  const groupView = () => {
    navigate("/group/view/" + groupDetail[activeIndex].groupNo);
  };

  return (
    <div className="popular-groupWrap-thumbnail">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView="3" // 중앙 슬라이드를 포함하여 총 3개의 슬라이드 표시
        spaceBetween={100} // 슬라이드 간의 간격 설정 (원하는 값을 사용하여 조정 가능)
        initialSlide={groupDetail.length + 1}
        coverflowEffect={{
          rotate: 50, // 슬라이드의 회전 각도 조절
          stretch: -100,
          depth: 500, // 슬라이드 사이의 3D 거리 조절
          modifier: 1,
          slideShadows: false,
          shadow: false,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex); // 현재 슬라이드 인덱스 설정
        }}
      >
        {groupDetail.map((detail, index) => (
          <SwiperSlide key={index}>
            <div className="slideBox">
              <div className="slideImg-box" onClick={groupView}>
                <div className="slideImg-size">
                  <img src={"/group/" + detail.groupImg} alt="slide_image" />
                </div>
              </div>
              <div className="detail-box">
                {activeIndex === index && ( //슬라이드인덱스랑 groupDetail인덱스랑 같은거 정보 불러오기
                  <div className="group-info">
                    <div className="detail-title">
                      <h3>{detail.groupName}</h3>
                    </div>
                    <div className="detail-category">
                      {detail.groupCategory === 1 ? "#문화·예술" : ""}
                      {detail.groupCategory === 2 ? "#운동·액티비티" : ""}
                      {detail.groupCategory === 3 ? "#푸드·드링크" : ""}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default PopularGroupImg;
