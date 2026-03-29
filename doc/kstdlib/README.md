# 🇰🇷 K-StdLib - 한국형 표준 라이브러리

FreeLang v2 기반의 **한국 개발자를 위한** 표준 라이브러리입니다.

---

## 📦 Phase 1: 기본 표준 라이브러리 (완료)

### stdlibs/ - 기본 함수 모음
| 모듈 | 함수 | 설명 |
|------|------|------|
| **math.fl** | `abs()`, `max()`, `min()`, `pow()` | 수학 함수 |
| | `is_odd()`, `is_even()` | 홀짝 판별 |
| **array.fl** | `reverse()`, `index_of()`, `max()`, `min()` | 배열 조작 |
| | `sum()`, `contains()` | 배열 분석 |
| **string.fl** | `concat()`, `starts_with()`, `ends_with()` | 문자열 비교 |
| | `index_of()`, `contains()`, `repeat()` | 문자열 검색/조작 |
| | `is_empty()` | 문자열 확인 |
| **json.fl** | `encode_array()`, `encode_string()` | JSON 인코딩 |
| | `encode_number()`, `encode_bool()` | JSON 기본 지원 |
| **io.fl** | `print_values()`, `printf()` | 형식화된 출력 |
| | `print_error()`, `print_warning()` | 오류/경고 메시지 |
| | `print_info()`, `print_debug()` | 정보/디버그 메시지 |
| **date.fl** | `now()`, `now_millis()`, `now_micros()` | 현재 시간 |
| | `seconds_to_minutes()` 등 | 시간 단위 변환 |
| | `is_leap_year()`, `days_in_month()` | 날짜 계산 |

### proof/ - 증명 시스템
| 모듈 | 함수 | 설명 |
|------|------|------|
| **proof.fl** | `create_proof()`, `verify_proof()` | 증명 생성/검증 |
| | `verify_code()`, `is_proof_valid()` | 코드 검증 |
| | `create_proof_chain()`, `verify_proof_chain()` | 증명 체인 |
| | `merge_proofs()`, `finalize_proof()` | 증명 조합/완무 |

---

## 📋 Phase 2: Crypto & Compliance (계획)

### crypto/ - 암호화 모듈
- **otp.fl**: TOTP/HOTP (일회용 비밀번호)
- **encoding.fl**: Base64, Hex, Base32 인코딩
- **cipher.fl**: SEED/ARIA 암호화 (한국 표준)

### compliance/ - 규제 준수 모듈
- **validator.fl**:
  - `isRRN()` - 주민등록번호 검증
  - `isBRN()` - 사업자등록번호 검증
  - `isKoreanPhone()` - 한국 전화번호 검증
- **pipa.fl**: 개인정보 마스킹 (PIPA)
- **audit.fl**: 감사 로그 기록

---

## 📋 Phase 3: 신규 설계 (계획)

### stdlibs 확장
- **kstring.fl**: 한국어 자모 분석 (초성, 중성, 종성)
- **kdate.fl**: 음력/양력 변환
- **kaddress.fl**: 주소 분석 (도/시/구)

---

## 🚀 사용 방법

```freelang
// 모듈 임포트 (향후 지원)
use "kstdlib/stdlibs/math" as math;
use "kstdlib/proof/proof" as proof;

// 함수 사용
var result = math.abs(-10);  // 10
var proof = proof.create_proof("code");

// 배열 함수
var arr = [1, 2, 3, 4, 5];
var max_val = array.max(arr);  // 5
var total = array.sum(arr);     // 15

// 문자열 함수
var msg = "hello";
if string.starts_with(msg, "hel") {
  print("OK");
}

// 날짜 함수
var seconds = date.minutes_to_seconds(5);  // 300
```

---

## 📊 구조 설명

```
kstdlib/
├── stdlibs/           # 기본 표준 라이브러리
│   ├── math.fl       # 수학 함수
│   ├── array.fl      # 배열 함수
│   ├── string.fl     # 문자열 함수
│   ├── json.fl       # JSON 처리
│   ├── io.fl         # 입출력
│   └── date.fl       # 날짜/시간
├── crypto/           # 암호화 (Phase 2)
├── compliance/       # 규제 준수 (Phase 2)
├── proof/            # 증명 시스템 (Phase 1)
│   └── proof.fl
└── README.md         # 이 파일
```

---

## ✅ 테스트 상태

| 항목 | 상태 | 통과율 |
|------|------|--------|
| **stdlibs** | ✅ Phase 1 완성 | 6/6 모듈 |
| **proof** | ✅ Phase 1 완성 | 1/1 모듈 |
| **crypto** | ⏳ Phase 2 예정 | 0% |
| **compliance** | ⏳ Phase 2 예정 | 0% |

---

## 🎯 다음 단계

1. **모듈 시스템 통합** - `use` 선언문 지원
2. **Phase 2 구현** - Crypto & Compliance
3. **Phase 3 구현** - 신규 한국형 기능
4. **문서 확충** - 사용 예제 추가

---

**생성일**: 2026-03-30
**버전**: v1.0-Phase1
**라이선스**: MIT
