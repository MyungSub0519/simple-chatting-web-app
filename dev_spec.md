# API 엔드포인트 명세서

### 로그인/로그아웃/회원가입
|HTTP 메소드|엔드포인트|기능|
|----|----|----|
|GET|/|로그인 페이지|
|POST|/login|로그인 로직|
|POST|/logout|로그아웃 로직|
|GET|/signin|회원가입 페이지|
|POST|/signin|회원가입 로직|

### Rooms
|HTTP 메소드|엔드포인트|기능|
|----|----|----|
|GET|/rooms|채팅방 목록 페이지|
|POST|/rooms|채팅방 생성|
|GET|/rooms/{room-number}|채팅방 페이지|
|DELETE|/rooms{room-number}|채팅방 삭제|
|POST|/rooms/{room-number}/quit|채팅방 나가기|

### Users
|HTTP 메소드|엔드포인트|기능|
|----|----|----|
|GET|/users|유저 목록 페이지|
|POST|/users/{user-number}|친구 신청|

### Friends
|HTTP 메소드|엔드포인트|기능|
|----|----|----|
|GET|/Friends|친구 목록 페이지|
|GET|/Freinds/{user-number}|DM 페이지|
|DELETE|/Freinds/{user-number}|친구 삭제|
|GET|/Friends/request|친구 요청 목록 페이지|
|POST|/Friends/request/{user-number}/accept|친구 요청 수락|
|DELETE|/Friends/request/{user-number}/refuse|친구 요청 거절|