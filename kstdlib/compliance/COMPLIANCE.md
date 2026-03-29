# 🛡️ K-StdLib Compliance & Security Module

FreeLang v2 기반의 **완전한 데이터 검증, 규제 준수, 보안 보호** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ validate.fl - 데이터 검증

#### 일반 검증 (8개 함수)
- `is_email()` - 이메일 주소 검증
- `is_url()` - URL 형식 검증
- `is_ipv4()` - IPv4 주소 검증 (범위 확인)
- `is_ipv6()` - IPv6 주소 검증
- `is_phone()` - 일반 전화번호 검증
- `is_credit_card()` - 신용카드 번호 검증 (Luhn 알고리즘)
- `is_strong_password()` - 강력한 비밀번호 검증
- `validate_file_path()` - 파일 경로 traversal 방지

#### 한국형 검증 (3개 함수)
- `is_rrn()` - 주민등록번호 검증 (Luhn 알고리즘)
- `is_brn()` - 사업자등록번호 검증
- `is_korean_phone()` - 한국 전화번호 검증 (010/031 등)

#### 개인정보 보호 (2개 함수)
- `mask_pii()` - 개인정보 마스킹 (email/phone/rrn, PIPA 준수)

#### Rate Limiting (3개 함수)
- `create_rate_limiter()` - Rate limiter 생성
- `is_rate_limited()` - 요청 제한 확인
- `increment_rate_limit()` - 요청 카운트 증가

---

### 2️⃣ security.fl - 보안 기능

#### 보안 헤더 (8개 함수)
- `get_hsts_header()` - HSTS (HTTP Strict Transport Security)
- `get_csp_header()` - CSP (Content Security Policy)
- `get_default_csp()` - 기본 CSP 정책
- `get_cors_header()` - CORS 헤더
- `get_x_frame_options_header()` - X-Frame-Options (Clickjacking 방지)
- `get_x_content_type_options_header()` - X-Content-Type-Options (MIME sniffing 방지)
- `get_x_xss_protection_header()` - X-XSS-Protection
- `get_referrer_policy_header()` - Referrer-Policy
- `get_permissions_policy_header()` - Permissions-Policy
- `get_all_security_headers()` - 모든 보안 헤더 한번에 생성

#### 공격 방지 (4개 함수)
- `is_sql_injection_attempt()` - SQL Injection 패턴 감지
- `escape_html()` - HTML escape (XSS 방지)
- `escape_javascript()` - JavaScript string escape
- `url_encode()` - URL 인코딩

#### CSRF 방지 (2개 함수)
- `generate_csrf_token()` - CSRF 토큰 생성
- `verify_csrf_token()` - CSRF 토큰 검증

#### 파일 업로드 & 입력 보안 (2개 함수)
- `is_safe_file_upload()` - 안전한 파일 확장자 검증
- `sanitize_input()` - 입력 문자열 정제

#### 기타 (1개 함수)
- `compare_password_hash()` - 비밀번호 해시 검증

---

## 📊 함수 통계

| 파일 | 함수 수 | 구분 |
|------|--------|------|
| **validate.fl** | 16개 | 데이터 검증, 한국형 검증, PIPA, Rate Limiting |
| **security.fl** | 20개 | 보안 헤더, 공격 방지, CSRF, 파일 업로드 |
| **합계** | **36개** | Phase 2 Compliance |

---

## 🎯 사용 사례

### 회원가입 폼 검증

```freelang
function validate_signup(email: string, password: string, phone: string) -> bool {
  if !is_email(email) {
    print("유효한 이메일이 아닙니다");
    return false;
  }

  if !is_strong_password(password) {
    print("8자 이상의 대소문자, 숫자, 특수문자를 포함해야 합니다");
    return false;
  }

  if !is_korean_phone(phone) {
    print("유효한 한국 전화번호가 아닙니다");
    return false;
  }

  return true;
}
```

### API 보안 설정

```freelang
// 모든 보안 헤더 자동 생성
var security_headers = get_all_security_headers();

// 개별 헤더 생성
var hsts = get_hsts_header(31536000, true);  // 1년, 서브도메인 포함
var csp = get_csp_header(get_default_csp());
var x_frame = get_x_frame_options_header();
```

### 입력 검증 및 정제

```freelang
var user_input = "<script>alert('XSS')</script>";

// XSS 방지
var safe_input = sanitize_input(user_input);
// 결과: &lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;

// SQL Injection 감지
var suspicious = "' OR '1'='1";
if is_sql_injection_attempt(suspicious) {
  print("SQL Injection 시도 감지");
}
```

### CSRF 방지

```freelang
// 토큰 생성
var csrf_token = generate_csrf_token("user123-session456");

// 토큰 검증
if verify_csrf_token(request_token, csrf_token) {
  print("유효한 요청");
}
```

### 개인정보 마스킹 (PIPA 준수)

```freelang
// 이메일 마스킹
var email = "user@example.com";
var masked_email = mask_pii(email, "email");
// 결과: u****@example.com

// 전화번호 마스킹
var phone = "010-1234-5678";
var masked_phone = mask_pii(phone, "phone");
// 결과: 010-****-5678

// 주민등록번호 마스킹
var rrn = "123456-1234567";
var masked_rrn = mask_pii(rrn, "rrn");
// 결과: 123456-1******
```

### 파일 업로드 검증

```freelang
function handle_file_upload(filename: string) -> bool {
  var allowed = "jpg,png,pdf,doc,docx";

  if !is_safe_file_upload(filename, allowed) {
    print("허용되지 않는 파일 형식입니다");
    return false;
  }

  print("파일 업로드 허용");
  return true;
}
```

### Rate Limiting

```freelang
var limiter = create_rate_limiter(100, 3600);  // 1시간당 100개 요청

function handle_api_request() {
  if is_rate_limited(limiter) {
    print("요청 제한 초과 (HTTP 429)");
    return;
  }

  limiter = increment_rate_limit(limiter);
  // API 요청 처리
}
```

---

## 🔐 보안 특징

### 데이터 검증
- ✅ 이메일, URL, IP, 전화번호 형식 검증
- ✅ 신용카드 Luhn 알고리즘
- ✅ 강력한 비밀번호 요구사항
- ✅ 주민등록번호 체크디지트 검증
- ✅ 파일 경로 traversal 방지

### 규제 준수 (Compliance)
- ✅ **PIPA** (개인정보보호법) - 개인정보 마스킹
- ✅ **GDPR** 호환 (Rate Limiting, 데이터 마스킹)
- ✅ **PCI DSS** (신용카드 검증, 암호화)
- ✅ **OWASP Top 10** 공격 방지:
  - SQL Injection 패턴 감지
  - XSS (Cross-Site Scripting) 방지
  - CSRF (Cross-Site Request Forgery) 방지
  - Clickjacking 방지 (X-Frame-Options)
  - MIME sniffing 방지

### HTTP 보안 헤더
- **HSTS** - HTTPS 강제
- **CSP** - Content Security Policy
- **X-Frame-Options** - Clickjacking 방지
- **X-Content-Type-Options** - MIME sniffing 방지
- **X-XSS-Protection** - XSS 필터
- **Referrer-Policy** - 참조자 정보 제한
- **Permissions-Policy** - 브라우저 기능 제한

---

## ✅ Phase 2 Compliance 완료 항목

- ✅ 데이터 검증 (8개 함수)
- ✅ 한국형 검증 (3개 함수, RRN/BRN/한국 전화)
- ✅ 개인정보 마스킹 (PIPA 준수)
- ✅ Rate Limiting (3개 함수)
- ✅ 보안 헤더 (10개 함수)
- ✅ 공격 방지 (SQL Injection, XSS, CSRF, Clickjacking)
- ✅ 파일 업로드 검증
- ✅ 입력 정제 및 인코딩
- ✅ **총 36개 함수 완성**

---

## 📈 Phase 2 요약

| 모듈 | 파일 | 함수 | 상태 |
|------|------|------|------|
| Crypto | otp.fl, encoding.fl, tls.fl | 33개 | ✅ 완료 |
| Compliance | validate.fl, security.fl | 36개 | ✅ 완료 |
| **Phase 2 합계** | **5개 파일** | **69개 함수** | **✅ 완료** |

---

**생성일**: 2026-03-30
**버전**: Phase 2 - Compliance & Security Complete
**다음**: Phase 3 - 신규 한국형 기능 (kstring, kdate, kaddress, audit logging)
