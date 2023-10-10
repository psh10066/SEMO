import React, { useEffect, useState } from "react";

/* global kakao */
const Kakao = (props) => {
  const newAddress = props.data;
  const setData = props.setData;
  console.log(newAddress);
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };
    //지도를 미리 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);
    //주소-좌표 변환 객체를 생성
    // newAddress = new kakao.maps.services.Geocoder();
    // console.log(newAddress);
    //마커를 미리 생성
    var marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(37.537187, 127.005476),
      map: map,
    });
    function kakaoPostcode() {
      new kakao.Postcode({
        oncomplete: function (data) {
          var addr = data.address; // 최종 주소 변수
          // 주소 정보를 해당 필드에 넣는다.
          newAddress = addr;
          console.log(addr);
          /*
          // 주소로 상세 정보를 검색
          geocoder.addressSearch(data.address, function (results, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var result = results[0]; //첫번째 결과의 값을 활용

              // 해당 주소에 대한 좌표를 받아서
              var coords = new kakao.maps.LatLng(result.y, result.x);
              // 지도를 보여준다.
              mapContainer.style.display = "block";
              map.relayout();
              // 지도 중심을 변경한다.
              map.setCenter(coords);
              // 마커를 결과값으로 받은 위치로 옮긴다.
              marker.setPosition(coords);
            }
          });
          */
        },
      }).open();
    }
  }, []);

  return (
    <div>
      <div
        id="map"
        style={{ width: "500px", height: "400px", zIndex: 0 }}
      ></div>
    </div>
  );
};

export default Kakao;
