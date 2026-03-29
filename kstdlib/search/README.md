# 🔍 K-StdLib Full-Text Search Module

FreeLang v2 기반의 **전문 검색(Full-Text Search)** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ search.fl - 검색 기능 (10개 함수)

문서 인덱싱, 검색 쿼리, 다양한 검색 방식

#### 인덱싱 & 문서 관리
| 함수 | 설명 |
|------|---------:|
| `create_search_index(type)` | 검색 인덱스 생성 (INVERTED, FORWARD, BOTH) |
| `add_document(index, doc)` | 문서를 인덱스에 추가 |
| `create_inverted_index(docs)` | 역색인(Inverted Index) 생성 |
| `tokenize(text, language)` | 텍스트를 토큰으로 분해 |
| `filter_stopwords(tokens, lang)` | 불용어 필터링 |
| `normalize_text(text)` | 텍스트 정규화 (정간, 대소문자, 특수문자) |

#### 검색 방식
| 함수 | 설명 |
|------|---------:|
| `simple_search(index, query)` | 단순 검색 |
| `boolean_search(index, query)` | 불린 검색 (AND, OR, NOT) |
| `phrase_search(index, phrase)` | 구문 검색 ("정확한 구문") |

---

### 2️⃣ ranking.fl - 검색 순위 & 점수 (10개 함수)

BM25, TF-IDF 알고리즘, 부스팅, 개인화

#### 점수 계산
| 함수 | 설명 |
|------|---------:|
| `calculate_bm25(...)` | Okapi BM25 알고리즘 적용 |
| `calculate_tfidf(...)` | TF-IDF 점수 계산 |
| `calculate_relevance_score(...)` | 관련성 점수 계산 |
| `calculate_final_score(...)` | 최종 점수 (여러 요소 종합) |

#### 순위 매기기
| 함수 | 설명 |
|------|---------:|
| `rank_results(...)` | 검색 결과 순위 매기기 |
| `apply_boosting_rule(...)` | 부스팅 규칙 적용 |
| `apply_personalization(...)` | 개인화 필터 적용 |
| `apply_sorting(...)` | 정렬 기준 적용 |
| `rank_by_popularity(...)` | 인기도 기반 순위 |
| `rank_by_freshness(...)` | 신선도(최신) 기반 순위 |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|---------:|
| **search.fl** | 10개 | 검색 인덱싱 & 쿼리 방식 |
| **ranking.fl** | 10개 | 점수 계산 & 순위 매기기 |
| **합계** | **20개** | Phase 13 - Full-Text Search |

---

## 🎯 사용 사례

### 1. 검색 인덱스 생성

```freelang
// INVERTED INDEX: 역색인 (검색에 최적화)
var index = create_search_index("INVERTED");
// INVERTED: 용어 → [문서들]로 매핑
// 장점: 검색 빠름
// 단점: 인덱싱 시간 오래 걸림

// FORWARD INDEX: 정방향 인덱스 (업데이트에 최적화)
var index = create_search_index("FORWARD");
// FORWARD: 문서 → [용어들]로 매핑
// 장점: 인덱싱 빠름
// 단점: 검색 느림

// BOTH: 양방향 인덱스 (성능 최적화)
var index = create_search_index("BOTH");
// 역색인 + 정방향 인덱스 모두 유지
// 최적 성능, 높은 메모리 사용
```

### 2. 문서 추가 및 인덱싱

```freelang
var index = create_search_index("INVERTED");

var doc1 = Document {
  doc_id: "doc_001",
  title: "프로그래밍 시작하기",
  content: "Python 기초부터 고급까지 배워봅시다",
  author: "Kim",
  created_at: "2026-03-15T00:00:00Z",
  updated_at: "2026-03-30T00:00:00Z",
  language: "ko"
};

index = add_document(index, doc1);

var doc2 = Document {
  doc_id: "doc_002",
  title: "웹 개발 완벽 가이드",
  content: "HTML, CSS, JavaScript로 웹사이트 만들기",
  author: "Lee",
  created_at: "2026-03-20T00:00:00Z",
  updated_at: "2026-03-30T00:00:00Z",
  language: "ko"
};

index = add_document(index, doc2);
// 인덱스에 2개 문서 저장됨
```

### 3. 토큰화와 정규화

```freelang
var text = "  프로그래밍은 정말 재미있습니다!  ";

// 토큰화 (한국어)
var tokens = tokenize(text, "ko");
// tokens: ["프로그래밍", "정말", "재미있습니다"]
// token_count: 3
// removed_stopwords: 2 ("은", "입니다")

// 불용어 필터링 (은, 는, 이, 가 등)
var filtered = filter_stopwords(tokens, "ko");
// filtered: ["프로그래밍", "재미있다"]
// removed_stopwords: 2

// 텍스트 정규화
var normalized = normalize_text(text);
// normalized: "프로그래밍은정말재미있습니다"
// - 공백 제거
// - 특수문자 제거
// - 일관된 형태로 변환
```

### 4. 단순 검색 (Simple Search)

```freelang
var index = create_search_index("INVERTED");
// ... 문서 추가 ...

// "Python" 검색
var result = simple_search(index, "Python");

// 결과:
// - doc_id: "doc_001"
// - title: "프로그래밍 시작하기"
// - relevance_score: 85 (0-100)
// - matched_terms: "Python"
// - excerpt: "Python 기초부터 고급까지 배워봅시다"
// - rank: 1
```

### 5. 불린 검색 (Boolean Search)

```freelang
// AND 검색: 모든 조건을 만족해야 함
var result = boolean_search(index, "Python AND 기초");
// "Python"과 "기초" 모두 포함된 문서만

// OR 검색: 하나라도 만족하면 됨
var result = boolean_search(index, "Python OR JavaScript");
// "Python" 또는 "JavaScript" 포함 문서

// NOT 검색: 특정 단어 제외
var result = boolean_search(index, "프로그래밍 NOT Java");
// "프로그래밍" 포함하되 "Java" 제외
```

### 6. 구문 검색 (Phrase Search)

```freelang
// 정확한 구문 검색
var result = phrase_search(index, "프로그래밍은 정말 재미있습니다");

// 결과:
// - 정확히 이 순서대로 나타나는 문서만 검색
// - relevance_score: 95 (구문 일치는 가장 높은 점수)
// - 정확한 구문 매칭은 높은 정확도
```

### 7. BM25 점수 계산

```freelang
// BM25: 현대 검색 엔진의 표준 알고리즘
// Okapi BM25 (가장 널리 사용됨)

var bm25 = calculate_bm25(
  "doc_001",           // 문서 ID
  "Python",            // 검색 용어
  1200,                // 문서 길이 (글자 수)
  1000,                // 평균 문서 길이
  45                   // IDF (역 문서 빈도)
);

// 결과:
// - term_frequency: 3 (문서 내 "Python" 출현 3회)
// - inverse_doc_frequency: 45
// - bm25_score: 72 (0-100)
```

### 8. TF-IDF 점수 계산

```freelang
// TF-IDF: 통계 기반 점수
// TF (Term Frequency): 문서 내 용어 빈도
// IDF (Inverse Document Frequency): 역 문서 빈도

var tfidf = calculate_tfidf(
  "doc_001",           // 문서 ID
  "Python",            // 검색 용어
  3,                   // TF: 문서 내 3회
  150,                 // DF: 150개 문서에 포함
  10000                // 전체 문서: 10,000개
);

// 결과:
// - term_frequency: 3
// - document_frequency: 150
// - tfidf_score: 68 (0-100)
// IDF 계산: log(10000/150) ≈ 1.82
```

### 9. 검색 결과 순위 매기기

```freelang
// 검색 결과를 여러 방식으로 순위 매기기

// BM25 기반 순위
var ranking = rank_results("results_json", "BM25");
// 결과:
// - ranking_id: "rank_001"
// - total_results: 42
// - ranked_documents: [doc_001(85점), doc_003(72점), doc_002(68점)]

// TF-IDF 기반 순위
var ranking = rank_results("results_json", "TFIDF");

// 하이브리드 순위 (BM25 + TF-IDF + 기타)
var ranking = rank_results("results_json", "HYBRID");
```

### 10. 부스팅 규칙 적용

```freelang
// 제목에 매칭되는 문서에 가중치 부여
var boost = BoostingRule {
  rule_id: "boost_001",
  field: "title",
  condition: "contains_query_term",
  boost_factor: 3                    // 3배 부스팅
};

var original_score = 50;
var boosted_score = apply_boosting_rule(original_score, boost);
// boosted_score: 150 → 100 (최댓값으로 제한)

// 최근 문서 부스팅
var recent_boost = BoostingRule {
  rule_id: "boost_002",
  field: "created_at",
  condition: "within_7_days",
  boost_factor: 2
};
```

### 11. 개인화 필터 적용

```freelang
// 사용자별 개인화된 검색 결과

var personalization = PersonalizationFilter {
  user_id: "user_123",
  preferred_languages: "[\"ko\", \"en\"]",
  preferred_authors: "[\"Kim\", \"Lee\"]",
  search_history: "{\"Python\": 5, \"JavaScript\": 3}",
  boost_recent: true
};

var ranked = apply_personalization(
  "search_results",
  personalization
);

// 결과:
// - 사용자의 선호 언어/저자 우선
// - 검색 이력 기반 관련성 강화
// - 최신 문서 우선 순위
```

### 12. 정렬 기준 적용

```freelang
// 검색 결과를 다양한 기준으로 정렬

// 관련성순 정렬 (기본)
var sort1 = SortCriteria {
  sort_field: "relevance",
  sort_order: "DESC",
  secondary_sort: "date",
  collation: "ko_KR"
};
var ranked = apply_sorting("results", sort1);

// 날짜순 정렬 (최신)
var sort2 = SortCriteria {
  sort_field: "date",
  sort_order: "DESC",
  secondary_sort: "relevance",
  collation: "ko_KR"
};

// 인기도순 정렬 (조회수)
var sort3 = SortCriteria {
  sort_field: "popularity",
  sort_order: "DESC",
  secondary_sort: "date",
  collation: "ko_KR"
};
```

### 13. 최종 점수 계산

```freelang
// 여러 점수를 종합하여 최종 관련성 점수 계산
// BM25(40%) + TF-IDF(30%) + 부스팅(20%) + 개인화(10%)

var final = calculate_final_score(
  75,                  // BM25 점수
  68,                  // TF-IDF 점수
  100,                 // 부스팅 점수
  80                   // 개인화 점수
);

// 최종 점수 = (75×40 + 68×30 + 100×20 + 80×10) / 100
//           = (3000 + 2040 + 2000 + 800) / 100
//           = 78.4 → 78
```

### 14. 인기도/신선도 기반 순위

```freelang
// 인기도 기반 (조회수, 좋아요 등)
var popularity_rank = rank_by_popularity("results");
// 가장 많이 조회/공유된 문서 우선

// 신선도 기반 (최신 문서 우선)
var freshness_rank = rank_by_freshness("results");
// 최근에 업데이트된 문서 우선

// 트렌드 검색에 최적화
var trending_results = rank_by_freshness(results);
// "코로나" → 최신 뉴스 우선
```

### 15. 실제 시나리오: 전자상거래 상품 검색

```freelang
// 쇼핑몰의 상품 검색 엔진

// 1. 검색 인덱스 생성
var index = create_search_index("INVERTED");

// 2. 상품 정보를 인덱스에 추가
var product1 = Document {
  doc_id: "prod_001",
  title: "무선 블루투스 이어폰",
  content: "고음질 사운드, 30시간 배터리, 소음 제거 기능",
  author: "Sony",
  created_at: "2026-03-20T00:00:00Z",
  updated_at: "2026-03-30T00:00:00Z",
  language: "ko"
};
index = add_document(index, product1);

// 3. 사용자 검색: "무선 이어폰"
var result = simple_search(index, "무선 이어폰");

// 4. 검색 점수 계산
var bm25_score = calculate_bm25(
  "prod_001",
  "무선",
  150,                 // 상품 설명 길이
  200,                 // 평균 상품 설명 길이
  60
);

// 5. 부스팅 적용 (인기 상품)
var boost = BoostingRule {
  rule_id: "boost_popular",
  field: "popularity",
  condition: "top_seller",
  boost_factor: 2
};
var boosted = apply_boosting_rule(bm25_score.bm25_score, boost);

// 6. 개인화 적용 (사용자 선호도)
var user_filter = PersonalizationFilter {
  user_id: "customer_789",
  preferred_languages: "[\"ko\"]",
  preferred_authors: "[\"Sony\", \"Samsung\"]",
  search_history: "{}",
  boost_recent: true
};
var personalized = apply_personalization(result, user_filter);

// 7. 최종 순위
var final_ranking = rank_results("results", "HYBRID");
// 결과: 관련성 + 인기도 + 개인화 = 최종 순위
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
| **Phase 13** | **2개** | **20개** | **✅ 완료** |
| **합계** | **42개** | **554개** | **✅** |

---

## 🔑 검색 알고리즘 비교

### BM25 vs TF-IDF

| 특성 | BM25 | TF-IDF |
|------|------|--------|
| **원리** | 문서 길이 정규화 | 통계 기반 가중치 |
| **문서 길이** | 고려함 | 미고려 |
| **최신성** | 낮음 | 낮음 |
| **정확도** | 높음 (⭐⭐⭐⭐⭐) | 중간 (⭐⭐⭐⭐) |
| **계산 비용** | 높음 | 낮음 |
| **사용처** | 일반 검색 엔진 | 학술 문헌 검색 |

### 단순 vs 불린 vs 구문 검색

| 방식 | 쿼리 | 속도 | 정확도 | 사용처 |
|------|------|------|--------|--------|
| **단순** | "Python" | 빠름 | 낮음 | 일반 검색 |
| **불린** | "Python AND 기초" | 중간 | 중간 | 조건부 검색 |
| **구문** | "정확한 구문" | 느림 | 높음 | 따옴표 검색 |

---

## 🚀 다음 단계

### Phase 14: Vector Search (ML/AI)
- 벡터 임베딩 저장소
- 유사도 검색 (Cosine, Euclidean)
- 의미 기반 검색
- 예상: 18-20개 함수

### Phase 15: GraphQL Federation
- GraphQL 쿼리 지원
- 분산 Schema 조합
- 서브그래프 관리

---

**생성일**: 2026-03-30
**버전**: Phase 13 - Full-Text Search
**다음**: Phase 14 - Vector Search
