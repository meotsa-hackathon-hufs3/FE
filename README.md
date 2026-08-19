# PETFORM - Frontend

> "우리 아이를 세상에 하나뿐인 모습으로" — 반려동물 사진 한 장으로 만드는 3D 피규어

## 서비스 흐름

```
사진 업로드 → AI 이미지 생성 → 옵션 선택 → 3D 모델 생성 → 가격/주문
```

## 기술 스택 (공용)

- React 19 + Vite
- react-router
- axios
- CSS (컴포넌트/페이지별 개별 파일)

## 역할 분담

- 해린: 사진 업로드, 이미지 생성중, 생성완료
- 채현: 메인, 옵션, 모델, 가격

## 시작하기 (팀원 공용)

```bash
git clone https://github.com/meotsa-hackathon-hufs3/FE.git
cd FE
npm install
npm run dev
```

## 스크립트

| 명령어           | 설명           |
| ---------------- | -------------- |
| `npm run dev`     | 개발 서버 실행 |
| `npm run build`   | 프로덕션 빌드  |
| `npm run lint`    | 린트 검사      |
| `npm run preview` | 빌드 결과 미리보기 |

## 페이지 구성

| 경로            | 페이지          | 설명                  |
| --------------- | --------------- | --------------------- |
| `/`             | MainPage        | 메인 랜딩 페이지      |
| `/upload`       | UploadPage      | 반려동물 사진 업로드  |
| `/image`        | ImagePage       | 이미지 생성 중 (로딩) |
| `/image/result` | ImageResultPage | 이미지 생성 완료 결과 |
| `/option`       | OptionPage      | 3D 모델 옵션 선택     |
| `/model`        | ModelPage       | 3D 모델 생성          |
| `/pricing`      | PricingPage     | 가격 및 주문          |

## 협업 규칙!!

- 컴포넌트와 스타일은 `Xxx.jsx` + `Xxx.css`를 같은 폴더에 둔다.
- 브랜치는 `feature/기능명` 형태로 파고, main에 직접 push 금지 → develop으로 PR 후 머지.

## 폴더 구조

```
src/
├── api/          # axios 인스턴스 등 API 통신
├── components/   # 공통 컴포넌트 (버튼, 로딩 등)
├── layouts/      # 페이지 레이아웃
└── pages/        # 라우트별 페이지
```
