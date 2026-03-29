# 🎓 K-FreeLang 10단계 학습 경로

**완벽한 프리랭 마스터가 되기 위한 단계별 가이드**

---

## 📋 전체 학습 구조

### **Tier 1: 기초 (3시간)** - Step 1-3
프리랭의 기본을 배우는 단계입니다.

### **Tier 2: 중급 (3시간)** - Step 4-7
실전 프로그래밍 기술을 배우는 단계입니다.

### **Tier 3: 고급 (2.5시간)** - Step 8-10
전문가 수준의 개발 기술을 배우는 단계입니다.

---

## 🗺️ 학습 경로

### **1️⃣ Step 1: 안녕, 프리랭! (20분)**

**전제 조건**: 없음

**학습 내용**:
- 설치 및 환경 설정
- 기본 출력 함수
- 주석 작성법

**학습 파일**:
```
step1-hello-korean/
├── README.md
├── 1-hello.free
├── 2-korean-output.free
├── 3-number-output.free
├── exercises.md
└── solution.free
```

**핵심 개념**:
```freelang
출력("텍스트")  // 출력 함수
// 주석        // 한 줄 주석
```

**다음 단계**: Step 2 → 변수와 자료형

---

### **2️⃣ Step 2: 변수와 자료형 (30분)**

**전제 조건**: Step 1 완료

**학습 내용**:
- 변수 선언 (변수, 상수)
- 자료형 (숫자, 문자열, 참/거짓)
- 기본 연산자

**학습 파일**:
```
step2-variables-types/
├── README.md
├── 1-variables.free
├── 2-types.free
├── 3-operators.free
├── exercises.md
└── solution.free
```

**핵심 개념**:
```freelang
변수 이름 = "값"           // 변수 선언
상수 PI = 3.14            // 상수 선언
변수 합계 = 10 + 20       // 산술 연산
변수 비교 = 10 > 5        // 비교 연산
변수 논리 = 참이고 거짓   // 논리 연산
```

**다음 단계**: Step 3 → 조건문과 반복문

---

### **3️⃣ Step 3: 조건문과 반복문 (40분)**

**전제 조건**: Step 1-2 완료

**학습 내용**:
- if/else 조건문
- for/while 반복문
- break/continue 제어

**학습 파일**:
```
step3-control-flow/
├── README.md
├── 1-if-else.free
├── 2-for-loop.free
├── 3-while-loop.free
├── exercises.md
└── solution.free
```

**핵심 개념**:
```freelang
만약 조건 {
  코드
}

반복 (변수 = 0; 변수 < 10; 변수 += 1) {
  코드
}

반복 {
  코드
  만약 조건 {
    나가
  }
}
```

**다음 단계**: Step 4 → 함수 정의와 호출

---

### **4️⃣ Step 4: 함수 정의와 호출 (40분)**

**전제 조건**: Step 1-3 완료

**학습 내용**:
- 함수 정의 및 호출
- 매개변수와 반환값
- 재귀 함수

**학습 파일**:
```
step4-functions/
├── README.md
├── 1-basic-functions.free
├── 2-parameters.free
├── 3-return-values.free
├── 4-recursion.free
├── exercises.md
└── solution.free
```

**핵심 개념**:
```freelang
함수 함수명(매개변수) {
  반환 결과
}

함수 두배(숫자) {
  반환 숫자 * 2
}

함수 팩토리얼(n) {
  만약 n <= 1 {
    반환 1
  }
  반환 n * 팩토리얼(n - 1)
}
```

**다음 단계**: Step 5 → 배열 다루기

---

### **5️⃣ Step 5: 배열 다루기 (35분)**

**전제 조건**: Step 1-4 완료

**학습 내용**:
- 배열 생성과 접근
- 배열 메서드 (push, pop, filter, map)
- 다중 배열

**학습 파일**:
```
step5-arrays/
├── README.md
├── 1-array-basics.free
├── 2-array-methods.free
├── 3-2d-arrays.free
├── exercises.md
└── solution.free
```

**핵심 개념**:
```freelang
변수 배열 = [1, 2, 3, 4, 5]
배열[0]                       // 첫 번째 요소
배열.길이                      // 배열 길이
배열.추가(6)                  // 요소 추가
배열.필터(함수)                // 필터링
```

**다음 단계**: Step 6 → 객체와 구조체

---

### **6️⃣ Step 6: 객체와 구조체 (40분)**

**전제 조건**: Step 1-5 완료

**학습 내용**:
- 객체 생성과 속성
- 구조체 정의
- 메서드 추가

**학습 파일**:
```
step6-objects/
├── README.md
├── 1-objects.free
├── 2-structs.free
├── 3-methods.free
├── exercises.md
└── solution.free
```

**핵심 개념**:
```freelang
구조체 사용자 {
  이름: 문자열
  나이: 숫자
}

변수 kim = 사용자 {
  이름: "김철수",
  나이: 30
}

kim.이름
kim.나이
```

**다음 단계**: Step 7 → 문자열과 정규식

---

### **7️⃣ Step 7: 문자열과 정규식 (45분)**

**전제 조건**: Step 1-6 완료

**학습 내용**:
- 문자열 메서드
- 문자열 템플릿
- 정규식 기본

**학습 파일**:
```
step7-strings/
├── README.md
├── 1-string-methods.free
├── 2-string-templates.free
├── 3-regex-basics.free
├── exercises.md
└── solution.free
```

**핵심 개념**:
```freelang
변수 텍스트 = "안녕하세요"
텍스트.길이
텍스트.포함("안녕")
텍스트.대문자()
텍스트.소문자()
```

**다음 단계**: Step 8 → 모듈과 라이브러리

---

### **8️⃣ Step 8: 모듈과 라이브러리 (40분)**

**전제 조건**: Step 1-7 완료

**학습 내용**:
- 모듈 import/export
- 표준 라이브러리 사용
- 외부 패키지 활용

**학습 파일**:
```
step8-modules/
├── README.md
├── 1-import-export.free
├── 2-stdlib.free
├── 3-external-packages.free
├── exercises.md
└── solution.free
```

**핵심 개념**:
```freelang
임포트 "모듈명"
익스포트 함수 함수명() {}

// K-StdLib 사용
문자열_concat("안녕", "하세요")
배열_필터([1,2,3], 함수)
수학_덧셈(10, 20)
```

**다음 단계**: Step 9 → 에러 처리와 디버깅

---

### **9️⃣ Step 9: 에러 처리와 디버깅 (35분)**

**전제 조건**: Step 1-8 완료

**학습 내용**:
- try/catch 예외 처리
- 에러 타입과 메시지
- 디버깅 기법

**학습 파일**:
```
step9-error-handling/
├── README.md
├── 1-try-catch.free
├── 2-error-types.free
├── 3-debugging.free
├── exercises.md
└── solution.free
```

**핵심 개념**:
```freelang
시도 {
  // 위험한 코드
} 잡기 (에러) {
  // 에러 처리
}
```

**다음 단계**: Step 10 → 실전 프로젝트

---

### **🔟 Step 10: 실전 프로젝트 (60분)**

**전제 조건**: Step 1-9 완료

**학습 내용**:
- 계산기 만들기
- TODO 앱 만들기
- 웹 스크래핑

**학습 파일**:
```
step10-projects/
├── README.md
├── project1-calculator.free
├── project2-todo-app.free
├── project3-web-scraper.free
└── solutions/
    ├── calculator-solution.free
    ├── todo-app-solution.free
    └── web-scraper-solution.free
```

**프로젝트 1: 계산기**
```freelang
함수 계산(a, 연산자, b) {
  만약 연산자 == "+" {
    반환 a + b
  }
  // ...
}
```

**프로젝트 2: TODO 앱**
```
할일 목록 관리 프로그램
- 할일 추가
- 할일 완료 표시
- 할일 삭제
- 할일 목록 출력
```

**프로젝트 3: 웹 스크래핑**
```
웹 페이지에서 데이터 추출
- HTTP 요청
- HTML 파싱
- 데이터 추출
```

---

## 📊 학습 시간표

| Step | 제목 | 난이도 | 시간 | 누적 |
|------|------|--------|------|------|
| 1 | 안녕, 프리랭! | ⭐ | 20분 | 20분 |
| 2 | 변수와 자료형 | ⭐ | 30분 | 50분 |
| 3 | 조건문과 반복문 | ⭐⭐ | 40분 | 1시간 30분 |
| 4 | 함수 정의와 호출 | ⭐⭐ | 40분 | 2시간 10분 |
| 5 | 배열 다루기 | ⭐⭐ | 35분 | 2시간 45분 |
| 6 | 객체와 구조체 | ⭐⭐⭐ | 40분 | 3시간 25분 |
| 7 | 문자열과 정규식 | ⭐⭐⭐ | 45분 | 4시간 10분 |
| 8 | 모듈과 라이브러리 | ⭐⭐⭐ | 40분 | 4시간 50분 |
| 9 | 에러 처리와 디버깅 | ⭐⭐⭐⭐ | 35분 | 5시간 25분 |
| 10 | 실전 프로젝트 | ⭐⭐⭐⭐ | 60분 | 6시간 25분 |

---

## 🎯 학습 추천 경로

### 경로 1: 완전 초보자 (모든 Step)
```
Step 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10
소요 시간: 6시간 25분
```
**추천**: 가장 완전한 학습

### 경로 2: 프로그래밍 경험자 (스킵)
```
Step 1 → 2 → 4 (Skip 3) → 5 → 6 → 7 → 8 → 9 → 10
소요 시간: 5시간 45분
```
**추천**: 조건문은 자명하므로 스킵

### 경로 3: 빠른 학습 (핵심만)
```
Step 1 → 2 → 4 → 5 → 10
소요 시간: 2시간 45분
```
**추천**: 핵심 개념만 학습

### 경로 4: 심화 학습 (모든 단계)
```
Step 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 (추가 연습)
소요 시간: 8시간 이상
```
**추천**: 모든 개념을 깊이 있게 학습

---

## ✅ 각 Step 완료 체크리스트

### Step 1 완료 기준
- [ ] K-FreeLang 설치 완료
- [ ] 첫 프로그램 실행 성공
- [ ] 한글 출력 가능
- [ ] 연습 문제 3개 해결

### Step 2 완료 기준
- [ ] 변수 선언 및 사용 가능
- [ ] 기본 연산자 이해
- [ ] 연습 문제 3개 해결

### Step 3 완료 기준
- [ ] if/else 조건문 작성 가능
- [ ] for/while 반복문 작성 가능
- [ ] 연습 문제 4개 해결

### Step 4 완료 기준
- [ ] 함수 정의 및 호출 가능
- [ ] 재귀 함수 이해
- [ ] 연습 문제 4개 해결

### Step 5 완료 기준
- [ ] 배열 생성 및 접근 가능
- [ ] 배열 메서드 사용 가능
- [ ] 연습 문제 3개 해결

### Step 6 완료 기준
- [ ] 구조체 정의 및 사용 가능
- [ ] 객체 속성 접근 가능
- [ ] 연습 문제 3개 해결

### Step 7 완료 기준
- [ ] 문자열 메서드 사용 가능
- [ ] 정규식 기본 이해
- [ ] 연습 문제 3개 해결

### Step 8 완료 기준
- [ ] 모듈 import/export 이해
- [ ] 표준 라이브러리 사용 가능
- [ ] 연습 문제 3개 해결

### Step 9 완료 기준
- [ ] try/catch 예외 처리 가능
- [ ] 에러 메시지 이해
- [ ] 연습 문제 2개 해결

### Step 10 완료 기준
- [ ] 계산기 프로젝트 완성
- [ ] TODO 앱 프로젝트 완성
- [ ] 1개 이상의 추가 프로젝트 완성

---

## 🎁 보너스 자료

### 추가 학습 자료
- 📖 `resources/CHEATSHEET.md` - 문법 요약
- 📚 `resources/KEYWORDS.md` - 한글 키워드 목록
- ❓ `resources/FAQ.md` - 자주 묻는 질문
- 🆘 `resources/TROUBLESHOOTING.md` - 문제 해결

### 실제 예제
- 🔢 `examples/fibonacci.free` - 피보나치 수열
- ➕ `examples/factorial.free` - 팩토리얼
- 🔀 `examples/bubble-sort.free` - 버블 정렬
- 🔍 `examples/binary-search.free` - 이진 탐색

---

## 🏆 학습 완료 후

### 다음 단계
1. **Essential Libraries 배우기** - 594개 함수 활용
2. **실제 프로젝트 구현** - 자신만의 애플리케이션
3. **커뮤니티 참여** - 다른 학습자와 공유
4. **오픈소스 기여** - K-FreeLang 개선

### 커뮤니티 활동
- 🐛 버그 발견 시 GitHub Issues에 보고
- 💡 기능 제안하기 (GitHub Discussions)
- 🤝 다른 학습자 돕기
- 📚 자신의 프로젝트 공유하기

---

## 📞 도움받기

### 문제가 있을 때
1. `resources/TROUBLESHOOTING.md` 확인
2. `resources/FAQ.md` 읽어보기
3. GitHub Issues에 질문하기
4. GitHub Discussions에서 토론하기

### 빠른 도움
```bash
# 문법 도움
kfreelang --help

# 버전 확인
kfreelang --version

# 문서 열기
https://kimjindol2025.github.io/freelang-korean
```

---

## 🎓 인증서

모든 10 Step을 완료하면:
- ✅ K-FreeLang 공식 학습 인증서 획득
- 🏆 GitHub에 배지 추가
- 💼 이력서에 추가 가능
- 🎉 커뮤니티에 인정받기

---

**지금 바로 [Step 1](step1-hello-korean/README.md)을 시작하세요! 🚀**

```bash
cd step1-hello-korean
kfreelang 1-hello.free
```

**Happy Learning! 🎉**

Made with ❤️ for Korean Developers | MIT License © 2026
