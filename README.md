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

- 본 프로젝트는 팀 프로젝트로 ---------
- UI 부분은 styled-components, antd을 사용
- 반응형 구현은 테블릿 크기(768) 모바일 크기(375)에서 간단하게 구현함
- 컴포넌트 구성: 컴포넌트는 중간단위 및 페이지 단위로 구성했으며 디렉토리로 구분함
- 주요 기능: 로그인, 회원가입, 소셜로그인, 회원정보 수정, --------
- 페이지 단위 컴포넌트 구성: 로그인, 회원가입, 메인 페이지, 상세페이지, 유저 게시물 페이지, 채팅 페이지
- DB구성
- user: {\_id, nickname, email, password, comment_myself, profile_img, createdAt, updatedAt}
- post: {content, url, imgUrl, user, emoticon, comment, createdAt, updatedAt}
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
