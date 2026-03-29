# ⚡ K-StdLib Distributed Caching Module

FreeLang v2 기반의 **Redis 호환 분산 캐싱 및 클러스터 관리** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ distributed.fl - Redis 호환 분산 캐싱 (11개 함수)

네트워크 투명 분산 캐싱, Redis 프로토콜 지원

#### 분산 캐시 클라이언트
| 함수 | 설명 |
|------|---------|
| `create_distributed_cache(host, port, max_size)` | 분산 캐시 클라이언트 생성 |
| `connect_to_redis(cache)` | Redis 서버에 연결 |
| `verify_redis_connection(cache)` | 연결 상태 확인 |

#### 기본 KV 작업
| 함수 | 설명 |
|------|---------|
| `set_distributed_cache(cache, key, value, ttl)` | 값 저장 (TTL 지원) |
| `get_distributed_cache(cache, key)` | 값 조회 |
| `delete_distributed_cache(cache, key)` | 값 삭제 |
| `expire_distributed_cache(cache, key, ttl)` | TTL 설정 |

#### 배치 작업
| 함수 | 설명 |
|------|---------|
| `batch_get(cache, keys)` | 여러 키 한번에 조회 (MGET) |
| `batch_set(cache, items)` | 여러 항목 한번에 저장 (MSET) |

#### 관리 & 통계
| 함수 | 설명 |
|------|---------|
| `flush_all(cache)` | 전체 캐시 초기화 |
| `get_cache_stats_distributed(cache)` | 통계 조회 (히트/미스/레이턴시) |

---

### 2️⃣ clustering.fl - 클러스터 관리 (10개 함수)

분산 캐시 클러스터, 레플리케이션, 자동 Failover

#### 클러스터 생성 & 노드 관리
| 함수 | 설명 |
|------|---------|
| `create_cache_cluster(name, replication_factor)` | 클러스터 생성 |
| `create_cluster_node(host, port, is_master, shard_count)` | 클러스터 노드 생성 |
| `add_node_to_cluster(cluster, node)` | 클러스터에 노드 추가 |
| `remove_node_from_cluster(cluster, node_id)` | 클러스터에서 노드 제거 |
| `get_node_list(cluster)` | 노드 목록 조회 |

#### 데이터 일관성
| 함수 | 설명 |
|------|---------|
| `replicate_data(cluster, key, value, primary_node)` | 데이터 레플리케이션 |
| `set_consistency_level(cluster, level)` | 일관성 레벨 설정 (STRONG/EVENTUAL/WEAK) |

#### Failover & 리밸런싱
| 함수 | 설명 |
|------|---------|
| `handle_failover(cluster, primary_node_id)` | Failover 처리 |
| `rebalance_cluster(cluster)` | 클러스터 리밸런싱 |

#### 모니터링
| 함수 | 설명 |
|------|---------|
| `get_cluster_stats(cluster)` | 클러스터 통계 |
| `verify_cluster_health(cluster)` | 클러스터 상태 확인 |
| `update_node_health(node, is_healthy)` | 노드 상태 업데이트 |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|---------|
| **distributed.fl** | 11개 | Redis 호환 분산 캐싱 |
| **clustering.fl** | 10개 | 클러스터 관리 & Failover |
| **합계** | **21개** | Phase 9 - Distributed Caching |

---

## 🎯 사용 사례

### 1. 기본 분산 캐싱

```freelang
// 분산 캐시 클라이언트 생성 (Redis 호스트 연결)
var cache = create_distributed_cache("redis.example.com", 6379, 1000000);

// Redis 서버에 연결
cache = connect_to_redis(cache);

// 값 저장 (TTL: 3600초)
cache = set_distributed_cache(cache, "user_123", "Alice", 3600);

// 값 조회
var value = get_distributed_cache(cache, "user_123");
// 결과: "Alice"

// TTL 갱신
cache = expire_distributed_cache(cache, "user_123", 7200);
```

### 2. 배치 작업

```freelang
// 여러 키를 한번에 저장 (MSET)
var batch_items = "key1:val1,key2:val2,key3:val3";
cache = batch_set(cache, batch_items);

// 여러 키를 한번에 조회 (MGET)
var values = batch_get(cache, "key1,key2,key3");
// 결과: val1, val2, val3
```

### 3. 클러스터 생성

```freelang
// 복제 인수 3인 클러스터 생성 (원본 + 2개 복제본)
var cluster = create_cache_cluster("production", 3);

// 노드 생성 (마스터 노드)
var master = create_cluster_node("node1.example.com", 6379, true, 5461);
cluster = add_node_to_cluster(cluster, master);

// 슬레이브 노드 추가
var slave1 = create_cluster_node("node2.example.com", 6379, false, 5461);
cluster = add_node_to_cluster(cluster, slave1);

var slave2 = create_cluster_node("node3.example.com", 6379, false, 5462);
cluster = add_node_to_cluster(cluster, slave2);

// 노드 목록 조회
var nodes = get_node_list(cluster);
```

### 4. 데이터 레플리케이션

```freelang
// 마스터에 데이터 저장
cache = set_distributed_cache(cache, "session_abc", "token_xyz", 3600);

// 보조 노드들에 자동 레플리케이션
var replica = replicate_data(
  cluster,
  "session_abc",
  "token_xyz",
  "master_node_001"
);
// 상태: "IN_SYNC"
```

### 5. 일관성 레벨 설정

```freelang
// 강한 일관성 (STRONG)
// - 모든 쓰기 후 모든 복제본과 동기화 대기
cluster = set_consistency_level(cluster, "STRONG");

// 최종 일관성 (EVENTUAL)
// - 쓰기 후 비동기 복제
cluster = set_consistency_level(cluster, "EVENTUAL");

// 약한 일관성 (WEAK)
// - 최소 일관성 보장
cluster = set_consistency_level(cluster, "WEAK");
```

### 6. Failover 처리

```freelang
// 마스터 노드 장애 감지
// (심장 박동 타임아웃)
var failover = handle_failover(cluster, "master_node_001");
// 상태: "IN_PROGRESS"
// 보조 노드 중 하나가 새로운 마스터가 됨

// 상태 확인
if verify_cluster_health(cluster) {
  // 클러스터 정상 작동
}
```

### 7. 클러스터 리밸런싱

```freelang
// 노드 추가 후 리밸런싱
var new_node = create_cluster_node("node4.example.com", 6379, false, 5461);
cluster = add_node_to_cluster(cluster, new_node);

// 샤드 리밸런싱 (데이터 재분배)
cluster = rebalance_cluster(cluster);
// is_balanced = true, 모든 노드에 균등하게 데이터 분배
```

### 8. 클러스터 모니터링

```freelang
// 클러스터 통계 조회
var stats = get_cluster_stats(cluster);
// total_nodes: 3
// healthy_nodes: 3
// average_latency_ms: 5

// 노드 상태 업데이트
var node = create_cluster_node("node2.example.com", 6379, false, 5461);
node = update_node_health(node, true);
// is_healthy: true
```

### 9. 연결 상태 확인

```freelang
// Redis 연결 상태 확인
if verify_redis_connection(cache) {
  // 연결 정상, 캐시 작업 가능
} else {
  // 연결 끊김, 재연결 필요
  cache = connect_to_redis(cache);
}
```

### 10. 통계 조회

```freelang
// 분산 캐시 통계
var stats = get_cache_stats_distributed(cache);
// total_keys: 1000
// total_size_mb: 512
// hit_count: 5000
// miss_count: 200
// average_latency_ms: 5
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
| **Phase 9** | **2개** | **21개** | **✅ 완료** |
| **합계** | **34개** | **472개** | **✅** |

---

## 🔑 Redis 호환성

### 지원되는 명령어
- **기본 KV**: SET, GET, DEL, EXISTS
- **TTL**: EXPIRE, TTL, PERSIST
- **배치**: MGET, MSET
- **관리**: FLUSHALL, DBSIZE, INFO
- **클러스터**: CLUSTER NODES, CLUSTER SLOTS

### 프로토콜
- RESP (Redis Serialization Protocol) 호환
- TCP 연결 (기본 포트 6379)
- 요청-응답 파이프라이닝 지원

---

## 🚀 다음 단계

### Phase 10: Event Streaming (계획)
- Pub/Sub 메시징
- 이벤트 스트림 처리
- 예상: 20-22개 함수

### Phase 11+: Advanced Features
- Distributed Tracing
- Time-Series Data
- Full-Text Search

---

**생성일**: 2026-03-30
**버전**: Phase 9 - Distributed Caching
**다음**: Phase 10 - Event Streaming

