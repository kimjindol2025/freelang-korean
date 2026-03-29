# 🧪 K-StdLib Testing Framework

FreeLang v2 기반의 **종합 테스트 프레임워크** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ test.fl - 테스트 기본 (11개 함수)

테스트 케이스 정의, 테스트 스위트 관리, 테스트 실행 및 리포팅

#### 테스트 상태
| 함수 | 설명 |
|------|------|
| `get_test_status_passed()` | PASSED 상태 |
| `get_test_status_failed()` | FAILED 상태 |
| `get_test_status_skipped()` | SKIPPED 상태 |
| `get_test_status_pending()` | PENDING 상태 |

#### 테스트 케이스
| 함수 | 설명 |
|------|------|
| `create_test_case(test_name, test_function)` | 테스트 케이스 생성 |
| `run_test_case(test_case)` | 테스트 케이스 실행 |
| `mark_test_failed(test_case, error_message)` | 테스트 실패 표시 |
| `skip_test_case(test_case)` | 테스트 건너뛰기 |

#### 테스트 스위트
| 함수 | 설명 |
|------|------|
| `create_test_suite(suite_name)` | 테스트 스위트 생성 |
| `add_test_to_suite(suite, test_case)` | 스위트에 테스트 추가 |
| `start_test_suite(suite)` | 스위트 실행 시작 |
| `finish_test_suite(suite)` | 스위트 실행 완료 |
| `register_test_result(suite, result)` | 테스트 결과 등록 |

#### 테스트 보고서
| 함수 | 설명 |
|------|------|
| `create_test_report(report_name)` | 테스트 보고서 생성 |
| `merge_suite_to_report(report, suite)` | 스위트 결과 병합 |
| `all_tests_passed(report)` | 모든 테스트 통과 확인 |

#### 정보 조회
| 함수 | 설명 |
|------|------|
| `get_test_case_info(test_case)` | 테스트 케이스 정보 |
| `get_test_suite_info(suite)` | 테스트 스위트 정보 |
| `get_test_report_info(report)` | 테스트 보고서 정보 |

---

### 2️⃣ assertions.fl - 검증 (13개 함수)

단정(Assertions) - 값 검증, 조건 확인

#### 동등성 검증
| 함수 | 설명 |
|------|------|
| `assert_equal(expected, actual)` | 동등성 검증 (==) |
| `assert_equal_int(expected, actual)` | 정수 동등성 검증 |
| `assert_not_equal(not_expected, actual)` | 부등성 검증 (!=) |

#### 참/거짓 검증
| 함수 | 설명 |
|------|------|
| `assert_true(condition)` | 참 검증 |
| `assert_false(condition)` | 거짓 검증 |

#### Null 검증
| 함수 | 설명 |
|------|------|
| `assert_null(value)` | Null 검증 |
| `assert_not_null(value)` | Not Null 검증 |

#### 문자열 검증
| 함수 | 설명 |
|------|------|
| `assert_contains(haystack, needle)` | 포함 검증 |
| `assert_not_contains(haystack, needle)` | 미포함 검증 |
| `assert_empty(value)` | 빈 문자열 검증 |
| `assert_not_empty(value)` | 비어있지 않음 검증 |

#### 수치 검증
| 함수 | 설명 |
|------|------|
| `assert_greater(threshold, actual)` | 더 큼 검증 (>) |
| `assert_less(threshold, actual)` | 더 작음 검증 (<) |
| `assert_greater_or_equal(expected, actual)` | 크거나 같음 검증 (>=) |
| `assert_less_or_equal(expected, actual)` | 작거나 같음 검증 (<=) |

#### 배열/길이 검증
| 함수 | 설명 |
|------|------|
| `assert_length(expected_length, actual_length)` | 길이 검증 |

#### 정보 조회
| 함수 | 설명 |
|------|------|
| `get_assertion_info(result)` | 검증 결과 정보 |
| `check_all_assertions_passed(results)` | 모든 검증 통과 확인 |

---

### 3️⃣ mocking.fl - 모의 객체 (20개 함수)

Mock, Stub, Spy - 테스트 더블(Test Doubles)

#### Mock 객체
| 함수 | 설명 |
|------|------|
| `create_mock(mock_name, expected_calls)` | Mock 생성 |
| `set_mock_return_value(mock, return_value)` | Mock 반환 값 설정 |
| `call_mock(mock)` | Mock 호출 |
| `verify_mock_called(mock)` | Mock 호출 검증 |
| `verify_mock_called_times(mock)` | Mock 호출 횟수 검증 |
| `verify_mock_not_called(mock)` | Mock 미호출 검증 |
| `reset_mock(mock)` | Mock 리셋 |

#### Stub 객체
| 함수 | 설명 |
|------|------|
| `create_stub(stub_name, function_name)` | Stub 생성 |
| `set_stub_return_value(stub, return_value)` | 반환 값 설정 |
| `set_stub_return_type(stub, return_type)` | 반환 타입 설정 |
| `set_stub_implementation(stub, implementation)` | Stub 구현 설정 |
| `call_stub(stub)` | Stub 호출 |
| `verify_stub_not_called(stub)` | Stub 미호출 검증 |

#### Spy 객체
| 함수 | 설명 |
|------|------|
| `create_spy(spy_name, original_function)` | Spy 생성 |
| `record_spy_call(spy, arguments, return_value)` | Spy 호출 기록 |
| `get_spy_call_count(spy)` | Spy 호출 횟수 조회 |
| `get_spy_last_arguments(spy)` | Spy 마지막 인자 조회 |
| `verify_spy_called(spy)` | Spy 호출 검증 |
| `verify_spy_called_times(spy, expected_times)` | Spy 호출 횟수 검증 |
| `verify_spy_not_called(spy)` | Spy 미호출 검증 |
| `reset_spy(spy)` | Spy 리셋 |

#### 정보 조회
| 함수 | 설명 |
|------|------|
| `get_mock_info(mock)` | Mock 정보 |
| `get_stub_info(stub)` | Stub 정보 |
| `get_spy_info(spy)` | Spy 정보 |

---

### 4️⃣ coverage.fl - 커버리지 (14개 함수)

코드 커버리지 측정 및 리포팅

#### 커버리지 수집
| 함수 | 설명 |
|------|------|
| `create_coverage_collector()` | 커버리지 수집기 생성 |
| `start_coverage_collection(collector)` | 수집 시작 |
| `record_line_coverage(collector, file_name, line_number, is_covered)` | 라인 커버리지 기록 |
| `finish_coverage_collection(collector)` | 수집 완료 |

#### 함수/파일 커버리지
| 함수 | 설명 |
|------|------|
| `create_function_coverage(function_name, file_name)` | 함수 커버리지 생성 |
| `update_function_coverage(coverage, covered, total)` | 함수 커버리지 업데이트 |
| `create_file_coverage(file_name)` | 파일 커버리지 생성 |
| `update_file_coverage(coverage, covered, total)` | 파일 커버리지 업데이트 |
| `add_function_to_file(coverage, function_name)` | 파일에 함수 추가 |

#### 커버리지 리포트
| 함수 | 설명 |
|------|------|
| `create_coverage_report(report_name)` | 커버리지 리포트 생성 |
| `update_coverage_report(report, total_lines, covered_lines, total_files, total_functions)` | 리포트 업데이트 |
| `check_coverage_threshold(report, threshold_percent)` | 임계값 확인 |

#### 정보 조회
| 함수 | 설명 |
|------|------|
| `get_function_coverage_info(coverage)` | 함수 커버리지 정보 |
| `get_file_coverage_info(coverage)` | 파일 커버리지 정보 |
| `get_coverage_report_info(report)` | 커버리지 리포트 정보 |
| `calculate_coverage_grade(percent)` | 커버리지 등급 계산 (A-F) |
| `get_uncovered_lines_report(collector)` | 미커버된 라인 리포트 |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|------|
| **test.fl** | 11개 | 테스트 케이스, 스위트, 실행 |
| **assertions.fl** | 13개 | 단정(Assertions), 검증 |
| **mocking.fl** | 20개 | Mock, Stub, Spy (테스트 더블) |
| **coverage.fl** | 14개 | 커버리지 측정 및 리포팅 |
| **합계** | **58개** | Phase 6 - Testing Framework |

---

## 🎯 사용 사례

### 1. 기본 테스트 케이스

```freelang
// 테스트 케이스 생성
var test = create_test_case("test_add_numbers", "add_function");

// 테스트 스위트 생성
var suite = create_test_suite("Math Tests");
suite = add_test_to_suite(suite, test);

// 스위트 실행
suite = start_test_suite(suite);
test = run_test_case(test);

// 테스트 결과 등록
var result = create_test_result("test_add_numbers", "PASSED");
suite = register_test_result(suite, result);

// 스위트 완료
suite = finish_test_suite(suite);

// 정보 조회
var info = get_test_suite_info(suite);
// 결과: "테스트 스위트: Math Tests (1개, 통과: 1, 실패: 0, 건너뜀: 0)"
```

### 2. 검증(Assertions)

```freelang
// 동등성 검증
var result = assert_equal("expected", "actual");
if !result.is_passed {
  // 테스트 실패
}

// 수치 검증
var int_result = assert_equal_int(5, 5);

// 조건 검증
var true_result = assert_true(1 > 0);
var false_result = assert_false(1 < 0);

// 문자열 검증
var contains = assert_contains("Hello World", "World");
var empty = assert_empty("");

// 수치 범위 검증
var greater = assert_greater(5, 10);
var less = assert_less(10, 5);
```

### 3. Mock 객체

```freelang
// Mock 생성
var mock = create_mock("mock_database", 3);
mock = set_mock_return_value(mock, "user_data");

// Mock 호출
mock = call_mock(mock);
mock = call_mock(mock);
mock = call_mock(mock);

// Mock 검증
if verify_mock_called_times(mock) {
  // Mock이 예상된 횟수만큼 호출됨
}

// 정보 조회
var info = get_mock_info(mock);
// 결과: "Mock: mock_database (호출: 3/3)"

// Mock 리셋
mock = reset_mock(mock);
```

### 4. Stub 객체

```freelang
// Stub 생성
var stub = create_stub("stub_api", "fetch_user");
stub = set_stub_return_value(stub, "{\"id\": 1, \"name\": \"Alice\"}");
stub = set_stub_return_type(stub, "string");

// Stub 호출
stub = call_stub(stub);

// Stub 정보
var info = get_stub_info(stub);
// 결과: "Stub: stub_api → fetch_user (반환: {...})"
```

### 5. Spy 객체

```freelang
// Spy 생성
var spy = create_spy("spy_logger", "log_event");

// Spy 호출 기록
spy = record_spy_call(spy, "event_id=123", "logged");
spy = record_spy_call(spy, "event_id=124", "logged");

// Spy 검증
if verify_spy_called_times(spy, 2) {
  // Spy가 정확히 2번 호출됨
}

// Spy 정보
var info = get_spy_info(spy);
// 결과: "Spy: spy_logger (호출: 2회)"

// 마지막 호출 인자 확인
var args = get_spy_last_arguments(spy);
// 결과: "event_id=124"
```

### 6. 커버리지 측정

```freelang
// 커버리지 수집기 생성
var collector = create_coverage_collector();

// 수집 시작
collector = start_coverage_collection(collector);

// 라인 커버리지 기록
collector = record_line_coverage(collector, "math.fl", 10, true);
collector = record_line_coverage(collector, "math.fl", 11, true);
collector = record_line_coverage(collector, "math.fl", 12, false);

// 함수 커버리지
var func_cov = create_function_coverage("add", "math.fl");
func_cov = update_function_coverage(func_cov, 5, 6);
var func_info = get_function_coverage_info(func_cov);
// 결과: "함수 커버리지: add (5/6, 83%)"

// 파일 커버리지
var file_cov = create_file_coverage("math.fl");
file_cov = update_file_coverage(file_cov, 50, 60);

// 전체 리포트
var report = create_coverage_report("Full Coverage");
report = update_coverage_report(report, 100, 85, 5, 30);

// 임계값 확인 (80% 이상)
if check_coverage_threshold(report, 80) {
  // 커버리지 목표 달성
}

// 등급 계산
var grade = calculate_coverage_grade(85);
// 결과: "B"
```

### 7. 완전한 테스트 시나리오

```freelang
// 1. 테스트 스위트 생성
var suite = create_test_suite("API Tests");

// 2. Mock 생성
var mock_db = create_mock("database", 2);
mock_db = set_mock_return_value(mock_db, "user_123");

// 3. 테스트 케이스 생성
var test_create_user = create_test_case("test_create_user", "create_user_fn");
var test_get_user = create_test_case("test_get_user", "get_user_fn");

// 4. 스위트에 테스트 추가
suite = add_test_to_suite(suite, test_create_user);
suite = add_test_to_suite(suite, test_get_user);

// 5. 스위트 실행
suite = start_test_suite(suite);

// 6. 테스트 1 실행
test_create_user = run_test_case(test_create_user);
var res1 = assert_equal("user_123", "user_123");
var result1 = create_test_result("test_create_user", "PASSED");
suite = register_test_result(suite, result1);

// 7. Mock 호출
mock_db = call_mock(mock_db);

// 8. 테스트 2 실행
test_get_user = run_test_case(test_get_user);
var res2 = assert_not_null("user_data");
var result2 = create_test_result("test_get_user", "PASSED");
suite = register_test_result(suite, result2);

// 9. Mock 검증
mock_db = call_mock(mock_db);
if verify_mock_called_times(mock_db) {
  // Mock 호출 횟수 확인
}

// 10. 스위트 완료
suite = finish_test_suite(suite);

// 11. 보고서 생성
var report = create_test_report("Test Run Report");
report = merge_suite_to_report(report, suite);

// 12. 결과 확인
if all_tests_passed(report) {
  // 모든 테스트 통과
}

var final_info = get_test_report_info(report);
```

---

## 📈 K-StdLib 진행

| Phase | 모듈 | 함수 | 상태 |
|-------|------|------|------|
| Phase 1 | 7개 | 58개 | ✅ |
| Phase 2 | 5개 | 69개 | ✅ |
| Phase 3 | 4개 | 66개 | ✅ |
| Phase 4 | 4개 | 63개 | ✅ |
| Phase 5 | 4개 | 86개 | ✅ |
| Phase 6 | 4개 | 58개 | ✅ **완료** |
| **합계** | **28개** | **400개** | **✅** |

---

## 🚀 다음 단계

### Phase 7: Cache & Queue System (계획)
- 캐싱 전략 (LRU, LFU, TTL)
- 메시지 큐 (FIFO, Priority)
- 비동기 작업 처리
- 예상: 18-20개 함수

### Phase 8: Monitoring & Metrics (계획)
- 성능 모니터링
- 메트릭 수집
- 알림 시스템
- 예상: 15-18개 함수

---

**생성일**: 2026-03-30
**버전**: Phase 6 - Testing Framework
**다음**: Phase 7 - Cache & Queue System

