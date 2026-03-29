# ⚡ K-StdLib Cache & Queue Module

FreeLang v2 기반의 **캐싱 시스템 및 메시지 큐** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ cache.fl - 캐싱 전략 (16개 함수)

LRU, LFU, FIFO, TTL 캐싱 구현

#### 기본 캐시 (Generic Cache)
| 함수 | 설명 |
|------|------|
| `create_cache(strategy, max_size)` | 캐시 생성 (LRU, LFU, FIFO, TTL) |
| `create_cache_item(key, value)` | 캐시 항목 생성 |
| `cache_put(cache, key, value)` | 캐시에 값 저장 |
| `cache_get(cache, key)` | 캐시에서 값 조회 |
| `cache_remove(cache, key)` | 캐시에서 값 제거 |
| `cache_clear(cache)` | 캐시 전체 비우기 |

#### 캐시 상태 관리
| 함수 | 설명 |
|------|------|
| `record_cache_hit(cache)` | 캐시 히트 기록 |
| `record_cache_miss(cache)` | 캐시 미스 기록 |
| `is_cache_full(cache)` | 캐시 가득 참 확인 |

#### LRU 캐시 (Least Recently Used)
| 함수 | 설명 |
|------|------|
| `create_lru_cache(max_size)` | LRU 캐시 생성 |
| `lru_access(cache, key)` | LRU 접근 (사용 기록 업데이트) |
| `lru_evict(cache)` | LRU 제거 (가장 오래 사용 안 된 항목) |

#### TTL 캐시 (Time To Live)
| 함수 | 설명 |
|------|------|
| `create_ttl_cache(max_size, default_ttl_seconds)` | TTL 캐시 생성 |
| `is_cache_item_expired(item)` | 캐시 항목 만료 확인 |
| `ttl_cleanup(cache)` | TTL 캐시 정리 (만료된 항목 제거) |

#### 캐시 통계
| 함수 | 설명 |
|------|------|
| `calculate_cache_hit_rate(cache)` | 캐시 히트율 계산 (%) |
| `create_cache_statistics(cache)` | 캐시 통계 생성 |
| `get_cache_info(cache)` | 캐시 정보 조회 |
| `get_cache_statistics_info(stats)` | 캐시 통계 정보 조회 |

---

### 2️⃣ queue.fl - 메시지 큐 (15개 함수)

FIFO, Priority Queue, 비동기 작업 처리

#### 기본 FIFO 큐
| 함수 | 설명 |
|------|------|
| `create_queue(queue_type, max_size)` | FIFO 큐 생성 |
| `create_queue_item(item_id, data)` | 큐 항목 생성 |
| `enqueue(queue, item)` | 큐에 항목 추가 (끝) |
| `dequeue(queue)` | 큐에서 항목 제거 (앞) |
| `queue_peek(queue)` | 큐 첫 번째 항목 확인 |
| `queue_clear(queue)` | 큐 비우기 |

#### 우선순위 큐 (Priority Queue)
| 함수 | 설명 |
|------|------|
| `create_priority_queue(max_size)` | 우선순위 큐 생성 |
| `priority_enqueue(pq, item)` | 우선순위 큐에 항목 추가 |
| `priority_dequeue(pq)` | 우선순위 큐에서 항목 제거 (최고 우선순위) |
| `priority_queue_sort(pq)` | 우선순위 큐 정렬 |

#### 비동기 작업 (Async Task)
| 함수 | 설명 |
|------|------|
| `create_async_task(task_name, handler_name)` | 비동기 작업 생성 |
| `start_async_task(task)` | 비동기 작업 시작 |
| `complete_async_task(task, result)` | 비동기 작업 완료 |
| `fail_async_task(task, error_message)` | 비동기 작업 실패 (재시도 처리) |
| `can_retry_task(task)` | 비동기 작업 재시도 가능 확인 |

#### 정보 조회
| 함수 | 설명 |
|------|------|
| `get_queue_info(queue)` | 큐 정보 조회 |
| `get_priority_queue_info(pq)` | 우선순위 큐 정보 조회 |
| `get_async_task_info(task)` | 비동기 작업 정보 조회 |
| `get_queue_size(queue)` | 큐 크기 확인 |
| `get_queue_capacity(queue)` | 큐 여유 용량 확인 |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|------|
| **cache.fl** | 16개 | LRU, LFU, FIFO, TTL 캐싱 |
| **queue.fl** | 15개 | FIFO 큐, 우선순위 큐, 비동기 작업 |
| **합계** | **31개** | Phase 7 - Cache & Queue System |

---

## 🎯 사용 사례

### 1. 기본 캐싱

```freelang
// 캐시 생성 (LRU 전략, 최대 100개 항목)
var cache = create_cache("LRU", 100);

// 캐시에 저장
var item = create_cache_item("user_123", "Alice");
cache = cache_put(cache, "user_123", "Alice");

// 캐시에서 조회
var value = cache_get(cache, "user_123");

// 캐시 히트 기록
cache = record_cache_hit(cache);

// 캐시 정보
var info = get_cache_info(cache);
// 결과: "캐시: LRU (1/100, 추가: 1, 제거: 0)"

// 캐시 통계
var stats = create_cache_statistics(cache);
// 히트율: (1/1)*100 = 100%
```

### 2. LRU 캐시

```freelang
// LRU 캐시 생성 (최대 50개)
var lru = create_lru_cache(50);

// 항목 접근 (최근 사용으로 표시)
lru = lru_access(lru, "key_1");
lru = lru_access(lru, "key_2");
lru = lru_access(lru, "key_3");

// 캐시 가득 찼을 때 LRU 제거 (가장 오래 사용 안 된 항목)
if is_cache_full(lru) {
  lru = lru_evict(lru);
}
```

### 3. TTL 캐시

```freelang
// TTL 캐시 생성 (기본 TTL: 3600초 = 1시간)
var ttl = create_ttl_cache(100, 3600);

// 항목 추가
ttl = cache_put(ttl, "session_123", "token");

// 만료된 항목 정리
ttl = ttl_cleanup(ttl);
```

### 4. FIFO 큐

```freelang
// FIFO 큐 생성 (최대 1000개)
var queue = create_queue("FIFO", 1000);

// 큐에 항목 추가
var item1 = create_queue_item("msg_001", "Hello");
var item2 = create_queue_item("msg_002", "World");

queue = enqueue(queue, item1);
queue = enqueue(queue, item2);

// 첫 번째 항목 확인
var first = queue_peek(queue);

// 큐에서 제거 (FIFO 순서)
queue = dequeue(queue);  // msg_001 제거
queue = dequeue(queue);  // msg_002 제거

// 큐 정보
var info = get_queue_info(queue);
```

### 5. 우선순위 큐

```freelang
// 우선순위 큐 생성
var pq = create_priority_queue(1000);

// 우선순위 항목 추가 (priority: 높을수록 높은 우선순위)
var urgent = create_queue_item("task_001", "Critical");
urgent.priority = 10;

var normal = create_queue_item("task_002", "Normal");
normal.priority = 5;

var low = create_queue_item("task_003", "Low");
low.priority = 1;

pq = priority_enqueue(pq, low);
pq = priority_enqueue(pq, normal);
pq = priority_enqueue(pq, urgent);

// 정렬 (높은 우선순위 먼저)
pq = priority_queue_sort(pq);

// 제거 (task_001이 먼저 제거됨)
pq = priority_dequeue(pq);
```

### 6. 비동기 작업

```freelang
// 비동기 작업 생성
var task = create_async_task("send_email", "email_handler");
task.priority = 5;
task.max_retries = 3;

// 작업 시작
task = start_async_task(task);

// 작업 완료
var result = "Email sent successfully";
task = complete_async_task(task, result);

// 작업 정보
var info = get_async_task_info(task);
// 결과: "작업: send_email (COMPLETED, 재시도: 0/3)"

// 작업 실패 (재시도 가능)
var task2 = create_async_task("process_data", "processor");
task2 = start_async_task(task2);
task2 = fail_async_task(task2, "Timeout error");

if can_retry_task(task2) {
  // 재시도 예약
  task2 = start_async_task(task2);
}
```

### 7. 캐시 + 큐 통합

```freelang
// 시나리오: API 응답 캐싱 + 백그라운드 작업 처리

// 1. 캐시 설정
var response_cache = create_cache("LRU", 500);

// 2. 요청 큐 설정
var request_queue = create_queue("FIFO", 10000);

// 3. 비동기 작업 풀
var worker_tasks = "";

// 4. API 요청 처리
var cached_response = cache_get(response_cache, "/api/users");

if cached_response.len > 0 {
  // 캐시 히트
  response_cache = record_cache_hit(response_cache);
} else {
  // 캐시 미스 - 큐에 작업 추가
  var api_request = create_queue_item("api_call_001", "/api/users");
  request_queue = enqueue(request_queue, api_request);

  response_cache = record_cache_miss(response_cache);

  // 큐에서 작업 처리 (비동기)
  var task = create_queue_item("task_001", "Fetch from API");
  // ... 백그라운드에서 처리
}

// 5. 통계
var cache_stats = create_cache_statistics(response_cache);
var queue_info = get_queue_info(request_queue);
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
| Phase 6 | 4개 | 58개 | ✅ |
| Phase 7 | 2개 | 31개 | ✅ **완료** |
| **합계** | **30개** | **431개** | **✅** |

---

## 🚀 다음 단계

### Phase 8: Monitoring & Metrics (계획)
- 성능 모니터링
- 메트릭 수집
- 알림 시스템
- 예상: 15-18개 함수

### Phase 9+: Advanced Features
- 분산 캐싱 (Redis 호환)
- 메시지 큐 클러스터
- 실시간 이벤트 처리

---

**생성일**: 2026-03-30
**버전**: Phase 7 - Cache & Queue System
**다음**: Phase 8 - Monitoring & Metrics

