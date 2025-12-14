# 따릉이 대여소 관리 시스템 (Frontend)

서울시 공공자전거(따릉이) 대여소 관리 및 이용 서비스를 제공하는 웹 애플리케이션입니다.

## 🚀 주요 기능

### 사용자 기능

- **대여소 조회**: 지도 기반 대여소 검색 및 상세 정보 조회
- **게시판**: 공지사항 조회 및 신고 작성
- **이용권 관리**: 이용권 구매 및 활성 이용권 조회
- **대여 이력**: 개인 대여 이력 조회
- **랭킹**: 이용시간 및 이용횟수 랭킹 조회
- **마이페이지**: 개인 정보 및 통계 조회

### 관리자 기능

- **대여소 관리**: 대여소 CRUD 작업
- **회원 관리**: 회원 목록 조회
- **신고 관리**: 접수된 신고 내역 조회 및 관리
- **통계 대시보드**: 대여소별 이용량, 요일별 이용 현황 등 통계 시각화

## 🛠 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Database**: MySQL (mysql2-wizard)
- **Map**: Leaflet, React Leaflet

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 20 이상
- npm, yarn, pnpm 또는 bun

### 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm run start
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── admin/             # 관리자 페이지
│   ├── api/               # API 라우트
│   ├── board/             # 게시판 페이지
│   ├── login/             # 로그인 페이지
│   ├── mypage/            # 마이페이지
│   ├── reports/           # 신고 페이지
│   └── stations/          # 대여소 페이지
├── components/            # React 컴포넌트
│   ├── atom/             # 기본 컴포넌트
│   ├── molecule/         # 분자 컴포넌트
│   ├── organism/         # 유기체 컴포넌트
│   └── template/         # 템플릿 컴포넌트
├── hooks/                # Custom Hooks
├── services/             # API 서비스 및 비즈니스 로직
├── stores/               # Zustand 스토어
├── interfaces/           # TypeScript 인터페이스
└── configs/              # 설정 파일
```

## 🔑 주요 기능 설명

### 인증 시스템

- JWT 기반 인증 (Access Token, Refresh Token)
- 로컬스토리지를 통한 인증 상태 지속
- 관리자 권한 검증

### API 라우트

- Next.js 서버사이드 API 라우트 활용
- 관리자 인증 API (`/api/admin/check`)
- 대여소 개수 조회 API (`/api/admin/stations/count`)
- 사용자 정보 조회 API (`/api/user/info`)

### 상태 관리

- **Zustand**: 전역 상태 관리 (인증 정보)
- **React Query**: 서버 상태 관리 및 캐싱

## 📝 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 필요한 환경 변수를 설정하세요.

```env
# API 서버 URL
NEXT_PUBLIC_API_URL=your_api_url
```

## 🧪 개발 가이드

### 컴포넌트 구조

- **Atom**: Button, Card, Input 등 기본 UI 컴포넌트
- **Molecule**: 여러 Atom을 조합한 컴포넌트
- **Organism**: 복잡한 기능을 가진 컴포넌트
- **Template**: 페이지 레이아웃 컴포넌트

### 스타일링

- Tailwind CSS를 사용한 유틸리티 기반 스타일링
- 반응형 디자인 지원 (모바일 우선)

## 📄 라이선스

이 프로젝트는 비공개 프로젝트입니다.
