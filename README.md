# PETFORM - Frontend

> “반려동물의 모습을 나만의 굿즈로” — 반려동물 사진 한 장으로 만드는 3D 피규어

## 서비스 흐름

```
사진 업로드 → AI 이미지 생성 → 굿즈 옵션 선택 → 3D 모델 생성 → 견적 확인 후 주문
```

## 주요 기능

- 업로드한 이미지를 프롬프트 기반 3D 스타일로 변환하여 사용자에게 확인받습니다.
- 선택한 옵션을 기반으로 모델을 생성하여 사용자가 자유자재로 둘러볼 수 있도록 합니다.
- 생성된 모델과 옵션을 기준으로 여러 업체의 인쇄 견적을 정리해 보여줍니다.


## 기술 스택 (공용)

- React 19 + Vite
- react-router
- axios
- Three.js / @react-three/fiber
- CSS (컴포넌트/페이지별 개별 파일)

## 시작하기 (팀원 공용)

```bash
git clone https://github.com/meotsa-hackathon-hufs3/FE.git
cd FE
npm install
```

프로젝트 실행 전 루트 디렉토리에 `.env` 파일을 생성하고 아래 값을 설정해주세요. (.env.example 참고)
```bash
VITE_API_URL=https://your-api-domain.com
```

```
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

| 경로                         | 페이지            | 설명                   |
| --------------------------- | --------------- | --------------------- |
| `/`                         | MainPage        | 메인 랜딩 페이지          |
| `/upload/:creationId`       | UploadPage      | 반려동물 사진 업로드       |
| `/image/:creationId`        | ImagePage       | 이미지 생성 중 (로딩)      |
| `/image/:creationId/result` | ImageResultPage | 이미지 생성 완료 결과      |
| `/option/:creationId`        | OptionPage      | 3D 모델 옵션 선택        |
| `/model/:creationId`         | ModelPage       | 3D 모델 생성            |
| `/pricing/:creationId`       | PricingPage     | 가격 및 주문             |

## 협업 규칙

- 컴포넌트와 스타일은 `Xxx.jsx` + `Xxx.css`를 같은 폴더에 둔다.
- 브랜치는 `feature/기능명` 형태로 파고, main에 직접 push 금지 → develop으로 push 후 머지, 추후 한번에 main으로 push.

## 폴더 구조

```
src/
├── api/          # axios 인스턴스 등 API 통신
├── assets/       # 이미지, 아이콘 등 리소스
├── components/   # 공통 컴포넌트 (버튼, 로딩 등)
├── layouts/      # 페이지 레이아웃
└── pages/        # 라우트별 페이지
```
