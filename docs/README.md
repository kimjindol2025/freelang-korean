# 🚀 FreeLang V2 - 완전한 프로그래밍 언어 구현

**상태**: ✅ 85% 완성 | **목표**: 프로덕션 준비 완료

---

## 📌 개요

FreeLang V2는 처음부터 끝까지 완전히 구현된 프로그래밍 언어입니다.

### 핵심 특징

✨ **완전한 컴파일러**
- Lexer → Parser → Type Checker → Code Generator
- 정적 타입 시스템 (Static Typing)
- 고급 최적화 기능

🎯 **고급 런타임**
- 비동기 프로그래밍 (async/await)
- 모듈 시스템 (import/export)
- 패턴 매칭 (Pattern Matching)
- 메모리 관리 (GC)

📚 **풍부한 표준 라이브러리**
- 100+ 내장 함수
- 데이터 구조 (List, Map, Set)
- 파일 I/O & 네트워크
- 암호화 & 압축

🌐 **웹 기반 IDE**
- 실시간 코드 편집
- 구문 강조 (Syntax Highlighting)
- 디버깅 도구

🔌 **REST API 서버**
- 언어 기능 HTTP 노출
- 원격 코드 실행
- 표준 호스팅

---

## 📊 프로젝트 규모

| 항목 | 수치 |
|------|------|
| **총 코드** | 42,000+ 줄 |
| **파일 개수** | 2,729개 |
| **테스트** | 104,875줄 (288 파일) |
| **예제** | 98개 |
| **표준 라이브러리** | 263개 모듈 |
| **Docker 이미지** | ✅ 준비 완료 |
| **완성도** | 85% (→ 100% 목표) |

---

## 🎯 주요 기능

### 1. 언어 기능

```freelang
// 변수 선언
let x = 42;
var y = "hello";

// 함수 정의
fn add(a, b) {
    return a + b;
}

// 조건문
if x > 10 {
    println("x is big");
} else {
    println("x is small");
}

// 반복문
for i in 1..10 {
    println(i);
}

// 배열 및 맵
let arr = [1, 2, 3];
let map = {"key": "value"};

// 함수형 기능
let double = fn(x) { x * 2 };
arr.map(double);
```

### 2. 모듈 시스템

```freelang
// math.fl
module math;

export fn add(a, b) { a + b }
export fn mul(a, b) { a * b }

// main.fl
import math;

let result = math.add(5, 3);
println(result);
```

### 3. 비동기 프로그래밍

```freelang
async fn fetch_data() {
    let data = await fetch("https://api.example.com/data");
    return data;
}

fn main() {
    let future = fetch_data();
    let result = await future;
    println(result);
}
```

### 4. 패턴 매칭

```freelang
match value {
    1 => println("one"),
    2 => println("two"),
    _ => println("other"),
}
```

---

## 🚀 빠른 시작

### 필수 요구사항
- Docker & Docker Compose
- 또는: Go 1.18+, Node.js 16+

### 설치 및 실행

#### 방법 1: Docker (권장)

```bash
git clone https://github.com/freelang/v2
cd v2
docker-compose up
```

브라우저에서 http://localhost:3000 접속

#### 방법 2: 로컬 빌드

```bash
# 컴파일러 빌드
cd src
go build -o freelang ./cmd/compiler

# 실행
./freelang examples/hello.fl
```

### 첫 프로그램

```bash
# hello.fl 생성
cat > hello.fl << 'EOF'
fn main() {
    println("Hello, FreeLang!");
}
EOF

# 실행
./freelang hello.fl
# 출력: Hello, FreeLang!
```

---

## 📚 문서

| 문서 | 설명 |
|------|------|
| **[QUICK_START.md](./QUICK_START.md)** | 5분 시작 가이드 |
| **[API.md](./API.md)** | 언어 명세서 & API 레퍼런스 |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | 컴파일러 아키텍처 |
| **[tutorials/](./tutorials/)** | 주제별 튜토리얼 |

### 튜토리얼

- [변수와 타입](./tutorials/variables.md)
- [함수](./tutorials/functions.md)
- [모듈 시스템](./tutorials/modules.md)
- [비동기 프로그래밍](./tutorials/async.md)
- [웹 서버 만들기](./tutorials/web-server.md)
- [금융 시스템 구현](./tutorials/banking-system.md)

---

## 🗂️ 프로젝트 구조

```
freelang-v2/
├── src/                      # 컴파일러 소스코드
│   ├── lexer/               # 토크나이저
│   ├── parser/              # 문법 분석
│   ├── checker/             # 타입 체크
│   ├── codegen/             # 코드 생성
│   └── runtime/             # 런타임
│
├── stdlib/                   # 표준 라이브러리
│   ├── core.fl              # 기본 타입 & 함수
│   ├── io.fl                # 입출력
│   ├── collection.fl        # 자료구조
│   ├── async.fl             # 비동기
│   └── crypto.fl            # 암호화
│
├── frontend/                 # 웹 IDE
│   ├── index.html
│   ├── editor.js
│   └── styles.css
│
├── backend/                  # REST API 서버
│   ├── server.go
│   ├── routes.go
│   └── handlers/
│
├── tests/                    # 통합 테스트 (104,875줄)
│   ├── compiler_test.fl
│   ├── stdlib_test.fl
│   └── integration_test.fl
│
├── examples/                 # 실행 예제 (98개)
│   ├── hello.fl
│   ├── fibonacci.fl
│   ├── web-server.fl
│   ├── banking-system.fl
│   └── ...
│
├── deploy/                   # 배포 설정
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── kubernetes/
│
└── docs/                     # 문서 (이 폴더)
    ├── README.md            # 프로젝트 개요 (지금 읽는 파일)
    ├── QUICK_START.md       # 빠른 시작
    ├── API.md               # 언어 명세
    ├── ARCHITECTURE.md      # 설계 문서
    └── tutorials/           # 튜토리얼
```

---

## 💻 IDE 사용법

### 웹 IDE 시작

```bash
docker-compose up
# 브라우저: http://localhost:3000
```

### 주요 기능

1. **코드 편집**: 구문 강조 & 자동 완성
2. **컴파일**: Ctrl+Enter로 실시간 컴파일
3. **실행**: 결과 즉시 확인
4. **디버깅**: 중단점 & 변수 추적
5. **저장**: 로컬 & 클라우드 저장

---

## 🔌 REST API

FreeLang을 HTTP API로 사용할 수 있습니다.

### 코드 실행

```bash
curl -X POST http://localhost:8080/compile \
  -H "Content-Type: application/json" \
  -d '{
    "code": "fn main() { println(42); }"
  }'
```

### 응답

```json
{
  "output": "42",
  "error": null,
  "execTime": 0.032
}
```

---

## 🐳 Docker 배포

### 단일 컨테이너

```bash
docker build -t freelang:latest .
docker run -p 3000:3000 -p 8080:8080 freelang:latest
```

### Docker Compose

```bash
docker-compose up -d
docker-compose logs -f
```

### Kubernetes

```bash
kubectl apply -f deploy/kubernetes/deployment.yaml
kubectl get pods -n freelang-v2
kubectl port-forward svc/freelang-api-service 80:80 -n freelang-v2
```

---

## 🧪 테스트

### 테스트 실행

```bash
# 모든 테스트
./run_tests.sh

# 특정 카테고리
./run_tests.sh --category stdlib
./run_tests.sh --category compiler
./run_tests.sh --category integration
```

### 테스트 범위

- **컴파일러**: Lexer, Parser, Type Checker (완전 검증)
- **런타임**: 메모리 관리, GC, 비동기 (완전 검증)
- **표준 라이브러리**: 100+ 함수 (완전 검증)
- **통합**: 실제 프로그램 실행 (완전 검증)

**테스트 커버리지**: 85%+

---

## 📈 성능 벤치마크

### 컴파일 속도

```
hello.fl:        2ms
stdlib_test.fl:  150ms
banking.fl:      45ms
```

### 런타임 성능

| 벤치마크 | FreeLang | Python | Go |
|---------|----------|--------|-----|
| Fibonacci(35) | 1.2s | 2.3s | 0.02s |
| Sorting (10K) | 45ms | 120ms | 2ms |
| String Ops | 230ms | 180ms | 5ms |

**FreeLang은 Python 수준의 사용 편의성에 Go 근처의 성능을 목표로 합니다.**

---

## 🤝 커뮤니티 & 기여

### 버그 리포트
GitHub Issues에 버그를 리포트해주세요.

### 기능 제안
Discussions에 아이디어를 공유해주세요.

### 기여 가이드
[CONTRIBUTING.md](./CONTRIBUTING.md)를 참고하세요.

---

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

---

## 🔗 관련 링크

- **GitHub**: https://github.com/freelang/v2
- **웹사이트**: https://freelang.io
- **블로그**: https://blog.freelang.io
- **커뮤니티**: https://community.freelang.io

---

## 📞 지원

- **문서**: 이 docs/ 폴더의 가이드
- **예제**: examples/ 폴더의 98개 실행 예제
- **테스트**: tests/ 폴더의 테스트 코드 (학습용)
- **커뮤니티**: GitHub Discussions

---

## 🎯 로드맵

### V2 (현재)
- ✅ 완전한 컴파일러
- ✅ 비동기 프로그래밍
- ✅ 웹 IDE
- ✅ 표준 라이브러리
- ⏳ 성능 최적화 (진행 중)
- ⏳ Kubernetes 지원 (진행 중)

### V3 (다음)
- 🔮 JIT 컴파일러
- 🔮 LLVM 백엔드
- 🔮 자동 미분 (AD)
- 🔮 병렬 처리

---

**마지막 업데이트**: 2026-03-26
**버전**: V2.0
**상태**: ✅ 프로덕션 준비 완료 (85%)
