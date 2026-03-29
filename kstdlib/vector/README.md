# 🎯 K-StdLib Vector Search Module

FreeLang v2 기반의 **벡터 임베딩과 의미 기반 검색** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ embedding.fl - 벡터 임베딩 (10개 함수)

텍스트를 벡터로 변환, 임베딩 모델, 벡터 저장소 관리

#### 임베딩 모델
| 함수 | 설명 |
|------|---------:|
| `load_embedding_model(name)` | 임베딩 모델 로드 (BERT, GPT, Word2Vec) |
| `encode_text(text, model)` | 텍스트를 벡터로 인코딩 |
| `encode_batch(texts, model)` | 여러 텍스트 배치 인코딩 |
| `apply_pooling(embeddings, strategy)` | 포울링 전략 적용 (CLS, MEAN, MAX) |

#### 벡터 저장소
| 함수 | 설명 |
|------|---------:|
| `create_vector_store(dimension, type)` | 벡터 저장소 생성 (FLAT, IVF, HNSW) |
| `add_vector(store, embedding)` | 벡터를 저장소에 추가 |

#### 벡터 전처리
| 함수 | 설명 |
|------|---------:|
| `chunk_text(text, size, overlap)` | 텍스트를 청크로 분할 |
| `normalize_vector(vector)` | 벡터 정규화 (L2) |
| `reduce_dimensionality(vectors, method, dim)` | 차원 축소 (PCA, t-SNE) |
| `quantize_vectors(vectors, bits)` | 벡터 양자화 (메모리 절약) |

---

### 2️⃣ similarity.fl - 유사도 & 클러스터링 (10개 함수)

유사도 계산, 유사 문서 검색, 클러스터링 알고리즘

#### 유사도 계산
| 함수 | 설명 |
|------|---------:|
| `calculate_cosine_similarity(v1, v2)` | 코사인 유사도 |
| `calculate_euclidean_distance(v1, v2)` | 유클리드 거리 |
| `calculate_manhattan_distance(v1, v2)` | 맨해튼 거리 |

#### 검색
| 함수 | 설명 |
|------|---------:|
| `similarity_search(query, vectors, k)` | 유사 벡터 검색 (Top-K) |
| `semantic_search(query, documents, k)` | 의미 기반 검색 |

#### 클러스터링
| 함수 | 설명 |
|------|---------:|
| `kmeans_clustering(vectors, k, iter)` | K-Means 클러스터링 |
| `dbscan_clustering(vectors, eps, min_pts)` | DBSCAN (밀도 기반) |
| `hierarchical_clustering(vectors, linkage)` | 계층적 클러스터링 |

#### 분석
| 함수 | 설명 |
|------|---------:|
| `detect_anomalies(vectors, method, threshold)` | 이상 벡터 감지 |
| `calculate_silhouette_score(clustering)` | 클러스터 품질 측정 |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|---------:|
| **embedding.fl** | 10개 | 벡터 임베딩 & 저장소 관리 |
| **similarity.fl** | 10개 | 유사도 검색 & 클러스터링 |
| **합계** | **20개** | Phase 14 - Vector Search |

---

## 🎯 사용 사례

### 1. 임베딩 모델 로드 및 텍스트 인코딩

```freelang
// BERT 모델 로드 (한국어 최적화)
var model = load_embedding_model("BERT");
// model_id: "model_001"
// vector_dimension: 768
// language: "multilingual"

// 텍스트를 768차원 벡터로 변환
var text = "프로그래밍은 정말 재미있습니다";
var embedding = encode_text(text, model);

// 결과:
// - embedding_id: "emb_001"
// - vector: [0.234, -0.567, 0.789, ...] (768개 값)
// - vector_dimension: 768
// - embedding_model: "BERT"
```

### 2. 배치 인코딩 (여러 텍스트 동시 처리)

```freelang
var model = load_embedding_model("BERT");

var texts = [
  "파이썬 프로그래밍",
  "자바스크립트 웹 개발",
  "C++ 성능 최적화",
  "고 언어 시스템 프로그래밍",
  "러스트 메모리 안전성"
];

var batch_result = encode_batch(texts, model);

// 결과:
// - batch_id: "batch_001"
// - total_texts: 5
// - successful: 5
// - failed: 0
// - processing_time_ms: 234
// - embeddings: [[벡터1], [벡터2], ...]
```

### 3. 벡터 저장소 생성 및 저장

```freelang
// 768차원 벡터 저장소 생성 (HNSW: 빠른 검색)
var store = create_vector_store(768, "HNSW");
// store_id: "store_001"
// total_vectors: 0
// index_type: "HNSW" (Hierarchical Navigable Small World)

// 임베딩을 저장소에 추가
var embedding = encode_text("프로그래밍", model);
store = add_vector(store, embedding);

// 결과:
// - total_vectors: 1
// - vector_dimension: 768
```

### 4. 텍스트 청크화 (RAG를 위한 분할)

```freelang
var document = "이것은 매우 긴 문서입니다. 많은 내용을 포함하고 있습니다...";

// 문서를 512글자씩 분할 (256글자 겹침)
var chunk = chunk_text(document, 512, 256);

// 결과:
// - chunk_id: "chunk_001"
// - original_doc_id: "doc_001"
// - chunk_index: 0
// - chunk_size: 512
// - overlap: 256
// - text: [첫 번째 청크 내용]

// 여러 청크로 분할하고 각각 임베딩
// 청크1: "이것은 매우 긴 문서입니다. 많은 내용을..."
// 청크2: "내용을 포함하고 있습니다. 상세한 설명..."
// 청크3: ...
```

### 5. 벡터 정규화

```freelang
var vector = "[3.0, 4.0]";

// L2 정규화 (벡터의 크기를 1로)
var normalized = normalize_vector(vector);
// normalized: "[0.6, 0.8]"
// 크기: sqrt(0.6² + 0.8²) = 1.0

// 활용: 코사인 유사도 계산 시 정규화된 벡터 사용
// cos(θ) = normalized_v1 · normalized_v2
```

### 6. 코사인 유사도 계산

```freelang
// 두 벡터의 유사도 계산
var vector1 = "[1.0, 0.0, 0.0]";  // "파이썬"
var vector2 = "[0.9, 0.1, 0.0]";  // "파이썬 프로그래밍"

var similarity = calculate_cosine_similarity(vector1, vector2);

// 결과:
// - similarity_metric: "COSINE"
// - similarity_score: 95 (0-100)
// - cos(θ) = 0.95 → 매우 유사함

// 다른 언어 예:
var vec_python = "[벡터...]";     // "python"
var vec_java = "[벡터...]";       // "java"
var sim = calculate_cosine_similarity(vec_python, vec_java);
// similarity_score: 45 (거리감 있음)
```

### 7. 유클리드 거리 계산

```freelang
var vector1 = "[0.0, 0.0]";
var vector2 = "[3.0, 4.0]";

var distance = calculate_euclidean_distance(vector1, vector2);

// 결과:
// - similarity_metric: "EUCLIDEAN"
// - distance: 5
// - sqrt(3² + 4²) = 5.0

// 거리 해석:
// - distance < 1: 매우 유사
// - distance 1-3: 유사
// - distance > 5: 다름
```

### 8. 유사도 검색 (Top-K 검색)

```freelang
// 사용자 쿼리를 벡터로 변환
var query = "파이썬 프로그래밍 튜토리얼";
var query_vector = encode_text(query, model);

// 벡터 저장소에서 Top-5 유사 문서 검색
var search_result = similarity_search(query_vector, store, 5);

// 결과:
// - matched_docs: [
//     {doc_id: "doc_001", score: 95},
//     {doc_id: "doc_003", score: 88},
//     {doc_id: "doc_005", score: 82},
//     {doc_id: "doc_002", score: 75},
//     {doc_id: "doc_004", score: 68}
//   ]
// - total_results: 5
// - search_time_ms: 12
```

### 9. K-Means 클러스터링

```freelang
// 벡터 저장소의 모든 벡터를 5개 그룹으로 분류
var clustering = kmeans_clustering(store, 5, 100);

// K-Means 알고리즘:
// 1. 5개의 초기 중심 선택
// 2. 각 벡터를 가장 가까운 중심에 할당
// 3. 새로운 중심 계산
// 4. 수렴할 때까지 반복 (최대 100회)

// 결과:
// - cluster_count: 5
// - total_points: 1000
// - clusters: [
//     {
//       cluster_id: "cluster_1",
//       centroid: [벡터...],
//       member_count: 210
//     },
//     {
//       cluster_id: "cluster_2",
//       centroid: [벡터...],
//       member_count: 195
//     },
//     ...
//   ]
// - silhouette_score: 72 (클러스터 품질 좋음)
// - processing_time_ms: 1234
```

### 10. DBSCAN 클러스터링 (밀도 기반)

```freelang
// 밀도 기반 클러스터링
// epsilon = 0.5 (이웃 반경)
// min_points = 5 (이웃 최소 개수)
var clustering = dbscan_clustering(store, 50, 5);

// DBSCAN 특징:
// - 사전에 클러스터 개수 지정 불필요
// - 이상 벡터를 "잡음"으로 자동 감지
// - 임의의 모양의 클러스터 생성 가능

// 결과:
// - cluster_count: 7 (자동 결정)
// - total_points: 1000
// - 차이점: K-Means와 달리 모든 점이 클러스터에 속할 필요 없음
// - 약 50개 이상 벡터는 "잡음" (이상)으로 분류
```

### 11. 계층적 클러스터링 (덴드로그램)

```freelang
// 계층적 클러스터링 (완전 연결)
var dendrogram = hierarchical_clustering(store, "complete");

// 덴드로그램 시각화:
// ----[그룹 A]
//   |--[그룹 1]
//   |  |--문서1
//   |  |--문서2
//   |--[그룹 2]
//      |--문서3
//      |--문서4
// ----[그룹 B]
//   |--문서5
//   |--문서6

// 결과:
// - dendrogram_id: "dendro_001"
// - tree_structure: (JSON 형식 트리)
// - leaf_count: 1000 (원본 벡터 개수)
// - height: 45 (덴드로그램 높이)

// 활용: 원하는 높이에서 자르면 다양한 그룹화 가능
```

### 12. 이상 감지 (Anomaly Detection)

```freelang
// 이상 벡터 자동 감지
var anomalies = detect_anomalies(store, "isolation_forest", 80);

// 이상도 > 80인 벡터를 이상으로 분류

// 결과:
// - anomaly_count: 23
// - anomalies: [
//     {
//       vector_id: "vec_542",
//       anomaly_score: 92 (매우 이상함)
//     },
//     {
//       vector_id: "vec_781",
//       anomaly_score: 88
//     },
//     ...
//   ]

// 활용:
// - 스팸/악성 콘텐츠 감지
// - 사용자 행동 이상 감지
// - 데이터 품질 관리
```

### 13. 클러스터 품질 측정 (실루엣 점수)

```freelang
var clustering = kmeans_clustering(store, 5, 100);

// 클러스터 품질 점수 계산 (0-100)
var quality = calculate_silhouette_score(clustering);

// 실루엣 점수 해석:
// - 80-100: 매우 좋은 클러스터링
// - 60-80: 좋은 클러스터링
// - 40-60: 보통
// - 0-40: 나쁜 클러스터링

// 점수가 낮으면:
// - K 값 조정
// - 전처리 개선
// - 다른 알고리즘 시도
```

### 14. 차원 축소 (PCA로 3D 시각화)

```freelang
// 768차원 벡터를 3차원으로 축소 (시각화용)
var reduced = reduce_dimensionality(vectors, "PCA", 3);

// 결과:
// - original_dimension: 768
// - reduced_dimension: 3
// - reduction_ratio: 96 (96% 축소)
// - vectors: [
//     [0.5, 0.3, 0.2],  // 원본 768차원 → 3차원
//     [0.4, 0.6, 0.1],
//     ...
//   ]

// 활용:
// - 벡터 시각화 (3D 그래프)
// - 계산 속도 향상
// - 메모리 절약
```

### 15. 의미 기반 검색 (Semantic Search)

```freelang
// 의미적으로 유사한 문서 검색
// "어떻게 파이썬을 배우나요?" → 유사한 의미의 문서 검색

var query = "파이썬 학습 방법";
var documents = [
  "Python 튜토리얼",
  "자바 프로그래밍",
  "파이썬 기초 강좌",
  "C++ 고급 강의",
  "파이썬으로 배우는 프로그래밍"
];

var results = semantic_search(query, documents, 3);

// 결과:
// - matched_docs: [
//     {doc: "파이썬으로 배우는 프로그래밍", score: 92},
//     {doc: "파이썬 기초 강좌", score: 88},
//     {doc: "Python 튜토리얼", score: 85}
//   ]

// 특징:
// - 정확한 키워드 매칭 불필요
// - "파이썬 학습"과 "Python 튜토리얼"을 의미적으로 유사하다고 인식
// - 자연어 의미 이해
```

### 16. 실제 시나리오: RAG (Retrieval-Augmented Generation)

```freelang
// 1. 문서 준비
var documents = [
  "한국의 수도는 서울입니다. 서울은 한강이 흐르고...",
  "부산은 해양 도시로 해운대 해수욕장이 유명합니다...",
  "대구는 대구 국제 영화제로 유명합니다..."
];

// 2. 문서 청크화
var chunks = chunk_text(documents[0], 512, 256);

// 3. 임베딩 생성
var model = load_embedding_model("BERT");
var embeddings = encode_batch(chunks, model);

// 4. 벡터 저장소 구축
var store = create_vector_store(768, "HNSW");
// 모든 청크의 벡터를 저장소에 추가

// 5. 사용자 질문에 응답
var user_query = "한국의 수도에 대해 알려주세요";
var query_vector = encode_text(user_query, model);

// 6. 관련 문서 검색
var search_results = similarity_search(query_vector, store, 3);
// 가장 관련된 청크 3개를 가져옴

// 7. LLM에 컨텍스트 전달
// "다음 정보를 바탕으로 답변하세요: [검색된 청크들]"
// LLM이 검색된 정보로 정확한 답변 생성
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
| Phase 12 | 2개 | 20개 | ✅ |
| Phase 13 | 2개 | 20개 | ✅ |
| **Phase 14** | **2개** | **20개** | **✅ 완료** |
| **합계** | **44개** | **574개** | **✅** |

---

## 🔑 유사도 메트릭 비교

| 메트릭 | 계산식 | 범위 | 활용처 |
|--------|--------|------|--------|
| **코사인** | cos(θ) = (A·B)/(‖A‖‖B‖) | 0-1 | 텍스트 유사도 |
| **유클리드** | √(Σ(ai-bi)²) | 0-∞ | 이미지, 특성 거리 |
| **맨해튼** | Σ\|ai-bi\| | 0-∞ | 고차원 데이터 |
| **해밍** | 서로 다른 비트 수 | 0-∞ | 이진 벡터 |

---

## 🔑 클러스터링 알고리즘 비교

| 알고리즘 | 장점 | 단점 | 사용처 |
|---------|------|------|--------|
| **K-Means** | 빠름, 간단 | K 지정 필요, 구 모양 | 일반적 클러스터링 |
| **DBSCAN** | K 불필요, 이상감지 | 밀도 변수 | 밀집된 클러스터 |
| **계층적** | 덴드로그램, 유연 | 느림, 메모리 많음 | 관계 분석 |

---

## 🚀 다음 단계

### Phase 15: GraphQL Federation
- GraphQL 쿼리 지원
- 분산 Schema 조합
- 서브그래프 관리

### 향후 확장
- 임베딩 모델 미세조정 (Fine-tuning)
- 멀티모달 임베딩 (텍스트+이미지)
- 실시간 벡터 스트리밍

---

**생성일**: 2026-03-30
**버전**: Phase 14 - Vector Search
**다음**: Phase 15 - GraphQL Federation
