# 🔐 K-StdLib Crypto Module

FreeLang v2 기반의 **암호화 및 보안 통신** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ otp.fl - 일회용 비밀번호 (OTP)

#### TOTP (Time-based OTP)
```freelang
// TOTP 설정
var config = create_otp_config("JBSWY3DPEBLW64TMMQ", 6);

// TOTP 생성
var token = generate_totp(config.secret, 30);

// TOTP 검증 (±1 time step 허용)
if verify_totp(config.secret, 123456, 30) {
  print("인증 성공");
}
```

#### HOTP (HMAC-based OTP)
```freelang
// HOTP 생성 (카운터 기반)
var token = generate_hotp("secret", 0);

// HOTP 검증
if verify_hotp("secret", 0, 123456) {
  print("검증 성공");
}
```

#### 함수 목록
| 함수 | 설명 |
|------|------|
| `generate_totp()` | 시간 기반 OTP 생성 |
| `verify_totp()` | TOTP 검증 (±1 허용) |
| `generate_hotp()` | 카운터 기반 OTP 생성 |
| `verify_hotp()` | HOTP 검증 |
| `create_otp_config()` | OTP 설정 생성 |
| `setup_totp()` | 사용자 TOTP 설정 |
| `get_provisioning_uri()` | QR 코드용 URI |
| `generate_secret()` | 시크릿 키 생성 |
| `is_valid_secret()` | 시크릿 검증 |

---

### 2️⃣ encoding.fl - 데이터 인코딩

#### Hex 인코딩
```freelang
var hex = hex_encode("hello");      // "68656C6C6F"
var data = hex_decode("68656C6C6F"); // "hello"
```

#### Base64 인코딩
```freelang
var b64 = base64_encode("hello");      // "aGVsbG8="
var data = base64_decode("aGVsbG8=");  // "hello"
```

#### Base32 인코딩
```freelang
var b32 = base32_encode("hello");      // "NBSWY3DP"
var data = base32_decode("NBSWY3DP");  // "hello"
```

#### 함수 목록
| 함수 | 설명 |
|------|------|
| `hex_encode()` | 문자열 → Hex |
| `hex_decode()` | Hex → 문자열 |
| `base64_encode()` | 문자열 → Base64 |
| `base64_decode()` | Base64 → 문자열 |
| `base32_encode()` | 문자열 → Base32 |
| `base32_decode()` | Base32 → 문자열 |
| `url_safe_base64_encode()` | URL Safe Base64 |
| `is_valid_hex()` | Hex 유효성 확인 |
| `is_valid_base64()` | Base64 유효성 확인 |
| `is_valid_base32()` | Base32 유효성 확인 |

---

### 3️⃣ tls.fl - TLS/SSL 설정

#### TLS 설정
```freelang
// 최신 TLS 1.3
var config = create_tls13_config();

// TLS 1.2
var config = create_tls12_config();

// 기본값
var config = create_default_tls_config();

// 커스텀
var config = set_tls_version("1.3");
config = set_cipher_suite(config, "AES-256-GCM");
config = set_verify_mode(config, true);
```

#### 인증서 관리
```freelang
// 자체 서명 인증서
var cert = create_self_signed_cert("example.com");

// 인증서 검증
if is_certificate_valid(cert) {
  print("유효한 인증서");
}

// 인증서 정보
var info = get_certificate_info(cert);
```

#### 함수 목록
| 함수 | 설명 |
|------|------|
| `create_default_tls_config()` | 기본 TLS 설정 |
| `create_tls12_config()` | TLS 1.2 설정 |
| `create_tls13_config()` | TLS 1.3 설정 |
| `set_tls_version()` | TLS 버전 설정 |
| `set_cipher_suite()` | Cipher Suite 설정 |
| `set_verify_mode()` | 인증서 검증 활성화 |
| `create_certificate()` | 인증서 생성 |
| `create_self_signed_cert()` | 자체 서명 인증서 |
| `is_certificate_valid()` | 인증서 유효성 확인 |
| `is_certificate_expired()` | 만료 확인 |
| `verify_certificate_chain()` | 인증서 체인 검증 |
| `get_hsts_header()` | HSTS 헤더 생성 |
| `get_csp_header()` | CSP 헤더 생성 |

---

## 📊 함수 통계

| 모듈 | 함수 수 | 구분 |
|------|--------|------|
| **otp.fl** | 9개 | OTP 생성/검증 |
| **encoding.fl** | 10개 | Base64/Hex/Base32 |
| **tls.fl** | 14개 | TLS/인증서 |
| **합계** | 33개 | Phase 2 Crypto |

---

## 🎯 사용 사례

### 2FA (2-Factor Authentication)
```freelang
// 사용자 등록
var user_config = setup_totp("user@example.com");
var qr_uri = get_provisioning_uri(user_config, "user@example.com");

// 로그인 시 검증
if verify_totp(user_config.secret, input_token, 30) {
  print("2FA 인증 성공");
}
```

### API 토큰 인코딩
```freelang
// Base64로 토큰 인코딩
var token = "api_key_1234567890";
var encoded = base64_encode(token);

// 디코딩
var decoded = base64_decode(encoded);
```

### HTTPS 서버 설정
```freelang
// TLS 설정
var config = get_recommended_config();

// 자체 서명 인증서
var cert = create_self_signed_cert("localhost");

// 보안 헤더
var hsts = get_hsts_header(31536000);  // 1년
var csp = get_csp_header();
```

---

## ✅ Phase 2 Crypto 완료 항목

- ✅ OTP (TOTP/HOTP) 구현
- ✅ 인코딩 (Base64/Hex/Base32)
- ✅ TLS/SSL 설정 및 인증서
- ✅ 보안 헤더 생성
- ✅ 33개 함수 완성

---

**생성일**: 2026-03-30
**버전**: Phase 2 - Crypto
**다음**: Phase 3 - Compliance & 한국형 기능
