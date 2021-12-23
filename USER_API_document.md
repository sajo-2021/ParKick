### API Documents

### URL : http://118.67.131.50/

#### auth
##### API 기본정보 : 회원가입
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|register|/auth/register|회원가입|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|id|String|Y|-|생성하려는 사용자의 id|
> |body|pwd|String|Y|-|생성하려는 사용자의 패스워드|
> |body|name|String|Y|-|생성하려는 사용자의 이름|
> |body|nickname|String|Y|-|생성하려는 사용자의 닉네임|
> |body|email|String|Y|-|생성하려는 사용자의 이메일|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |message|String|처리 결과를 알려줌|-|
> |err|String|에러 내용을 반환|-|

##### API 기본정보 : 로그인
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|login|/auth/login|로그인|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|id|String|Y|-|로그인하려는 사용자의 id|
> |body|pwd|String|Y|-|로그인하려는 사용자의 패스워드|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |message|String|처리 결과를 알려줌|-|
> |token|String|입력한 사용자의 정보를 암호화한 토큰|-|
> |err|String|에러 내용을 반환|-|

##### API 기본정보 : Check
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |GET|check|/auth/check|로그인|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|

###### 2. 인증토큰
> |헤더명|쿼리|값|
> |:---:|:---:|:---:|
> |x-access-token|-|로그인으로 반환된 토큰을 전송|
> |-|token|로그인으로 반환된 토큰을 전송|
>
> 두 방식 모두 동작
> 쿼리는 url 맨 뒤에 ?token='토큰값' 으로 전송

###### 3. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |success|Boolean|토큰의 유효성을 검증해줌|-|
> |info|{json}|토큰이 가지고 있는 정보를 반환|-|
> |err|String|에러 내용을 반환|-|

#### User
##### API 기본정보 : mypage
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |GET|mypage|/users/mypage|내 유저정보 반환|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|

###### 2. 인증토큰
> |헤더명|쿼리|값|
> |:---:|:---:|:---:|
> |x-access-token|-|로그인으로 반환된 토큰을 전송|
> |-|token|로그인으로 반환된 토큰을 전송|
>
> 두 방식 모두 동작
> 쿼리는 url 맨 뒤에 ?token='토큰값' 으로 전송

###### 3. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |_id|ObjectId|조회된 사용자 document의 Objectid|-|
> |id|String|조회된 사용자의 id|-|
> |pwd|String|조회된 사용자의 패스워드|-|
> |name|String|조회된 사용자의 이름|-|
> |nickname|String|조회된 사용자의 닉네임|-|
> |email|String|조회된 사용자의 이메일|-|
> |mycomment|[Schema]|조회된 사용자가 작성한 댓글 목록|{lot(ObjectId), comment(ObjectId)} 형식으로 구성|
> |lot_rate_list|[Schema]|조회된 사용자가 평가한 주차장 목록|{lot(ObjectId), myrate(Number)} 형식으로 구성, 평가가 like면 myrate는 1, dislike면 myrate는 -1|

#### Parklot
##### API 기본정보 : Parklot 조회
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |GET|read All|/parklots/|주차장 목록 조회|
> |GET|read|/parklots/no/:no|lotid가 no인 주차장 조회|
> |GET|read|/parklots/id/:id|_id가 id인 주차장 조회|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|no|Number|-|-|조회하려는 주차장의 lotid|
> |params|id|ObjectId|-|-|조회하려는 주차장의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |_id|ObjectId|조회된 주차장 document 고유의 id|-|
> |lotid|Number|조회된 주차장 고유의 번호(이름)|-|
> |latitude|Number|조회된 주차장의 위도|-|
> |longitude|Number|조회된 주차장의 경도|-|
> |ratelist|[ObjectId]|조회된 주차장에 평가를 남긴 user의 목록|-|
> |rate|Schema|조회된 주차장의 평가 정보|{like, dislike}|
> |comments|[Schema]|조회된 주차장에 작성된 댓글 목록|{user의 _id, comment} 형식으로 기록|


##### API 기본정보 : Parklot에 commnet 조회
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|write comment|/parklots/com/:oid|_id가 oid인 parklot의 comment 조회|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|oid|ObjectId|Y|-|comment를 조회하려는 주차장의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |user/nickname|String|comment를 작성한 user의 닉네임|비고|
> |comment/comment|String|comment의 내용|비고|


##### API 기본정보 : Parklot에 commnet 작성/수정
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|write comment|/parklots/com|comment 작성/수정|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|oid|ObjectId|Y|-|comment를 작성/수정하려는 주차장의 _id|
> |body|comment|String|Y|-|작성/수정하려 하는 comment의 내용|

###### 2. 인증토큰
> |헤더명|쿼리|값|
> |:---:|:---:|:---:|
> |x-access-token|-|로그인으로 반환된 토큰을 전송|
> |-|token|로그인으로 반환된 토큰을 전송|
>
> 두 방식 모두 동작
> 쿼리는 url 맨 뒤에 ?token='토큰값' 으로 전송

###### 3. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|


##### API 기본정보 : Parklot의 comment 삭제
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |DELETE|delete comment|/parklots/com/:oid/:uid|comment 삭제|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|oid|ObjectId|Y|-|삭제하려는 comment가 작성된 주차장의 _id|

###### 2. 인증토큰
> |헤더명|쿼리|값|
> |:---:|:---:|:---:|
> |x-access-token|-|로그인으로 반환된 토큰을 전송|
> |-|token|로그인으로 반환된 토큰을 전송|
>
> 두 방식 모두 동작
> 쿼리는 url 맨 뒤에 ?token='토큰값' 으로 전송

###### 3. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|

##### API 기본정보 : Parklot 평가
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|rate parklot|/parklots/rate/|parklot 평가하기|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|oid|ObjectId|Y|-|평가하려는 주차장의 _id|
> |body|pmt|Number|Y|-|like는 1, dislike는 2|

###### 2. 인증토큰
> |헤더명|쿼리|값|
> |:---:|:---:|:---:|
> |x-access-token|-|로그인으로 반환된 토큰을 전송|
> |-|token|로그인으로 반환된 토큰을 전송|
>
> 두 방식 모두 동작
> 쿼리는 url 맨 뒤에 ?token='토큰값' 으로 전송

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|

##### API 기본정보 : Parklot 신고
> 한번 보내면 신고되고, 다시 한 번 보내면 신고가 취소됩니다.
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|report parklot|/parklots/rpt/|parklot 신고하기|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|oid|ObjectId|Y|-|신고하려는 주차장의 _id|

###### 2. 인증토큰
> |헤더명|쿼리|값|
> |:---:|:---:|:---:|
> |x-access-token|-|로그인으로 반환된 토큰을 전송|
> |-|token|로그인으로 반환된 토큰을 전송|
>
> 두 방식 모두 동작
> 쿼리는 url 맨 뒤에 ?token='토큰값' 으로 전송

###### 2. 출력결과
> 해당 parklot이 리턴됩니다.
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |report|Number|해당 parklot이 신고를 받은 횟수입니다.|비고|
> |reportlist|[ObjectId]|해당 parklot을 신고한 user의 목록입니다.|비고|

#### Zone
##### API 기본정보 : Zone 조회
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |GET|read All|/zones/|주차포인트 목록 조회|
> |GET|read|/zones/id/:id|_id가 id인 주차포인트 조회|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|id|ObjectId|-|-|조회하려는 주차포인트 document의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |latitude|Number|조회한 주차포인트의 위도|-|
> |longitude|Number|조회한 주차포인트의 경도|-|
> |suggest|Boolean|조회한 주차포인트의 추천/비추천 속성|추천시 true, 비추천시 false|
> |user|String|해당 zone을 추천한 user의 id|-|

##### API 기본정보 : Zone 생성
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|create|/zones/|신규 주차포인트 생성|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|latitude|Number|Y|-|생성하려는 주차포인트의 위도|
> |body|longitude|Number|Y|-|생성하려는 주차포인트의 경도|
> |body|suggest|Boolean|Y|-|생성하려는 주차포인트 추천/비추천(T/F) 속성|

###### 2. 인증토큰
> |헤더명|쿼리|값|
> |:---:|:---:|:---:|
> |x-access-token|-|로그인으로 반환된 토큰을 전송|
> |-|token|로그인으로 반환된 토큰을 전송|
>
> 두 방식 모두 동작
> 쿼리는 url 맨 뒤에 ?token='토큰값' 으로 전송

###### 3. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|


### status code
> * 400 : 형식 오류
>   - SE01 : 요청변수가 없습니다. 값이 null입니다.
>   - SE05 : 요청변수의 형식은 맞지만 해당 요청변수에 일치하는 document가 없습니다.
>   - SE06 : 이미 존재하는 값입니다. 다시 생성할 수 없습니다.
> * 403
>   - 로그인 오류입니다.
> * 404
>   - SE09 : 존재하지 않는 데이터입니다.
> * 500
>   - 요청변수 형식이 일치하지 않거나 기타 시스템 오류 시 발생합니다.
>   - 발생 시 제보 부탁드립니다.
> * 에러시에는 { status: "500", err : "err code"} 식으로 반환하게 다듬기