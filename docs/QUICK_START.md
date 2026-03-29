# ⚡ FreeLang 빠른 시작 (5분)

**목표**: 첫 프로그램을 5분 안에 실행하기

---

## 📝 목차

1. [설치](#-설치-2분) (2분)
2. [첫 프로그램](#-첫-프로그램-1분) (1분)
3. [IDE 사용](#-웹-ide-사용-1분) (1분)
4. [다음 단계](#-다음-단계) (1분)

---

## 🔧 설치 (2분)

### 방법 1: Docker (권장 - 가장 빠름)

**필요한 것**: Docker만 설치되어 있으면 됨

```bash
# 1. 프로젝트 다운로드
git clone https://github.com/freelang/v2
cd v2

# 2. Docker Compose로 실행 (자동으로 모든 서비스 시작)
docker-compose up

# 3. 브라우저에서 열기
# http://localhost:3000  ← 웹 IDE
# http://localhost:8080  ← REST API
```

✅ **완료!** 이제 IDE가 준비됨

---

### 방법 2: 로컬 빌드 (고급 사용자)

**필요한 것**: Go 1.18+, Node.js 16+

```bash
# 1. 프로젝트 다운로드
git clone https://github.com/freelang/v2
cd v2

# 2. 컴파일러 빌드
cd src
go build -o freelang ./cmd/compiler
cd ..

# 3. 프론트엔드 빌드 (옵션)
cd frontend
npm install
npm run build
cd ..
```

✅ **완료!** 이제 freelang 바이너리 사용 가능

---

## 💻 첫 프로그램 (1분)

### 옵션 A: 웹 IDE 사용 (가장 쉬움)

1. 브라우저에서 http://localhost:3000 열기
2. 다음 코드를 에디터에 복붙:

```freelang
fn main() {
    println("Hello, FreeLang!");
    println(2 + 2);
}
```

3. **Ctrl+Enter** 또는 "Run" 버튼 클릭
4. 아래 "Output" 창에서 결과 확인:
   ```
   Hello, FreeLang!
   4
   ```

✅ **완료!** 첫 프로그램 실행됨

---

### 옵션 B: 커맨드라인 사용

1. 파일 생성:

```bash
cat > hello.fl << 'EOF'
fn main() {
    println("Hello, FreeLang!");
    println(2 + 2);
}
EOF
```

2. 실행:

```bash
./src/freelang hello.fl
```

3. 결과:

```
Hello, FreeLang!
4
```

✅ **완료!** 첫 프로그램 실행됨

---

## 🌐 웹 IDE 사용 (1분)

### IDE 주요 기능

| 기능 | 단축키 | 설명 |
|------|--------|------|
| 코드 실행 | Ctrl+Enter | 현재 코드 실행 |
| 저장 | Ctrl+S | 로컬에 저장 |
| 예제 로드 | Cmd+O | 내장 예제 선택 |
| 포맷 | Cmd+Shift+F | 코드 자동 정렬 |

### 사용 흐름

```
편집 → Ctrl+Enter → 결과 확인 → 수정 → 반복
```

### 예제 불러오기

IDE에서 "File" → "Examples" → "hello.fl" 선택

---

## 🎯 다음 단계

### 1. 기본 문법 배우기 (10분)

```freelang
// 변수
let x = 42;
var name = "Alice";

// 함수
fn add(a, b) {
    return a + b;
}

// 조건문
if x > 10 {
    println("큼");
} else {
    println("작음");
}

// 반복문
for i in 1..5 {
    println(i);
}

// 배열
let arr = [1, 2, 3];
println(arr[0]);
```

**[→ 전체 튜토리얼](../tutorials/variables.md)**

---

### 2. 실전 예제 보기 (15분)

웹 IDE의 "Examples" 메뉴에서:

- **hello.fl**: 가장 간단한 예제
- **fibonacci.fl**: 재귀 함수 예제
- **calculator.fl**: 계산기 구현
- **banking-system.fl**: 실전 프로젝트
- **async-example.fl**: 비동기 프로그래밍

**[→ 모든 예제](../../examples/)**

---

### 3. 공식 문서 읽기

| 문서 | 읽는 시간 | 내용 |
|------|---------|------|
| [API.md](./API.md) | 20분 | 언어 명세 |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 15분 | 설계 이해 |
| [tutorials/](../tutorials/) | 30분+ | 주제별 가이드 |

---

### 4. 커뮤니티 참여

- **버그 리포트**: GitHub Issues
- **질문**: GitHub Discussions
- **아이디어 공유**: GitHub Discussions

---

## 🚀 일반적인 질문

### Q1: Windows에서 사용 가능한가?

**답**: 네! Docker를 사용하면 모든 OS에서 동일합니다.
- Windows: Docker Desktop for Windows 설치 후 같은 명령어 사용
- macOS: Docker Desktop for Mac 설치 후 같은 명령어 사용

---

### Q2: 오프라인에서 사용 가능한가?

**답**: 네! 로컬 빌드를 한 후 바이너리 직접 사용 가능합니다.

```bash
./src/freelang my_program.fl
```

IDE는 로컬 서버이므로 인터넷 불필요.

---

### Q3: 프로그램을 배포하려면?

**답**: 컴파일된 파일을 배포합니다.

```bash
# 컴파일
./src/freelang my_app.fl --output my_app

# 다른 컴퓨터에서 실행
./my_app
```

---

### Q4: REST API는?

**답**: 코드를 HTTP로 실행할 수 있습니다.

```bash
curl -X POST http://localhost:8080/compile \
  -H "Content-Type: application/json" \
  -d '{"code": "fn main() { println(42); }"}'
```

---

### Q5: 더 배우려면?

**답**: 이 순서대로 따르세요:

1. 이 QUICK_START.md (지금 읽는 중)
2. [API.md](./API.md) (언어 명세)
3. [tutorials/](../tutorials/) (주제별 심화)
4. [examples/](../../examples/) (실전 코드)

---

## 💡 유용한 팁

### 팁 1: 코드 자동 완성

IDE에서 **Ctrl+Space**를 누르면 자동 완성 활성화

```freelang
pri|  ← Ctrl+Space → println(...)
```

---

### 팁 2: 에러 메시지 이해하기

에러 발생 시:

```
Error at line 5, col 10:
  undefined variable 'foo'

  5: println(foo);
              ^^^
```

→ 변수를 사용하기 전에 선언해야 함

---

### 팁 3: 큰 프로그램 작성하기

모듈로 나누어 관리:

```freelang
// math.fl
module math;

export fn add(a, b) { a + b }

// main.fl
import math;

fn main() {
    println(math.add(5, 3));
}
```

**[→ 모듈 가이드](../tutorials/modules.md)**

---

### 팁 4: 비동기 코드

네트워크 요청 등에서 프로그램이 멈추지 않게:

```freelang
async fn fetch() {
    let data = await http.get("https://api.example.com");
    println(data);
}
```

**[→ 비동기 가이드](../tutorials/async.md)**

---

## 🎓 학습 경로

```
5분:   첫 프로그램 실행 ← 여기서부터 시작!
15분:  기본 문법 학습
30분:  모듈 & 함수 심화
1시간: 비동기 프로그래밍
2시간: 웹 서버 만들기
3시간: 금융 시스템 구현
```

---

## 🐛 문제 해결

### 문제: "Docker not found"

**해결책**: Docker 설치
- [Docker 설치 가이드](https://docs.docker.com/get-docker/)

---

### 문제: "Port 3000 already in use"

**해결책**: 다른 포트 사용

```bash
docker-compose up -e FRONTEND_PORT=3001
```

---

### 문제: "Connection refused"

**해결책**: Docker가 실행 중인지 확인

```bash
docker ps
```

실행 중이 아니면:

```bash
docker-compose up -d
```

---

### 문제: 기타 이슈

GitHub Issues에서 도움 요청:
https://github.com/freelang/v2/issues

---

## ✨ 축하합니다!

당신은 이제 FreeLang을 사용할 준비가 되었습니다! 🎉

### 다음 권장사항:

1. **hello.fl** 예제부터 시작
2. **tutorials/** 폴더의 가이드 읽기
3. **examples/** 폴더의 코드 분석
4. 자신의 프로젝트 시작!

---

## 📚 참고 자료

| 문서 | 내용 |
|------|------|
| [README.md](./README.md) | 프로젝트 전체 개요 |
| [API.md](./API.md) | 언어 명세서 (레퍼런스) |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 컴파일러 설계 |
| [tutorials/](../tutorials/) | 주제별 튜토리얼 |
| [examples/](../../examples/) | 98개 실행 예제 |

---

**Happy Coding! 🚀**

마지막 업데이트: 2026-03-26
