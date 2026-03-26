# K-FreeLang 심화 최적화 및 아키텍처

**작성일**: 2026-03-27
**버전**: v1.0 (심화)
**대상**: 컴파일러/최적화 엔지니어

---

## 📋 목차

1. [IR 최적화 파이프라인](#ir-최적화-파이프라인)
2. [심볼 테이블 통합](#심볼-테이블-통합)
3. [타입 추론 시스템](#타입-추론-시스템)
4. [제네릭 타입 처리](#제네릭-타입-처리)
5. [동시성 최적화](#동시성-최적화)
6. [메모리 레이아웃 최적화](#메모리-레이아웃-최적화)

---

## IR 최적화 파이프라인

### 1단계: 상수 폴딩 (Constant Folding)

컴파일 타임에 계산 가능한 표현식을 미리 계산합니다.

```
입력 IR:
  LoadConst(10)
  LoadConst(20)
  Add
  LoadConst(30)
  Add
  StoreVar(result)

출력 IR (최적화 후):
  LoadConst(60)          // (10 + 20) + 30 = 60
  StoreVar(result)
```

**알고리즘:**
```
for each block:
  for i = 0 to len(instructions)-2:
    if instructions[i] = LoadConst(a) AND
       instructions[i+1] = LoadConst(b) AND
       instructions[i+2] in {Add, Sub, Mul, Div, Eq, Lt, ...}:
      result = evaluate(a, op, b)
      replace 3 instructions with LoadConst(result)
      advance i by 2
```

**성능 개선:**
- 루프 내 상수: 3-5배 (루프 반복 수에 따라)
- 전역 상수: 10-100배 (계산 복잡도에 따라)

### 2단계: 데드 코드 제거 (Dead Code Elimination)

실행되지 않는 코드를 제거합니다.

```
입력:
  Return(42)
  LoadVar(x)      ← 도달 불가능
  Add
  StoreVar(y)     ← 도달 불가능

출력:
  Return(42)      ← 나머지 제거됨
```

**알고리즘:**
```
for each block:
  for i = 0 to len(instructions):
    if instructions[i] in {Return, Throw, Jump}:
      remove all instructions after i
      break
```

### 3단계: 도달 불가능 블록 제거

연결되지 않은 블록을 제거합니다.

```
블록 구조:
  entry → L0 → L1 → (exit)
          ↓
          L2 (도달 불가능)

최적화 후:
  entry → L0 → L1 → (exit)
  (L2 제거됨)
```

**알고리즘: BFS (너비 우선 탐색)**
```
reachable = {}
queue = [start_block]
reachable[start_block] = true

while queue not empty:
  current = queue.pop()
  for next_block in [current.next_block, current.branch_block]:
    if next_block not in reachable:
      reachable[next_block] = true
      queue.push(next_block)

// 도달 불가능한 블록 제거
for each block in blocks:
  if block not in reachable:
    remove block
```

### 4단계: 라벨 최적화

불필요한 라벨과 블록을 병합합니다.

```
최적화 전:
  L0: LoadConst(1)
      Jump(L1)
  L1: LoadVar(x)
      Jump(L2)
  L2: Return

최적화 후:
  L0: LoadConst(1)
      LoadVar(x)
      Return
```

---

## 심볼 테이블 통합

### 구조

```
SymbolTable
├── GlobalScope
│   ├── Variables
│   ├── Functions
│   ├── Types
│   └── Modules
└── ScopeStack
    ├── BlockScope (제어 흐름)
    ├── FunctionScope
    └── ClassScope
```

### IR 생성 중 심볼 추적

```freelang
함수 IR생성_변수선언(ctx, 이름, 초기값) {
  // 1. 심볼 등록
  symbol = {
    name: 이름,
    type: "local",
    index: ctx.심볼테이블.length
  }
  ctx.심볼테이블[이름] = symbol

  // 2. IR 생성
  IR명령어_추가("StoreVar", [이름])

  // 3. 타입 정보 기록
  ctx.타입정보[이름] = 초기값의_타입()
}
```

### 타입 호환성 검사

```
타입 호환성 행렬:
         | number | string | bool | array<T> |
---------|--------|--------|------|----------|
number   | ✓      | ✗      | ✗    | ✗        |
string   | ✗      | ✓      | ✗    | ✗        |
bool     | ✗      | ✗      | ✓    | ✗        |
array<T> | ✗      | ✗      | ✗    | ✓ (if T match) |
```

---

## 타입 추론 시스템

### Hindley-Milner 타입 추론

```
함수 foo(x) → ... {
  변수 y = x + 1        // x: number 추론
  변수 z = y > 0        // z: bool 추론
  반환 z
}

추론 단계:
1. x + 1 → x: number (Add 연산)
2. y > 0 → bool (비교 연산)
3. 반환 타입 → bool
```

### 제약 수집 및 해결

```
제약:
  ∀ x: t1, y: t2, z: t3
  t1 ~ number (x + 1에서)
  t2 ~ bool (y > 0에서)
  t3 ~ t2 (반환값)

해결:
  x: number
  y: bool
  z: bool
```

---

## 제네릭 타입 처리

### 제네릭 파라미터 바인딩

```
선언:
  함수<T> foo(x: T) → T { ... }

호출:
  foo(42)        → foo<number>(42)
  foo("hello")   → foo<string>("hello")

단식화:
  foo<number>: (x: number) → number
  foo<string>: (x: string) → string
```

### 타입 경계 (Type Bounds)

```
함수<T: Display> print(x: T) {
  // T는 Display 특성을 구현해야 함
}

where 절:
  함수<T, U> zip(a: T[], b: U[])
  where
    T: Eq,
    U: Clone
  { ... }
```

---

## 동시성 최적화

### Lock Contention 분석

```
원본 코드:
  락 {
    배열[i] = i
    배열[i+1] = i+1
    배열[i+2] = i+2
  }

최적화:
  배열[i] = i
  배열[i+1] = i+1
  배열[i+2] = i+2
  // 독립적이므로 lock 필요 없음
```

### 채널 최적화

```
원본:
  for i in 0..1000000:
    channel <- i

최적화:
  배열 = []
  for i in 0..1000000:
    배열.add(i)
  // 배치 처리로 채널 오버헤드 감소
```

---

## 메모리 레이아웃 최적화

### 구조체 필드 정렬

```
최적화 전:
  struct User {
    이름: 문자열,        // 8바이트 (포인터)
    나이: 숫자,          // 4바이트 (int32)
    // 4바이트 패딩
    활성: 참거짓,        // 1바이트 (bool)
    // 7바이트 패딩
  }
  // 총 32바이트

최적화 후:
  struct User {
    이름: 문자열,        // 8바이트
    나이: 숫자,          // 4바이트
    활성: 참거짓,        // 1바이트
    // 3바이트 패딩
  }
  // 총 16바이트 (50% 감소)
```

### 캐시 라인 정렬

```
CPU 캐시 라인: 64바이트

정렬 전:
  struct Item { 가격: 숫자 }  // 8바이트
  배열[0] offset: 0 (캐시 라인 0)
  배열[1] offset: 8 (캐시 라인 0)
  배열[8] offset: 64 (캐시 라인 1)

정렬 후:
  struct Item { 가격: 숫자, _padding: [56]byte }  // 64바이트
  배열[0] offset: 0 (캐시 라인 0)
  배열[1] offset: 64 (캐시 라인 1)
  // 캐시 히트율 향상
```

---

## 🎯 최적화 우선순위

| 순위 | 최적화 | 효과 | 복잡도 |
|------|--------|------|--------|
| 1 | 상수 폴딩 | 높음 | 낮음 |
| 2 | 데드 코드 제거 | 중간 | 낮음 |
| 3 | 루프 불변식 추출 | 높음 | 중간 |
| 4 | 강도 감소 | 중간 | 중간 |
| 5 | 인라인 함수 | 높음 | 높음 |
| 6 | 벡터화 | 높음 | 높음 |

---

## 📊 최적화 결과 분석

```bash
# 최적화 전/후 비교
$ k-freelang compile program.free --optimize --stats

Optimization Results:
  Instructions: 1000 → 650 (-35%)
  Blocks: 50 → 35 (-30%)
  Labels: 40 → 15 (-62%)

Improvement:
  Binary size: 50KB → 32KB
  Runtime: 1250ms → 800ms (-36%)
  Memory: 16MB → 12MB (-25%)
```

---

**다음 단계**: [타겟 코드 생성](./codegen.md)
