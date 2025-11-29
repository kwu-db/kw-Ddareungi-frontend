# 따릉이 통합 관리 웹 애플리케이션 - 프론트엔드 개발 TODO

## 프로젝트 개요
서울시 따릉이 플랫폼을 모사한 통합 관리 웹 애플리케이션의 프론트엔드 구현
- 아토믹 디자인 패턴 적용
- 모바일 뷰 우선 구현 (max-width 제한)
- 데이터 연동 없이 UI만 구현

## 체크리스트

### 1단계: 기본 설정 및 공통 컴포넌트 ✅
- [x] 모바일 뷰 설정 (max-width 제한)
- [x] 공통 레이아웃 컴포넌트 (Header, Footer, Navigation)
- [x] 공통 스타일 및 테마 설정

### 2단계: Atom 컴포넌트 (가장 작은 단위) ✅
- [x] Button 컴포넌트
- [x] Input 컴포넌트
- [x] Label 컴포넌트
- [x] Badge 컴포넌트 (상태 표시용)
- [x] Icon 컴포넌트 (기본 아이콘)
- [x] Avatar 컴포넌트
- [x] Card 컴포넌트 (기본 카드)

### 3단계: Molecule 컴포넌트 (Atom 조합) ✅
- [x] FormField (Label + Input)
- [x] StationCard (대여소 카드)
- [x] BoardItem (게시판 목록 아이템)
- [x] CommentItem (댓글 아이템)
- [x] ReportCard (신고 카드)
- [x] PassCard (이용권 카드)
- [x] RentalCard (대여 이력 카드)
- [x] UserCard (회원 카드)
- [x] StatusBadge (상태 배지)

### 4단계: Organism 컴포넌트 (Molecule 조합) ✅
- [x] Header (네비게이션 헤더)
- [x] Footer (푸터)
- [x] StationList (대여소 목록)
- [x] StationDetail (대여소 상세)
- [x] BoardList (게시판 목록)
- [x] BoardDetail (게시판 상세 + 댓글)
- [x] CommentList (댓글 목록)
- [x] ReportList (신고 목록)
- [x] ReportDetail (신고 상세)
- [x] PassList (이용권 목록)
- [x] RentalList (대여 이력 목록)
- [x] UserList (회원 목록)
- [x] AdminDashboard (관리자 대시보드)
- [x] StatsChart (통계 차트 - 플레이스홀더)

### 5단계: Template 컴포넌트 (페이지 레이아웃) ✅
- [x] MainLayout (메인 레이아웃)
- [x] AdminLayout (관리자 레이아웃)

### 6단계: 페이지 구현 ✅
- [x] 메인 대시보드 (/)
- [x] 대여소 목록 (/stations)
- [x] 대여소 상세 (/stations/[id])
- [x] 게시판 목록 (/board)
- [x] 게시판 상세 (/board/[id])
- [x] 마이페이지 (/mypage)
- [x] 이용권 관리 (/mypage/passes)
- [x] 신고 목록 (/reports)
- [x] 신고 상세 (/reports/[id])
- [x] 관리자 페이지 (/admin)
- [x] 관리자 - 대여소 관리 (/admin/stations)
- [x] 관리자 - 회원 관리 (/admin/users)
- [x] 관리자 - 통계 대시보드 (/admin/stats)

### 7단계: 스타일링 및 반응형 ✅
- [x] 모바일 뷰 최적화
- [x] 색상 테마 통일
- [x] 간격 및 타이포그래피 조정
- [x] 애니메이션 및 트랜지션 추가

### 8단계: API 인터페이스 및 서비스 함수 ✅
- [x] 인터페이스 정의 (Token, Board, Station, Rental, Pass, Comment, User, Admin)
- [x] 서비스 함수 구현 (tokenService, boardService, stationService, rentalService, passService, commentService, userService, adminService)
- [x] API 설정 파일 (config/api.ts)

### 9단계: 커스텀 훅 구현 및 적용 ✅
- [x] TanStack Query 설치 및 QueryProvider 설정
- [x] 훅 패턴 정의 및 공통 타입 작성
- [x] useStations 훅 구현 (목록, 상세, 생성, 수정, 삭제)
- [x] useBoards 훅 구현 (목록, 상세, 생성, 수정, 삭제)
- [x] useComments 훅 구현 (목록, 생성)
- [x] useRentals 훅 구현 (목록, 대여, 반납)
- [x] usePasses 훅 구현 (목록, 구매, 사용자 이용권)
- [x] useUsers 훅 구현 (생성)
- [x] useAuth 훅 구현 (로그인, 토큰 재발급)
- [x] useAdmin 훅 구현 (생성, 수정)
- [x] 페이지에 훅 적용 (stations, board, rentals, passes)
- [x] 로딩 상태 및 에러 처리

## 구현 우선순위

1. **기본 인프라** (1단계) ✅
   - 공통 컴포넌트 및 레이아웃
   - 모바일 뷰 설정

2. **핵심 기능 페이지** (2-4단계 → 6단계) ✅
   - 메인 대시보드
   - 대여소 목록/상세
   - 게시판 목록/상세
   - 마이페이지

3. **관리자 기능** (5-6단계) ✅
   - 관리자 페이지
   - 통계 대시보드
   - 신고 관리

4. **API 연동** (8-9단계) 🔄
   - 인터페이스 및 서비스 함수
   - 커스텀 훅 구현
   - 페이지에 적용

5. **마무리** (7단계) ✅
   - 스타일링 완성
   - 최종 검토

## 기술 스택
- Next.js 16.0.5
- TypeScript
- Tailwind CSS 4.x
- 아토믹 디자인 패턴

## 참고사항
- 모든 데이터는 하드코딩된 더미 데이터 사용
- API 연동은 추후 구현 예정
- 모바일 뷰만 구현 (max-width: 428px 정도로 제한)
