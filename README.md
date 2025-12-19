# ⌚ Smart Watch Sync App

**C# ASP.NET Core MVC**와 **Vanilla JavaScript**를 활용한 스마트워치 페이스 커스텀 웹 애플리케이션입니다.
서버 데이터베이스 없이 `LocalStorage`를 활용하여 데이터를 관리하며, **사용자별 데이터 분리**와 **실시간 날씨 연동** 기능을 제공합니다.

## 🛠 Tech Stack

- **Backend**: C# ASP.NET Core 8.0 (MVC Pattern)
- **Frontend**: JavaScript (Canvas API), CSS3 (Mobile-First Layout)
- **Database**: Browser LocalStorage (User-Isolated Data)
- **External API**: OpenWeatherMap (Real-time Weather)
- **Deployment**: Docker (Compatible with Render/Fly.io)
- **IDE**: Visual Studio Code

---

## 📂 Folder Structure

```text
SmartWatchApp/
├── Controllers/
│   └── HomeController.cs       # 페이지 라우팅 & API Key 전달
├── Views/
│   ├── Shared/
│   │   └── _Layout.cshtml      # 모바일 프레임, 하단 네비게이션, 공통 모달
│   ├── Home/
│   │   ├── Index.cshtml        # 홈: 저장된 시계 목록 (날씨 포함 썸네일)
│   │   ├── Login.cshtml        # 로그인: 사용자 식별 및 세션 처리
│   │   └── Editor.cshtml       # 에디터: 픽셀 변환, 날씨/문구 드래그 배치
├── wwwroot/
│   ├── css/
│   │   └── site.css            # 전체 UI/UX (스크롤 제어, 카드 디자인)
│   └── js/
│       └── site.js             # 공통 로직: 알람(Toast/Sound/Vibrate), 인증 체크
├── appsettings.json            # API Key 설정 파일 (로컬)
├── Dockerfile                  # 배포용 컨테이너 설정
├── Program.cs
└── SmartWatchApp.csproj
```

---

## 💻 개발 및 실행 가이드 (VS Code 기준)

**VS Code** 환경에서 C# ASP.NET Core MVC 프로젝트를 실행하고 테스트하는 방법을 안내합니다.

## 1. 필수 설치 요소 (Prerequisites)

프로젝트 실행 전 아래 요소들이 반드시 설치되어 있어야 합니다.

### 1) .NET 8.0 SDK

- Microsoft 공식 사이트에서 다운로드 후 설치.
- **설치 확인 (터미널):**
  ```bash
  dotnet --version
  ```

### 2) VS Code 확장 프로그램 (Extensions)

VS Code 좌측 'Extensions' 탭에서 아래 항목 검색 후 설치:

- **C# Dev Kit** (Microsoft 공식, 필수)
- **C#** (구문 강조 및 인텔리센스)
- **Docker** (선택 사항, 배포 시 유용)

---

## 2. 프로젝트 생성 (최초 1회)

프로젝트가 아직 없다면 터미널에서 아래 명령어를 순서대로 입력하여 생성합니다.

```bash
# 1. MVC 프로젝트 생성 (프로젝트명: SmartWatchApp)
dotnet new mvc -n SmartWatchApp

# 2. 폴더 안으로 이동
cd SmartWatchApp

# 3. 현재 폴더를 VS Code로 열기
code .
```

---

## 3. 서버 실행 방법 (Run)

코드 수정 사항이 즉시 반영되는 **Hot Reload** 모드를 권장합니다.

1. **터미널 열기:** `Ctrl` + `~` (물결)
2. **실행 명령어 입력:**
   ```bash
   dotnet watch run
   ```
