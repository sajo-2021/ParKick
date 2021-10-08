4조 양다은 DBserver 담당
==================
프로토타입 설계
-----------------
>- 물리적 DB 서버와 DB management 통합   
>   * 프로젝트 규모가 작아 문제될만한 상황은 없으나, DB접속이 많아진다면(API서버와 main서버에서 빈번하게 요청이 많이 발생한다면) 로드벨런싱 잡아줘야 함.   
>   * 따라서 가시성에 초점맞춰 굳이 두 파티션으로 구분 짓기.
> 
>- 핵심적으로 공부할 것
>   * restAPI(Client와 API서버간 request)
>   * TCP socket 통신(나머지 request)
>
>- Mongo DB 생성 및 설계
>
>- 데이터를 주고받을 때, 포맷 형태 즉 일종의 통신 프로트콜 구상하기
>
>- DB 서버 : 통신 규약 설계(주차장존 좌표와 유저 정보 전송)  

***
MongoDB 개념 및 설치
-----------------
[SQL vs NoQSQL과 Mongo](https://velog.io/@ckstn0777/MongoDB%EB%9E%80)
```
C:\Users\didek>mongo --version
MongoDB shell version v5.0.3
Build Info: {
    "version": "5.0.3",
    "gitVersion": "657fea5a61a74d7a79df7aff8e4bcf0bc742b748",
    "modules": [
        "enterprise"
    ],
    "allocator": "tcmalloc",
    "environment": {
        "distmod": "windows",
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}
```

***
MongoDB 관리 GUI 툴
-----------------
1. MongoDB Compass : database, table UI가 깔끔하게 정리되어있어서 쓸만하다.
2. Robo 3T : 장점은 shell을 사용할 수 있다.

***
Node.js 와 MongoDB 연동 
-----------------
_nodejs 언어 선택_

[Node.js 와 MongoDB 연동](https://velog.io/@ckstn0777/MongoDB%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90)

***
Mongoose 설치
-----------------
**1. mongodb vs mongoose**   

- mongodb 라이브러리
    1. MongoDB Driver 모듈
    2. 따라서 mongo 콘솔 클라이언트 명령과 동일하게 조작 가능
- mongoose
    1. MongoDB ODM 중 가장 유명한 라이브러리
    2. 데이터베이스 연결, 스키마 정의, 스키마에서 모델로 변환, 모델을 이용해 데이터를 다룸
    3. 프로미스와 콜백 사용가능

**2. Node JS - Mongoose 사용**
```js
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager", {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
```
[Mongoose 사용하기](https://velog.io/@ckstn0777/Mongoose-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

[Mongoose ?](https://dev-skill.tistory.com/77)

***
restAPI
-----------------
[Node.js(express)와 MongoDB 연동 RESTful API - Mongoose](https://poiemaweb.com/mongoose)
***
TCP 소켓 통신 
-----------------
[Node.js에서 구현하는 소켓 서비스](https://mylko72.gitbooks.io/node-js/content/chapter8/intro.html)

[NodeJS와 소켓 통신 연결](https://kimyc1223.github.io/2019-11-27-HoloLens004/)

***
기타 참고자료 
-----------------
[MomgoDB 데이터베이스 관리](https://c5ecbb38d638.gitbooks.io/mongodb-install-manual/content/b370_c774_d130_bca0_c774_c2a4_ad00_b9ac.html)

[다른 서버로 Mongodb 이전](https://novemberde.github.io/post/2017/07/01/Mongodb_transport/)

[Node.JS, WebSocket, Socket.io, TCP, UDP 관련](https://202psj.tistory.com/1199)

_박인규 선배님 참고자료 공유:)_
[node.js REST API 서버 만들기](https://velog.io/@wimes/series/back-end)
[NodeJS_REST-API_tutorial](https://github.com/kiryun/NodeJS_REST-API_template)