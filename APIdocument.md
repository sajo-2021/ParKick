### API Documents

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
> |params|no|ObjectId|-|-|조회하려는 주차장의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |_id|ObjectId|조회된 주차장 document 고유의 id|-|
> |lotid|Number|조회된 주차장 고유의 번호(이름)|-|
> |latitude|String|조회된 주차장의 위도|-|
> |longitude|String|조회된 주차장의 경도|-|
> |ratelist|[ObjectId]|조회된 주차장에 평가를 남긴 user의 목록|-|
> |rate|Schema|조회된 주차장의 평가 정보|{like, dislike}|
> |comments|Schema|조회된 주차장에 작성된 댓글 목록|{user의 _id, comment} 형식으로 기록|

##### API 기본정보 : Parklot 생성
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|create|/parklots/|신규 주차장 생성|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|lotid|Number|Y|-|생성하려는 주차장의 lotid|
> |body|latitude|String|Y|-|생성하려는 주차장의 latitude|
> |body|longitude|String|Y|-|생성하려는 주차장의 longitude|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|

##### API 기본정보 : Parklot 삭제
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |DELETE|delete|/parklots/no/:no|lotid가 no인 주차장 삭제|
> |DELETE|delete|/parklots/id/:id|_id가 id인 주차장 삭제|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|no|Number|-|-|삭제하려는 주차장의 lotid|
> |params|id|ObjectId|-|-|삭제하려는 주차장의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|

##### API 기본정보 : Parklot에 commnet 작성/수정
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|write comment|/parklots/com|comment 작성|
> |PUT|update comment|/parklots/com|comment 수정|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|no|Number|Y|-|comment를 작성하려는 주차장의 lotid|
> |body|user|ObjectId|Y|-|comment를 작성하려는 사용자의 _id|
> |body|comment|String|Y|-|작성하려 하는 comment의 내용|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|


##### API 기본정보 : Parklot의 comment 삭제
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |DELETE|delete comment|/parklots/com/:no/:user|comment 삭제|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|no|Number|Y|-|삭제하려는 comment가 작성된 주차장의 lotid|
> |body|user|ObjectId|Y|-|삭제하려는 comment를 작성한 사용자의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|

##### API 기본정보 : Parklot 평가
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|rate parklot|/parklots/rate/|parklot 평가하기|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |body|lotid|ObjectId|Y|-|평가하려는 주차장의 _id|
> |body|userid|ObjectId|Y|-|평가를 하는 사용자의 _id|
> |body|pmt|Number|Y|-|like는 1, dislike는 2|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|



### 관리자용 API
#### Zone
##### API 기본정보 : Zone 조회
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |GET|read All|/zones/|주차포인트 목록 조회|
> |GET|read|/zones/no/:no|zoneid가 no인 주차포인트 조회|
> |GET|read|/zones/id/:id|_id가 id인 주차포인트 조회|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|no|Number|-|-|조회하려는 주차포인트의 zoneid|
> |params|id|ObjectId|-|-|조회하려는 주차포인트 document의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |zoneid|Number|조회한 주차포인트의 zoneid|-|
> |latitude|String|조회한 주차포인트의 위도|-|
> |longitude|String|조회한 주차포인트의 경도|-|

##### API 기본정보 : Zone 생성/수정
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|create|/zones/|신규 주차포인트 생성|
> |PUT|update|/zones/no/:no|zoneid가가 no인 주차포인트 수정|
> |PUT|update|/zones/id/:id|_id가 id인 주차포인트 수정|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|no|Number|-|-|수정하려는 주차포인트의 zoneid|
> |params|id|ObjectId|-|-|수정하려는 주차포인트 document의 _id|
> |body|zoneid|Number|Y|-|생성/수정하려는 주차포인트의 zoneid|
> |body|latitude|String|Y|-|생성/수정하려는 주차포인트의 위도|
> |body|longitude|String|Y|-|생성/수정하려는 주차포인트의 경도|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|

##### API 기본정보 : Zone 삭제
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |DELETE|delete|/zones/no/:no|zoneid가가 no인 주차포인트 삭제|
> |DELETE|delete|/zones/id/:id|_id가 id인 주차포인트 삭제|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|no|Number|-|-|삭제하려는 주차포인트의 zoneid|
> |params|id|ObjectId|-|-|삭제하려는 주차포인트 document의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|

#### Rate
##### API 기본정보 : Rate 조회
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |GET|read All|/rates/|평가 목록 조회|
> |GET|read|/rates/id/:id|_id가 id인 평가 조회|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|id|ObjectId|-|-|조회하려는 Rate document의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |like|Number|like의 총 개수|-|
> |dislike|Number|dislike의 총 개수|-|

##### API 기본정보 : Rate 삭제
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |DELETE|delete|/rates/id/:id|_id가 id인 평가 삭제|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|id|ObjectId|Y|-|삭제하려는 Rate document의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|

#### Comment
##### API 기본정보 : Comment 조회
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |GET|read All|/comments/|댓글 목록 조회|
> |GET|read|/comments/id/:id|_id가 id인 댓글 조회|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|id|ObjectId|-|-|조회하려는 Comment document의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |comment|String|조회한 comment의 내용|-|

##### API 기본정보 : Comment 삭제
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |DELETE|delete|/comments/id/:id|_id가 id인 댓글 삭제|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|id|ObjectId|Y|-|삭제하려는 Comment document의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|


#### User
##### API 기본정보 : User 조회
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |GET|read All|/users/|사용자 목록 조회|
> |GET|read|/users/userid/:uid|userid가 uid인 사용자 조회|
> |GET|read|/users/id/:id|_id가 id인 사용자 조회|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|uid|String|-|-|조회하려는 사용자의 id|
> |params|id|ObjectId|-|-|조회하려는 사용자 document의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|
> |_id|ObjectId|조회된 사용자 document의 Objectid|-|
> |id|String|조회된 사용자의 id|-|
> |pwd|String|조회된 사용자의 패스워드|-|
> |name|String|조회된 사용자의 이름|-|
> |nickname|String|조회된 사용자의 닉네임|-|
> |email|String|조회된 사용자의 이메일|-|
> |mycomment|[ObjectId]|조회된 사용자가 작성한 댓글 목록|-|
> |lot_rate_list|[Schema]|조회된 사용자가 평가한 주차장 목록|{lot(ObjectId), myrate(Number)} 형식으로 구성, 평가가 like면 myrate는 1, dislike면 myrate는 -1|

##### API 기본정보 : User 생성/수정
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |POST|create|/users/|사용자 생성|
> |PUT|update|/users/userid/:uid|userid가 uid인 사용자 수정|
> |PUT|update|/users/id/:id|_id가 id인 사용자 수정|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|uid|String|-|-|수정하려는 사용자의 id|
> |params|id|ObjectId|-|-|수정하려는 사용자 document의 _id|
> |body|id|String|Y|-|생성/수정하려는 사용자의 id|
> |body|pwd|String|Y|-|생성/수정하려는 사용자의 패스워드|
> |body|name|String|Y|-|생성/수정하려는 사용자의 이름|
> |body|nickname|String|Y|-|생성/수정하려는 사용자의 닉네임|
> |body|email|String|Y|-|생성/수정하려는 사용자의 이메일|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|

##### API 기본정보 : User 삭제
> |Verb|Action|Path|Used for|
> |:---:|:---:|:---|:---|
> |DELETE|delete|/users/userid/:uid|userid가 uid인 사용자 삭제|
> |DELETE|delete|/users/id/:id|_id가 id인 사용자 삭제|

###### 1. 요청변수
> |분류|요청변수|타입|필수여부|기본값|설명|
> |:---:|:---:|:---|:---:|:---:|:---|
> |params|uid|String|Y|-|삭제하려는 사용자의 id|
> |params|id|ObjectId|Y|-|삭제하려는 사용자 document의 _id|

###### 2. 출력결과
> |필드|타입|설명|비고|
> |:---:|:---:|:---|:---|

### status code
> * 400 : 형식 오류
>   - SE01 : ??
>   - SE02 : ??
> * 404
>   - SE09 : 존재하지 않는 데이터입니다.
> * 500
>   - SE99 : 시스템 에러, 기타 에러
> * 에러시에는 { status: "500", err : "err code"} 식으로 반환하게 다듬기
> * 정상처리시에도 { status: "200" }이런 형태로 작성
