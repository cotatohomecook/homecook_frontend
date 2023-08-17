## 홈쿡 프로젝트 

<p align="center">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/b40bd106-5187-4f3a-a44e-eb1af94c58ea" alt="image" width="270" height="300" />
</p>


## 🖥️ 프로젝트 소개
React Native과 Spring Boot를 통해 개발한 안드로이드 전용 홈메이드 집밥 배달 앱입니다. 
<br>

## 🕰️ 프로젝트 진행 기간
* 23.03.01 - 23.09.30

### 🧑‍🤝‍🧑 맴버구성
 - 기획자 (박세라, 김인서, 최윤경)
 - 디자이너 (정이진)
 - 프론트엔드 (전유정, 박소현)
 - 백엔드 (김민욱, 조용헌)
   
### ⚙️ 개발 환경
- `React Native @0.71.4`


## 📌 주요 기능
#### 로그인 (전유정)
- 아이디, 비밀번호 정보를 Post 요청
- 로그인 완료 후 사용자별 토큰을 저장 후 사용 

<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/b529f93b-6e0b-426b-9b83-77e4ce502a65" alt="image" width="200" height="400" />
</p>

#### 회원가입 (전유정)
- 회원 가입 정보를 requestbody로 POST 요청

<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/5b6c1c36-a67b-4d03-ae8f-e67c131b22f8" alt="image" width="200" height="400" />
</p>

### 구매자 메인페이지 (전유정)
- Main 배너 이미지 슬라이드 구현
- 랭킹별 자동 슬라이드 구현
- 맛집 종류별 무한 스크롤 구현
- 랜덤 상점, 랭킹별 상점, 카테고리별 상점 API를 GET 요청

<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/c803191a-22d0-4d51-8165-bf2b81a0b982" alt="image" width="200" height="400" />
</p>

### 구매자 지도 (전유정)
- 구글맵 API를 사용하여 반경 3km 이내 상점 표시
- 지도상 마커 UI를 상점별 리뷰점수가 적힌 마커로 교체 
- 지도 내 마커를 클릭하면 보이는, 해당 상점 정보가 담긴 슬라이드 구현 
- 지도에 표시할 정보 API GET 요청
<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/d4b75698-1196-4b90-80fc-bb0ac15af58e" alt="image" width="200" height="400" />
</p>



### 구매자 검색창 모달 (전유정)
- 검색 유형(상호명 또는 메뉴명)을 선택하는 드롭다운 메뉴 
- 사용자 기기 내에 검색 기록 저장
- 메뉴명, 상호명 검색 API GET 요청
<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/57a0cd65-170f-4169-9998-0fbbc705fd0a" alt="image" width="200" height="400" />
</p>

### 구매자 검색 결과 (전유정)
- 검색 결과 무한 스크롤 구현
- 기존 검색어에서 주문순, 리뷰순, 거리순으로 검색 필터 구현
- 검색 결과 별 즐겨찾기 유무 조회 가능하도록 구현
<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/c575c74f-3916-417f-8997-c8aa76b84ac4" alt="image" width="200" height="400" />
</p>
  
### 구매자 상점 즐겨찾기 (전유정)
- 즐겨찾기 폴더 생성 기능 구현
- 즐겨찾기 상점 등록, 상점 삭제 기능 구현
- 즐겨찾기 등록, 삭제 API Post, Delete 요청
<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/ba60f7b9-e0b9-4a39-abcd-cb722daa5cda" alt="image" width="1000" height="400" />
</p>

### 구매자 메뉴 주문 (전유정)
- 메뉴 주문을 장바구니에 추가하는 기능 
- 가게 정보, 메뉴 정보, 수량, 가격, 이미지 정보를 POST 요청
- 입력된 주소지를 사용자 기기에 저장하여, 다음에 사용할 수 있도록 구현

<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/01b3416f-8ef6-49f7-8c58-dce44d76e6bf" alt="image" width="600" height="400" />
</p>

### 배달 현황 (박소현)
- 현재 배달 현황 조회 기능
<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/39086c10-fdb6-4555-8f88-cfc2d3884353" alt="image" width="200" height="400" />
</p>

### 구매자 리뷰 (박소현)
- 전체 주문 내역 확인
- 주문 정보 API GET 요청 
- 리뷰 작성, 수정 기능 구현
<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/ba071c62-ac00-4b38-b99f-a68f4a5f9185" alt="image" width="600" height="400" />
</p>

### 마이페이지 (박소현)
- 마이페이지 UI 구현
- 개인정보 수정 UI 구현

<p align="left">
  <img src="https://github.com/cotatohomecook/homecook_frontend/assets/109844803/775d6bb1-cafb-4288-b09c-add5d5fdfdaf" alt="image" width="200" height="400" />
</p>



### 판매자 페이지 (박소현, 전유정) 
- 구현중

