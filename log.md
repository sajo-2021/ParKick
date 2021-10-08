_### 아직 정리 못함 (대충 씀;;)###_

- 프로트타입 제작하기

- API와 DB 서버가 서로 어떻게 커넥션할지 논의

- 통신 규약 정하기

- 통신 규약을 작성하면서 알게된점 CRUD 를 철저하게 작성해야 할거같다.. 주먹구구식으로 어떤 데이터가 필요하다 어떤 기능을 만들어야지 순간순간 하려니 수정사항이 너무 많아진다.

- DB 서버 자체 내에서 thread pool 을 활용하여 성능 개선(공부가 필요한 부분)
    * [Thread Pool 이란 ? JAVA Thread Pool 스레드풀 사용하기, 개념 설명, 장단점, 예제](https://www.wrapuppro.com/programing/view/jAuG3VNBCbGnQWU) => 개념 및 원리 학습
    * [Node.js | Thread Pool](https://velog.io/@goblin820/Node.js-Thread-Pool) => Nodejs에 적용
    * [worker_thread 모듈 사용방법](https://psyhm.tistory.com/45)
  
- 성능 개선을 위해서 할것 : 비동기/ 동기 방식 둘다 병행하여 알고리즘을 설계하고 빈번한 요청이 있는 것은 동기방식, 마이너한 데이터 요청은 비동기방식 처리하도록 하기 (조금 지식이 필요한 부분)


***
## Log 

- mongodb comprass 실행

- npm init -y

- npm install mongodb

- robo 3t 설치 및 실행 https://javacpro.tistory.com/65?category=291113

- npm install mongoose

- [Node.js MongoDB Driver API](https://mongodb.github.io/node-mongodb-native/3.6/api/)

- .gitignore 파일 생성 
  * [.gitignore 적용하기](https://velog.io/@psk84/.gitignore-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
  * [불필요한 github 업로드 방지](https://helloinyong.tistory.com/106)

- mongodb와 서버가 연동이 안되는 문제점 발견

- 필요한 npm install과 npm inint -y 재실행

- 연결완료. 지금은 server.js 로 npm start

- db로 시작하는 js 파일을 활용하여 CRUD 구현 가능할듯

- robo 3t에서 testdb 생성하여 collection에 document 테이블 생성하기. 
  * [Robomongo 3T 설치 및 실행](https://javacpro.tistory.com/65)
  * [Robo 3T 사용(feat.CRUD)](https://znos.tistory.com/51)

- 예시 데이터와 collection 생성

- Postman 사용하기
  * [[web] Postman 사용하기 & GET & POST](https://ychae-leah.tistory.com/50)
  * [postman 사용법 / REST API Json 호출하기](https://miniweb4u.tistory.com/279)

