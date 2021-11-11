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
> * Park Information  
>
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |GET|read All|/parks/|주차장 목록 조회|
> |GET|read|/parks/:no|park_no가 no인 주차장 조회|
> |POST|create|/parks/|신규 주차장 생성|
> |PUT|update|/parks/:no|park_no가 no인 주차장 갱신|
> |DELETE|delete|/parks/:no|park_no가 no인 주차장 삭제|
>
> * 요청 uri
>   - no : 검색, 갱신, 삭제할 park_no의 값
>
> * 출력 결과
>   - park_no : 해당 주차장 고유의 번호
>   - park_latitude : 주차장의 위도?
>   - park_longitude : 주차장의 경도

> * Point Information  
>
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |GET|read All|/points/|주차포인트 목록 조회|
> |GET|read|/points/:no|point_no가 no인 주차포인트 조회|
> |POST|create|/points/|신규 주차포인트 생성|
> |PUT|update|/points/:no|point_no가 no인 주차포인트 갱신|
> |DELETE|delete|/points/:no|point_no가 no인 주차포인트 삭제|
>
> * 요청 uri
>   - no : 검색, 갱신, 삭제할 point_no의 값
>
> * 출력 결과
>   - point_no : 해당 주차장 고유의 번호
>   - point_latitude : 주차포인트의 위도
>   - point_longitude : 주차포인트의 경도
>   - user_no : 주차 포인트를 제보한 이용자 정보

> * View Information  
>
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---:|
> |GET|read All|/views/|리뷰 목록 조회|
> |GET|read|/views/:no|park_no가 no인 리뷰 조회|
> |GET|read User|/views/user/:id|User id가 id인 리뷰 목록 조회|
> |POST|create|/views/|신규 리뷰 생성|
> |PUT|update|/views/:no|park_no가 no인 리뷰 갱신|
> |DELETE|delete|/views/:no|park_no가 no인 리뷰 삭제|
>
> * 요청 uri
>   - no : 검색, 갱신, 삭제할 point_no의 값
>   - id : 검색할 User_id의 값
>
> * 출력 결과
>   - user_id : 리뷰를 작성한 user의 id
>   - park_no : 리뷰에 해당되는 주차장의 park_no
>   - view_stars : 리뷰 별점
>   - view_review : 리뷰 내용

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
