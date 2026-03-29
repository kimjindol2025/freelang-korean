# 🛡️ K-StdLib Compliance Module

FreeLang v2 기반의 **데이터 검증 및 보안 준수** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### validate.fl - 데이터 검증 및 규제 준수

#### 일반 검증 함수 (10개)

| 함수 | 설명 |
|------|------|
| `is_email()` | 이메일 주소 검증 |
| `is_url()` | URL 형식 검증 (http/https/ftp) |
| `is_ipv4()` | IPv4 주소 검증 (0-255) |
| `is_ipv6()` | IPv6 주소 검증 |
| `is_phone()` | 일반 전화번호 검증 |
| `is_credit_card()` | 신용카드 번호 검증 (Luhn) |
| `is_strong_password()` | 강력한 비밀번호 검증 |
| `validate_file_path()` | 파일 경로 traversal 방지 |

#### 한국형 검증 함수 (3개)

| 함수 | 설명 |
|------|------|
| `is_rrn()` | 주민등록번호 검증 (Luhn) |
| `is_brn()` | 사업자등록번호 검증 |
| `is_korean_phone()` | 한국 전화번호 검증 (010/031 등) |

#### 개인정보 보호 (PIPA 준수)

| 함수 | 설명 |
|------|------|
| `mask_pii()` | 개인정보 마스킹 (email/phone/rrn) |

#### Rate Limiting

| 함수 | 설명 |
|------|------|
| `create_rate_limiter()` | Rate limiter 생성 |
| `is_rate_limited()` | 요청 제한 확인 |
| `increment_rate_limit()` | 요청 카운트 증가 |

---

## 🎯 사용 사례

### 회원가입 폼 검증

```freelang
function validate_signup(email: string, password: string, phone: string) -> bool {
  // 이메일 검증
  if !is_email(email) {
    print("유효한 이메일이 아닙니다");
    return false;
  }

  // 강력한 비밀번호 검증
  if !is_strong_password(password) {
    print("8자 이상의 대소문자, 숫자, 특수문자를 포함해야 합니다");
    return false;
  }

  // 한국 전화번호 검증
  if !is_korean_phone(phone) {
    print("유효한 한국 전화번호가 아닙니다");
    return false;
  }

  return true;
}
```

### API 요청 Rate Limiting

```freelang
var limiter = create_rate_limiter(100, 3600);  // 1시간당 100개 요청

function handle_api_request() {
  if is_rate_limited(limiter) {
    print("요청 제한 초과");
    return;
  }

  limiter = increment_rate_limit(limiter);
  // 요청 처리
}
```

### 개인정보 마스킹 (PIPA 준수)

```freelang
var email = "user@example.com";
var masked = mask_pii(email, "email");
// 결과: u****@example.com

var phone = "010-1234-5678";
var masked = mask_pii(phone, "phone");
// 결과: 010-****-5678

var rrn = "123456-1234567";
var masked = mask_pii(rrn, "rrn");
// 결과: 123456-1******
```

### 주민등록번호 검증

```freelang
if is_rrn("123456-1234567") {
  print("유효한 주민등록번호");
}
```

### 신용카드 결제 검증

```freelang
if is_credit_card("4532-1234-5678-9010") {
  print("유효한 신용카드");
}
```

---

## 📊 함수 통계

| 구분 | 개수 |
|------|------|
| 일반 검증 | 8개 |
| 한국형 검증 | 3개 |
| 개인정보 보호 | 2개 |
| Rate Limiting | 3개 |
| **합계** | **16개** |

---

## 🔐 보안 기능

### 1. 주민등록번호 (RRN) 검증
- Luhn 알고리즘 기반 체크디지트 검증
- 형식: XXXXXX-XXXXXXX
- 대만 신분증, 태국 신분증도 유사 검증 가능

### 2. 사업자등록번호 (BRN) 검증
- 한국 국세청 공식 사업자등록번호 형식
- 형식: XXX-XX-XXXXX

### 3. 한국 전화번호 검증
- 휴대폰: 010, 011, 016-019 시작
- 지역번호: 02, 031, 032 등 시작
- 형식: 010-1234-5678 또는 02-123-4567

### 4. 개인정보 마스킹 (PIPA 준수)
- 이메일: first@domain.com → f****@domain.com
- 전화번호: 010-1234-5678 → 010-****-5678
- 주민등록번호: 123456-1234567 → 123456-1******

### 5. 파일 경로 검증 (Security)
- 절대 경로 차단 (/)
- 상위 디렉토리 접근 차단 (..)
- Null byte 공격 방지

### 6. Rate Limiting
- 시간 윈도우 기반 요청 제한
- 설정 가능한 limit과 window_seconds

---

## ✅ Phase 2 Compliance 완료 항목

- ✅ 일반 검증 (이메일, URL, IP, 전화, 신용카드, 비밀번호)
- ✅ 한국형 검증 (주민번호, 사업자번호, 한국 전화)
- ✅ 개인정보 마스킹 (PIPA 준수)
- ✅ 파일 경로 보안
- ✅ Rate Limiting
- ✅ 16개 함수 완성

---

**생성일**: 2026-03-30
**버전**: Phase 2 - Compliance
**다음**: Phase 3 - 신규 한국형 기능 (kstring, kdate, kaddress)
