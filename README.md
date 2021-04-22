# 항해 미니 프로젝트 Palette

## 개요

- 프로젝트 주제: 미니 프로젝트
- 개발인원 4명 (프론트엔드: 노유진, 조형석 / 백엔드: 금교석, 강태진)
- 개발 기간: 2021.04.12 ~ 2021.04.22
- 클라이언트: React, 서버: Node.js 사용
- 형상관리 툴: git
<hr/>
<br/>

## 프로젝트 특징

- 본 프로젝트는 팀 프로젝트로 게시물을 통한 커뮤니티 기능 및 채팅을 할 수 있는 미니프로젝트를 진행함
- UI 부분은 styled-components, antd을 사용
- 반응형 구현은 테블릿 크기(768) 모바일 크기(375)에서 간단하게 구현함
- 컴포넌트 구성: 컴포넌트는 중간단위 및 페이지 단위로 구성했으며 디렉토리로 구분함
- 주요 기능: 로그인, 회원가입, 소셜로그인, 회원정보 수정, 게시물 CRUD, 댓글 CRUD, 유저 검색 필터, 이모티콘기능, 무한스크롤, 1:1 채팅 기능, 채팅 알람 기능(배지, 브라우저 noti) 등 구현
- 페이지 단위 컴포넌트 구성: 로그인, 회원가입, 메인 페이지, 상세페이지, 유저 게시물 페이지, 채팅 페이지
- DB구성
- user: {\_id, nickname, email, password, comment_myself, profile_img, createdAt, updatedAt}
- post: {content, url, imgUrl, user, emoji , comment, createdAt, updatedAt}
- comment: {content, user, createdAt, updatedAt}
- emoticon: {emoji, user, post, createdAt, updatedAt}
- chat: {room, username, msg, createdAt, updatedAt}
<hr/>
<br/>

## 상태관리 패키지

- react-redux, redux (+ redux-actions, immer 사용)
- redux-middleware(redux-thunk)
- react-router-dom
- 클라이언트-서버 통신: axios 사용
- 웹소켓 통신: socket.io 사용

## Project Overview

---

- **Login View**

![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled.png)

### 🔰로그인 페이지에서 구현한 기능

1. 비밀번호 찾기 [**첫 번째 사진**]
2. 일반 로그인 (이메일, 닉네임, 비밀번호) [**두 번째 사진**]
3. 소셜 로그인 (카카오톡 & 구글) [**세 번째 사진**]

- **기능별 화면 사진**

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%201.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%201.png)

  비밀번호 찾기 기능

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%202.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%202.png)

  일반 로그인 기능

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%203.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%203.png)

  소셜로그인 (구글)

---

- **Signup View**

![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%204.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%204.png)

### 📝회원가입 페이지에서 구현한 기능

1. 중북 입력 체크 [**첫 번째 사진**]
2. 회원가입 기능 [**두 번째 사진**]

- **기능별 화면 사진**

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%205.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%205.png)

  중복 입력 체크 기능

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%206.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%206.png)

  회원가입 완료 화면

---

- **Main** **View**

![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%207.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%207.png)

### 🎁메인 페이지에서 구현한 기능

1. 로그아웃 기능 [**첫 번째 사진**]
2. 유저 정보 조회 및 변경 기능 [**두 번째 사진**]
3. 유저 목록 조회 및 유저 이름 필터링 조회 → 해당 유저 전체 게시글 조회 기능 [**세 번째 사진**]
4. 게시글 작성 기능 [**네 번째 사진**]
5. 게시글 조회 기능 [**다섯 번째 사진**]
6. 게시글 수정 및 삭제 기능 [**여섯 & 일곱 번째 사진**]
7. 이모티콘 추가 및 삭제 기능 [**여덟 번째 사진**]
8. 상세 페이지 이동 기능 [아홉 **번째 사진**]

- **기능별 화면 사진**

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%208.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%208.png)

  빨간색 아이콘 누르면 로그아웃 가능

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%209.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%209.png)

  1. 이름 변경 불가
  2. 상태 메세지 변경 가능
  3. 일반 로그인시 비밀번호 변경 가능
  4. 프로필 사진 업로드 가능 (업로드 안 할 시, default 이미지 있음)

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2010.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2010.png)

  1. 전체 유저 목록 조회 가능
  2. 이름을 입력할 시 필터링 기능
  3. 이름을 누르면 해당 유저가 쓴 전체 게시글 조회 가능

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2011.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2011.png)

  1. 게시물 업로드 (글만 쓰는 것도 가능 & 글이 없을시 게시 불가)
  2. 작성 중에 취소하고 싶으면 영역 밖 요소 클릭하면 최초 작성 화면으로 돌아감.

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2012.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2012.png)

  최신 게시 날짜순으로 목록 조회

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2013.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2013.png)

  1. 본인이 쓴 게시물만 수정 및 삭제 가능!
  2. 게시글만 수정해도 무방
  3. 작성 중에 취소하고 싶으면 영역 밖 요소 클릭하면 최초 수정화면으로 돌아감.

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2014.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2014.png)

  삭제 성공 시 모달 보여줌 및 차순 게시물 최상단에서 보임

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2015.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2015.png)

  1. 이모티콘 조회하여 추가 가능 (중복된 것 클릭 즉시 삭제)
  2. 다른 사용자가 추가한 이모티콘과 현재 사용자가 추가한 이모티콘을 다르게 (파란색 테두리 & 글씨) 보여줌.
  3. 다른 사용자가 추가한 이모티콘을 누르면 추가 & 재시도하면 삭제

  ***

---

- **Post Detail View**

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2016.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2016.png)

  각 게시물에 있는 댓글 아이콘을 클릭하면 해당 게시물의 상세 페이지로 이동 (댓글 작성 가능)

### ⌨상세 페이지에서 구현한 기능

1. 댓글 달기 [**첫 번째 사진**]
2. 댓글 수정 및 삭제 [**두 & 세 번째 사진**]

- **기능별 화면 사진**

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2017.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2017.png)

  onKeyPress 속성을 넣어서 엔터를 치면 댓글 작성 가능

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2018.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2018.png)

  1. 댓글 작성시 유저 프로필, 댓글 내용, 만약 본인의 댓글이라면 수정 & 삭제도 할 수 있게 만듦.
  2. 수정시에 기존 댓글 내용을 Textarea 에 그대로 담아서 수정할 수 있게 함.

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2019.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2019.png)

  삭제를 하면 바로바로 화면이 업데이트가 될 수 있게 만듦.

---

- **Chat View**

![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2020.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2020.png)

사이드바에서 채팅방 진입 가능 → 초기 채팅 화면에서는 No Data 라는 아이콘이 보여짐

### 👬채팅 페이지에서 구현한 기능

1. 알림 기능 [**첫 번째 사진**]
2. 배지 기능 [**두 번째 사진**]
3. 채팅 기능 [**세 번째 사진**]

- **기능별 화면 사진**

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2021.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2021.png)

  채팅 페이지 이외에 다른 화면에 있을 때, 우측 하단에 보낸 사람의 프로필 이미지, 이름, 내용이 든 알림 옮.

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2022.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2022.png)

  채팅 페이지 이외에 다른 화면에 있을 때, 왼쪽 사이트바 "채팅하기" 에서 메세지를 보낸 사람 이름 위에 빨간색 배지가 보여짐

  ![Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2023.png](Mini-Slack%20Project%201cff212e00324dd3b2b1d3d0031bb1a6/Untitled%2023.png)

  채팅을 할시에, 해당 유저와 실시간 채팅이 가능하게 구현하였음.
