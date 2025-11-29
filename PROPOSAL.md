웹 애플리케이션 소개
프로젝트명: 서울시 따릉이 통합 관리 및 데이터 시각화 웹 애플리케이션
프로젝트 개요: 본 웹 애플리케이션은 서울시 공공자전거 ‘따릉이’ 플랫폼을 모사하여, 이용자와 관리자가 동시에 사용할 수 있는 통합 웹 시스템을 구현하는 것을 목표로 한다. 사용자는 회원가입 후 자전거 대여소 위치 및 이용 현황을 조회할 수 있으며, 고장 신고 및 게시판 기능을 통해 사용자 간 소통이 가능하다. 관리자는 대여소 개설/폐쇄, 회원 관리, 게시글 관리 등 운영 관리 기능을 수행할 수 있다.
또한, 데이터베이스에 저장된 이용 내역 데이터를 기반으로 데이터 시각화 기능을 제공하여, 대여소별 이용량, 시간대별 랭킹, 고장 신고 빈도 등을 차트 및 그래프 형태로 시각화한다.
핵심 목표:
따릉이 플랫폼의 CRUD 및 관리 시스템 구현
회원, 자전거, 대여소, 게시판 등 주요 엔티티에 대한 CRUD 기능을 제공한다.
DB연동 기반 실시간 데이터 시각화
이용 내역, 고장 신고 등의 데이터를 시각화하여 직관적인 인사이트를 제공한다.
사용자/관리자 권한 분리 및 인증 처리
역할(Role) 기반 접근 제어를 통해 보안성과 운영 효율성을 강화한다.
웹 기반 인터랙티브 UI/UX 제공
반응형 디자인과 동적 데이터 렌더링을 통해 사용자의 접근성과 편의성을 높인다.
또한, 직관적인 인터페이스를 통해 관리자의 운영 효율을 극대화한다.

구현 환경 기술
클라이언트: Next.js (React 기반 프레임워크)
서버: Next.js 내장 서버, Spring Boot
데이터베이스: MySQL
개발 언어: TypeScript, Java
API 통신 방식: RESTful API (JSON 기반)
디자인 라이브러리: Tailwind CSS, Chart.js
개발 도구: Visual Studio Code, IntelliJ IDEA
버전 관리: GitHub
배포 환경: AWS

모든 기능 기술

1. 계정관리(User)
   모든 이용자 계정을 통합하여 관리합니다. 일반 사용자와 관리자는 같은 계정 체계 안에서 구분되며, 계정마다 부여된 권한 값에 따라 사용 가능한 기능 범위가 달라집니다. 이 권한 값은 role 컬럼(ENUM 'USER', 'ADMIN')으로 관리됩니다. 예를 들어 운영 관리 기능은 role이 'ADMIN'인 계정에서만 수행 가능합니다.
   이메일을 기준으로 중복 가입을 제한합니다. email 컬럼에 UNIQUE 제약조건을 두어 동일 이메일로 여러 계정을 만들지 못하도록 합니다. 이를 통해 사용자 식별을 명확히 유지할 수 있습니다.
   사용자는 자신의 정보를 조회할 수 있습니다. 정보 수정의 경우 전체 레코드를 덮어쓰는 방식이 아니라, 변경 대상 필드만 선택적으로 갱신하는 방식으로 처리합니다. UPDATE 구문에서 COALESCE 함수를 사용하여 NULL이 전달된 컬럼은 기존 값을 유지하고, 실제로 변경하려는 값만 업데이트되도록 합니다. 이 방식을 통해 의도하지 않은 초기화나 불필요한 값 변경을 줄일 수 있습니다.

2. 게시판과 댓글(Board /Comment)
   게시글과 댓글을 통해 사용자 의견을 수집하고 공유할 수 있습니다. 게시글은 하나의 사용자에 연결되며, 댓글은 특정 게시글에 연결되는 구조입니다. 즉 한 사용자는 여러 개의 게시글을 작성할 수 있고, 하나의 게시글에는 여러 개의 댓글이 달립니다. 이 관계는 Board, Comment, User 간의 외래 키로 표현됩니다.
   게시글과 댓글은 작성자 본인만 수정하거나 삭제할 수 있습니다. 이 검증은 애플리케이션 단계에서만 처리하지 않고, 실제 쿼리 단계에서 강제합니다. UPDATE나 DELETE를 수행할 때 단순히 게시글 ID나 댓글 ID만 조건으로 사용하지 않고, 해당 레코드의 작성자 ID와 현재 요청 주체의 ID가 일치하는지 WHERE 절에서 함께 확인합니다.
   이 방식은 작성자 본인의 게시물과 댓글만 수정·삭제할 수 있게 합니다. 결과적으로 사용자가 다른 사용자의 게시글이나 댓글을 임의로 변경하는 상황을 차단합니다.

3. 이용권과 대여/반납(Pass / User_Pass / Rental)
   이용권 판매, 이용권 보유 상태 관리, 실제 대여/반납 이력 관리를 분리하여 다룹니다. 이용권 종류와 요금 정보는 이용권 정의 영역에서 관리합니다.
   이용자가 어떤 이용권을 가지고 있는지는 사용자-이용권 매핑 영역에서 관리합니다. 이 매핑 정보에는 status와 expired_at이 포함됩니다. status는 이용권의 현재 상태(ACTIVE, EXPIRED 등)를 나타내며, expired_at은 만료 시점을 나타냅니다. 만료된 이용권은 스케줄러에 의해 status가 EXPIRED로 갱신됩니다. 이 처리는 다음과 같은 형태로 수행합니다.
   UPDATE User_Pass
   SET status = 'EXPIRED'
   WHERE status = 'ACTIVE'
   AND expired_at < NOW();
   이 흐름을 통해 현재 사용 가능한 이용권인지 아닌지를 실시간으로 계산하는 대신 status 값만으로 바로 판단할 수 있게 합니다.
   대여/반납 이력은 Rental에 기록합니다. 한 건의 대여는 어떤 사용자가 어느 대여소에서 언제 빌렸는지, 반납 시점에 어느 대여소에 언제 반납했는지와 같은 정보를 포함합니다. 이 값들은 모두 외래 키로 연결되며, 이를 통해 누가 언제 어디서 빌리고 어디에 반납했는가를 시간순으로 추적할 수 있습니다.
   즉 이용권 정의 영역은 판매 가능한 상품 정보를 관리합니다. 사용자-이용권 매핑 영역은 누가 어떤 이용권을 보유 중인지와 그 이용권의 현재 상태를 관리합니다. Rental은 실제로 발생한 대여/반납 행위를 시간 순서대로 기록합니다.

4. 신고 관리 (Report)
   사용자 신고는 객체 단위로 관리됩니다. 신고 내역에는 신고한 사용자 정보와 신고 대상 대여소 정보가 함께 포함됩니다. 이를 통해 특정 대여소에서 발생한 문제 상황을 사용자 단위로 수집할 수 있습니다.
   신고에는 처리 단계를 나타내는 status 값이 포함됩니다. status는 PENDING, IN_PROGRESS, RESOLVED로 구분하여, 신고가 현재 어떤 처리 상태에 있는지를 표현합니다. 관리자는 이 값을 UPDATE하여 처리 흐름을 갱신할 수 있습니다. 예를 들어 접수 직후에는 PENDING으로 시작하고, 실제 조치가 진행 중이면 IN_PROGRESS로 바꾸며, 처리가 완료되면 RESOLVED로 전환합니다.
   사용자는 본인이 제출한 신고를 조회할 수 있습니다. 이때 status나 station_id를 조건으로 조회할 수 있도록 하여, 현재 대기 중인 신고가 무엇인지, 처리 중인 신고가 무엇인지, 이미 처리 완료된 신고가 무엇인지 확인할 수 있습니다. 신고 정보는 단순 텍스트 제보가 아니라, 생성 → 처리 중 → 처리 완료 단계까지 상태 변화를 추적 가능한 단위로 관리됩니다.

5. 대여소 정보 조회 (Station)
   대여소의 위치, 주소, 보관 가능 대수 등 운영에 필요한 정보를 제공합니다. 이 정보는 사용자 화면(대여소 목록, 지점 상세 보기)과 운영 화면(대여소 관리)에서 공통으로 사용됩니다.
   대여소 목록은 서버 사이드 페이징으로 제공합니다. SELECT 시 LIMIT와 OFFSET을 함께 사용하여 요청 구간만 잘라서 반환합니다. 이를 통해 응답량을 제어하고 조회 성능을 안정적으로 유지할 수 있습니다.
   특정 대여소에 대한 상세 정보는 station_id를 기준으로 조회합니다. station_id는 해당 대여소를 식별하는 기본키 역할을 하며, 이를 이용해 한 지점을 정확하게 지정하고 해당 지점의 상세 데이터를 전달합니다.

6. 운영 관리 기능
   관리자 권한이 있는 계정을 통해 운영 작업을 수행할 수 있습니다. 관리자는 대여소 정보를 새로 등록하고(INSERT), 기존 대여소 정보를 수정하며(UPDATE), 더 이상 운영하지 않는 대여소 정보를 삭제(DELETE)합니다.
   대여소 데이터에는 created_by와 updated_by 값이 함께 기록됩니다. created_by는 최초 등록 작업을 수행한 관리자 계정을 나타내고, updated_by는 수정 작업을 수행한 관리자 계정을 나타냅니다. 이 값들을 통해 어떤 관리자가 어떤 시점에 어떤 대여소 정보를 생성하거나 변경했는지 추적할 수 있습니다. 운영 변경 이력을 데이터에 남기는 방식으로 관리 책임을 명확하게 유지할 수 있습니다.
   관리 권한은 User.role이 'ADMIN'인 계정에만 부여됩니다. 즉, role 값이 운영 기능의 사용 범위를 직접적으로 결정합니다.

7. 통계 데이터 제공
   시스템은 대여/반납 현황을 일 단위, 대여소 단위로 집계하여 제공합니다. 이 정보는 UsageStats에서 관리됩니다. UsageStats에는 rentals(대여 횟수)와 returns(반납 횟수)가 저장되며, 기준 키는 “대여소 + 날짜”입니다. 이를 통해 “어느 대여소에서 어느 날 얼마나 사용되었는가”를 바로 조회할 수 있습니다.
   이 집계 데이터는 GROUP BY, SUM(), ORDER BY ... DESC, LIMIT :n 형태의 조회에 활용됩니다. 예를 들어 rentals 기준으로 내림차순 정렬 후 LIMIT을 적용하여 사용량 상위 N개 대여소를 추출합니다. 이 결과는 관리자 화면에서 막대 차트 등으로 시각화되어 혼잡한 지점이나 사용량이 집중되는 지점을 식별하는 데 사용됩니다.
   UsageStats는 이미 누적된 형태로 데이터를 보관하므로, 매번 Rental 전체 이력을 모두 스캔하지 않고도 통계 결과를 빠르게 확인할 수 있습니다.

8. 특별 기능
   8.1. 대여/반납 처리와 통계 집계의 일관성
   대여 또는 반납이 발생하면 두 가지 변화가 동시에 일어납니다. 첫째, Rental에 이력이 기록됩니다. 둘째, 해당 대여소의 일별 통계(UsageStats)가 갱신됩니다. 이 두 동작은 데이터베이스 트랜잭션으로 함께 처리합니다.
   처리는 다음 순서로 진행합니다.
   (1) 트랜잭션을 시작합니다.
   (2) Rental에 대해 INSERT를 수행하여 대여 정보를 기록하거나, 기존 대여 건의 반납 정보를 UPDATE합니다. 여기에는 사용자, 출발 대여소, 반납 대여소, 시간 정보가 포함됩니다.
   (3) UsageStats에 대해 INSERT … ON DUPLICATE KEY UPDATE 구문을 실행합니다. 대여가 발생한 경우 rentals 값을 1 증가시키고, 반납이 발생한 경우 returns 값을 1 증가시킵니다. 기준 날짜는 CURDATE()입니다.
   (4) 두 단계가 모두 정상적으로 처리된 경우에만 COMMIT합니다. 어느 한 단계라도 실패하면 ROLLBACK합니다.
   이 방식은 “Rental에는 기록되었지만 UsageStats에는 반영되지 않았다” 또는 그 반대의 상태가 남지 않도록 합니다. 즉, 이력 데이터와 집계 데이터가 항상 동일한 타이밍에 갱신되도록 보장합니다.

8.2. 권한 및 소유권 강제
시스템은 User.role 값을 통해 권한을 강제합니다. 운영 관리 기능(/admin/\* 등)은 role이 'ADMIN'으로 지정된 계정만 접근합니다. 일반 사용자는 이 기능에 접근하지 못합니다. 이를 통해 운영 관련 작업(대여소 등록, 대여소 정보 수정, 대여소 삭제 등)은 명확하게 제한됩니다.
또한 작성자 소유권을 강제합니다. 게시글과 댓글을 수정하거나 삭제할 때는 단순히 리소스 ID만 확인하지 않고, 해당 레코드의 작성자 식별자와 현재 요청 주체의 식별자가 동일한지 WHERE 절에서 함께 확인합니다. 예를 들어 UPDATE 시에는 AND user_id = :userId 조건을 사용합니다. 조건이 일치하지 않으면 해당 쿼리는 영향을 주지 않습니다.
이 방식은 “작성자 본인만 자신의 게시글과 댓글을 수정·삭제합니다”라는 정책을 SQL 수준에서 그대로 보장합니다.

8.3. 이용권 상태의 자동 전환
시스템은 이용권의 상태를 status와 expired_at으로 관리합니다. 이용권이 활성화되면 status는 'ACTIVE'로 설정됩니다. expired_at 시각이 지난 이용권은 더 이상 유효하지 않으므로, 스케줄러가 주기적으로 만료 조건을 만족하는 레코드를 찾아 status를 'EXPIRED'로 변경합니다. 이 처리는 다음과 같은 형태로 수행합니다.
UPDATE User_Pass
SET status = 'EXPIRED'
WHERE status = 'ACTIVE'
AND expired_at < NOW();
이 방식은 만료 여부를 호출 시점마다 계산하는 대신, 만료된 이용권을 명확하게 'EXPIRED' 상태로 유지합니다. 이후 로직은 status만 확인하여 현재 사용 가능한 이용권인지 즉시 판별합니다.

8.4. 운영 변경 이력 기록
운영자가 대여소 정보를 생성, 수정, 삭제하는 행위를 추적합니다. 대여소 정보에는 created_by와 updated_by 값이 포함되며, 해당 변경을 수행한 관리자 계정의 식별자를 기록합니다.
이 기록 방식은 “어떤 관리자가 어떤 대여소 정보를 언제 등록했는가”, “누가 이후 내용을 수정했는가”를 확인할 수 있게 합니다. 운영 변경 내역이 데이터에 직접 남기 때문에, 변경 책임 주체를 명확하게 구분할 수 있습니다.

8.5. 집계 데이터 기반 조회
UsageStats에 저장된 rentals와 returns 값을 기준으로 사용량이 많은 대여소를 빠르게 식별합니다. 관리자는 ORDER BY ... DESC와 LIMIT :n 형태의 조회를 통해 상위 N개 지점을 추출합니다. 이 결과는 관리자 대시보드에서 시각화하여 노출합니다.
이 구조는 Rental의 모든 원시 이력을 매번 합산하지 않고도 집계 결과를 바로 조회 가능하게 유지합니다. 조회 성능을 일정하게 유지하고, 운영 화면에서 혼잡 지점을 즉시 파악할 수 있도록 합니다.

9. 웹페이지 화면 디자인(와이어프레임)

ER diagram

모든 테이블 설명

1. User 테이블
   역할: 시스템 내 모든 사용자(관리자, 일반 사용자)를 관리합니다.
   주요 속성
   user_id: 고유 식별자 (PK)
   name, email, password
   role: USER 또는 ADMIN
   관계
   Station의 created_by, updated_by와 연결
   Rental, Report, Board, Comment, User_Pass 모두와 연결됨

2. Station 테이블
   역할: 공공자전거 대여소 위치 및 상태 관리
   주요 속성
   station_id: PK
   station_name, latitude, longitude, address, capacity
   created_by, updated_by: User의 FK
   installed_date, closed_date
   관계
   Rental, Report, UsageStats와 연결

3. Rental 테이블
   역할: 사용자별 대여 이력 저장
   주요 속성
   rental_id: PK
   user_id: User FK
   start_station_id, end_station_id: Station FK
   bike_num, start_time, end_time
   관계
   UsageStats와 연결됨

4. Report 테이블
   역할: 고장 및 문제 신고 관리
   주요 속성
   report_id: PK
   user_id, station_id: FK
   bike_num, description
   status: PENDING, IN_PROGRESS, RESOLVED
   created_at
   관계
   User, Station과 연결됨

5. Board 테이블
   역할: 공지사항, Q&A, 신고 게시판 등 커뮤니티 기능
   주요 속성
   board_id: PK
   user_id: 작성자 (User FK)
   board_type: QNA, NOTICE, REPORT
   title, content, created_at, modified_at
   관계
   Comment와 연결

6. Comment 테이블
   역할: 게시글에 대한 댓글 관리
   주요 속성
   comment_id: PK
   board_id: Board FK
   user_id: User FK
   content, created_at

7. UsageStats 테이블
   역할: 대여소별 통계 (대여/반납 횟수)
   주요 속성
   stat_id: PK
   station_id, rental_id: FK
   date, rentals, returns

8. Pass 테이블
   역할: 이용권 종류 및 가격 관리
   주요 속성
   pass_id: PK
   type: 1DAY, 7DAY, 30DAY, ANNUAL
   start_date, end_date, price

9. User_Pass 테이블
   역할: 사용자의 이용권 구매 및 상태 관리
   주요 속성
   user_pass_id: PK
   user_id: User FK
   pass_id: Pass FK
   activated_at, expired_at
   status: ACTIVE, EXPIRED, CANCELED

SQL CREATE TABLE문

1. USER
   CREATE TABLE User ( user_id BIGINT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER' );

2. STATION
   CREATE TABLE Station ( station_id BIGINT AUTO_INCREMENT PRIMARY KEY, created_by BIGINT, updated_by BIGINT, station_name VARCHAR(100) NOT NULL, latitude DECIMAL(10,7) NOT NULL, longitude DECIMAL(10,7) NOT NULL, address VARCHAR(255), capacity INT, installed_date DATE, closed_date DATE, FOREIGN KEY (created_by) REFERENCES User(user_id), FOREIGN KEY (updated_by) REFERENCES User(user_id) );

3. RENTAL
   CREATE TABLE Rental ( rental_id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT NOT NULL, start_station_id BIGINT NOT NULL, end_station_id BIGINT, bike_num VARCHAR(50) NOT NULL, start_time DATETIME NOT NULL, end_time DATETIME, FOREIGN KEY (user_id) REFERENCES User(user_id), FOREIGN KEY (start_station_id) REFERENCES Station(station_id), FOREIGN KEY (end_station_id) REFERENCES Station(station_id) );

4. REPORT
   CREATE TABLE Report ( report_id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT NOT NULL, station_id BIGINT NOT NULL, bike_num VARCHAR(50), description TEXT, status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED') DEFAULT 'PENDING', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES User(user_id), FOREIGN KEY (station_id) REFERENCES Station(station_id) );

5. BOARD
   CREATE TABLE Board ( board_id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT NOT NULL, board_type ENUM('QNA', 'NOTICE', 'REPORT') NOT NULL, title VARCHAR(200) NOT NULL, content TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES User(user_id) );

6. COMMENT
   CREATE TABLE Comment ( comment_id BIGINT AUTO_INCREMENT PRIMARY KEY, board_id BIGINT NOT NULL, user_id BIGINT NOT NULL, content TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (board_id) REFERENCES Board(board_id), FOREIGN KEY (user_id) REFERENCES User(user_id) );

7. USAGE STATS
   CREATE TABLE UsageStats ( stat_id BIGINT AUTO_INCREMENT PRIMARY KEY, station_id BIGINT NOT NULL, rental_id BIGINT NOT NULL, date DATE NOT NULL, rentals INT DEFAULT 0, returns INT DEFAULT 0, FOREIGN KEY (station_id) REFERENCES Station(station_id), FOREIGN KEY (rental_id) REFERENCES Rental(rental_id) );

8. PASS
   CREATE TABLE Pass ( pass_id BIGINT AUTO_INCREMENT PRIMARY KEY, type ENUM('1DAY', '7DAY', '30DAY', 'ANNUAL') NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, price DECIMAL(10,2) NOT NULL );

9. USER_PASS
   CREATE TABLE User_Pass ( user_pass_id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT NOT NULL, pass_id BIGINT NOT NULL, activated_at DATETIME, expired_at DATETIME, status ENUM('ACTIVE', 'EXPIRED', 'CANCELED') DEFAULT 'ACTIVE', FOREIGN KEY (user_id) REFERENCES User(user_id), FOREIGN KEY (pass_id) REFERENCES Pass(pass_id) );

사용되는 SQL문 설명
구분
SQL 문 종류
Modification
INSERT, UPDATE, DELETE (예: 사용자 생성, 정보 수정, 대여소 등록/수정/삭제 등)
Join
INNER JOIN, LEFT JOIN, RIGHT JOIN (예: 사용자–게시글, 대여–대여소, 신고–이용자 등)
Set
UNION, INTERSECT, EXCEPT (필터링된 목록 병합 시 사용 가능)
Aggregation
COUNT, SUM, GROUP BY, HAVING (예: 일별 대여/반납 집계, TOP-N 대여소 등)
Subqueries
IN, EXISTS, WITH, SCALAR SUBQUERY (예: 상태 필터, 조건부 조회 등)
View
VIEW 생성 및 조회 (예: 통계 대시보드용 가상 테이블 구성)
etc
DISTINCT, ORDER BY, NULL 처리, TRIGGER, STRING 함수 등 (예: 정렬, 중복 제거, 자동 집계 등)

본 프로젝트에서는 사용자 관리, 대여소 관리, 이용권, 대여, 신고, 게시판, 통계 기능 구현을 위해 총 45개의 SQL 문을 사용하였으며, INSERT, SELECT, UPDATE, DELETE, JOIN, GROUP BY 등 20종 이상의 SQL 문 유형을 활용하였습니다.

각 SQL문 실행 화면 캡쳐

CREATE TABLE 쿼리를 사용해 프로젝트에 필요한 여러 개의 테이블을 생성한 예제입니다. 데이터베이스(daerungi_demo)에 처음에는 테이블이 존재하지 않았으나, 해당 쿼리를 통해 User, Station, Pass, User_Pass, Board, Comment, Rental, Report, UsageStats 총 9개의 테이블이 생성되었습니다.
각 테이블은 AUTO_INCREMENT를 사용하여 기본 키(primary key)가 자동 증가되며, FOREIGN KEY 제약조건을 통해 테이블 간 관계를 설정했습니다. 예를 들어 Station 테이블은 User 테이블의 user_id를 참조하며, User_Pass 테이블은 User와 Pass를 연결하여 사용자의 이용권 정보를 관리합니다.
마지막으로 CREATE INDEX 명령을 통해 조회 성능 향상을 위한 인덱스(idx_user_pass_status, idx_report_status_created 등)를 추가하였습니다.
전체적으로 이 SQL 구문은 시스템의 기초 데이터 구조(스키마)를 설계하고 구축하기 위한 명령이며, 이후 INSERT, SELECT, UPDATE, DELETE 쿼리의 기반이 되는 테이블을 생성한 결과입니다.

INSERT, SELECT, SET 쿼리를 사용하여 사용자(User) 와 대여소(Station) 데이터를 추가하고 조회하는 예제입니다.
먼저 INSERT INTO User 문을 통해 3명의 사용자가 등록되었으며, 그중 '관리자' 계정의 role은 'ADMIN'으로 설정되었습니다. 이후 SELECT \* FROM User 명령을 통해 정상적으로 회원 정보가 추가된 것을 확인할 수 있습니다.
다음으로 SET @adminId = (SELECT user_id FROM User WHERE role='ADMIN' LIMIT 1); 구문을 사용하여 관리자 계정의 user_id를 변수 @adminId에 저장한 뒤, INSERT INTO Station 문을 통해 3개의 대여소(시청역 1번 출구, 강남역 10번 출구, 숭실대 정문)를 등록했습니다. Station 테이블의 각 행에는 대여소명, 위도(latitude), 경도(longitude), 주소, 수용 대수(capacity), 설치일(installed_date) 및 생성자(created_by) 정보가 함께 기록되었습니다.
마지막으로 SELECT station_id, station_name, capacity FROM Station 명령을 통해 정상적으로 3개의 대여소 데이터가 저장되었음을 확인할 수 있습니다.
이 예제는 데이터 삽입(INSERT) 과 조회(SELECT), 그리고 변수 설정(SET) 기능을
함께 활용하여 테이블 간 참조를 관리하는 대표적인 기본 CRUD 동작을 보여줍니다.

INSERT 쿼리를 사용해 Pass 테이블에 다양한 이용권 정보를 추가한 예제입니다.
INSERT INTO Pass(type, start_date, end_date, price) 구문을 통해 1일권(1DAY), 7일권(7DAY), 30일권(30DAY), 연간권(ANNUAL) 총 4가지 종류의 이용권 데이터를 삽입하였습니다. 각 이용권은 시작일(2025-01-01)과 종료일(2025-12-31), 그리고 가격 정보(2.00, 9.00, 25.00, 100.00)를 함께 등록하였습니다.
이후 SELECT \* FROM Pass; 문을 실행하여 삽입된 데이터를 조회한 결과, 각 이용권의 pass_id가 자동으로 증가(AUTO_INCREMENT)되어 1~4까지 부여된 것을 확인할 수 있습니다.
이 예제는 데이터베이스에 이용권 기본 데이터(기초 요금제 정보) 를 미리 세팅하기 위한 것으로, 향후 사용자 이용권 구매 기능(User_Pass 테이블)과 연계되어 활용됩니다.
즉, 이 구문은 정적 데이터 초기화(Initialization) 및 조회 검증(SELECT 확인) 목적의 SQL 예제입니다.

INSERT 쿼리를 사용해 User 테이블에 새로운 관리자(ADMIN) 계정을 추가한 예제입니다.
INSERT INTO User(name, email, password, role) 구문을 통해 이름이 '서브관리자', 이메일이 'subadmin@example.com'인 계정을 등록하였으며, role 컬럼 값은 'ADMIN'으로 설정되어 관리자 권한을 갖습니다.
AUTO_INCREMENT 속성에 따라 user_id가 자동으로 증가되어 새롭게 6번으로 부여된 것을 확인할 수 있습니다.
이후 SELECT user_id, name, email, role FROM User WHERE email='subadmin@example.com';
쿼리를 실행하여 방금 추가된 계정 정보를 조회한 결과, 이메일과 권한 정보가 올바르게 저장된 것을 확인할 수 있습니다.
이 예제는 관리자가 직접 관리자 권한을 가진 새로운 계정을 생성하고, 데이터가 정상적으로 삽입되었는지를 SELECT 문으로 검증하는 절차를 보여줍니다.

UPDATE 쿼리를 사용해 Station 테이블의 특정 대여소 정보를 수정한 예제입니다.
UPDATE Station SET capacity = 30, updated_by = @adminId WHERE TRIM(station_name) = '시청역 1번 출구';
구문을 통해 station_name이 ‘시청역 1번 출구’인 행의 대여소 수용 대수(capacity)를 25 → 30으로 변경하였으며, 수정 작업을 수행한 사용자의 식별자(updated_by)는 @adminId 변수로 설정했습니다.
실행 결과, Query OK, 1 row affected 메시지를 통해 한 행이 정상적으로 갱신된 것을 확인할 수 있습니다.
이후 SELECT \* FROM Station WHERE station_name='시청역 1번 출구';
문을 실행하여 수정된 데이터를 조회한 결과, capacity 값이 30으로 변경되었고, updated_by 컬럼이 관리자의 ID로 갱신된 것을 확인할 수 있습니다.
이 예제는 UPDATE 문을 사용하여 데이터 일부를 수정하고, SELECT 문을 이용해 변경 사항을 검증하는 전형적인 SQL 데이터 수정 절차를 보여줍니다.

SELECT 쿼리를 사용해 Station 테이블에서 대여소 목록을 조회한 예제입니다.
SELECT station_id, station_name, capacity FROM Station ORDER BY station_id DESC LIMIT 2 OFFSET 0;
구문을 통해 station_id 기준으로 내림차순(최신순) 정렬하여 상위 2개의 데이터(LIMIT 2 OFFSET 0)만 선택적으로 조회하였습니다.
실행 결과, station_id가 큰 순서대로 ‘숭실대 정문(20대)’과 ‘강남역 10번 출구(40대)’ 대여소 정보가 출력되었습니다.
ORDER BY는 결과 정렬을, LIMIT과 OFFSET은 페이지 단위로 결과를 나누는 데 사용됩니다. 이 구문은 실제 서비스에서 대여소 목록 페이지네이션 기능을 구현할 때 활용되며, 사용자에게 최신 등록순 혹은 특정 정렬 기준에 맞춘 결과를 표시하기 위한 핵심 SQL 문입니다.
즉, 본 예제는 정렬(ORDER BY) 과 페이징(LIMIT, OFFSET) 기능의 기본적인 활용 사례를 보여줍니다.

INSERT, SELECT, JOIN 쿼리를 사용해 사용자 이용권(User_Pass) 데이터를 추가하고 조회한 예제입니다.
먼저, SET @pass30 = (SELECT pass_id FROM Pass WHERE type='30DAY' LIMIT 1);
구문을 통해 30일권(30DAY)의 pass_id 값을 변수에 저장한 뒤,
INSERT INTO User_Pass(user_id, pass_id, activated_at, expired_at, status) 문을 실행하여 사용자(@user1)에게 30일권을 부여했습니다.
이어서 동일한 방식으로, @user2에게 7일권(7DAY) 이용권을 추가하였으며, 각 이용권의 활성화일(activated_at)과 만료일(expired_at)을 함께 지정했습니다.
이후 SELECT up.user_pass_id, p.type, up.activated_at, up.expired_at, up.status FROM User_Pass up JOIN Pass p ON p.pass_id = up.pass_id WHERE up.user_id = @user1 ORDER BY up.activated_at DESC;
쿼리를 통해, 사용자의 이용권 정보를 Pass 테이블과 조인(JOIN) 하여 조회했습니다.
결과적으로 사용자 1은 30일권, 사용자 2는 7일권을 보유하고 있으며 두 이용권 모두 상태(status)가 'ACTIVE'로 표시됩니다.
이 예제는 다중 테이블 조인(JOIN) 과 변수(SET), 삽입(INSERT), 조회(SELECT) 의 복합 활용을 통해 실제 서비스에서 사용자가 구매한 이용권 정보를 조회하는 핵심 로직을 보여줍니다.

INSERT, SELECT, JOIN 쿼리를 사용해 자전거 대여(Rental) 기록을 추가하고, 동시에 UsageStats(이용 통계) 테이블에 대여 현황을 집계한 예제입니다.
먼저 INSERT INTO Rental(user_id, start_station_id, bike_num, start_time)
구문을 실행하여 사용자가 ‘시청역 1번 출구’에서 'BIKE-001' 자전거를 2025-10-10 09:00:00에 대여한 기록을 등록했습니다.
이어서 SET @rental1 = LAST_INSERT_ID(); 문을 사용해 방금 삽입된 대여 건의 rental_id 값을 변수로 저장하였습니다.
이후 INSERT INTO UsageStats(station_id, rental_id, date, rentals, returns)
구문을 통해 대여소별 일자(2025-10-10) 기준으로 대여 횟수를 1 증가시키며,
ON DUPLICATE KEY UPDATE rentals = rentals + 1; 조건을 통해
동일한 날짜 데이터가 있을 경우 누적 집계되도록 처리했습니다.
마지막으로 SELECT r.rental_id, r.bike_num, r.start_time, ss.station_name AS start_station FROM Rental r JOIN Station ss ON r.start_station_id = ss.station_id WHERE r.user_id = @user1 ORDER BY r.start_time DESC;
명령을 실행하여 대여 내역을 조회한 결과,
rental_id = 4인 행에서 시청역 1번 출구 대여 정보가 정상적으로 추가된 것을 확인할 수 있습니다.
이 예제는 자전거 대여 시점에 Rental(대여 기록) 과 UsageStats(통계 집계) 가 동시에 업데이트되는 트랜잭션 구조를 보여주는 대표적인 SQL 예제입니다.

UPDATE, INSERT, JOIN 쿼리를 사용해 자전거 반납 정보 등록 및 통계 반영을 수행한 예제입니다.
먼저, UPDATE Rental 구문을 통해 대여 중(end_time IS NULL) 상태였던 자전거 대여 건을
반납 처리하였습니다.
UPDATE Rental  
SET end_station_id = (SELECT station_id FROM Station WHERE station_name='강남역 10번 출구'),  
 end_time = '2025-10-10 09:45:00'  
WHERE rental_id = @rental1 AND end_time IS NULL;
위 명령은 사용자가 '시청역 1번 출구'에서 대여한 자전거를
'강남역 10번 출구'로 반납한 것을 기록하며, 반납 시각을 09:45:00으로 설정합니다.
이후 INSERT INTO UsageStats 문을 이용해 반납 통계(returns)를 1 증가시켰습니다.
INSERT INTO UsageStats(station_id, rental_id, date, rentals, returns)
VALUES((SELECT station_id FROM Station WHERE station_name='강남역 10번 출구'), @rental1, '2025-10-10', 0, 1)
ON DUPLICATE KEY UPDATE returns = returns + 1;
마지막으로 SELECT 문을 실행하여 대여소 이름을 JOIN하여 조회한 결과,
해당 대여(rental_id = 4)의 시작 지점이 ‘시청역 1번 출구’,
반납 지점이 ‘강남역 10번 출구’로 정상 반영된 것을 확인할 수 있습니다.
이 예제는 UPDATE 문을 통한 데이터 변경과 UsageStats 집계 테이블의 자동 갱신,
그리고 JOIN을 이용한 결과 검증 과정을 모두 포함하고 있어
실제 서비스의 “자전거 반납 로직”을 그대로 구현한 SQL 예시입니다.
SELECT 쿼리를 사용해 UsageStats 테이블과 Station 테이블을 조인(JOIN)하여
특정 날짜의 대여소별 대여(rentals) 및 반납(returns) 현황을 조회한 예제입니다.
SELECT s.station_name, us.date, us.rentals, us.returns
FROM UsageStats us
JOIN Station s ON s.station_id = us.station_id
WHERE us.date BETWEEN '2025-10-10' AND '2025-10-10'
ORDER BY s.station_name;
위 구문은 2025년 10월 10일 하루 동안의 이용 통계를 검색하며,
JOIN을 통해 각 통계 데이터에 해당하는 대여소 이름(station_name)을 함께 표시합니다.
실행 결과, ‘시청역 1번 출구’에서는 대여(rentals) 1건,
‘강남역 10번 출구’에서는 반납(returns) 1건이 기록된 것을 확인할 수 있습니다.
이 예제는 집계 테이블(UsageStats) 과 기준 테이블(Station) 을 연결하여
일자별 데이터를 조회하는 방법을 보여주며,
실제 서비스에서 대시보드나 관리자 통계 화면에 표시되는
일별 대여소별 이용 현황 기능의 핵심 SQL 로직입니다.

INSERT와 SELECT, JOIN 쿼리를 이용해 자전거 이상 신고 기능을 구현한 예제입니다.
먼저 INSERT INTO Report 구문을 통해 사용자가 '강남역 10번 출구'에서
'BIKE-002' 자전거의 이상 소음을 신고한 내용을 등록하였습니다.
INSERT INTO Report(user_id, station_id, bike_num, description, status, created_at)
VALUES(@user1, (SELECT station_id FROM Station WHERE station_name='강남역 10번 출구'),
'BIKE-002', '체인 이상 소음', 'PENDING', '2025-10-10 10:00:00');
이어서 SET @report1 = LAST_INSERT_ID(); 문으로 방금 생성된 신고 건의 report_id를 저장했습니다.
이후 SELECT 문에서는 Report 테이블을 User, Station 테이블과 JOIN하여
신고자의 이름(reporter)과 신고 위치(station_name)를 함께 조회하였습니다.
실행 결과, report_id = 1의 신고 건이 '체인 이상 소음'으로 기록되었으며
신고자는 '홍길동', 신고 위치는 '강남역 10번 출구', 상태(status)는 'PENDING'으로 표시되었습니다.
또한 아래의 쿼리를 통해 현재 상태가 'PENDING' 또는 'IN_PROGRESS'인 신고 내역만 조회하도록 설정했습니다.
SELECT r.report_id, r.status, s.station_name, u.name, r.created_at
FROM Report r
JOIN Station s ON s.station_id = r.station_id
JOIN User u ON u.user_id = r.user_id
WHERE r.status IN ('PENDING', 'IN_PROGRESS')
ORDER BY r.created_at DESC;
이 예제는 실제 서비스의 고장 신고 기능 구현에서 사용되는 SQL 예시로,
신고 등록(INSERT)부터 담당자 조회용 목록 SELECT까지의 전 과정을 보여줍니다.
즉, 사용자·대여소·신고 내역 간의 관계를 JOIN으로 연결하여
관리자가 쉽게 신고 현황을 확인할 수 있도록 설계된 구조입니다.

SELECT 쿼리를 이용해 Report, User, Station 테이블을 조인(JOIN)하여
신고 상태나 대여소 이름 등의 조건에 따라 데이터를 조회하는 예제입니다.
진행 중이거나 대기 중인 신고 전체 조회
SELECT r.report_id, r.status, r.created_at, s.station_name, u.name AS reporter
FROM Report r
JOIN Station s ON s.station_id = r.station_id
JOIN User u ON u.user_id = r.user_id
WHERE r.status IN ('PENDING', 'IN_PROGRESS')
ORDER BY r.created_at DESC;
위 쿼리는 신고 상태가 'PENDING'(대기) 또는 'IN_PROGRESS'(처리 중)인 항목을
최근 등록 순으로 정렬하여 보여줍니다.
결과에서 각 신고의 생성 시각(created_at), 신고자(reporter),
신고 대여소(station_name)를 함께 확인할 수 있습니다.
‘대기 중(PENDING)’ 상태만 조회
WHERE r.status = 'PENDING'
조건을 통해 아직 처리되지 않은 신고만 필터링할 수 있습니다.
이 구문은 관리자 페이지에서 미처리 신고 목록을 확인할 때 유용하게 사용됩니다.
특정 대여소(강남역 10번 출구) 신고 조회
WHERE s.station_name = '강남역 10번 출구'
이 조건을 사용하면 특정 지점의 신고 내역만 확인할 수 있습니다.
실행 결과, 강남역 10번 출구에서는
IN_PROGRESS(처리 중) 신고 1건

PENDING(대기) 신고 2건

RESOLVED(처리 완료) 신고 1건
이 조회되어, 다양한 상태별 신고 진행 상황을 한눈에 파악할 수 있습니다.
본 예제는 실제 서비스의 신고 관리 화면에서 사용되는 주요 SQL 로직으로, 신고 상태 필터링, 대여소별 조회, 신고자 정보 JOIN 등을 포함하여 관리자가 효율적으로 신고 내역을 모니터링할 수 있도록 돕는 쿼리 구조입니다.

UPDATE 쿼리를 사용하여 Report 테이블의 신고 상태를 변경한 예제입니다.
UPDATE Report SET status='RESOLVED' WHERE report_id=@report1;
위 구문은 특정 신고 건(report_id=@report1)의 상태(status)를
'RESOLVED'로 변경하여 신고 처리가 완료되었음을 표시합니다.
이후 SELECT 문을 통해 변경된 상태를 확인하였습니다.
SELECT report_id, status FROM Report WHERE report_id=@report1;
실행 결과, report_id가 1인 신고의 상태가 'RESOLVED'로 성공적으로 업데이트된 것을 확인할 수 있습니다.
본 예제는 실제 서비스에서 신고 처리 완료 버튼 클릭 시 동작하는 SQL 로직으로,
관리자가 이상 신고를 처리한 후 상태를 변경하고 그 결과를 즉시 확인하는
운영 관리 시스템의 핵심 업데이트 구문을 보여줍니다.

INSERT, UPDATE, SELECT 문을 이용해 게시판(공지사항 및 Q&A) 기능을 구현한 예제입니다.
먼저 INSERT INTO Board 구문을 사용하여
관리자가 등록한 공지글([공지] 시스템 점검 안내)과
사용자가 작성한 문의글(대여소 이용 시간 문의)을 추가하였습니다.
INSERT INTO Board(user_id, board_type, title, content, created_at)
VALUES
(@adminId, 'NOTICE', '[공지] 시스템 점검 안내', '10/15 02:00~04:00 점검', '2025-10-09 12:00:00'),
(@user2, 'QNA', '대여소 이용 시간 문의', '심야에도 대여 가능한가요?', '2025-10-10 08:00:00');
이후 SELECT 문으로 게시글 목록을 최신순(ORDER BY created_at DESC)으로 조회하여,
등록된 공지와 문의글이 정상적으로 추가된 것을 확인하였습니다.
다음으로 UPDATE 구문을 사용해 문의글의 제목을 수정하였습니다.
UPDATE Board
SET title='[수정] 대여소 이용 시간 문의'
WHERE board_id=@board_qna AND user_id=@user2;
수정 후 SELECT로 확인한 결과,
해당 게시글의 제목이 [수정] 대여소 이용 시간 문의로 변경된 것을 볼 수 있습니다.
본 예제는 INSERT → SELECT → UPDATE 흐름을 통해
사용자가 작성한 글을 등록하고, 수정 및 검증하는 전형적인 게시판 기능을 구현한 사례입니다.
실제 서비스에서 관리자 공지와 사용자 문의(Q&A)를 분리 관리할 때
동일한 구조의 SQL 문이 활용됩니다.

본 예제는 댓글(Comment) 기능을 구현한 SQL 문입니다.
먼저 INSERT INTO Comment 구문을 사용하여
관리자가 작성한 답변(심야시간은 일부 대여소만 운영합니다.)과
사용자가 남긴 감사 댓글(답변 감사합니다!)을 추가하였습니다.
INSERT INTO Comment(board_id, user_id, content) VALUES
(@board_qna, @adminId, '심야시간은 일부 대여소만 운영합니다.'),
(@board_qna, @user2, '답변 감사합니다!');
이후 SELECT 문으로 댓글 목록을 조회하여,
작성자(관리자, 김코딩), 댓글 내용, 작성 시간이 정상적으로 표시되는 것을 확인했습니다.
SELECT c.comment_id, u.name AS author, c.content, c.created_at
FROM Comment c
JOIN User u ON u.user_id=c.user_id
WHERE c.board_id=@board_qna
ORDER BY c.created_at;
다음으로, 사용자가 작성한 댓글 중 가장 최근의 댓글을 삭제하기 위해
DELETE 구문을 사용하였습니다.
DELETE FROM Comment
WHERE board_id=@board_qna AND user_id=@user2
ORDER BY comment_id DESC
LIMIT 1;
마지막으로 SELECT 문으로 다시 조회하여
관리자 댓글만 남아 있는 것을 확인하였습니다.
본 예제는 댓글 추가 → 조회 → 삭제의 전형적인 흐름을 보여주며,
실제 게시판 서비스에서 질문-답변형 댓글 기능 구현 시 핵심이 되는 SQL 문 구조를 잘 보여줍니다.
