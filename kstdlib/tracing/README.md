# ⚡ K-StdLib Distributed Tracing Module

FreeLang v2 기반의 **분산 요청 추적 및 성능 분석** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ tracing.fl - 분산 추적 (10개 함수)

요청을 통한 마이크로서비스 호출 추적, Trace ID 기반 요청 추적

#### 추적 컨텍스트 (Trace ID)
| 함수 | 설명 |
|------|---------|
| `create_trace_context(user_id, request_id)` | 추적 컨텍스트 생성 (글로벌 Trace ID) |
| `get_trace_context(trace_id)` | 추적 컨텍스트 조회 |
| `propagate_trace_context(ctx)` | 다른 서비스로 추적 전파 (HTTP 헤더) |

#### Span 관리 (작업 단위 추적)
| 함수 | 설명 |
|------|---------|
| `create_span(trace_id, operation, service)` | Span 생성 (작업 단위) |
| `start_span(span)` | Span 시작 |
| `end_span(span, duration, status)` | Span 종료 (소요 시간 + 상태) |

#### 메타데이터 & 로깅
| 함수 | 설명 |
|------|---------|
| `add_span_tag(span, key, value)` | Span에 태그 추가 (메타데이터) |
| `add_span_log(span, event, message)` | Span에 로그 추가 (이벤트 기록) |

#### 데이터 관리
| 함수 | 설명 |
|------|---------|
| `get_trace_info(trace_id)` | 추적 정보 조회 |
| `export_trace(trace_id)` | 추적 데이터 내보내기 (Jaeger/Zipkin) |

---

### 2️⃣ analysis.fl - 성능 분석 (10개 함수)

성능 분석, 병목 감지, 크리티컬 경로 계산

#### 성능 분석기
| 함수 | 설명 |
|------|---------|
| `create_performance_analyzer()` | 성능 분석기 생성 |
| `record_request(analyzer, request)` | 요청 기록 (레이턴시 수집) |
| `analyze_latency(analyzer)` | 레이턴시 분석 (P50/P95/P99) |

#### 병목 감지
| 함수 | 설명 |
|------|---------|
| `find_bottleneck(services)` | 병목 서비스 감지 |
| `identify_slow_services(analyzer, threshold)` | 느린 서비스 식별 |

#### 의존성 그래프 & 크리티컬 경로
| 함수 | 설명 |
|------|---------|
| `create_dependency_graph(services)` | 서비스 의존성 그래프 생성 |
| `calculate_critical_path(graph)` | 크리티컬 경로 계산 (가장 느린 경로) |

#### 메트릭 & 리포팅
| 함수 | 설명 |
|------|---------|
| `get_service_metrics(service, requests)` | 서비스 메트릭 조회 |
| `generate_performance_report(analyzer)` | 성능 리포트 생성 |
| `get_trace_statistics(trace_id, spans)` | 추적 통계 계산 |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|---------|
| **tracing.fl** | 10개 | 분산 요청 추적 (Trace ID, Span) |
| **analysis.fl** | 10개 | 성능 분석 & 병목 감지 |
| **합계** | **20개** | Phase 11 - Distributed Tracing |

---

## 🎯 사용 사례

### 1. 기본 Trace ID 생성

```freelang
// 요청이 시스템에 들어올 때 Trace ID 생성
var trace = create_trace_context("user_123", "req_456");
// trace_id: "trace_abc123def456"

// 이 Trace ID로 모든 서비스 호출을 추적
var ctx = get_trace_context("trace_abc123def456");
```

### 2. 마이크로서비스 호출 추적

```freelang
// 서비스 A에서 B로 호출 시, Trace ID 전파
var header = propagate_trace_context(trace);
// traceparent=trace_abc123def456-span_001

// 서비스 B는 HTTP 헤더에서 Trace ID 추출
// → 동일 Trace ID로 계속 추적
```

### 3. Span으로 작업 단위 추적

```freelang
// 데이터베이스 쿼리
var db_span = create_span("trace_001", "db_query", "user-service");
db_span = start_span(db_span);

// ... 쿼리 실행 (100ms) ...

db_span = end_span(db_span, 100, "OK");

// 결과:
// - 서비스: user-service
// - 작업: db_query
// - 소요시간: 100ms
// - 상태: OK
```

### 4. Span에 메타데이터 추가

```freelang
var span = create_span("trace_001", "http_request", "api-gateway");

// 태그 추가 (검색 가능)
span = add_span_tag(span, "http.method", "POST");
span = add_span_tag(span, "http.url", "/api/users");
span = add_span_tag(span, "http.status_code", "200");

// 로그 추가 (디버깅)
span = add_span_log(span, "auth_check_start", "Checking user authentication");
span = add_span_log(span, "auth_check_end", "User authenticated successfully");
```

### 5. 성능 분석

```freelang
// 성능 분석기 생성
var analyzer = create_performance_analyzer();

// 요청 기록 (실시간 수집)
var req1 = create_request("req_001", "trace_001", "user-service", "getUser", 50, "OK");
analyzer = record_request(analyzer, req1);

var req2 = create_request("req_002", "trace_001", "db-service", "query", 100, "OK");
analyzer = record_request(analyzer, req2);

var req3 = create_request("req_003", "trace_001", "cache-service", "get", 5, "OK");
analyzer = record_request(analyzer, req3);

// 레이턴시 분석
var latency_analysis = analyze_latency(analyzer);
// 결과: "레이턴시 분석: 평균 51ms, P95 100ms, P99 100ms"
```

### 6. 병목 감지

```freelang
// 병목 서비스 감지
var bottleneck = find_bottleneck("service_a,service_b,service_c");
// 결과: "db-service" (가장 느린 서비스)

// 임계값(threshold)보다 느린 서비스 식별
var slow_services = identify_slow_services(analyzer, 50);
// threshold: 50ms
// 결과: "slow_services_found" (평균 레이턴시 > 50ms)
```

### 7. 의존성 그래프 및 크리티컬 경로

```freelang
// 서비스 의존성 그래프 생성
var graph = create_dependency_graph("user-service->db-service,user-service->cache-service");

// 크리티컬 경로 계산 (가장 느린 경로)
var critical = calculate_critical_path(graph);
// 경로: user-service → db-service
// 병목: db-service (100ms, 66% 차지)
```

### 8. 서비스 메트릭

```freelang
// 특정 서비스의 메트릭
var metrics = get_service_metrics("user-service", requests);
// request_count: 10000
// average_latency_ms: 50
// error_rate_percent: 0.5
// throughput_requests_per_sec: 100
// slowest_operation: "getUser"
// slowest_operation_ms: 150
```

### 9. 성능 리포트 생성

```freelang
// 전체 성능 리포트
var report = generate_performance_report(analyzer);
// 결과:
// - 총 요청: 10000
// - 평균 레이턴시: 50ms
// - 에러율: 0.5%
// - 가장 느린 서비스: db-service (150ms)
// - 권장사항: [연결 풀 확대, DB 인덱싱 검토]
```

### 10. 실제 시나리오: 마이크로서비스 호출 추적

```freelang
// 1. 사용자 요청 → API Gateway
var trace = create_trace_context("user_123", "req_456");

// 2. Span 1: API Gateway 처리
var api_span = create_span(trace.trace_id, "api_routing", "api-gateway");
api_span = start_span(api_span);
api_span = add_span_tag(api_span, "http.method", "GET");
api_span = add_span_tag(api_span, "http.url", "/api/users/123");
api_span = end_span(api_span, 10, "OK");

// 3. 다른 서비스로 호출 (Trace ID 전파)
var header = propagate_trace_context(trace);
// HTTP 헤더: traceparent=trace_456-span_002

// 4. User Service에서 받은 Trace ID로 계속 추적
var user_span = create_span(trace.trace_id, "getUser", "user-service");
user_span = start_span(user_span);
user_span = add_span_log(user_span, "cache_check", "Checking cache");
user_span = add_span_log(user_span, "db_query", "Querying database");
user_span = end_span(user_span, 50, "OK");

// 5. DB Service도 동일 Trace ID로 추적
var db_span = create_span(trace.trace_id, "query", "db-service");
db_span = start_span(db_span);
db_span = add_span_tag(db_span, "db.query", "SELECT * FROM users WHERE id=?");
db_span = end_span(db_span, 40, "OK");

// 6. 최종 성능 분석
var analyzer = create_performance_analyzer();
// 모든 Span을 수집하여 분석
// 크리티컬 경로: api-gateway(10ms) → user-service(50ms) → db-service(40ms)
// 총 소요시간: 100ms

var report = generate_performance_report(analyzer);
// 병목: user-service (50ms, 50%)
```

---

## 📈 K-StdLib 진행

| Phase | 모듈 | 함수 | 상태 |
|-------|------|------|---------|
| Phase 1-4 | 20개 | 252개 | ✅ |
| Phase 5-6 | 8개 | 144개 | ✅ |
| Phase 7-8 | 4개 | 51개 | ✅ |
| Phase 9-10 | 4개 | 43개 | ✅ |
| **Phase 11** | **2개** | **20개** | **✅ 완료** |
| **합계** | **38개** | **514개** | **✅** |

---

## 🔑 Trace ID vs Span

### Trace ID
- **범위**: 전체 요청 추적 (모든 서비스)
- **생명주기**: 요청 시작 → 완료
- **용도**: 단일 요청을 여러 서비스를 통해 추적
- **예**: `trace_abc123def456` (전체 요청의 글로벌 ID)

### Span
- **범위**: 단일 서비스 내 작업 단위
- **생명주기**: 작업 시작 → 완료
- **용도**: 각 작업의 소요시간 및 상태 기록
- **예**: `span_001` (API 라우팅, DB 쿼리, 캐시 조회 등)

---

## 🚀 다음 단계

### Phase 12: Time-Series Data (계획)
- 시계열 데이터 저장
- 메트릭 기반 쿼리
- 예상: 18-20개 함수

### Phase 13+: Advanced Features
- Full-Text Search
- Vector Search (ML/AI)
- GraphQL Federation

---

**생성일**: 2026-03-30
**버전**: Phase 11 - Distributed Tracing
**다음**: Phase 12 - Time-Series Data

