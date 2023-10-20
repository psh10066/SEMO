import React, { useEffect } from "react";

/* global kakao */
const Kakao = (props) => {
  const data = props.data;
  const index = props.index;
  useEffect(() => {
    const mapContainer = document.querySelector(`#map-${index}`); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.537187, 127.005476), // 기본 중심 좌표
      level: 5, // 지도의 확대 레벨
    };
    // 지도를 미리 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);
    // 주소-좌표 변환 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 변환하여 지도에 표시
    geocoder.addressSearch(data, function (results, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(results[0].y, results[0].x);
        // 마커를 생성하고 지도에 표시
        // const marker =
        new kakao.maps.Marker({
          position: coords,
          map: map,
        });
        // 지도 중심을 변경
        map.setCenter(coords);
      }
    });
  }, [data, index]);
  return (
    <div>
      <div
        id={`map-${index}`}
        className="map"
        style={{
          width: "400px",
          height: "150px",
          zIndex: 0,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          marginTop: "10px",
          borderRadius: "10px",
          marginLeft: "1px",
        }}
      ></div>
    </div>
  );
};

export default Kakao;
