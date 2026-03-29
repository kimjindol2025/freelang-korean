# ⚡ K-StdLib Monitoring & Metrics Module

FreeLang v2 기반의 **성능 모니터링 및 메트릭 수집** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ metrics.fl - 메트릭 수집 (11개 함수)

시스템 성능 메트릭 정의, 수집, 통계 계산

#### 메트릭 생성 & 기록
| 함수 | 설명 |
|------|---------|
| `create_metric(name, type, unit)` | 메트릭 생성 (CPU, MEMORY, HTTP, DATABASE) |
| `record_metric_value(metric, value)` | 메트릭 값 기록 |
| `get_metric_value(metric)` | 메트릭 현재 값 조회 |

#### CPU/Memory/HTTP 메트릭 수집
| 함수 | 설명 |
|------|---------|
| `collect_cpu_metric(usage%, cores)` | CPU 사용률 + 코어 수 + 로드 평균 |
| `collect_memory_metric(total_mb, used_mb)` | 메모리 사용량 + 사용률 계산 |
| `collect_http_metric(total, success, error, avg_time)` | HTTP 요청/응답 메트릭 수집 |

#### 메트릭 수집기
| 함수 | 설명 |
|------|---------|
| `create_metric_collector()` | 메트릭 수집기 생성 |
| `start_metric_collection(collector)` | 수집 시작 |
| `stop_metric_collection(collector)` | 수집 중지 |

#### 통계 & 분석
| 함수 | 설명 |
|------|---------|
| `create_metric_statistics(name, min, max, avg, samples)` | 메트릭 통계 생성 |
| `get_metric_statistics_info(stats)` | 통계 정보 조회 (최대/최소/평균/트렌드) |

---

### 2️⃣ alerting.fl - 알림 시스템 (9개 함수)

임계값 기반 알림, 다중 채널 배포

#### 알림 규칙
| 함수 | 설명 |
|------|---------|
| `create_alert_rule(metric, condition, threshold, severity)` | 알림 규칙 생성 |
| `evaluate_alert_rule(rule, value)` | 규칙 평가 (임계값 초과 여부) |
| `get_alert_rule_info(rule)` | 규칙 정보 조회 |

#### 알림 생성 & 관리
| 함수 | 설명 |
|------|---------|
| `create_alert(rule_id, metric, value, threshold, severity, message)` | 알림 생성 |
| `acknowledge_alert(alert)` | 알림 확인 (수신 처리) |
| `clear_alert(alert)` | 알림 해제 |
| `get_alert_info(alert)` | 알림 정보 조회 |

#### 알림 채널
| 함수 | 설명 |
|------|---------|
| `create_alert_channel(type, destination)` | 알림 채널 생성 (EMAIL, SLACK, LOG, SMS) |
| `send_alert(alert, channel)` | 알림 채널로 전송 |

#### 알림 조회
| 함수 | 설명 |
|------|---------|
| `get_active_alerts(alerts)` | 활성 알림 수 조회 |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|---------|
| **metrics.fl** | 11개 | CPU, Memory, HTTP 메트릭 수집 |
| **alerting.fl** | 9개 | 임계값 기반 알림 시스템 |
| **합계** | **20개** | Phase 8 - Monitoring & Metrics System |

---

## 🎯 사용 사례

### 1. 기본 메트릭 수집

```freelang
// 메트릭 생성
var cpu_metric = create_metric("CPU_USAGE", "CPU", "%");

// CPU 메트릭 수집 (사용률 75%)
cpu_metric = record_metric_value(cpu_metric, 75);

// 값 조회
var usage = get_metric_value(cpu_metric);
// 결과: 75

// 통계 생성
var stats = create_metric_statistics("CPU_USAGE", 60, 85, 75, 100);
var info = get_metric_statistics_info(stats);
// 결과: "메트릭: CPU_USAGE (최소: 60, 최대: 85, 평균: 75, 트렌드: UP)"
```

### 2. CPU 및 메모리 모니터링

```freelang
// CPU 메트릭 수집
var cpu = collect_cpu_metric(45, 8);
// CPU 사용률: 45%, 코어 수: 8, 로드: 0.5,0.6,0.7

// 메모리 메트릭 수집 (전체 16GB, 사용 12GB)
var mem = collect_memory_metric(16000, 12000);
// 사용률: (12000 * 100) / 16000 = 75%
// 여유: 4000MB
```

### 3. HTTP 메트릭

```freelang
// HTTP 메트릭 수집 (1000개 요청, 950 성공, 50 실패, 평균 응답 200ms)
var http = collect_http_metric(1000, 950, 50, 200);
// 성공률: 95%
// 에러율: 5%
// 평균 응답 시간: 200ms
```

### 4. 메트릭 수집 세션

```freelang
// 수집기 생성
var collector = create_metric_collector();

// 수집 시작
collector = start_metric_collection(collector);

// 메트릭 수집 (실시간 반복)
// ... 주기적으로 메트릭 수집 ...

// 수집 중지
collector = stop_metric_collection(collector);
```

### 5. 알림 규칙 설정

```freelang
// CPU 사용률 > 80% 이면 경고 발생
var cpu_rule = create_alert_rule("CPU_USAGE", "GREATER_THAN", 80, "WARNING");

// 메모리 사용률 > 90% 이면 치명 알림
var mem_rule = create_alert_rule("MEMORY_USAGE", "GREATER_THAN", 90, "CRITICAL");

// 규칙 평가
if evaluate_alert_rule(cpu_rule, 85) {
  // CPU 사용률이 80% 초과 → 알림 발생
}
```

### 6. 알림 생성 & 전송

```freelang
// CPU 경고 알림 생성
var alert = create_alert(
  "rule_001",
  "CPU_USAGE",
  85,
  80,
  "WARNING",
  "CPU 사용률이 80%를 초과했습니다."
);

// 이메일 채널 생성
var email_channel = create_alert_channel("EMAIL", "ops@company.com");

// 알림 전송
email_channel = send_alert(alert, email_channel);

// 알림 정보 조회
var info = get_alert_info(alert);
// 결과: "알림: CPU_USAGE (심각도: WARNING, 값: 85/80)"
```

### 7. 알림 확인 & 해제

```freelang
// 알림 확인 (운영자가 수신했음을 표시)
alert = acknowledge_alert(alert);

// 문제 해결 후 알림 해제
alert = clear_alert(alert);

// 활성 알림 조회
var active_count = get_active_alerts("");
// 현재 활성 알림: 2개
```

### 8. 통합 모니터링 시나리오

```freelang
// 시나리오: 시스템 전체 모니터링

// 1. 수집기 생성 및 시작
var collector = create_metric_collector();
collector = start_metric_collection(collector);

// 2. 메트릭 수집 (실시간 5초 주기)
var cpu = collect_cpu_metric(45, 8);
var mem = collect_memory_metric(16000, 12000);
var http = collect_http_metric(1000, 950, 50, 200);

// 3. 알림 규칙 설정
var cpu_rule = create_alert_rule("CPU_USAGE", "GREATER_THAN", 80, "WARNING");
var mem_rule = create_alert_rule("MEMORY_USAGE", "GREATER_THAN", 90, "CRITICAL");
var http_rule = create_alert_rule("HTTP_ERROR_RATE", "GREATER_THAN", 10, "WARNING");

// 4. 규칙 평가
if evaluate_alert_rule(cpu_rule, cpu.cpu_usage_percent) {
  var cpu_alert = create_alert("rule_001", "CPU_USAGE", cpu.cpu_usage_percent, 80, "WARNING", "CPU 경고");
  var slack = create_alert_channel("SLACK", "https://hooks.slack.com/...");
  slack = send_alert(cpu_alert, slack);
}

// 5. 통계 생성 및 분석
var cpu_stats = create_metric_statistics("CPU_USAGE", 40, 80, 60, 500);
var mem_stats = create_metric_statistics("MEMORY_USAGE", 50, 75, 65, 500);

// 6. 수집 종료
collector = stop_metric_collection(collector);
```

---

## 📈 K-StdLib 진행

| Phase | 모듈 | 함수 | 상태 |
|-------|------|------|---------|
| Phase 1 | 7개 | 58개 | ✅ |
| Phase 2 | 5개 | 69개 | ✅ |
| Phase 3 | 4개 | 66개 | ✅ |
| Phase 4 | 4개 | 63개 | ✅ |
| Phase 5 | 4개 | 86개 | ✅ |
| Phase 6 | 4개 | 58개 | ✅ |
| Phase 7 | 2개 | 31개 | ✅ |
| **Phase 8** | **2개** | **20개** | **✅ 완료** |
| **합계** | **32개** | **451개** | **✅** |

---

## 🚀 다음 단계

### Phase 9: Distributed Caching (계획)
- Redis 호환 분산 캐싱
- 클러스터 지원
- 예상: 18-20개 함수

### Phase 10+: Advanced Features
- Event Streaming
- Observability (분산 추적)
- Performance Profiling

---

**생성일**: 2026-03-30
**버전**: Phase 8 - Monitoring & Metrics System
**다음**: Phase 9 - Distributed Caching

