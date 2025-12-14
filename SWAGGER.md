/v3/api-docs Explore 따릉이 서버 API문서 v0.0.1 OAS 3.0 /v3/api-docs 따릉이 서버의 API 문서 입니다.

따릉이 Servers

/

Authorize Token API JWT 토큰 관련 API

POST /api/v1/tokens/reissue 토큰 재발급

Refresh Token으로 Access Token 재발급합니다.

Parameters Try it out Name Description refresh \* string (query) refresh Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "grantType": "string", "accessToken": "string", "refreshToken": "string", "accessTokenExpire": "2025-12-14T04:57:30.634Z", "refreshTokenExpire": "2025-12-14T04:57:30.634Z", "role": "string" } } No links

POST /api/v1/tokens/login 이메일로 JWT 토큰 발급

Parameters Try it out No parameters

Request body

application/json Example Value Schema { "loginId": "string", "password": "string" } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "grantType": "string", "accessToken": "string", "refreshToken": "string", "accessTokenExpire": "2025-12-14T04:57:30.636Z", "refreshTokenExpire": "2025-12-14T04:57:30.636Z", "role": "string" } } No links 게시글게시글 관련 API

GET /api/v1/boards 게시글 목록 조회

게시글 목록을 조회합니다.

Parameters Try it out Name Description boardType string (query) 게시글 타입

Available values : QNA, NOTICE, REPORT

-- keyword string (query) 검색 키워드

keyword pageable \* object (query) { "page": 0, "size": 1, "sort": [ "string" ] } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "totalElements": 0, "totalPages": 0, "size": 0, "content": [ { "boardId": 0, "userId": 0, "userName": "string", "boardType": "QNA", "title": "string", "createdDate": "2025-12-14T04:57:30.641Z" } ], "number": 0, "sort": { "empty": true, "sorted": true, "unsorted": true }, "numberOfElements": 0, "pageable": { "pageNumber": 0, "offset": 0, "sort": { "empty": true, "sorted": true, "unsorted": true }, "pageSize": 0, "paged": true, "unpaged": true }, "first": true, "last": true, "empty": true } } No links

POST /api/v1/boards 게시글 작성

새로운 게시글을 작성합니다.

Parameters Try it out No parameters

Request body

application/json Example Value Schema { "boardType": "QNA", "title": "string", "content": "string" } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "boardId": 0, "userId": 0, "userName": "string", "boardType": "QNA", "title": "string", "content": "string", "createdDate": "2025-12-14T04:57:30.644Z", "lastModifiedDate": "2025-12-14T04:57:30.644Z" } } No links

GET /api/v1/boards/{boardId} 게시글 단일 조회

특정 게시글의 상세 정보를 조회합니다.

Parameters Try it out Name Description boardId \* integer($int64) (path) 게시글 ID

boardId Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "boardId": 0, "userId": 0, "userName": "string", "boardType": "QNA", "title": "string", "content": "string", "createdDate": "2025-12-14T04:57:30.647Z", "lastModifiedDate": "2025-12-14T04:57:30.647Z" } } No links

DELETE /api/v1/boards/{boardId} 게시글 삭제

게시글을 삭제합니다.

Parameters Try it out Name Description boardId \* integer($int64) (path) 게시글 ID

boardId Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": {} } No links

PATCH /api/v1/boards/{boardId} 게시글 수정

기존 게시글을 수정합니다.

Parameters Try it out Name Description boardId \* integer($int64) (path) 게시글 ID

boardId Request body

application/json Example Value Schema { "title": "string", "content": "string" } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "boardId": 0, "userId": 0, "userName": "string", "boardType": "QNA", "title": "string", "content": "string", "createdDate": "2025-12-14T04:57:30.651Z", "lastModifiedDate": "2025-12-14T04:57:30.651Z" } } No links 유저 API

POST /api/v1/users 사용자 생성

이름, 이메일, 비밀번호를 입력받아 새로운 사용자를 생성합니다.

Parameters Try it out No parameters

Request body

application/json Example Value Schema { "name": "string", "email": "string", "password": "stringst" } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": 0 } No links 대여소 API

GET /api/v1/stations 대여소 목록 조회하기

대여소 목록을 페이지네이션과 검색으로 조회합니다.

Parameters Try it out Name Description search string (query) 대여소명 검색 키워드

search pageable \* object (query) { "page": 0, "size": 1, "sort": [ "string" ] } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "totalElements": 0, "totalPages": 0, "size": 0, "content": [ { "stationId": 0, "stationName": "string", "latitude": 0, "longitude": 0, "address": "string", "capacity": 0, "availableBikes": 0, "installationDate": "2025-12-14", "closedDate": { "hour": 0, "minute": 0, "second": 0, "nano": 0 } } ], "number": 0, "sort": { "empty": true, "sorted": true, "unsorted": true }, "numberOfElements": 0, "pageable": { "pageNumber": 0, "offset": 0, "sort": { "empty": true, "sorted": true, "unsorted": true }, "pageSize": 0, "paged": true, "unpaged": true }, "first": true, "last": true, "empty": true } } No links

POST /api/v1/stations 대여소 등록하기

새로운 대여소를 등록합니다.

Parameters Try it out No parameters

Request body

application/json Example Value Schema { "stationName": "string", "latitude": 0, "longitude": 0, "address": "string", "capacity": 0, "installationDate": "2025-12-14" } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": 0 } No links

POST /api/v1/stations/sync 따릉이 데이터 동기화

따릉이 API에서 대여소 데이터를 가져와 저장합니다.

Parameters Try it out No parameters

Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": 0 } No links

GET /api/v1/stations/{stationId} 대여소 상세 조회하기

Parameters Try it out Name Description stationId \* integer($int64) (path) stationId Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "responseStation": { "stationId": 0, "stationName": "string", "latitude": 0, "longitude": 0, "address": "string", "capacity": 0, "availableBikes": 0, "installationDate": "2025-12-14", "closedDate": { "hour": 0, "minute": 0, "second": 0, "nano": 0 } } } } No links

DELETE /api/v1/stations/{stationId} 대여소 삭제하기

대여소를 삭제합니다.

Parameters Try it out Name Description stationId \* integer($int64) (path) 대여소 ID

stationId Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": {} } No links

PATCH /api/v1/stations/{stationId} 대여소 정보 수정하기

대여소 정보를 수정합니다.

Parameters Try it out Name Description stationId \* integer($int64) (path) 대여소 ID

stationId Request body

application/json Example Value Schema { "stationName": "string", "latitude": 0, "longitude": 0, "address": "string", "capacity": 0, "installationDate": "2025-12-14" } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": {} } No links [유저 페이지]대여 API

POST /api/v1/rentals/stations/{stationId} 대여하기

Parameters Try it out Name Description stationId \* integer($int64) (path) stationId Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": 0 } No links

PATCH /api/v1/rentals/{rentalId} 반납하기

Parameters Try it out Name Description rentalId \* integer($int64) (path) rentalId Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": 0 } No links

GET /api/v1/rentals 대여현황 목록 조회하기

Parameters Try it out No parameters

Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "rentals": [ { "rentalId": 0, "bikeNumber": "string", "startStationName": "string", "endStationName": "string", "startTime": "2025-12-14T04:57:30.671Z", "endTime": "2025-12-14T04:57:30.671Z", "status": "string" } ] } } No links

GET /api/v1/rentals/users/{userId} 유저 자전거 대여 내역 조회

특정 유저의 자전거 대여 내역을 조회합니다.

Parameters Try it out Name Description userId \* integer($int64) (path) 유저 ID

userId Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": [ { "rentalId": 0, "startStationId": 0, "startStationName": "string", "endStationId": 0, "endStationName": "string", "bikeNum": "string", "startTime": "2025-12-14T04:57:30.673Z", "endTime": "2025-12-14T04:57:30.673Z", "createdDate": "2025-12-14T04:57:30.673Z" } ] } No links

GET /api/v1/rentals/rankings/time 이용시간 랭킹 조회

자전거 총 이용시간(분) 기준 랭킹을 조회합니다.

Parameters Try it out Name Description limit integer($int32) (query) 랭킹 조회 개수 (기본값: 10)

Default value : 10

10 Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "rankings": [ { "rank": 0, "userId": 0, "userName": "string", "value": 0, "hours": 0, "minutes": 0, "seconds": 0 } ] } } No links

GET /api/v1/rentals/rankings/count 이용횟수 랭킹 조회

자전거 대여 횟수 기준 랭킹을 조회합니다.

Parameters Try it out Name Description limit integer($int32) (query) 랭킹 조회 개수 (기본값: 10)

Default value : 10

10 Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "rankings": [ { "rank": 0, "userId": 0, "userName": "string", "value": 0, "hours": 0, "minutes": 0, "seconds": 0 } ] } } No links 이용권 API

POST /api/v1/passes/{passId} 이용권 구매하기

Parameters Try it out Name Description passId \* integer($int64) (path) passId Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": 0 } No links

GET /api/v1/passes 이용권 조회

Parameters Try it out No parameters

Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "passes": [ { "passId": 0, "passType": "ONE_DAY", "price": 0 } ] } } No links

GET /api/v1/passes/users 내가 구매한 이용권 조회

Parameters Try it out No parameters

Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "userPasses": [ { "userPassId": 0, "passId": 0, "passType": "ONE_DAY", "price": 0, "status": "ACTIVATE", "activatedDate": "2025-12-14", "expiredDate": "2025-12-14" } ] } } No links 댓글 API

GET /api/v1/comments/boards/{boardId} 댓글 목록 조회

Parameters Try it out Name Description boardId \* integer($int64) (path) boardId Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "commentList": [ { "commentId": 0, "writerName": "string", "content": "string" } ] } } No links

POST /api/v1/comments/boards/{boardId} 댓글 작성

Parameters Try it out Name Description boardId \* integer($int64) (path) boardId Request body

application/json Example Value Schema { "content": "string" } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": 0 } No links 관리자 API

POST /api/v1/admins 관리자 계정 생성

새로운 관리자 계정을 생성합니다.

Parameters Try it out No parameters

Request body

application/json Example Value Schema { "name": "string", "email": "string", "password": "stringst" } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": 0 } No links

PATCH /api/v1/admins/{adminId} 관리자 정보 변경

관리자 정보를 변경합니다.

Parameters Try it out Name Description adminId \* integer($int64) (path) 관리자 ID

adminId Request body

application/json Example Value Schema { "name": "string", "email": "string", "password": "stringst" } Responses Code Description Links 200 OK

Media type

_/_ Controls Accept header. Example Value Schema { "status": "string", "statusCode": 0, "message": "string", "count": 0, "data": { "userId": 0, "name": "string", "email": "string", "role": "USER", "createdDate": "2025-12-14T04:57:30.690Z", "lastModifiedDate": "2025-12-14T04:57:30.690Z" } } No links

Schemas CreateUser ApiResponseDtoLong ApiResponseDtoJwtToken JwtToken UserLoginRequestDto RequestRegisterStation ApiResponseDtoInteger RequestComment CreateBoard ApiResponseDtoBoardInfo BoardInfo AdminRequestDto ApiResponseDtoVoid UpdateBoard AdminResponseDto ApiResponseDtoAdminResponseDto Pageable ApiResponseDtoPageResponseStation LocalTime PageResponseStation PageableObject ResponseStation SortObject ApiResponseDtoResponseStationSpecific ResponseStationSpecific ApiResponseDtoResponseRentalList RentalInfo ResponseRentalList ApiResponseDtoListRentalResponseDto RentalResponseDto ApiResponseDtoRankingListResponseDto RankingListResponseDto RankingResponseDto ApiResponseDtoResponsePassList ResponsePass ResponsePassList ApiResponseDtoResponseUserPassList ResponseUserPass ResponseUserPassList ApiResponseDtoResponseCommentList ResponseComment ResponseCommentList ApiResponseDtoPageBoardListInfo BoardListInfo PageBoardListInfo
