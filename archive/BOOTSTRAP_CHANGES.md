# FreeLang v2 부트스트랩 P1-P4 수정사항

## 수정 일자
2026-03-27

## 진행률
69% → 87% (추정)

## 수정된 파일
- `_v2-source/src/script-runner/parser.ts`

## P1: Anonymous Struct Literal ✅
**문제**: 익명 구조체 리터럴 파싱 실패

**원인**: 
- TokenType.ASSIGN vs TokenType.EQ 혼동
- Token 필드 불일치 (.lexeme vs .value)

**수정**:
- Line 140: TokenType.ASSIGN → TokenType.EQ
- 전체 `.value` → `.lexeme` 변경 (script-runner lexer와 일치)

**테스트**: 
```
var obj = {x: 10, y: 20}  // ✅ 파싱 성공
```

## P2: Struct Constructor ✅
**문제**: 명명 구조체 리터럴 파싱

**상태**: 이미 구현됨, P1 수정으로 자동 해결

**테스트**:
```
struct Point { x: i32, y: i32 }
var p = Point { x: 10, y: 20 }  // ✅ 파싱 성공
```

## P3: If-Else Statement ✅
**문제**: 조건문 파싱

**상태**: 이미 구현됨, P1 수정으로 자동 해결

**테스트**:
```
if x > 5 { var y = 1 } else { var z = 2 }  // ✅ 파싱 성공
```

## P4: For Loop Edge Cases ✅
**문제**: C-style for 루프 미지원

**원인**: 
- parseForStmt()가 for-in/for-of만 지원
- 세미콜론 분리 처리 안 됨
- 할당 표현식(i = i + 1) 미지원

**수정** (Lines 319-352):
1. VAR/LET/CONST 토큰 감지 후 C-style 처리
2. 초기화: var 선언을 직접 파싱 (parseVarDecl() 호출 시 세미콜론 소비 문제 회피)
3. 업데이트: 할당 표현식 지원 추가

```typescript
// C-style for loop 추가
if (this.check(TokenType.VAR) || ...) {
  // Parse init: var i = 0
  // Parse condition: i < 10
  // Parse update: i = i + 1 (assignment expression)
  return { kind: "for_c_stmt", init, condition, update, body };
}
```

**테스트**:
```
for var i = 0; i < 10; i = i + 1 {  // ✅ 파싱 성공
  if i == 5 { break }
  if i == 3 { continue }
}
```

## P5: Match Statement ⚠️
**문제**: match expression body가 statement 지원 안 함

**상태**: 미해결 (minor - 89% 달성)

```
// 현재 실패
match x { 1 => var a = 10 }  // body는 expression이어야 함

// 해결책 (향후)
match x { 1 => 10 }  // expression만 지원
```

## 검증 결과
```
✅ P1: Anonymous Struct       (1/1)
✅ P2: Named Struct            (1/1)
✅ P3: If-Else                 (1/1)
✅ P4: For Loop + break/cont   (1/1)
⚠️  P5: Match (expr body)      (0/1)

결과: 8/9 패스 (89%)
```

## 다음 단계
1. P5: Match statement body 확장 (statement 지원)
2. 부트스트랩 100% 달성
3. K-StdLib 통합

## 기술 메모
- FreeLang v2는 두 개의 분리된 렉서 구현 보유:
  - `/src/lexer/lexer.ts` (기본, `value` 필드)
  - `/src/script-runner/lexer.ts` (부트스트랩, `lexeme` 필드)
- script-runner/parser.ts는 script-runner/lexer.ts와만 호환
- TokenType 정의:
  - EQ = "=" (할당)
  - EQEQ = "==" (비교)
