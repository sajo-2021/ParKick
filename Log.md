Parkick DBserver
==================
## MongoDB 개념
[SQL vs NoQSQL과 Mongo](https://velog.io/@ckstn0777/MongoDB%EB%9E%80)

***

## MongoDB 설치
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

## MongoDB 관리 GUI 툴
[MongoDB 관리 GUI 툴](https://velog.io/@ckstn0777/MongoDB%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90)

1. MongoDB Compass 
     * host : localhost
     * 포트 : 27017(default)
     * 접속
2. Robo 3T
     * MongoDB랑 connect
     * host와 포트 동일
     * name : parkickdb
     * Open shell 클릭 -> 쿼리문 작성가능 

***

## Node.js 와 MongoDB 연동 
[Node.js 와 MongoDB 연동](https://velog.io/@ckstn0777/MongoDB%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90)   

**insertOne/insertMany** 
> vscode에서 터미널 열기
> ```
> $npm init -y   
> $npm install mongodb
> ```
 
> parkage.json 해당 js로 수정
> ```
> "start": "node server.js" (defualt) 를
> "start": "node insertOne.js" 수정
> ```

> 터미널
> ```
> $npm start
> Connected correctly. 
> ```   

> Robo3T에서 shell 열기
> ```sql
> db.getCollection('users').find({})
> ```
> 데이터 insert 되었는지 확인    
공식문서 참고 : [Node.js MongoDB Driver API](https://mongodb.github.io/node-mongodb-native/3.6/api/)    
findOne, find, updateOne, updateMAny, deleteOne, deleteMany test 진행 

> 터미널
> ```
> ctrl + c 
> $y
> ```

***

## Mongoose 설치

**1. mongodb vs mongoose**   
- mongodb 라이브러리
    1. MongoDB Driver 모듈
    2. 따라서 mongo 콘솔 클라이언트 명령과 동일하게 조작 가능
- mongoose
    1. MongoDB ODM 중 가장 유명한 라이브러리
    2. 데이터베이스 연결, 스키마 정의, 스키마에서 모델로 변환, 모델을 이용해 데이터를 다룸
    3. 프로미스와 콜백 사용가능

**2. NodeJS - Mongoose**
[Mongoose 사용하기](https://velog.io/@ckstn0777/Mongoose-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
[Mongo DB 연동 I - mongoose](https://javafa.gitbooks.io/nodejs_server_basic/content/chapter12.html)
[Mongo DB 연동 II - mongodb client](https://javafa.gitbooks.io/nodejs_server_basic/content/chapter13.html)

> vscode에서 터미널 열기
> ``` 
> $npm install mongoose
> ```

> conMongoose.js 생성
> 1단계 : 연결
> 2단계 : 스키마 생성
> 3단계 : 모델 생성
> 4단계 : 객체 생성
> 5단계 : 저장

> package.json 수정
> "start": "node conMongoose.js" 
> $npm start

!! useCreateIndex 에러 발생 
(Mongoose 연결 에러)[https://velog.io/@lee951109/MongoDB-MongoParseError-options-usecreateindex-usefindandmodify-are-not-supported]

**3. 스키마 검증(Validation) 및 옵션**

1. required
```js
  name: {
    type: String,
    required: true,
  },
```

2. validate   
```js
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a postive number");
      }
    },
  },
```

3. validator   
- 이메일을 필드로 사용하고 싶은 경우 -> 검증 라이브러리 -> validator.isEmail 사용   
- $npm i validator   
- [validator의 여러 기능](https://www.npmjs.com/package/validator#validators)

```js
const validator = require("validator");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
});
```

4. string 관련 옵션 
- lowercase, uppercase, trim, minlength 등
- trim을 true로 주면 name을 " hongildong "를 "honglidong" 식으로 앞뒤 공백을 제거한 뒤 저장한다.
- [공식문서](https://mongoosejs.com/docs/schematypes.html)
```js
  name: {
    type: String,
    trim: true,
    required: true,
  },
```

***

## NodeJS REST API + MongoDB(Mongoose)
[api와 mongodb 사용](https://velog.io/@ckstn0777/NodeJS-REST-API-MongoDB-%EC%82%AC%EC%9A%A9)
* package.json
* index.js
* -models
  * comment.js
  * parklot.js
  * rate.js
  * user.js
  * zone.js
* -api  : mini-app
  * index.js
  * -comment
    * index.js
    * comment.ctrl.js
  * -parklot
    * index.js
    * parklot.ctrl.js  
  * -rate
    * index.js
    * rate.ctrl.js 
  * -user
    * index.js
    * user.ctrl.js 
  * -zone
    * index.js
    * zone.ctrl.js
  
> package.json 수정
> "start": "node index.js"
> $npm start

***

## USER schema 
- id
- pwd
- name
- nickname
- email
- lot_rate_list(rate에서 받아옴)
- mycomments(comments에서 받아옴)

// 데이터베이스 선택
db = db.getSiblingDB('parkick')
use parkick

// users에 유저정보 추가 = 회원가입
db.users.insert({
    "id" : "user_id",
    "pwd" : "user_pwd",
    "name" : "user_name",
    "nickname" : "user_nickname",
    "email" : "user_email"
  })

// users에 전체 유저정보 조회 = 관리자?
db.user.find({})

// users에 특정 id로 해당 유저정보 조회 = 로그인 외 대부분 기능
db.user.find({"id" : "user_id"})

// users에 특정 id로 해당 유저정보 수정 = 개인정보 수정
db.user.update(
    {"id" : "user_id"},
    { $set: {
      "pwd" : "user_pwd",
      "name" : "user_name2",
      "nickname" : "user_nickname",
      "email" : "user_email"
    }}
  )

// users에 특정 id로 해당 유저정보 삭제 = 회원탈퇴
db.users.remove({"id" : "user_id"})

***

## Log 2021.11.13
1. parklot 스키마에 섹션별 구분을 위한 배열 구현 -> (parklot.js)Section 스키마 생성
2. rate 스키마에서 like/dislike 구분 및 type 변경
3. 연관있는 필드 연결 (외래키 특성 구현)
4. DaaEun/Parkick 브랜치 정리

## Log 2021.11.15
1. 10-11주차 주간보고서 발표 준비

## Log 2021.11.19

## Log 2021.11.20
1. Systemserver와 연동을 위한 TCP통신 학습
2. USER schema의 Query 작성

## Log 2021.11.21
1. 프로트타입 발표 논의
2. mongo collection 정리
3. 각 collection에 더미데이터(document) 추가 
4. schema 수정ing _해도해도 매일 생기넹..._

## Log NEXT
1. 우분투 공인ip 서버에서 실행
2. API서버-DB서버 연동 마무리
3. Sys서버-DB서버 연동 및 마무리















## 추가 참고 자료

### restAPI

[Node.js(express)와 MongoDB 연동 RESTful API - Mongoose](https://poiemaweb.com/mongoose)

[Express 라우팅](https://expressjs.com/ko/guide/routing.html)

***

### TCP 소켓 통신 

[Node.js에서 구현하는 소켓 서비스](https://mylko72.gitbooks.io/node-js/content/chapter8/intro.html)

[NodeJS와 소켓 통신 연결](https://kimyc1223.github.io/2019-11-27-HoloLens004/)

***
### 기타

[MomgoDB 데이터베이스 관리](https://c5ecbb38d638.gitbooks.io/mongodb-install-manual/content/b370_c774_d130_bca0_c774_c2a4_ad00_b9ac.html)

[다른 서버로 Mongodb 이전](https://novemberde.github.io/post/2017/07/01/Mongodb_transport/)

[Node.JS, WebSocket, Socket.io, TCP, UDP 관련](https://202psj.tistory.com/1199)

[Mongoose, Foreign Key 설정 및 Auto Increment Number 플러그인](https://mobicon.tistory.com/292)
