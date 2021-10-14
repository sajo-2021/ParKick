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
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---:|:---:|
> |POST|create|/geo|제보기능, 신규 추천 영역 생성|
> |GET|index|/map|추천 주차존 리스트 조회|

### status code
> 
> 

### Node.js Tutorial
> nodejs 설치
> ```
>   PS C:\> npm init
> ```
> 
> express 패키지 설치, package.json의 dependencies에 자동으로 기록
> ```
>   PS C:\> npm install express --save
> ```
> 
> js파일 실행
> ```
>   PS C:\> node app.js
> ```
> 
> post에서 body값 받기 위한 body-parser 설치
> ```
>   PS C:\> npm install body-parser --save
> ```
> 
> dotenv와 mongoose 설치
> ```
>   PS C:\> npm install dotenv mongoose
> ```

### Window curl POST
> * windows powershell은 curl 코드로 자체 명령인 invoke-webrequest를 실행
> ```
>   PS C:\> curl (-URI) 127.0.0.1:3000/users -Method POST
> ```
> 위와 같은 형식으로 request를 전송
> 
> * POST에 Body 전송 시
> ```
>   PS C:\> $param = @{name='inkyu'};
>   PS C:\> curl 127.0.0.1:3000/users -Method POST -Body $param
> ```
> * 결과값이 요약되어서 content가 모두 보이지 않을 때
> ```
>   PS C:\> curl 127.0.0.1:3000/users -Method POST -Body $param | Select-Object -Expand Content
> ```


> 현재 로컬 DB 및 모듈화 튜토리얼로 /users를  
> mongoose 튜토리얼로 /todo를 진행중  
> 꼬이지 않게 주의  
> mongoose 연동 성공, API 형식과 DB 구조 구체화 필요  
> 이후에 query 만들고 데이터 전처리부분 다듬으면 완성  
