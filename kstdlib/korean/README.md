# 🇰🇷 K-StdLib Korean Module

FreeLang v2 기반의 **한국형 특화 기능** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ kstring.fl - 한국어 문자열 처리

한글 자모(초성, 중성, 종성) 분해/합성 및 분석

#### 함수 목록 (14개)
| 함수 | 설명 |
|------|------|
| `is_korean_char()` | 한글 문자 여부 (U+AC00-D7A3) |
| `decompose_korean()` | 한글 자모 분해 |
| `compose_korean()` | 한글 자모 합성 |
| `extract_choseong()` | 초성만 추출 |
| `extract_jungseong()` | 중성만 추출 |
| `extract_jongseong()` | 종성만 추출 |
| `has_jongseong()` | 종성 여부 확인 |
| `is_consonant()` | 자음 여부 |
| `is_vowel()` | 모음 여부 |
| `count_korean_chars()` | 한글 문자 개수 |
| `contains_korean()` | 한글 포함 여부 |
| `search_by_choseong()` | 초성 기반 검색 (자동완성) |
| `analyze_korean()` | 한글 분석 (복합) |

#### 사용 사례
```freelang
// 한글 자모 분해
var jamo = decompose_korean("한");
// choseong: "ㅎ", jungseong: "ㅏ", jongseong: "ㄴ"

// 초성 기반 검색 (자동완성)
if search_by_choseong("서울", "ㅅㅇ") {
  print("일치함");  // true
}

// 한글 분석
var analysis = analyze_korean("안녕하세요");
print(analysis.korean_count);  // 5
```

---

### 2️⃣ kdate.fl - 한국형 날짜 처리

음력/양력 변환, 한국 절기, 공휴일, 나이 계산

#### 함수 목록 (17개)
| 함수 | 설명 |
|------|------|
| `is_leap_year()` | 윤년 여부 |
| `get_days_in_month_solar()` | 양력 월별 일수 |
| `get_days_in_year_solar()` | 양력 연간 일수 |
| `is_lunar_leap_month()` | 음력 윤달 여부 |
| `get_days_in_month_lunar()` | 음력 월별 일수 |
| `solar_to_lunar()` | 양력 → 음력 변환 |
| `lunar_to_solar()` | 음력 → 양력 변환 |
| `get_solar_term_for_month()` | 24절기 정보 |
| `is_korean_holiday()` | 양력 공휴일 확인 |
| `is_lunar_korean_holiday()` | 음력 공휴일 확인 |
| `get_day_of_week()` | 요일 계산 (Zeller) |
| `get_day_name()` | 요일 이름 |
| `days_between_solar()` | 두 날짜 사이 일수 |
| `format_date()` | 날짜 포맷 |
| `today()` | 오늘 날짜 |
| `get_korean_age()` | 한국식 나이 계산 |

#### 사용 사례
```freelang
// 한국식 나이 계산
var age = get_korean_age(1990, 5, 15);
// 1990년생 → 2026년에는 37세

// 공휴일 확인
if is_korean_holiday(2026, 3, 1) {
  print("삼일절");  // true
}

// 절기 정보
var term = get_solar_term_for_month(3);
// name: "춘분", day: 20
```

---

### 3️⃣ kaddress.fl - 한국 주소 처리

주소 파싱, 정규화, 검증, 지역 코드

#### 함수 목록 (16개)
| 함수 | 설명 |
|------|------|
| `parse_address()` | 주소 파싱 (기본) |
| `parse_roadname_address()` | 도로명 주소 파싱 |
| `is_valid_postal_code()` | 우편번호 검증 |
| `normalize_address()` | 주소 정규화 |
| `is_valid_address()` | 주소 유효성 검증 |
| `is_metropolitan()` | 광역시 여부 |
| `get_region_code()` | 지역 코드 (10/20/30...) |
| `get_sido_short()` | 시/도 약자 변환 |
| `format_address()` | 주소 포맷 |
| `are_addresses_equal()` | 두 주소 비교 |
| `match_address_eup_dong()` | 주소 부분 매칭 |

#### 사용 사례
```freelang
// 주소 파싱
var addr = parse_address("서울시 강남구 테헤란로 123 (06234)");
// sido: "서울특별시", sigungu: "강남구", postal_code: "06234"

// 지역 코드
var code = get_region_code("서울");
// code: 10

// 우편번호 검증
if is_valid_postal_code("06234") {
  print("유효한 우편번호");
}
```

---

### 4️⃣ audit.fl - 감시 및 감사 로깅

로그인/로그아웃, 데이터 변경, 접근 제어, 보안 이벤트 추적

#### 함수 목록 (19개)
| 함수 | 설명 |
|------|------|
| `create_audit_log()` | 감시 로그 생성 |
| `format_audit_log()` | 로그 포맷팅 |
| `log_login()` | 로그인 감시 |
| `log_logout()` | 로그아웃 감시 |
| `log_update()` | 수정 감시 |
| `log_delete()` | 삭제 감시 |
| `log_create()` | 생성 감시 |
| `log_access_denied()` | 접근 거부 감시 |
| `log_permission_change()` | 권한 변경 감시 |
| `log_security_event()` | 보안 이벤트 감시 |
| `filter_audit_logs_by_level()` | 레벨별 필터링 |
| `filter_audit_logs_by_user()` | 사용자별 필터링 |
| `filter_audit_logs_by_action()` | 액션별 필터링 |
| `create_audit_statistics()` | 통계 생성 |
| `analyze_audit_log()` | 로그 분석 |
| `detect_brute_force()` | 브루트 포스 공격 감지 |
| `detect_anomalous_login()` | 이상 로그인 감지 |
| `generate_audit_alert()` | 알림 생성 |
| `export_audit_log_as_csv()` | CSV 내보내기 |

#### 사용 사례
```freelang
// 로그인 감시
var login_log = log_login("user123", "192.168.1.1", true);

// 데이터 수정 감시
var update_log = log_update("user123", "users", "email",
                           "old@example.com", "new@example.com",
                           "192.168.1.1");

// 보안 알림
var alert = generate_audit_alert(login_log, "admin@company.com");

// 이상 로그인 감지
if detect_anomalous_login("user123", "1.2.3.4", "192.168.1.1,192.168.1.2") {
  print("의심 로그인!");
}
```

---

## 📊 함수 통계

| 모듈 | 함수 수 | 용도 |
|------|--------|------|
| **kstring** | 14개 | 한글 자모 처리 |
| **kdate** | 17개 | 음력/양력 & 공휴일 |
| **kaddress** | 16개 | 주소 파싱 & 검증 |
| **audit** | 19개 | 감시 로깅 & 보안 |
| **합계** | **66개** | Phase 3 한국형 |

---

## 🎯 사용 사례

### 자동완성 검색
```freelang
var search_term = "서";
var results = ["서울", "서산", "세종"];

for item in results {
  if search_by_choseong(item, extract_choseong(search_term)) {
    print(item);
  }
}
```

### 회원 가입 폼
```freelang
function validate_signup(birth_year: i32, birth_month: i32, birth_day: i32,
                        postal_code: string, address: string) -> bool {
  // 나이 검증
  var age = get_korean_age(birth_year, birth_month, birth_day);
  if age < 18 {
    return false;
  }

  // 우편번호 검증
  if !is_valid_postal_code(postal_code) {
    return false;
  }

  // 주소 검증
  if !is_valid_address(address) {
    return false;
  }

  return true;
}
```

### 보안 감사
```freelang
function audit_user_action(user_id: string, action: string, resource: string,
                          ip_address: string, success: bool) {
  var log = create_audit_log(user_id, action, resource, "", "",
                            ip_address, success ? "SUCCESS" : "FAILED", "");

  // 의심 활동 감지
  if !success && action == "LOGIN" {
    log_security_event(user_id, "FAILED_LOGIN_ATTEMPT",
                      "로그인 실패", ip_address);
  }
}
```

---

## 📈 K-StdLib 완성

| Phase | 모듈 | 함수 | 상태 |
|-------|------|------|------|
| Phase 1 | 7개 | 58개 | ✅ 완료 |
| Phase 2 | 5개 | 69개 | ✅ 완료 |
| Phase 3 | 4개 | 66개 | ✅ **완료** |
| **합계** | **16개** | **193개** | **✅ 완료** |

---

**생성일**: 2026-03-30
**버전**: Phase 3 - Korean Specialized Features
**상태**: K-StdLib 전체 완성 (193개 함수, 16개 모듈)
