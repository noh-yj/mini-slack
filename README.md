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
  <br/>

## Project Overview

- **Login View**

![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5af99805-3157-4ca3-a38c-5670e9d9bddc%2FUntitled.png?table=block&id=1cff212e-0032-4dd3-b2b1-d3d0031bb1a6&width=770&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5af99805-3157-4ca3-a38c-5670e9d9bddc%2FUntitled.png?table=block&id=1cff212e-0032-4dd3-b2b1-d3d0031bb1a6&width=770&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

### 🔰로그인 페이지에서 구현한 기능

1. 비밀번호 찾기 [**첫 번째 사진**]
2. 일반 로그인 (이메일, 닉네임, 비밀번호) [**두 번째 사진**]
3. 소셜 로그인 (카카오톡 & 구글) [**세 번째 사진**]

- **기능별 화면 사진**

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffc04144c-3105-45f6-8b57-cd31ce203478%2FUntitled.png?table=block&id=4da379c8-4131-4464-9ea4-2231fcdac063&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffc04144c-3105-45f6-8b57-cd31ce203478%2FUntitled.png?table=block&id=4da379c8-4131-4464-9ea4-2231fcdac063&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  비밀번호 찾기 기능

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F92365b40-b47b-4dcb-9a79-afe168bd9a85%2FUntitled.png?table=block&id=fb4b015f-2253-42fa-9ce1-b95dbed79859&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F92365b40-b47b-4dcb-9a79-afe168bd9a85%2FUntitled.png?table=block&id=fb4b015f-2253-42fa-9ce1-b95dbed79859&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  일반 로그인 기능

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8c93576a-a327-4acb-9fe7-2fc29755675b%2FUntitled.png?table=block&id=5bdda91d-e087-402d-a093-f80709fa9f4b&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8c93576a-a327-4acb-9fe7-2fc29755675b%2FUntitled.png?table=block&id=5bdda91d-e087-402d-a093-f80709fa9f4b&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  소셜로그인 (구글)

---

- **Signup View**

![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F75d4668d-2836-4bc8-8751-5650436bec11%2FUntitled.png?table=block&id=9f4cbc3e-fe98-43a5-88ae-711199d8e849&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F75d4668d-2836-4bc8-8751-5650436bec11%2FUntitled.png?table=block&id=9f4cbc3e-fe98-43a5-88ae-711199d8e849&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

### 📝회원가입 페이지에서 구현한 기능

1. 중북 입력 체크 [**첫 번째 사진**]
2. 회원가입 기능 [**두 번째 사진**]

- **기능별 화면 사진**

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fce8a6382-ceae-4c67-81cb-e03fae158e8b%2FUntitled.png?table=block&id=4f3c0de1-ff0c-4bb6-b0bf-fd8bc2699385&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fce8a6382-ceae-4c67-81cb-e03fae158e8b%2FUntitled.png?table=block&id=4f3c0de1-ff0c-4bb6-b0bf-fd8bc2699385&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  중복 입력 체크 기능

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe67e4b57-795d-40b6-ab2f-c073a10e68f4%2FUntitled.png?table=block&id=dcd7dc78-af74-4c05-9104-a8bcc8532708&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe67e4b57-795d-40b6-ab2f-c073a10e68f4%2FUntitled.png?table=block&id=dcd7dc78-af74-4c05-9104-a8bcc8532708&width=670&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  회원가입 완료 화면

---

- **Main** **View**

![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9d531450-e03b-46d1-b7f1-c2b3a0a85aa1%2FUntitled.png?table=block&id=9ec54eff-40a3-4c19-9a84-5a4bd38f5956&width=3800&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9d531450-e03b-46d1-b7f1-c2b3a0a85aa1%2FUntitled.png?table=block&id=9ec54eff-40a3-4c19-9a84-5a4bd38f5956&width=3800&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

### 🎁메인 페이지에서 구현한 기능

1. 로그아웃 기능 [**첫 번째 사진**]
2. 유저 정보 조회 및 변경 기능 [**두 번째 사진**]
3. 유저 목록 조회 및 유저 이름 필터링 조회 → 해당 유저 전체 게시글 조회 기능 [**세 번째 사진**]
4. 게시글 작성 기능 [**네 번째 사진**]
5. 게시글 조회 기능 [**다섯 번째 사진**]
6. 게시글 수정 및 삭제 기능 [**여섯 & 일곱 번째 사진**]
7. 이모티콘 추가 및 삭제 기능 [**여덟 번째 사진**]
8. 상세 페이지 이동 기능 [**아홉 번째 사진**]

- **기능별 화면 사진**

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffa3724fa-a922-4d14-9349-25e8443f1aef%2FUntitled.png?table=block&id=d6863300-f22e-4f51-90c7-6fa1f83f842c&width=480&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffa3724fa-a922-4d14-9349-25e8443f1aef%2FUntitled.png?table=block&id=d6863300-f22e-4f51-90c7-6fa1f83f842c&width=480&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  빨간색 아이콘 누르면 로그아웃 가능

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F123618e7-3637-4377-99cf-e0ecbe794e02%2FUntitled.png?table=block&id=b3acf944-7a22-41ad-bba4-8490b1ff40c3&width=770&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F123618e7-3637-4377-99cf-e0ecbe794e02%2FUntitled.png?table=block&id=b3acf944-7a22-41ad-bba4-8490b1ff40c3&width=770&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  1. 이름 변경 불가
  2. 상태 메세지 변경 가능
  3. 일반 로그인시 비밀번호 변경 가능
  4. 프로필 사진 업로드 가능 (업로드 안 할 시, default 이미지 있음)

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8f913457-4420-4d32-b25f-df98758acd10%2FUntitled.png?table=block&id=f7189593-44bf-4745-b48a-fa5864b07466&width=850&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8f913457-4420-4d32-b25f-df98758acd10%2FUntitled.png?table=block&id=f7189593-44bf-4745-b48a-fa5864b07466&width=850&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  1. 전체 유저 목록 조회 가능
  2. 이름을 입력할 시 필터링 기능
  3. 이름을 누르면 해당 유저가 쓴 전체 게시글 조회 가능

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6b31e702-0ad4-4b43-9c56-dbe9e488401b%2FUntitled.png?table=block&id=6760899a-4d5e-467b-a247-0bb529e28be4&width=860&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6b31e702-0ad4-4b43-9c56-dbe9e488401b%2FUntitled.png?table=block&id=6760899a-4d5e-467b-a247-0bb529e28be4&width=860&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  1. 게시물 업로드 (글만 쓰는 것도 가능 & 글이 없을시 게시 불가)
  2. 작성 중에 취소하고 싶으면 영역 밖 요소 클릭하면 최초 작성 화면으로 돌아감.

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcc299c25-4c8d-4d5f-843b-64135e12668e%2FUntitled.png?table=block&id=22f215cf-4706-4d00-89f7-8f06da5f15b5&width=1340&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcc299c25-4c8d-4d5f-843b-64135e12668e%2FUntitled.png?table=block&id=22f215cf-4706-4d00-89f7-8f06da5f15b5&width=1340&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  최신 게시 날짜순으로 목록 조회

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F076411d0-f15b-4574-8dea-7e784ff92acc%2FUntitled.png?table=block&id=e2d2e8fe-85f0-458d-88e7-200d11127b3f&width=770&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F076411d0-f15b-4574-8dea-7e784ff92acc%2FUntitled.png?table=block&id=e2d2e8fe-85f0-458d-88e7-200d11127b3f&width=770&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  1. 본인이 쓴 게시물만 수정 및 삭제 가능!
  2. 게시글만 수정해도 무방
  3. 작성 중에 취소하고 싶으면 영역 밖 요소 클릭하면 최초 수정화면으로 돌아감.

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd67926e6-1d05-4935-b3aa-c6f25692399d%2FUntitled.png?table=block&id=e3f3986d-bf3a-4ce1-a5a4-6621210237fe&width=770&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd67926e6-1d05-4935-b3aa-c6f25692399d%2FUntitled.png?table=block&id=e3f3986d-bf3a-4ce1-a5a4-6621210237fe&width=770&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  삭제 성공 시 모달 보여줌 및 차순 게시물 최상단에서 보임

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6695415b-7d83-4826-9d1d-3896795a02e9%2FUntitled.png?table=block&id=1b659637-ac20-4216-991a-2742487c374f&width=770&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6695415b-7d83-4826-9d1d-3896795a02e9%2FUntitled.png?table=block&id=1b659637-ac20-4216-991a-2742487c374f&width=770&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  1. 이모티콘 조회하여 추가 가능 (중복된 것 클릭 즉시 삭제)
  2. 다른 사용자가 추가한 이모티콘과 현재 사용자가 추가한 이모티콘을 다르게 (파란색 테두리 & 글씨) 보여줌.
  3. 다른 사용자가 추가한 이모티콘을 누르면 추가 & 재시도하면 삭제

---

- **Post Detail View**

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7fee8a7e-5336-4fd3-8903-2a59eb5c26c3%2FUntitled.png?table=block&id=0f7d9a9c-c070-4736-bb9d-56440a193fb2&width=2790&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7fee8a7e-5336-4fd3-8903-2a59eb5c26c3%2FUntitled.png?table=block&id=0f7d9a9c-c070-4736-bb9d-56440a193fb2&width=2790&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  각 게시물에 있는 댓글 아이콘을 클릭하면 해당 게시물의 상세 페이지로 이동 (댓글 작성 가능)

### ⌨상세 페이지에서 구현한 기능

1. 댓글 달기 [**첫 번째 사진**]
2. 댓글 수정 및 삭제 [**두 & 세 번째 사진**]

- **기능별 화면 사진**

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fdc143bb4-5837-4cbd-934b-dd912ac9cda1%2FUntitled.png?table=block&id=a097df93-cf7e-486a-bb8c-848fffddc64e&width=1150&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fdc143bb4-5837-4cbd-934b-dd912ac9cda1%2FUntitled.png?table=block&id=a097df93-cf7e-486a-bb8c-848fffddc64e&width=1150&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  onKeyPress 속성을 넣어서 엔터를 치면 댓글 작성 가능

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0fed2e0c-720c-473b-80c4-5dbdcc3647f8%2FUntitled.png?table=block&id=dcb25c0e-d3c4-4f7a-b9e4-d73016131159&width=960&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0fed2e0c-720c-473b-80c4-5dbdcc3647f8%2FUntitled.png?table=block&id=dcb25c0e-d3c4-4f7a-b9e4-d73016131159&width=960&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  1. 댓글 작성시 유저 프로필, 댓글 내용, 만약 본인의 댓글이라면 수정 & 삭제도 할 수 있게 만듦.
  2. 수정시에 기존 댓글 내용을 Textarea 에 그대로 담아서 수정할 수 있게 함.

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa1a19c31-6b98-4200-aa2d-f4643f27eac8%2FUntitled.png?table=block&id=74c7816c-108b-4f42-bf5e-938451858abf&width=960&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa1a19c31-6b98-4200-aa2d-f4643f27eac8%2FUntitled.png?table=block&id=74c7816c-108b-4f42-bf5e-938451858abf&width=960&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  삭제를 하면 바로바로 화면이 업데이트가 될 수 있게 만듦.

---

- **Chat View**

![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0518b56d-fab7-41d2-aa3a-c1c44a669c77%2FUntitled.png?table=block&id=af1eeab5-e4e7-4e8f-b503-d12cae80f66f&width=3790&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0518b56d-fab7-41d2-aa3a-c1c44a669c77%2FUntitled.png?table=block&id=af1eeab5-e4e7-4e8f-b503-d12cae80f66f&width=3790&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

사이드바에서 채팅방 진입 가능 → 초기 채팅 화면에서는 No Data 라는 아이콘이 보여짐

### 👬채팅 페이지에서 구현한 기능

1. 알림 기능 [**첫 번째 사진**]
2. 배지 기능 [**두 번째 사진**]
3. 채팅 기능 [**세 번째 사진**]

- **기능별 화면 사진**

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6779b0ab-4240-4558-86f6-90844c860f4f%2FUntitled.png?table=block&id=e25cde8c-02cb-40bf-b690-2a131e649967&width=2800&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6779b0ab-4240-4558-86f6-90844c860f4f%2FUntitled.png?table=block&id=e25cde8c-02cb-40bf-b690-2a131e649967&width=2800&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  채팅 페이지 이외에 다른 화면에 있을 때, 우측 하단에 보낸 사람의 프로필 이미지, 이름, 내용이 든 알림 옮.

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F80c7bc8f-3d75-4309-9312-5170a0040b44%2FUntitled.png?table=block&id=fc366f8a-14a1-40d7-8fd8-f94089ba36e2&width=810&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F80c7bc8f-3d75-4309-9312-5170a0040b44%2FUntitled.png?table=block&id=fc366f8a-14a1-40d7-8fd8-f94089ba36e2&width=810&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  채팅 페이지 이외에 다른 화면에 있을 때, 왼쪽 사이트바 "채팅하기" 에서 메세지를 보낸 사람 이름 위에 빨간색 배지가 보여짐

  ![https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F56851583-97de-461b-bec9-8609902e06f7%2FUntitled.png?table=block&id=90a2fe36-60f2-4283-bae2-89a1922cd8b3&width=3790&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F56851583-97de-461b-bec9-8609902e06f7%2FUntitled.png?table=block&id=90a2fe36-60f2-4283-bae2-89a1922cd8b3&width=3790&userId=c34daa7f-c2d8-4a10-98d0-a0b23d4ebcfc&cache=v2)

  채팅을 할시에, 해당 유저와 실시간 채팅이 가능하게 구현하였음.

---

### 유튜브 링크

### [YouTube Link](https://www.youtube.com/watch?v=8IvPPMpnCZ4)
