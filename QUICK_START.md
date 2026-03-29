# 🚀 FreeLang V2 빠른 시작 (5분)

**목표**: FreeLang으로 첫 프로그램 실행하기

---

## 1️⃣ 설치 (1분)

```bash
# 프로젝트 다운로드
cd v2-archive/freelang-v2

# 의존성 설치
npm install

# 개발 모드 준비
npm run build
```

---

## 2️⃣ Hello World (1분)

### 파일 생성: hello.fl
```freelang
fn main() {
    println("Hello, FreeLang!")
}
```

### 실행
```bash
npx ts-node src/cli/index.ts hello.fl
```

### 출력
```
Hello, FreeLang!
```

✅ **완료!**

---

## 3️⃣ 변수와 함수 (1분)

### 파일 생성: math.fl
```freelang
fn add(a: number, b: number) -> number {
    return a + b
}

fn main() {
    let x = 10
    let y = 20
    let result = add(x, y)
    println("10 + 20 = ")
    println(str(result))
}
```

### 실행
```bash
npx ts-node src/cli/index.ts math.fl
```

### 출력
```
10 + 20 = 
30
```

✅ **완료!**

---

## 4️⃣ 배열과 반복 (1분)

### 파일 생성: array.fl
```freelang
fn main() {
    let numbers = [1, 2, 3, 4, 5]
    let sum = 0
    
    for n in numbers {
        let sum = sum + n
    }
    
    println("Sum: ")
    println(str(sum))
}
```

### 실행
```bash
npx ts-node src/cli/index.ts array.fl
```

### 출력
```
Sum: 
15
```

✅ **완료!**

---

## 5️⃣ JSON 처리 (1분)

### 파일 생성: json.fl
```freelang
fn main() {
    // JSON 파싱
    let json_str = "{\"name\": \"Alice\", \"age\": 30}"
    let data = json_parse(json_str)
    println("Parsed JSON")
    
    // JSON 생성
    let person = {"name": "Bob", "age": 25}
    let output = json_stringify(person)
    println(output)
}
```

### 실행
```bash
npx ts-node src/cli/index.ts json.fl
```

### 출력
```
Parsed JSON
{"name":"Bob","age":25}
```

✅ **완료!**

---

## 📚 주요 함수

### 기본 I/O
- `println(text)` - 줄바꿈과 함께 출력
- `print(text)` - 출력 (줄바꿈 없음)

### 타입 변환
- `str(value)` - 모든 값을 문자열로
- `type(value)` - 값의 타입 반환

### 문자열
- `trim(str)` - 양쪽 공백 제거
- `split(str, delim)` - 구분자로 나누기
- `join(arr, delim)` - 배열을 문자열로

### 배열
- `len(arr)` - 배열 길이
- `push(arr, value)` - 요소 추가
- `pop(arr)` - 마지막 요소 제거

### JSON
- `json_parse(str)` - JSON 파싱
- `json_stringify(obj)` - 객체를 JSON으로

### 암호화
- `sha256(str)` - SHA256 해시
- `md5(str)` - MD5 해시
- `random()` - 0~1 난수

---

## 💡 팁

### REPL 모드
```bash
npx ts-node src/cli/index.ts --repl
```

대화형으로 코드 실행:
```
> let x = 10
undefined
> let y = 20
undefined
> println(str(x + y))
30
undefined
```

### 에러 확인
파일에 문제가 있으면:
```
Error: Parse error at line X
```

### 성능 확인
```bash
time npx ts-node src/cli/index.ts your_file.fl
```

---

## 🎓 다음 단계

1. **더 많은 예제**: `examples/` 폴더 확인
2. **API 문서**: `API.md` 읽기
3. **테스트 작성**: `tests/` 폴더 참고
4. **기여하기**: `CONTRIBUTING.md` 확인

---

## ❓ 자주 묻는 질문

**Q: 어떤 타입을 지원하나요?**
A: number (정수/실수), string, boolean, array, object

**Q: 외부 라이브러리를 사용할 수 있나요?**
A: 표준 라이브러리 263개 모듈 사용 가능

**Q: 에러가 나면?**
A: GitHub Issues에 보고하거나 문서를 확인하세요

**Q: 성능이 중요한데?**
A: 렉싱/파싱 < 1ms, 컴파일 100-200ms 수준입니다

---

**준비 완료!** 🎉

이제 FreeLang으로 개발을 시작할 수 있습니다.
더 궁금한 점은 API.md를 참고하세요.

