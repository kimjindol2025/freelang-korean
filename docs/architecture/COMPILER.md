# K-FreeLang 컴파일러 아키텍처

**버전**: v1.0 (Week 2-3)
**마지막 업데이트**: 2026-03-27

---

## 📋 목차

1. [개요](#개요)
2. [5단계 파이프라인](#5단계-파이프라인)
3. [렉서 (Lexer)](#렉서-lexer)
4. [파서 (Parser)](#파서-parser)
5. [시맨틱 분석 (Semantic Analysis)](#시맨틱-분석-semantic-analysis)
6. [코드 생성 (Code Generation)](#코드-생성-code-generation)
7. [컴파일러 (Compiler)](#컴파일러-compiler)
8. [예제](#예제)

---

## 개요

K-FreeLang 컴파일러는 한글 프로그래밍 언어를 JavaScript/WebAssembly로 변환합니다.

```
K-FreeLang 소스코드
    ↓
렉서 (Tokenize)
    ↓
파서 (Parse)
    ↓
시맨틱 분석 (Analyze)
    ↓
코드 생성 (Generate)
    ↓
컴파일러 (Compile)
    ↓
실행 가능한 코드 (JavaScript/WASM)
```

---

## 5단계 파이프라인

### Stage 1️⃣: 렉서 (Lexer)

**입력**: 문자열 (K-FreeLang 소스코드)
**출력**: 토큰 배열

```
변수 x = 10

↓ (렉서)

[
  { type: 'VAR', value: '변수' },
  { type: 'IDENTIFIER', value: 'x' },
  { type: 'EQUAL', value: '=' },
  { type: 'NUMBER', value: '10' },
  { type: 'EOF', value: '' }
]
```

**구현**: `src/compiler/korean-lexer.ts`
- 한글/영문 키워드 인식
- 47개 토큰 타입
- 주석 제거
- 개행 추적

### Stage 2️⃣: 파서 (Parser)

**입력**: 토큰 배열
**출력**: AST (추상 구문 트리)

```
토큰 배열

↓ (파서)

Program {
  statements: [
    VariableDeclaration {
      name: 'x',
      typeAnnotation: 'number',
      value: Literal { value: 10 }
    }
  ]
}
```

**구현**: `src/compiler/korean-parser.ts`
- 재귀 하강 파싱 (Recursive Descent)
- P0/P1/P2 한글 문법 지원
- Match expression 패턴 매칭
- Enum variant type 지원

**AST 노드 타입**:
- Statement: VariableDeclaration, FunctionDeclaration, IfStatement, ForStatement, etc.
- Expression: BinaryExpression, CallExpression, ArrayLiteral, ObjectLiteral, MatchExpression
- Pattern: IdentifierPattern, LiteralPattern, RangePattern, WildcardPattern, OrPattern

### Stage 3️⃣: 시맨틱 분석 (Semantic Analysis)

**입력**: AST
**출력**: 주석이 달린 AST (타입 정보 포함)

```
AST

↓ (시맨틱 분석)

VariableDeclaration {
  name: 'x',
  typeAnnotation: 'number',
  value: Literal {
    value: 10,
    inferredType: 'number'  ← 타입 정보 추가
  }
}
```

**구현**: `src/compiler/korean-semantic-analyzer.ts`
- 심볼 테이블 관리
- 타입 검증
- 스코프 분석
- 타입 추론
- 미사용 변수 경고

**검증 항목**:
- 변수 중복 선언
- 타입 불일치
- 함수 인자 개수
- 반환 타입 검증
- 접근 권한 (public/private)

### Stage 4️⃣: 코드 생성 (Code Generation)

**입력**: 주석이 달린 AST
**출력**: IR (중간 코드) 또는 JavaScript

```
주석이 달린 AST

↓ (코드 생성)

IR:
  LoadConst 10
  StoreVar 'x'
  Return

또는

JavaScript:
  let x = 10;
```

**구현**: `src/bootstrap/ir-generator.fl` (K-FreeLang 자가호스팅)
- IR 명령어 24개
- 기본 블록 생성
- 함수/클래스/특성 코드 생성
- 라벨 및 분기 관리

**IR 명령어 예시**:
```
LoadConst 10      // 상수 로드
StoreVar x        // 변수 저장
LoadVar x         // 변수 로드
Add               // 덧셈
Call func         // 함수 호출
Jump label_1      // 점프
JumpIfFalse label_2  // 조건 점프
Return            // 반환
```

### Stage 5️⃣: 컴파일러 (Compiler)

**입력**: IR 또는 JavaScript
**출력**: 실행 가능한 코드

```
IR/JavaScript

↓ (컴파일러)

JavaScript 또는 WebAssembly

↓ (실행)

결과
```

**구현**: `src/compiler/codegen.ts` (JavaScript 타겟)
- IR → JavaScript 변환
- 최적화 (간단한 수준)
- 소스맵 생성
- Tree-shaking

---

## 렉서 (Lexer)

### 한글 키워드 매핑

| 한글 | 영문 | 토큰 타입 |
|------|------|----------|
| 변수 | let | VAR |
| 함수 | fn | FN |
| 반환 | return | RETURN |
| 만약 | if | IF |
| 반복 | for | FOR |
| 아니면 | else | ELSE |
| 조건 | match | MATCH |
| 열거형 | enum | ENUM |
| 구현 | impl | IMPL |
| 특성 | trait | TRAIT |

### 토큰 타입 (47개)

**기본 토큰**:
- IDENTIFIER, NUMBER, STRING, NEWLINE, EOF

**연산자**:
- PLUS, MINUS, STAR, SLASH, PERCENT
- EQ (==), NE (!=), LT, LE, GT, GE
- AND (&&), OR (||), NOT (!)
- ARROW (→), COLON, SEMICOLON, COMMA, DOT

**괄호**:
- LPAREN, RPAREN, LBRACE, RBRACE, LBRACKET, RBRACKET

**P0 키워드** (8개):
- VAR, RETURN, IF, FN, FOR, ELSE, TYPE, CONST

**P1 키워드** (12개):
- USE, MATCH, TRY, THROW, NAMESPACE, INTERFACE, DROP, ENUM, IMPL, TRAIT, MUT, REF

**P2 키워드** (15+):
- ASYNC, AWAIT, SPAWN, SYNC, LOCK, MUTEX, SEMAPHORE, CHANNEL, UNSAFE, MACRO, GENERIC, LIFETIME, PATTERN, EXTEND, MOD, PUB, STATIC, INHERIT

### 렉서 실행 예

```
입력:
변수 이름 = "김프리랭"

출력:
[
  { type: 'VAR', value: '변수', korean: true },
  { type: 'IDENTIFIER', value: '이름', korean: true },
  { type: 'EQUAL', value: '=' },
  { type: 'STRING', value: '김프리랭' },
  { type: 'EOF', value: '' }
]
```

---

## 파서 (Parser)

### 파싱 기법: 재귀 하강 (Recursive Descent)

```
parseProgram()
  ├─ parseStatement()
  │  ├─ parseVariableDeclaration()
  │  ├─ parseFunctionDeclaration()
  │  ├─ parseIfStatement()
  │  └─ parseExpressionStatement()
  └─ parseExpression()
     ├─ parseAssignment()
     ├─ parseLogicalOr()
     ├─ parseLogicalAnd()
     └─ parsePrimary()
```

### 문법 규칙 (간단한 형태)

```ebnf
program         = statement*
statement       = varDeclaration
                | functionDeclaration
                | ifStatement
                | forStatement
                | returnStatement
                | expressionStatement

varDeclaration  = '변수' IDENTIFIER '=' expression
functionDeclaration = '함수' IDENTIFIER '(' parameters ')' '->' type '{' statements '}'
ifStatement     = '만약' expression '{' statements '}' ('아니면' '{' statements '}')?
forStatement    = '반복' IDENTIFIER '=' expression ';' expression ';' expression '{' statements '}'

expression      = assignment
assignment      = logicalOr ('=' logicalOr)*
logicalOr       = logicalAnd ('||' logicalAnd)*
logicalAnd      = equality ('&&' equality)*
equality        = relational ('==' | '!=' relational)*
relational      = additive ('<' | '<=' | '>' | '>=' additive)*
additive        = multiplicative ('+' | '-' multiplicative)*
multiplicative  = unary ('*' | '/' | '%' unary)*
unary           = ('!' | '-') unary | postfix
postfix         = primary ('(' arguments ')' | '[' expression ']' | '.' IDENTIFIER)*
primary         = NUMBER | STRING | IDENTIFIER | '(' expression ')'
                | arrayLiteral | objectLiteral | matchExpression
```

### Match Expression 파싱

```freelang
조건 값 {
  패턴 1 → "하나"
  패턴 2 → "둘"
  패턴 _ → "기타"
}
```

**파싱 트리**:
```
MatchExpression {
  expression: Identifier 'x',
  arms: [
    MatchArm {
      pattern: LiteralPattern 1,
      body: Literal "하나"
    },
    MatchArm {
      pattern: LiteralPattern 2,
      body: Literal "둘"
    },
    MatchArm {
      pattern: WildcardPattern,
      body: Literal "기타"
    }
  ]
}
```

---

## 시맨틱 분석 (Semantic Analysis)

### 심볼 테이블

```
Scope: Global
├─ 변수 x: { type: 'number', mutable: true }
├─ 변수 y: { type: 'string', mutable: false }
└─ 함수 add: {
     type: 'function',
     paramTypes: ['number', 'number'],
     returnType: 'number'
   }

Scope: add()
├─ 변수 a: { type: 'number', mutable: false }
└─ 변수 b: { type: 'number', mutable: false }
```

### 타입 검증

```
변수 x: 숫자 = "문자열"  ← 타입 불일치 오류!

Error: 타입 불일치
  예상: 숫자
  실제: 문자열
  위치: line 1, column 18
```

### 스코프 관리

```
전역 스코프
├─ 블록 스코프 (if문)
│  ├─ 변수 a
│  └─ 변수 b (여기만 유효)
└─ 함수 스코프 (함수 f)
   └─ 변수 c
```

---

## 코드 생성 (Code Generation)

### IR 명령어 목록 (24개)

| 카테고리 | 명령어 | 설명 |
|---------|--------|------|
| 메모리 | LoadConst, LoadVar, StoreVar, LoadGlobal, StoreGlobal | 변수 로드/저장 |
| 연산 | Add, Sub, Mul, Div, Mod, Eq, Ne, Lt, Le, Gt, Ge, And, Or, Not | 산술/논리 연산 |
| 제어 | Jump, JumpIfFalse, JumpIfTrue, Call, Return, Throw | 점프/호출/반환 |
| 자료구조 | CreateArray, CreateObject, IndexGet, IndexSet | 배열/객체 |
| 함수 | DefineFunction, DefineClass, Impl | 정의 |
| 기타 | Cast, TypeOf, Nop, Label | 타입 변환 등 |

### 예제: 변수 선언 코드 생성

```freelang
변수 x = 10 + 20

↓ (IR 생성)

LoadConst 10
LoadConst 20
Add
StoreVar 'x'
```

```freelang
→ (JavaScript 코드 생성)

let x = 10 + 20;
```

### 예제: 함수 호출

```freelang
함수 add(a: 숫자, b: 숫자) → 숫자 {
  반환 a + b
}

변수 결과 = add(5, 3)

↓ (IR 생성)

DefineFunction 'add'
  LoadVar 'a'
  LoadVar 'b'
  Add
  Return

LoadConst 5
LoadConst 3
Call 'add'
StoreVar '결과'
```

---

## 컴파일러 (Compiler)

### 컴파일 프로세스

```typescript
class KoreanCompiler {
  compile(sourceCode: string): string {
    // 1단계: 렉싱
    const lexer = new KoreanLexer(sourceCode);
    const tokens = lexer.tokenize();

    // 2단계: 파싱
    const parser = new KoreanParser(sourceCode);
    const ast = parser.parse();

    // 3단계: 시맨틱 분석
    const analyzer = new SemanticAnalyzer();
    analyzer.analyze(ast);

    // 4단계: 코드 생성
    const irGenerator = new IRGenerator();
    const ir = irGenerator.generate(ast);

    // 5단계: 컴파일
    const codeGen = new JavaScriptCodeGen();
    const jsCode = codeGen.generate(ir);

    return jsCode;
  }
}
```

### 커맨드라인 사용

```bash
# 파일 컴파일
k-freelang compile program.free -o output.js

# 파일 실행
k-freelang run program.free

# REPL 실행
k-freelang repl
```

---

## 예제

### 예제 1: 간단한 프로그램

```freelang
// 입력
변수 이름 = "K-FreeLang"
출력(이름)
```

**컴파일 과정**:

1. **렉싱**:
```
VAR, IDENTIFIER("이름"), EQUAL, STRING("K-FreeLang"),
IDENTIFIER("출력"), LPAREN, IDENTIFIER("이름"), RPAREN
```

2. **파싱**:
```
Program [
  VariableDeclaration {
    name: "이름",
    value: Literal "K-FreeLang"
  },
  ExpressionStatement {
    expression: CallExpression {
      callee: Identifier "출력",
      arguments: [Identifier "이름"]
    }
  }
]
```

3. **시맨틱 분석**:
```
심볼 테이블: { "이름": { type: "string" } }
타입 검증 완료
```

4. **코드 생성** (IR):
```
LoadConst "K-FreeLang"
StoreVar "이름"
LoadVar "이름"
Call "출력"
```

5. **컴파일** (JavaScript):
```javascript
let 이름 = "K-FreeLang";
출력(이름);
```

### 예제 2: 함수와 조건문

```freelang
함수 절대값(n: 숫자) → 숫자 {
  만약 n < 0 {
    반환 -n
  } 아니면 {
    반환 n
  }
}

변수 결과 = 절대값(-5)
출력(결과)
```

**최종 JavaScript**:
```javascript
function 절대값(n) {
  if (n < 0) {
    return -n;
  } else {
    return n;
  }
}

let 결과 = 절대값(-5);
출력(결과);
```

---

## 최적화

### 현재 지원하는 최적화

1. **상수 폴딩** (Constant Folding)
   ```
   10 + 20 → 30 (컴파일 타임 계산)
   ```

2. **데드 코드 제거** (Dead Code Elimination)
   ```
   반환 1
   출력("도달하지 않는 코드")  ← 제거됨
   ```

3. **라벨 최적화** (Label Optimization)
   ```
   Jump label_1
   label_1:  ← 불필요한 라벨 제거
   ```

### 미래 계획

- Loop unrolling
- Inlining
- Escape analysis
- JIT compilation

---

## 오류 처리

### 컴파일 오류

```
SyntaxError: 예상치 못한 토큰
  at line 5, column 10
  근처: 함수 foo(a: 숫자) {

TypeError: 타입 불일치
  예상: 숫자
  실제: 문자열
  at line 3, column 15

ReferenceError: 정의되지 않은 변수 'x'
  at line 2, column 5
```

### 런타임 오류

```
ReferenceError: undefined variable 'foo'
TypeError: not a function 'bar'
RangeError: maximum call stack exceeded
```

---

## 성능

### 컴파일 속도

- 작은 파일 (< 1KB): < 10ms
- 중간 파일 (1-100KB): 10-100ms
- 큰 파일 (> 100KB): 100ms-1s

### 런타임 성능

- JavaScript 백엔드: Native JavaScript 속도 (V8 최적화)
- WebAssembly 백엔드: C/C++ 수준 성능

---

## 자가호스팅 (Self-Hosting)

K-FreeLang 컴파일러 일부는 K-FreeLang으로 작성되어 있습니다.

```
freelang-korean-independent/src/bootstrap/
├── ir-generator.fl          # K-FreeLang으로 작성된 IR 생성기
├── codegen.free             # 코드 생성기 스켈레톤
└── vm.free                  # 간단한 VM 구현
```

이는 컴파일러의 자가 컴파일 가능성을 입증합니다.

---

## 관련 문서

- [한글 문법 명세](KOREAN_SYNTAX_v1.0.md)
- [K-StdLib API](../api/STDLIBS.md)
- [튜토리얼](../tutorials/)

---

**버전**: v1.0
**마지막 업데이트**: 2026-03-27
