/v3/api-docs
Explore
따릉이 서버 API문서
v0.0.1
OAS 3.0
/v3/api-docs
따릉이 서버의 API 문서 입니다.

따릉이
Servers

/

Authorize
Token API
JWT 토큰 관련 API

POST
/api/v1/tokens/reissue
토큰 재발급

Refresh Token으로 Access Token 재발급합니다.

Parameters
Try it out
Name Description
refresh \*
string
(query)
refresh
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"grantType": "string",
"accessToken": "string",
"refreshToken": "string",
"accessTokenExpire": "2025-11-29T16:43:58.384Z",
"refreshTokenExpire": "2025-11-29T16:43:58.384Z",
"role": "string"
}
}
No links

POST
/api/v1/tokens/login
이메일로 JWT 토큰 발급

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"loginId": "string",
"password": "string"
}
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"grantType": "string",
"accessToken": "string",
"refreshToken": "string",
"accessTokenExpire": "2025-11-29T16:43:58.386Z",
"refreshTokenExpire": "2025-11-29T16:43:58.386Z",
"role": "string"
}
}
No links
게시글
게시글 관련 API

GET
/api/v1/boards
게시글 목록 조회

게시글 목록을 조회합니다.

Parameters
Cancel
Name Description
boardType
string
(query)
게시글 타입

--
keyword
string
(query)
검색 키워드

keyword
pageable \*
object
(query)
{
"page": 0,
"size": 1,
"sort": [
"string"
]
}
Execute
Clear
Responses
Curl

curl -X 'GET' \
 'http://ec2-43-201-119-165.ap-northeast-2.compute.amazonaws.com:8080/api/v1/boards?page=0&size=1&sort=string' \
 -H 'accept: _/_'
Request URL
http://ec2-43-201-119-165.ap-northeast-2.compute.amazonaws.com:8080/api/v1/boards?page=0&size=1&sort=string
Server response
Code Details
200
Response body
Download
{
"status": "success",
"statusCode": 200,
"message": "성공",
"data": {
"content": [],
"pageable": {
"pageNumber": 0,
"pageSize": 1,
"sort": {
"empty": false,
"sorted": true,
"unsorted": false
},
"offset": 0,
"paged": true,
"unpaged": false
},
"totalPages": 0,
"totalElements": 0,
"last": true,
"size": 1,
"number": 0,
"sort": {
"empty": false,
"sorted": true,
"unsorted": false
},
"numberOfElements": 0,
"first": true,
"empty": true
}
}
Response headers
cache-control: no-cache,no-store,max-age=0,must-revalidate
connection: keep-alive
content-type: application/json
date: Sat,29 Nov 2025 16:41:28 GMT
expires: 0
keep-alive: timeout=60
pragma: no-cache
transfer-encoding: chunked
vary: Origin,Access-Control-Request-Method,Access-Control-Request-Headers
x-content-type-options: nosniff
x-xss-protection: 0
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"totalPages": 0,
"totalElements": 0,
"size": 0,
"content": [
{
"boardId": 0,
"userId": 0,
"userName": "string",
"boardType": "QNA",
"title": "string",
"createdDate": "2025-11-29T16:43:58.326Z"
}
],
"number": 0,
"sort": {
"empty": true,
"sorted": true,
"unsorted": true
},
"numberOfElements": 0,
"pageable": {
"pageNumber": 0,
"offset": 0,
"sort": {
"empty": true,
"sorted": true,
"unsorted": true
},
"pageSize": 0,
"paged": true,
"unpaged": true
},
"first": true,
"last": true,
"empty": true
}
}
No links

POST
/api/v1/boards
게시글 작성

새로운 게시글을 작성합니다.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"boardType": "QNA",
"title": "string",
"content": "string"
}
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"boardId": 0,
"userId": 0,
"userName": "string",
"boardType": "QNA",
"title": "string",
"content": "string",
"createdDate": "2025-11-29T16:43:58.329Z",
"lastModifiedDate": "2025-11-29T16:43:58.329Z"
}
}
No links

GET
/api/v1/boards/{boardId}
게시글 단일 조회

특정 게시글의 상세 정보를 조회합니다.

Parameters
Try it out
Name Description
boardId \*
integer($int64)
(path)
게시글 ID

boardId
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"boardId": 0,
"userId": 0,
"userName": "string",
"boardType": "QNA",
"title": "string",
"content": "string",
"createdDate": "2025-11-29T16:43:58.331Z",
"lastModifiedDate": "2025-11-29T16:43:58.331Z"
}
}
No links

DELETE
/api/v1/boards/{boardId}
게시글 삭제

게시글을 삭제합니다.

Parameters
Try it out
Name Description
boardId \*
integer($int64)
(path)
게시글 ID

boardId
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {}
}
No links

PATCH
/api/v1/boards/{boardId}
게시글 수정

기존 게시글을 수정합니다.

Parameters
Try it out
Name Description
boardId \*
integer($int64)
(path)
게시글 ID

boardId
Request body

application/json
Example Value
Schema
{
"title": "string",
"content": "string"
}
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"boardId": 0,
"userId": 0,
"userName": "string",
"boardType": "QNA",
"title": "string",
"content": "string",
"createdDate": "2025-11-29T16:43:58.335Z",
"lastModifiedDate": "2025-11-29T16:43:58.335Z"
}
}
No links
유저 API

POST
/api/v1/users
사용자 생성

이름, 이메일, 비밀번호를 입력받아 새로운 사용자를 생성합니다.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"name": "string",
"email": "string",
"password": "stringst"
}
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": 0
}
No links
대여소 API

GET
/api/v1/stations
대여소 목록 조회하기

Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
 'http://ec2-43-201-119-165.ap-northeast-2.compute.amazonaws.com:8080/api/v1/stations' \
 -H 'accept: _/_'
Request URL
http://ec2-43-201-119-165.ap-northeast-2.compute.amazonaws.com:8080/api/v1/stations
Server response
Code Details
200
Response body
Download
{
"status": "success",
"statusCode": 200,
"message": "성공",
"data": {
"stationList": []
}
}
Response headers
cache-control: no-cache,no-store,max-age=0,must-revalidate
connection: keep-alive
content-type: application/json
date: Sat,29 Nov 2025 16:42:26 GMT
expires: 0
keep-alive: timeout=60
pragma: no-cache
transfer-encoding: chunked
vary: Origin,Access-Control-Request-Method,Access-Control-Request-Headers
x-content-type-options: nosniff
x-xss-protection: 0
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"stationList": [
{
"stationId": 0,
"stationName": "string",
"latitude": 0,
"longitude": 0,
"address": "string",
"capacity": 0,
"installationDate": "2025-11-29",
"closedDate": {
"hour": 0,
"minute": 0,
"second": 0,
"nano": 0
}
}
]
}
}
No links

POST
/api/v1/stations
대여소 등록하기

새로운 대여소를 등록합니다.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"stationName": "string",
"latitude": 0,
"longitude": 0,
"address": "string",
"capacity": 0,
"installationDate": "2025-11-29",
"closedDate": {
"hour": 0,
"minute": 0,
"second": 0,
"nano": 0
}
}
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": 0
}
No links

GET
/api/v1/stations/{stationId}
대여소 상세 조회하기

Parameters
Try it out
Name Description
stationId \*
integer($int64)
(path)
stationId
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"responseStation": {
"stationId": 0,
"stationName": "string",
"latitude": 0,
"longitude": 0,
"address": "string",
"capacity": 0,
"installationDate": "2025-11-29",
"closedDate": {
"hour": 0,
"minute": 0,
"second": 0,
"nano": 0
}
}
}
}
No links

DELETE
/api/v1/stations/{stationId}
대여소 삭제하기

대여소를 삭제합니다.

Parameters
Try it out
Name Description
stationId \*
integer($int64)
(path)
대여소 ID

stationId
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {}
}
No links

PATCH
/api/v1/stations/{stationId}
대여소 정보 수정하기

대여소 정보를 수정합니다.

Parameters
Try it out
Name Description
stationId \*
integer($int64)
(path)
대여소 ID

stationId
Request body

application/json
Example Value
Schema
{
"stationName": "string",
"latitude": 0,
"longitude": 0,
"address": "string",
"capacity": 0,
"installationDate": "2025-11-29",
"closedDate": {
"hour": 0,
"minute": 0,
"second": 0,
"nano": 0
}
}
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {}
}
No links
[유저 페이지]대여 API

POST
/api/v1/rentals/stations/{stationId}
대여하기

Parameters
Try it out
Name Description
stationId \*
integer($int64)
(path)
stationId
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": 0
}
No links

PATCH
/api/v1/rentals/{rentalId}
반납하기

Parameters
Try it out
Name Description
rentalId \*
integer($int64)
(path)
rentalId
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": 0
}
No links

GET
/api/v1/rentals
대여현황 목록 조회하기

Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
 'http://ec2-43-201-119-165.ap-northeast-2.compute.amazonaws.com:8080/api/v1/rentals' \
 -H 'accept: _/_'
Request URL
http://ec2-43-201-119-165.ap-northeast-2.compute.amazonaws.com:8080/api/v1/rentals
Server response
Code Details
400
Undocumented
Error: response status is 400

Response body
Download
{
"status": "error",
"statusCode": 4356,
"message": "인증이 필요한 URI입니다.",
"data": "Full authentication is required to access this resource"
}
Response headers
cache-control: no-cache,no-store,max-age=0,must-revalidate
connection: close
content-length: 147
content-type: application/json;charset=UTF-8
date: Sat,29 Nov 2025 16:42:17 GMT
expires: 0
pragma: no-cache
vary: Origin,Access-Control-Request-Method,Access-Control-Request-Headers
x-content-type-options: nosniff
x-xss-protection: 0
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"rentals": [
{
"rentalId": 0,
"bikeNumber": "string",
"startStationName": "string",
"endStationName": "string",
"startTime": "2025-11-29T16:43:58.359Z",
"endTime": "2025-11-29T16:43:58.359Z",
"status": "string"
}
]
}
}
No links

GET
/api/v1/rentals/users/{userId}
유저 자전거 대여 내역 조회

특정 유저의 자전거 대여 내역을 조회합니다.

Parameters
Try it out
Name Description
userId \*
integer($int64)
(path)
유저 ID

userId
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": [
{
"rentalId": 0,
"startStationId": 0,
"startStationName": "string",
"endStationId": 0,
"endStationName": "string",
"bikeNum": "string",
"startTime": "2025-11-29T16:43:58.361Z",
"endTime": "2025-11-29T16:43:58.361Z",
"createdDate": "2025-11-29T16:43:58.361Z"
}
]
}
No links
이용권 API

POST
/api/v1/passes/{passId}
이용권 구매하기

Parameters
Try it out
Name Description
passId \*
integer($int64)
(path)
passId
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": 0
}
No links

GET
/api/v1/passes
이용권 조회

Parameters
Try it out
No parameters

Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"passes": [
{
"passId": 0,
"passType": "ONE_DAY",
"price": 0
}
]
}
}
No links

GET
/api/v1/passes/users
내가 구매한 이용권 조회

Parameters
Try it out
No parameters

Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"userPasses": [
{
"userPassId": 0,
"passId": 0,
"passType": "ONE_DAY",
"price": 0,
"status": "ACTIVATE",
"activatedDate": "2025-11-29",
"expiredDate": "2025-11-29"
}
]
}
}
No links
댓글 API

GET
/api/v1/comments/boards/{boardId}
댓글 목록 조회

Parameters
Try it out
Name Description
boardId \*
integer($int64)
(path)
boardId
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"commentList": [
{
"commentId": 0,
"writerName": "string",
"content": "string"
}
]
}
}
No links

POST
/api/v1/comments/boards/{boardId}
댓글 작성

Parameters
Try it out
Name Description
boardId \*
integer($int64)
(path)
boardId
Request body

application/json
Example Value
Schema
{
"content": "string"
}
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": 0
}
No links
관리자 API

POST
/api/v1/admins
관리자 계정 생성

새로운 관리자 계정을 생성합니다.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"name": "string",
"email": "string",
"password": "stringst"
}
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": 0
}
No links

PATCH
/api/v1/admins/{adminId}
관리자 정보 변경

관리자 정보를 변경합니다.

Parameters
Try it out
Name Description
adminId \*
integer($int64)
(path)
관리자 ID

adminId
Request body

application/json
Example Value
Schema
{
"name": "string",
"email": "string",
"password": "stringst"
}
Responses
Code Description Links
200
OK

Media type

_/_
Controls Accept header.
Example Value
Schema
{
"status": "string",
"statusCode": 0,
"message": "string",
"count": 0,
"data": {
"userId": 0,
"name": "string",
"email": "string",
"role": "USER",
"createdDate": "2025-11-29T16:43:58.376Z",
"lastModifiedDate": "2025-11-29T16:43:58.376Z"
}
}
No links

Schemas
CreateUser{
name* [...]
email* [...]
password\* [...]
}
ApiResponseDtoLong
ApiResponseDtoJwtToken
JwtToken
UserLoginRequestDto
LocalTime
RequestRegisterStation
RequestComment
CreateBoard
ApiResponseDtoBoardInfo
BoardInfo
AdminRequestDto
ApiResponseDtoVoid
UpdateBoard
AdminResponseDto
ApiResponseDtoAdminResponseDto
ApiResponseDtoResponseStationList
ResponseStation
ResponseStationList
ApiResponseDtoResponseStationSpecific
ResponseStationSpecific
ApiResponseDtoResponseRentalList
RentalInfo
ResponseRentalList
ApiResponseDtoListRentalResponseDto
RentalResponseDto
ApiResponseDtoResponsePassList
ResponsePass
ResponsePassList
ApiResponseDtoResponseUserPassList
ResponseUserPass
ResponseUserPassList
ApiResponseDtoResponseCommentList
ResponseComment
ResponseCommentList
Pageable
ApiResponseDtoPageBoardListInfo
BoardListInfo
PageBoardListInfo
PageableObject
SortObject
