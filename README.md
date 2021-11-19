# 2015920021 박인규 API 담당

### 프로토타입 설계
>   * nodejs 기반 express 모듈 이용하여 REST API 구현
>       - DB 서버는 mongo DB 사용 예정
>       - request에 맞춰 DB에서 데이터 가져오기
>       - response 형식에 맞게 데이터 가공 후 전송
>
>   * API 기능
>       1. 추천/비추천할 영역을 전송
>       2. 클러스터링으로 만들어진 주차존 목록 받아오기
>           - 모든 목록 받아오기
>           - 사용자 위치 매개변수를 통해 주변의 주차존 목록만 받기
>           - 데이터베이스 구조에 따라 달라지지만 각 주차존에 종속된 평가정보도 함께 전송하기
>
>   * 공부해야 할 것
>       - nodejs로 REST API 서버 구현하기
>       - nodejs와 mongoDB 연동
>       - nodejs에서 데이터 가공하기
>
>   * API의 request, response 형식 정하기
>       - 영역 정보 프로토콜 만들기
>       - 각 기능별로 필요한 매개변수 결정하기
>       - 각 기능별로 반환할 정보, 상태코드 확인하기

### API Documents
> * Parklot Information  
>
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |GET|read All|/parklots/|주차장 목록 조회|
> |GET|read|/parklots/no/:no|lotid가 no인 주차장 조회|
> |GET|read|/parklots/id/:id|_id가 id인 주차장 조회|
>
> * 요청 uri
>   - no : 검색, 갱신, 삭제할 lotid의 값
>   - id : 검색할 _id의 값
>
> * 출력 결과
>   - _id : 해당 document 고유의 id
>   - lotid : 해당 주차장 고유의 번호
>   - latitude : 주차장의 위도
>   - longitude : 주차장의 경도
>   - ratelist : 해당 주차장에 평가를 한 user 목록
>   - rate : 해당 주차장의 평가 정보
>   - comments : 해당 주차장에 대해 기록된 댓글, {user, comment} 형식의 리스트로 반환됨


> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |POST|create|/parklots/|신규 주차장 생성|
>
> * 요청 body
>   - lotid : 해당 주차장 고유의 번호
>   - latitude : 주차장의 위도
>   - longitude : 주차장의 경도


> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |DELETE|delete|/parklots/no/:no|lotid가 no인 주차장 삭제|
> |DELETE|delete|/parklots/id/:id|_id가 id인 주차장 삭제|
>
> * 요청 uri
>   - no : 검색, 갱신, 삭제할 lotid의 값
>   - id : 검색할 _id의 값
> * 출력 결과
>   - OK : 삭제완료


> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |POST|write comment|/parklots/com|comment 작성|
> |PUT|update comment|/parklots/com|comment 수정|
>
> * 요정 body
>   - no : comment를 남길 parklot의 lotid
>   - user : comment를 남길 user의 _id
>   - comment : 작성할 comment의 내용

> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |DELETE|delete comment|/parklots/com/:no/:user|comment 삭제|
>
> * 요청 uri
>   - no : 삭제할 comment가 기록된 parklot의 lotid
>   - user : 삭제할 comment를 작성한 user의 _id
> * 출력 결과
>   - OK : 삭제완료

> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |POST|rate parklot|/parklots/rate/|parklot 평가하기|
>
> * 요청 body
>   - userid : 검색, 갱신, 삭제할 lotid의 값
>   - lotid : 검색할 _id의 값
>   - pmt : 1이면 추천 2이면 비추천
> * 출력 결과
>   - 


### 관리자용 API
> * Zone Information
>
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |GET|read All|/zones/|주차포인트 목록 조회|
> |GET|read|/zones/no/:no|zoneid가 no인 주차포인트 조회|
> |GET|read|/zones/id/:id|_id가 id인 주차포인트 조회|
>
> * 요청 uri
>   - no : 검색, 갱신, 삭제할 zoneid의 값
>   - id : 검색할 _id의 값
> * 출력 결과
>   - zoneid : 해당 주차포인트 고유의 번호
>   - latitude : 주차포인트의 위도
>   - longitude : 주차포인트의 경도

> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |POST|create|/zones/|신규 주차포인트 생성|
> |PUT|update|/zones/no/:no|zoneid가가 no인 주차포인트 갱신|
> |PUT|update|/zones/id/:id|_id가 id인 주차포인트 갱신|
>
> * 요청 uri
>   - no : 검색, 갱신, 삭제할 zoneid의 값
>   - id : 검색할 _id의 값
> * 요청 body
>   - zoneid : 해당 주차포인트 고유의 번호
>   - latitude : 주차포인트의 위도
>   - longitude : 주차포인트의 경도

> |DELETE|delete|/zones/no/:no|zoneid가가 no인 주차포인트 삭제|
> |DELETE|delete|/zones/id/:id|_id가 id인 주차포인트 삭제|
>
> * 요청 uri
>   - no : 검색, 갱신, 삭제할 zoneid의 값
>   - id : 검색할 _id의 값
> * 출력 결과
>   - OK : 삭제 완료

> * Rate Information  
>
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |GET|read All|/rates/|평가 목록 조회|
> |GET|read|/rates/id/:id|_id가 id인 평가 조회|
>
> * 요청 uri
>   - id : 검색할 _id의 값
> * 출력 결과
>   - like : 평가 중 좋아요 수
>   - dislike : 평가 중 싫어요 수


> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |DELETE|delete|/rates/id/:id|_id가 id인 평가 삭제|
>
> * 요청 uri
>   - id : 검색할 _id의 값
> * 출력 결과
>   - OK : 삭제 완료

> * Comment Information  
>
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |GET|read All|/comments/|댓글 목록 조회|
> |GET|read|/comments/id/:id|_id가 id인 댓글 조회|
>
> * 요청 uri
>   - id : 검색할 _id의 값
> * 출력 결과
>   - comment : 댓글의 내용

> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |DELETE|delete|/comments/id/:id|_id가 id인 댓글 삭제|
>
> * 요청 uri
>   - id : 검색할 _id의 값
> * 출력 결과
>   - OK : 삭제 완료

> * User Information  
>
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |GET|read All|/users/|사용자 목록 조회|
> |GET|read|/users/userid/:uid|userid가 uid인 사용자 조회|
> |GET|read|/users/id/:id|_id가 id인 사용자 조회|
>
> * 요청 uri
>   - uid : 검색할 사용자의 id
>   - id : 검색할 사용자의 _id
> * 출력 결과
>   - _id : 해당 document 고유의 id
>   - id : 사용자의 userid
>   - pwd : 사용자의 패스워드
>   - name : 사용자의 이름
>   - nickname : 사용자의 닉네임
>   - email : 사용자의 이메일
>   - mycomments : 사용자가 작성한 댓글
>   - lot_rate_list : 사용자가 평가한 parklot과 평가내용, {lot, myrate}로 구성, myrate는 1이면 like, -1이면 dislike

> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |POST|create|/users/|사용자 생성|
> |PUT|update|/users/userid/:uid|userid가 uid인 사용자 수정|
> |PUT|update|/users/id/:id|_id가 id인 사용자 수정|
>
> * 요청 uri
>   - uid : 검색할 사용자의 id
>   - id : 검색할 사용자의 _id
> * 요청 body
>   - id : 사용자의 userid
>   - pwd : 사용자의 패스워드
>   - name : 사용자의 이름
>   - nickname : 사용자의 닉네임
>   - email : 사용자의 이메일

> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |DELETE|delete|/users/userid/:uid|userid가 uid인 사용자 삭제|
> |DELETE|delete|/users/id/:id|_id가 id인 사용자 삭제|
> * 요청 uri
>   - uid : 검색할 사용자의 id
>   - id : 검색할 사용자의 _id
> * 출력 결과
>   - OK : 삭제 완료

### status code
> * 400 : 형식 오류
>   - SE01 : ??
>   - SE02 : ??
> * 404
>   - SE09 : 존재하지 않는 데이터입니다.
> * 500
>   - SE99 : 시스템 에러, 기타 에러

### Node.js, module install
> nodejs 설치
> ```
> PS C:\> npm init
> ```
> 
> express 패키지 설치, package.json의 dependencies에 자동으로 기록
> ```
> PS C:\> npm install express --save
> ```
> 
> post에서 body값 받기 위한 body-parser 설치
> ```
> PS C:\> npm install body-parser --save
> ```
> 
> dotenv와 mongoose 설치
> ```
> PS C:\> npm install dotenv mongoose
> ```
> 
> js파일 실행
> ```
> PS C:\> node app.js
> ```

### Window curl POST
> * windows powershell은 curl 코드로 자체 명령인 invoke-webrequest를 실행
> ```
> PS C:\> curl (-URI) 127.0.0.1:3000/users -Method POST
> ```
> 위와 같은 형식으로 request를 전송
> 
> * POST에 Body 전송 시
> ```
> PS C:\> $param = @{name='inkyu'};
> PS C:\> curl 127.0.0.1:3000/users -Method POST -Body $param
> ```
> * 결과값이 요약되어서 content가 모두 보이지 않을 때
> ```
> PS C:\> curl 127.0.0.1:3000/users -Method POST -Body $param | Select-Object -Expand Content
> ```

### 리눅스 환경 설정
* nodejs, npm, nvm 설치
> nvm 설치
> ```
> $ sudo apt-get install curl
> $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
> $ command -v nvm (설치확인)
> ```

> node 및 npm 설치
> ```
> $ nvm ls (버전확인)
> $ nvm install node
> $ nvm install --lts
> $ nvm ls
>
> $ node --version
> $ npm --version
> ```

> mongodb 설치 (이거 API랑 로컬DB랑 연동해볼라는 거에영)
> ```
> $ cd ~
> $ sudo apt update
> $ wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
> $ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
> $ sudo spt-get update
> $ sudo apt-get install -y mongodb-org
> $ mongodb --version
> $ mkdir -p ~/data/db
> $ sudo mongod --dbpath ~/data/db (DB 실행)
> $ ps -e | grep 'mongod' (인스턴스 실행 확인)
> ```
> 종료 시에는 Ctrl+C  
