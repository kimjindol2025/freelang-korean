# ⚡ K-StdLib Event Streaming Module

FreeLang v2 기반의 **Pub/Sub 메시징 및 이벤트 스트림 처리** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ pubsub.fl - Pub/Sub 메시징 (11개 함수)

발행-구독 메시징, 토픽 기반 메시지 배포

#### Pub/Sub 브로커 & 토픽
| 함수 | 설명 |
|------|---------|
| `create_pubsub_broker()` | Pub/Sub 브로커 생성 |
| `create_topic(broker, name, policy)` | 토픽 생성 (NONE, TIME_BASED, SIZE_BASED 보존 정책) |
| `delete_topic(broker, topic)` | 토픽 삭제 |

#### 구독자 관리
| 함수 | 설명 |
|------|---------|
| `create_subscriber(name)` | 구독자 생성 |
| `subscribe(broker, topic, subscriber)` | 토픽에 구독 |
| `unsubscribe(subscriber)` | 구독 취소 |
| `get_subscribers(topic)` | 구독자 목록 조회 |

#### 메시지 작업
| 함수 | 설명 |
|------|---------|
| `publish(broker, topic, content, publisher)` | 메시지 발행 |
| `get_messages(topic, limit)` | 최근 메시지 조회 |
| `acknowledge_message(message)` | 메시지 확인 |

#### 모니터링
| 함수 | 설명 |
|------|---------|
| `get_topic_stats(topic)` | 토픽 통계 (구독자, 메시지, 레이턴시) |

---

### 2️⃣ streaming.fl - 이벤트 스트림 처리 (11개 함수)

실시간 이벤트 스트림, 소비자 그룹, 처리 파이프라인

#### 이벤트 스트림
| 함수 | 설명 |
|------|---------|
| `create_event_stream(name)` | 이벤트 스트림 생성 |
| `append_event(stream, data, type, source)` | 이벤트 추가 |
| `read_events(stream, start_id, limit)` | 이벤트 읽기 (범위 조회) |

#### 소비자 그룹 & 소비자
| 함수 | 설명 |
|------|---------|
| `create_consumer_group(stream, name)` | 소비자 그룹 생성 |
| `create_consumer(name)` | 소비자 생성 |
| `consume_events(consumer, events)` | 이벤트 소비 |
| `acknowledge_events(group, last_event_id)` | 이벤트 확인 (오프셋 저장) |

#### 스트림 처리
| 함수 | 설명 |
|------|---------|
| `create_stream_processor(name, stream, rules)` | 스트림 프로세서 생성 |
| `process_events(processor, events)` | 이벤트 처리 (규칙 적용) |

#### 모니터링
| 함수 | 설명 |
|------|---------|
| `get_stream_stats(stream, group)` | 스트림 통계 (지연, 처리량) |
| `get_lag(group, stream)` | 소비자 지연 계산 |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|---------|
| **pubsub.fl** | 11개 | Pub/Sub 메시징 |
| **streaming.fl** | 11개 | 이벤트 스트림 처리 |
| **합계** | **22개** | Phase 10 - Event Streaming |

---

## 🎯 사용 사례

### 1. 기본 Pub/Sub

```freelang
// Pub/Sub 브로커 생성
var broker = create_pubsub_broker();

// 토픽 생성 (시간 기반 보존 정책)
var topic = create_topic(broker, "user-events", "TIME_BASED");

// 구독자 생성 및 구독
var subscriber = create_subscriber("analytics");
subscriber = subscribe(broker, topic, subscriber);

// 메시지 발행
var msg = publish(broker, topic, "user_registered", "auth-service");

// 메시지 확인
msg = acknowledge_message(msg);
```

### 2. 여러 구독자

```freelang
// 동일 토픽에 여러 구독자
var sub1 = create_subscriber("analytics");
var sub2 = create_subscriber("notifications");
var sub3 = create_subscriber("audit-log");

sub1 = subscribe(broker, topic, sub1);
sub2 = subscribe(broker, topic, sub2);
sub3 = subscribe(broker, topic, sub3);

// 모든 구독자가 동일 메시지 수신
var msg = publish(broker, topic, "order_created", "order-service");

// 구독자 목록
var subscribers = get_subscribers(topic);
```

### 3. 이벤트 스트림 생성

```freelang
// 이벤트 스트림 생성
var stream = create_event_stream("transaction-log");

// 이벤트 추가 (INSERT, UPDATE, DELETE)
var event1 = append_event(stream, "{ amount: 100 }", "INSERT", "payment-service");
var event2 = append_event(stream, "{ amount: 150 }", "UPDATE", "payment-service");
var event3 = append_event(stream, "{ amount: 150 }", "DELETE", "payment-service");

// 이벤트 조회
var events = read_events(stream, "", 100);
```

### 4. 소비자 그룹 & 오프셋 관리

```freelang
// 소비자 그룹 생성 (여러 소비자가 한 그룹)
var group = create_consumer_group(stream, "accounting");

// 소비자 생성
var consumer1 = create_consumer("acc-worker-1");
var consumer2 = create_consumer("acc-worker-2");

// 이벤트 소비
consumer1 = consume_events(consumer1, "event_data");
consumer2 = consume_events(consumer2, "event_data");

// 오프셋 저장 (마지막 처리 이벤트 ID)
group = acknowledge_events(group, "event_123");

// 지연 확인
var lag = get_lag(group, stream);
// 남은 처리 대기 이벤트: N개
```

### 5. 스트림 처리 파이프라인

```freelang
// 처리 규칙 정의 (필터, 변환, 집계)
var rules = "filter: amount > 50, transform: round to 2 decimals, aggregate: hourly";

// 프로세서 생성
var processor = create_stream_processor(
  "transaction-processor",
  stream,
  rules
);

// 이벤트 처리
processor = process_events(processor, "transaction_events");
// 규칙 적용 → 변환된 데이터 생성
```

### 6. 토픽 통계

```freelang
// 토픽 통계 조회
var stats = get_topic_stats(topic);
// total_subscribers: 5
// total_messages: 1000
// messages_per_second: 100
// average_latency_ms: 5
```

### 7. 스트림 통계 & 모니터링

```freelang
// 스트림 통계
var stats = get_stream_stats(stream, group);
// total_events: 10000
// consumer_groups: 3
// lag: 100
// throughput_events_per_sec: 500
// error_rate_percent: 0.5
```

### 8. 실제 시나리오: 주문 처리 시스템

```freelang
// 1. Pub/Sub 채널 (실시간 알림)
var broker = create_pubsub_broker();
var order_topic = create_topic(broker, "order-events", "TIME_BASED");

// 구독자들 (이메일, SMS, Slack 등)
var email_sub = create_subscriber("email-service");
var sms_sub = create_subscriber("sms-service");
email_sub = subscribe(broker, order_topic, email_sub);
sms_sub = subscribe(broker, order_topic, sms_sub);

// 2. 이벤트 스트림 (감시 로깅 & 감시)
var stream = create_event_stream("order-audit-log");

// 3. 주문 생성 이벤트
var order_event = append_event(
  stream,
  "{ order_id: 123, total: 99.99 }",
  "INSERT",
  "order-api"
);

// 4. 즉시 알림 발행 (Pub/Sub)
var notification = publish(
  broker,
  order_topic,
  "New order: #123 - $99.99",
  "order-api"
);

// 5. 배경에서 감시 처리 (스트림)
var audit_group = create_consumer_group(stream, "audit");
var audit_consumer = create_consumer("audit-worker");
audit_consumer = consume_events(audit_consumer, order_event);
audit_group = acknowledge_events(audit_group, order_event.event_id);

// 6. 결과 추적
var lag = get_lag(audit_group, stream);
var stream_stats = get_stream_stats(stream, audit_group);
```

### 9. 대용량 데이터 처리

```freelang
// 1000만 이벤트를 배경에서 처리
var large_stream = create_event_stream("clickstream");

// 처리 규칙 (필터, 중복 제거, 세션 추적)
var rules = "dedup: user_id + timestamp, session: 30min, filter: not_bot";
var processor = create_stream_processor("clickstream-processor", large_stream, rules);

// 병렬 소비자 그룹 (8개 워커)
var worker_group = create_consumer_group(large_stream, "workers");

// 각 워커가 독립적으로 처리
// → 높은 처리량 (예: 초당 100,000 이벤트)
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
| Phase 8 | 2개 | 20개 | ✅ |
| Phase 9 | 2개 | 21개 | ✅ |
| **Phase 10** | **2개** | **22개** | **✅ 완료** |
| **합계** | **36개** | **494개** | **✅** |

---

## 🔑 Pub/Sub vs Event Streaming

### Pub/Sub (발행-구독)
- **목적**: 실시간 메시지 배포
- **구독자**: 자동 수신 (구독 중일 때만)
- **저장**: 옵션 (보존 정책)
- **사용처**: 실시간 알림, 이벤트 브로드캐스트

### Event Streaming
- **목적**: 지속적인 이벤트 로깅 및 처리
- **소비자**: 능동적 소비 (오프셋 관리)
- **저장**: 필수 (감시 추적)
- **사용처**: 감시 로그, 대용량 데이터 처리

---

## 🚀 다음 단계

### Phase 11: Distributed Tracing (계획)
- 요청 추적 (Trace ID)
- 서비스 간 호출 추적
- 성능 분석 및 병목 감지
- 예상: 18-20개 함수

### Phase 12+: Advanced Features
- Time-Series Database
- Full-Text Search
- Vector Search (ML/AI)

---

**생성일**: 2026-03-30
**버전**: Phase 10 - Event Streaming
**다음**: Phase 11 - Distributed Tracing

