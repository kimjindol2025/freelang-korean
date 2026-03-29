# 📖 FreeLang API 명세서

**버전**: V2.0
**완성도**: 85%

---

## 목차

1. [타입 시스템](#타입-시스템)
2. [기본 함수](#기본-함수)
3. [표준 라이브러리](#표준-라이브러리)
4. [런타임 API](#런타임-api)

---

## 타입 시스템

### 기본 타입

| 타입 | 예제 | 설명 |
|------|------|------|
| `int` | `42` | 정수 |
| `float` | `3.14` | 부동소수점 |
| `string` | `"hello"` | 문자열 |
| `bool` | `true` | 불린 |
| `array<T>` | `[1, 2, 3]` | 배열 |
| `map<K, V>` | `{"a": 1}` | 맵 |
| `fn` | `fn(x) { x }` | 함수 |

### 고급 타입

```freelang
// Generic Types
let arr: array<int> = [1, 2, 3];

// Union Types
let x: int | string = 42;

// Option Type
let opt: option<int> = some(42);

// Result Type
let res: result<int, string> = ok(42);
```

---

## 기본 함수

### 출력

```freelang
println(value)      // 값을 출력하고 줄바꿈
print(value)        // 값을 출력만 함
```

### 타입 변환

```freelang
to_int(x)           // 정수로 변환
to_float(x)         // 실수로 변환
to_string(x)        // 문자열로 변환
```

### 배열 함수

```freelang
len(array)          // 길이
push(array, x)      // 요소 추가
pop(array)          // 마지막 요소 제거
map(array, fn)      // 각 요소에 함수 적용
filter(array, fn)   // 조건에 맞는 요소만
```

---

## 표준 라이브러리

### io (입출력)

```freelang
import io;

io.read_line()      // 한 줄 입력
io.read_file(path)  // 파일 읽기
io.write_file(path, content)  // 파일 쓰기
```

### math (수학)

```freelang
import math;

math.sqrt(x)        // 제곱근
math.pow(x, y)      // x^y
math.abs(x)         // 절댓값
math.max(a, b)      // 최댓값
```

### string (문자열)

```freelang
import string;

string.length(s)    // 길이
string.upper(s)     // 대문자
string.lower(s)     // 소문자
string.split(s, delim)  // 분할
```

### http (네트워크)

```freelang
import http;

http.get(url)       // GET 요청
http.post(url, body)  // POST 요청
```

### async (비동기)

```freelang
async fn work() {
    let result = await some_async_task();
}

wait_seconds(n)     // n초 대기
```

---

## 런타임 API

### 컴파일 & 실행

```bash
# 파일 컴파일
freelang compile input.fl -o output

# 직접 실행
freelang run input.fl

# REPL 모드
freelang repl
```

### REST API

```bash
# 코드 실행
curl -X POST http://localhost:8080/compile \
  -H "Content-Type: application/json" \
  -d '{"code": "println(42)"}'

# 응답
{
  "output": "42",
  "error": null,
  "execTime": 0.032
}
```

---

**상태**: 📖 완성 (기본 명세서)
**다음**: 상세 레퍼런스는 docs/tutorials/ 참고

