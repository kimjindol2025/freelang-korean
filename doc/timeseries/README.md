# ⏱️ K-StdLib Time-Series Data Module

FreeLang v2 기반의 **시계열 데이터 저장, 조회 및 분석** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ timeseries.fl - 시계열 저장 (10개 함수)

시계열 데이터 생성, 저장, 기본 조회 및 인덱싱

#### 시계열 관리
| 함수 | 설명 |
|------|---------:|
| `create_timeseries(name, type, unit, retention)` | 새 시계열 생성 |
| `get_timeseries_info(series)` | 시계열 정보 조회 |
| `get_datapoint_count(series)` | 데이터 포인트 개수 조회 |
| `export_timeseries(series, format)` | CSV/JSON/Parquet 형식 내보내기 |

#### 데이터 포인트 관리
| 함수 | 설명 |
|------|---------:|
| `create_datapoint(timestamp, value, source)` | 데이터 포인트 생성 |
| `append_datapoint(series, point)` | 포인트 추가 |
| `get_datapoint(series, timestamp)` | 특정 시간의 포인트 조회 |
| `update_datapoint(point, value)` | 포인트 값 업데이트 |
| `delete_datapoint(series)` | 포인트 삭제 |

#### 인덱싱
| 함수 | 설명 |
|------|---------:|
| `create_timeseries_index(series, type)` | 인덱스 생성 (TIME, TAG, VALUE) |

---

### 2️⃣ query.fl - 시계열 쿼리 & 분석 (10개 함수)

범위 쿼리, 집계, 다운샘플링, 통계 분석

#### 쿼리 & 조회
| 함수 | 설명 |
|------|---------:|
| `query_range(series, start, end)` | 시간 범위로 데이터 조회 |
| `query_by_tags(series, tags)` | 태그로 필터링 조회 |
| `query_latest(series)` | 최신 데이터 포인트 조회 |

#### 데이터 변환
| 함수 | 설명 |
|------|---------:|
| `downsample(series, interval)` | 데이터 포인트 감소 (압축) |
| `resample(series, interval)` | 새로운 간격으로 재생성 |
| `interpolate(series, method)` | 누락된 포인트 보간 |

#### 집계 & 분석
| 함수 | 설명 |
|------|---------:|
| `calculate_aggregate(series, function)` | SUM/AVG/MIN/MAX/COUNT 계산 |
| `calculate_rate(series, window)` | 변화율 계산 (Rate of Change) |
| `create_timeseries_report(series)` | 시계열 분석 리포트 생성 |
| `get_trace_statistics(series)` | 통계 계산 (평균, 중앙값, P95, P99) |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|---------:|
| **timeseries.fl** | 10개 | 시계열 저장 & 기본 조회 |
| **query.fl** | 10개 | 범위 쿼리 & 분석 |
| **합계** | **20개** | Phase 12 - Time-Series Data |

---

## 🎯 사용 사례

### 1. 기본 시계열 생성

```freelang
// 시계열 생성: "API 응답시간" (단위: ms, 보존기간: 90일)
var series = create_timeseries("API_Response_Time", "GAUGE", "ms", 90);

// 데이터 포인트 추가
var point1 = create_datapoint("2026-03-30T10:00:00Z", 150, "api-server-01");
series = append_datapoint(series, point1);

var point2 = create_datapoint("2026-03-30T10:05:00Z", 180, "api-server-01");
series = append_datapoint(series, point2);

var point3 = create_datapoint("2026-03-30T10:10:00Z", 160, "api-server-02");
series = append_datapoint(series, point3);

// 결과: 3개 포인트 저장됨
var info = get_timeseries_info(series);
// "시계열: API_Response_Time (3개 포인트, 단위: ms)"
```

### 2. 시계열 정보 조회

```freelang
// 시계열 메타데이터 조회
var series = create_timeseries("CPU_Usage", "GAUGE", "%", 30);

var info = get_timeseries_info(series);
// "시계열: CPU_Usage (0개 포인트, 단위: %)"

var count = get_datapoint_count(series);
// 0

// 데이터 추가 후
var point = create_datapoint("2026-03-30T10:00:00Z", 45, "host-01");
series = append_datapoint(series, point);

count = get_datapoint_count(series);
// 1
```

### 3. 범위 쿼리 (시간 범위로 데이터 조회)

```freelang
// API 응답시간 시계열에서
// 2026-03-30 10:00 ~ 11:00 데이터 조회
var result = query_range(
  "API_Response_Time",
  "2026-03-30T10:00:00Z",
  "2026-03-30T11:00:00Z"
);

// 결과:
// - start_time: "2026-03-30T10:00:00Z"
// - end_time: "2026-03-30T11:00:00Z"
// - datapoint_count: 12 (5분 간격, 12개)
// - min_value: 120
// - max_value: 350
// - avg_value: 185
```

### 4. 태그 기반 쿼리

```freelang
// 특정 호스트의 CPU 사용률 조회
var result = query_by_tags(
  "CPU_Usage",
  "host:prod-server-01,region:us-east"
);

// 결과:
// - 호스트 prod-server-01의 모든 CPU 데이터
// - 지역: us-east
// - 12개 포인트 조회됨
```

### 5. 최신 데이터 포인트 조회

```freelang
// 가장 최근의 메모리 사용률 조회
var latest = query_latest("Memory_Usage");

// 결과:
// - datapoint_count: 1 (최신 1개)
// - end_time: "2026-03-30T10:55:00Z"
// - value: 78 (78%)
```

### 6. 집계 계산

```freelang
// 일일 API 응답시간 통계
var sum = calculate_aggregate("API_Response_Time", "SUM");
// 전체 합: 2,220ms

var avg = calculate_aggregate("API_Response_Time", "AVG");
// 평균: 185ms

var min = calculate_aggregate("API_Response_Time", "MIN");
// 최소: 120ms

var max = calculate_aggregate("API_Response_Time", "MAX");
// 최대: 350ms

var count = calculate_aggregate("API_Response_Time", "COUNT");
// 개수: 12개
```

### 7. 다운샘플링 (데이터 압축)

```freelang
// 1분 간격 데이터를 5분 간격으로 압축
var downsampled = downsample("API_Response_Time", 300);

// 결과:
// - original_count: 60 (1분 간격, 1시간 데이터)
// - downsampled_count: 12 (5분 간격)
// - compression_ratio: 80 (80% 압축)
// - 저장 공간 5배 절약
```

### 8. 리샘플링 (새로운 간격으로 재생성)

```freelang
// 불규칙한 간격의 데이터를 규칙적인 10분 간격으로 정렬
var resampled = resample("Database_Query_Time", 600);

// 결과:
// - 10분 단위로 정렬된 데이터
// - 누락된 시간대는 보간으로 채움
// - 시계열 분석에 최적화된 형태
```

### 9. 변화율 계산

```freelang
// 지난 5분간 네트워크 트래픽 변화율
var rate = calculate_rate("Network_Traffic_Bytes", 300);

// 결과:
// - 지난 5분간 트래픽 변화율
// - 증가 추세: +50Kbps
// - 변화 방향 파악 가능
```

### 10. 보간 (Interpolation)

```freelang
// 센서 장애로 인한 누락 데이터 보간
var interpolated = interpolate("Temperature_Celsius", "LINEAR");

// 선형 보간:
// - 시점 1: 20°C (10:00)
// - 누락
// - 시점 2: 24°C (10:30)
// → 10:15에 22°C로 자동 추정

// 또는 NEAREST_NEIGHBOR: 가장 가까운 값으로 채우기
var interpolated = interpolate("Temperature_Celsius", "NEAREST_NEIGHBOR");
```

### 11. 시계열 리포트 생성

```freelang
// 월간 API 성능 리포트
var report = create_timeseries_report("API_Response_Time");

// 결과:
// - report_id: "report_001"
// - series_name: "API_Response_Time"
// - timestamp: "2026-03-30T00:00:00Z"
// - total_datapoints: 43,200 (1달 데이터)
// - time_range_days: 30
// - min_value: 85ms
// - max_value: 2,500ms (장애 구간)
// - avg_value: 185ms
// - volatility: 45 (변동성)
// - trend: "STABLE"
```

### 12. 통계 계산 (P95/P99)

```freelang
// 상세 통계 계산
var stats = get_trace_statistics("API_Response_Time");

// 결과:
// - datapoint_count: 43,200
// - min_value: 85ms
// - max_value: 2,500ms
// - avg_value: 185ms
// - median_value: 160ms (중앙값)
// - percentile_95: 350ms (95%가 이 시간 이하)
// - percentile_99: 580ms (99%가 이 시간 이하)
// - std_deviation: 120 (표준 편차)
// SLA 기준: P95 < 300ms 달성
```

### 13. 실제 시나리오: 마이크로서비스 응답시간 모니터링

```freelang
// 1. 시계열 생성 (3개 서비스)
var user_api = create_timeseries("UserAPI_Response", "GAUGE", "ms", 90);
var order_api = create_timeseries("OrderAPI_Response", "GAUGE", "ms", 90);
var payment_api = create_timeseries("PaymentAPI_Response", "GAUGE", "ms", 90);

// 2. 데이터 수집 (5분간 각 서비스 12개 포인트)
// User API: 120ms, 130ms, 125ms, ... (정상)
// Order API: 200ms, 250ms, 300ms, ... (느려지는 추세)
// Payment API: 1000ms, 1200ms, 1500ms (심각한 지연)

// 3. 범위 쿼리로 문제 확인
var user_result = query_range(
  "UserAPI_Response",
  "2026-03-30T10:00:00Z",
  "2026-03-30T11:00:00Z"
);
// avg_value: 128ms (정상)

var payment_result = query_range(
  "PaymentAPI_Response",
  "2026-03-30T10:00:00Z",
  "2026-03-30T11:00:00Z"
);
// avg_value: 1,200ms (느림!)
// max_value: 2,500ms (timeout 경계)

// 4. 통계로 더 자세한 분석
var payment_stats = get_trace_statistics("PaymentAPI_Response");
// percentile_95: 2,100ms (SLA 위반)
// percentile_99: 2,400ms (timeout 직전)

// 5. 리포트로 요약
var payment_report = create_timeseries_report("PaymentAPI_Response");
// trend: "INCREASING" (악화 추세)
// volatility: 80 (높은 변동성)

// 결론: Payment API가 갑자기 느려짐 → 즉시 대응 필요
```

### 14. 메트릭 내보내기 (데이터 포트)

```freelang
// 월간 데이터를 CSV/JSON/Parquet으로 내보내기
var series = create_timeseries("API_Response_Time", "GAUGE", "ms", 90);
// ... 데이터 추가 ...

// CSV 형식 내보내기 (스프레드시트용)
var csv_data = export_timeseries(series, "CSV");
// timestamp,value,source
// 2026-03-30T10:00:00Z,150,api-server-01
// 2026-03-30T10:05:00Z,180,api-server-01

// JSON 형식 내보내기 (API 호출용)
var json_data = export_timeseries(series, "JSON");
// {"series_name": "API_Response_Time", "datapoints": [...]}

// Parquet 형식 내보내기 (빅데이터 분석용)
var parquet_data = export_timeseries(series, "Parquet");
// Hadoop/Spark 호환 형식
```

### 15. 데이터 포인트 태그와 메타데이터

```freelang
// 동일 시간에 여러 소스의 데이터 저장
var point1 = create_datapoint("2026-03-30T10:00:00Z", 150, "api-server-01");
point1.tags = "region:us-east,az:us-east-1a,version:v2.1";

var point2 = create_datapoint("2026-03-30T10:00:00Z", 155, "api-server-02");
point2.tags = "region:us-east,az:us-east-1b,version:v2.1";

var point3 = create_datapoint("2026-03-30T10:00:00Z", 200, "api-server-03");
point3.tags = "region:eu-west,az:eu-west-1a,version:v2.0";

// 같은 시간대 데이터이지만 지역/버전별로 분석 가능
var us_result = query_by_tags("API_Response_Time", "region:us-east");
// US 지역 2개 서버 평균: 152.5ms

var eu_result = query_by_tags("API_Response_Time", "region:eu-west");
// EU 지역 1개 서버: 200ms
```

---

## 📈 K-StdLib 진행

| Phase | 모듈 | 함수 | 상태 |
|-------|------|------|---------:|
| Phase 1-4 | 20개 | 252개 | ✅ |
| Phase 5-6 | 8개 | 144개 | ✅ |
| Phase 7-8 | 4개 | 51개 | ✅ |
| Phase 9-10 | 4개 | 43개 | ✅ |
| Phase 11 | 2개 | 20개 | ✅ |
| **Phase 12** | **2개** | **20개** | **✅ 완료** |
| **합계** | **40개** | **534개** | **✅** |

---

## 🔑 메트릭 타입

### GAUGE (게이지)
- **정의**: 시점의 값 (온도, CPU, 메모리)
- **특징**: 증가/감소 모두 가능, 현재값 중요
- **예**: CPU 사용률 45%, 메모리 78%

### COUNTER (카운터)
- **정의**: 누적값 (API 호출 수, 에러 수)
- **특징**: 계속 증가만 함, 리셋 가능
- **예**: 총 요청 1,234,567건, 에러 123건

### HISTOGRAM (히스토그램)
- **정의**: 값의 분포 (응답시간 분포)
- **특징**: 범위별 빈도 기록
- **예**: 0-100ms: 50%, 100-200ms: 30%, 200ms+: 20%

---

## 🚀 다음 단계

### Phase 13: Full-Text Search (계획)
- 텍스트 검색 인덱싱
- 키워드 기반 조회
- 검색 랭킹
- 예상: 18-20개 함수

### Phase 14: Vector Search (ML/AI)
- 벡터 임베딩 저장소
- 유사도 검색 (Cosine, Euclidean)
- 클러스터링
- 예상: 18-20개 함수

### Phase 15: GraphQL Federation
- GraphQL 쿼리 지원
- 분산 Schema 조합
- 서브그래프 관리

---

**생성일**: 2026-03-30
**버전**: Phase 12 - Time-Series Data
**다음**: Phase 13 - Full-Text Search
