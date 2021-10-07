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
>   request
>   response

### status code
>
>

### Node.js Tutorial
> s
>

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