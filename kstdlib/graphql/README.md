# K-StdLib GraphQL Federation System

**Phase 15**: GraphQL Schema Federation - 분산 마이크로서비스 스키마 통합 및 분산 쿼리 실행

---

## 📚 개요

GraphQL Federation은 여러 마이크로서비스의 GraphQL 스키마를 하나의 통합 인터페이스로 제공합니다.

**핵심 개념**:
- **Subgraph**: 개별 마이크로서비스의 GraphQL 스키마
- **Supergraph**: 여러 Subgraph가 합성된 통합 스키마
- **Federation**: Subgraph들의 모음 및 관리
- **Query Planning**: 분산 쿼리를 최적의 서브그래프 조합으로 계획
- **Data Loader**: N+1 문제를 해결하는 배치 로딩 메커니즘

---

## 🏗️ 모듈 구조

```
kstdlib/graphql/
├── schema.fl       (10개 함수)
│   ├── Structs: GraphQLSchema, TypeDefinition, Subgraph, Federation, Supergraph
│   └── Functions: create_schema, add_type_definition, add_query_field, add_mutation_field,
│                  create_subgraph, register_subgraph, compose_supergraph, validate_schema,
│                  get_schema_info, export_schema_sdl
├── resolver.fl     (10개 함수)
│   ├── Structs: GraphQLQuery, Resolver, QueryPlan, QueryResult, DataLoader
│   └── Functions: parse_graphql_query, create_resolver, execute_query, execute_mutation,
│                  plan_federated_query, execute_subgraph_query, merge_query_results,
│                  apply_query_filter, create_data_loader, get_query_stats
└── README.md       (이 파일)
```

---

## 📖 상세 API 문서

### Schema Management (schema.fl)

#### 1. `create_schema(name: string, version: string) -> GraphQLSchema`
새로운 GraphQL 스키마를 생성합니다.

**매개변수**:
- `name`: 스키마 이름 (예: "UserService")
- `version`: 버전 (예: "1.0.0")

**반환**: 빈 GraphQLSchema 객체

---

#### 2. `add_type_definition(schema, type_name, fields) -> GraphQLSchema`
스키마에 새로운 타입 정의를 추가합니다 (불변 패턴).

**예시**:
```freelang
var schema = create_schema("UserService", "1.0");
schema = add_type_definition(schema, "User", "{id,name,email}");
schema = add_type_definition(schema, "Post", "{id,title,content,author}");
```

---

#### 3. `add_query_field(schema, field_name, return_type) -> GraphQLSchema`
Query 루트 타입에 필드를 추가합니다.

**예시**:
```freelang
schema = add_query_field(schema, "user", "User");
schema = add_query_field(schema, "users", "[User]");
```

---

#### 4. `add_mutation_field(schema, field_name, return_type) -> GraphQLSchema`
Mutation 루트 타입에 필드를 추가합니다.

**예시**:
```freelang
schema = add_mutation_field(schema, "createUser", "User");
schema = add_mutation_field(schema, "updateUser", "User");
```

---

#### 5. `create_subgraph(name, url, schema_sdl) -> Subgraph`
개별 마이크로서비스의 Subgraph를 생성합니다.

**매개변수**:
- `name`: 서브그래프 이름 (예: "users-service")
- `url`: GraphQL 엔드포인트 URL
- `schema_sdl`: GraphQL SDL 스키마 문자열

**예시**:
```freelang
var users_sg = create_subgraph(
  "users-service",
  "https://users.api/graphql",
  "type User { id: ID! name: String! email: String! }"
);

var posts_sg = create_subgraph(
  "posts-service",
  "https://posts.api/graphql",
  "type Post { id: ID! title: String! content: String! authorId: ID! }"
);
```

---

#### 6. `register_subgraph(federation, subgraph) -> Federation`
페더레이션에 새로운 Subgraph를 등록합니다.

**예시**:
```freelang
var federation = Federation {
  federation_id: "fed_001",
  name: "E-Commerce Platform",
  subgraphs: "",
  subgraph_count: 0,
  created_at: "2026-03-30T00:00:00Z",
  last_composed_at: "",
  status: "ACTIVE"
};

federation = register_subgraph(federation, users_sg);
federation = register_subgraph(federation, posts_sg);
// federation.subgraph_count는 이제 2
```

---

#### 7. `compose_supergraph(federation) -> Supergraph`
여러 Subgraph를 합성하여 Supergraph를 생성합니다.

**특징**:
- 모든 Subgraph의 스키마를 통합
- 교차 서비스 참조 해결
- 페더레이션 키(@key) 기반 엔티티 링크

**예시**:
```freelang
var supergraph = compose_supergraph(federation);
// supergraph.subgraph_count: 2
// supergraph.is_valid: true
```

---

#### 8. `validate_schema(schema) -> string`
스키마의 유효성을 검증합니다.

**반환**: "스키마 [이름] - ✅ 통과" 또는 "❌ 실패"

**예시**:
```freelang
var result = validate_schema(schema);
// result: "스키마 UserService - ✅ 통과"
```

---

#### 9. `get_schema_info(schema) -> string`
스키마의 요약 정보를 반환합니다.

**반환 형식**: "스키마 [이름] [버전] - 타입 N개, 필드 M개"

**예시**:
```freelang
var info = get_schema_info(schema);
// info: "스키마 UserService 1.0 - 타입 2개, 필드 5개"
```

---

#### 10. `export_schema_sdl(schema) -> string`
스키마를 GraphQL SDL 형식으로 직렬화합니다.

**반환**: SDL 형식의 스키마 문자열

---

### Query Execution (resolver.fl)

#### 1. `parse_graphql_query(query_string) -> GraphQLQuery`
GraphQL 쿼리 문자열을 파싱합니다.

**예시**:
```freelang
var query_str = "query GetUser { user(id: \"123\") { id name email } }";
var query = parse_graphql_query(query_str);
// query.operation_type: "QUERY"
// query.is_valid: true
```

---

#### 2. `create_resolver(field_name, parent_type) -> Resolver`
필드 리졸버를 생성합니다.

**예시**:
```freelang
var user_resolver = create_resolver("user", "Query");
var posts_resolver = create_resolver("posts", "User");
```

---

#### 3. `execute_query(schema, query, variables) -> QueryResult`
단일 스키마에서 쿼리를 실행합니다.

**예시**:
```freelang
var query = parse_graphql_query("query { users { id name } }");
var variables = "{}";
var result = execute_query(schema, query, variables);
// result.error_count: 0
// result.cache_hit: false
```

---

#### 4. `execute_mutation(schema, mutation, variables) -> QueryResult`
뮤테이션을 실행합니다 (데이터 변경).

**예시**:
```freelang
var mutation_str = "mutation CreateUser($name: String!) { createUser(name: $name) { id name } }";
var mutation = parse_graphql_query(mutation_str);
var vars = "{\"name\": \"Alice\"}";
var result = execute_mutation(schema, mutation, vars);
```

---

#### 5. `plan_federated_query(supergraph, query) -> QueryPlan`
분산 쿼리를 계획합니다 (Federation 핵심).

**특징**:
- 쿼리를 여러 Subgraph로 분해
- 최적의 실행 순서 계획
- 병렬 실행 그룹 식별

**예시**:
```freelang
var query = parse_graphql_query("query { user(id: \"123\") { id name posts { title } } }");
var plan = plan_federated_query(supergraph, query);
// plan.step_count: 2 (users 서비스 + posts 서비스)
// plan.parallel_groups: 1 (순차 실행)
// plan.estimated_ms: 250
```

---

#### 6. `execute_subgraph_query(subgraph, query) -> QueryResult`
특정 Subgraph에 쿼리를 전달하고 실행합니다.

**예시**:
```freelang
var result = execute_subgraph_query(users_sg, query);
// result.subgraph_calls: 1
// result.execution_ms: 120
```

---

#### 7. `merge_query_results(result_a, result_b) -> QueryResult`
두 서브그래프의 결과를 병합합니다.

**병합 방식**:
- 에러: 누적
- 실행 시간: 최대값 (병렬은 최대, 순차는 합계)
- 서브그래프 호출: 누적

**예시**:
```freelang
var users_result = execute_subgraph_query(users_sg, user_query);
var posts_result = execute_subgraph_query(posts_sg, posts_query);
var merged = merge_query_results(users_result, posts_result);
// merged.subgraph_calls: 2
// merged.execution_ms: max(users_ms, posts_ms)
```

---

#### 8. `apply_query_filter(result, filter) -> QueryResult`
쿼리 결과에 필터를 적용합니다.

**필터 유형**:
- 필드 선택 (selected_fields만 포함)
- 권한 검사
- 데이터 마스킹

**예시**:
```freelang
var filter = "role:user";
var filtered = apply_query_filter(result, filter);
```

---

#### 9. `create_data_loader(type_name, batch_size) -> DataLoader`
N+1 문제를 해결하기 위한 DataLoader를 생성합니다.

**N+1 문제**:
```
나쁜 예:
for each user in users:
  posts = query.posts(userId: user.id)  // N번 호출 + 1번 users 쿼리

좋은 예:
loader = create_data_loader("Post", 100)
// 100개씩 배치로 로드
```

**예시**:
```freelang
var user_loader = create_data_loader("User", 50);
var post_loader = create_data_loader("Post", 100);
var comment_loader = create_data_loader("Comment", 200);
```

---

#### 10. `get_query_stats(result) -> string`
쿼리 실행 통계를 조회합니다.

**반환 형식**: "쿼리 통계: 실행 NNms, 서브그래프 호출 N회, 에러 N건, 캐시 [히트/미스]"

**예시**:
```freelang
var stats = get_query_stats(result);
// stats: "쿼리 통계: 실행 250ms, 서브그래프 호출 2회, 에러 0건, 캐시 미스"
```

---

## 💡 사용 예제

### 예제 1: 기본 스키마 생성
```freelang
var schema = create_schema("MyGraphQL", "1.0.0");
schema = add_type_definition(schema, "User", "");
schema = add_type_definition(schema, "Post", "");
schema = add_query_field(schema, "user", "User");
schema = add_query_field(schema, "posts", "[Post]");

var info = get_schema_info(schema);
// "스키마 MyGraphQL 1.0.0 - 타입 2개, 필드 5개"
```

### 예제 2: 서브그래프 생성 및 페더레이션
```freelang
var users_sg = create_subgraph(
  "users-service",
  "https://users.api/graphql",
  "type User { id: ID! name: String! }"
);

var posts_sg = create_subgraph(
  "posts-service",
  "https://posts.api/graphql",
  "type Post { id: ID! title: String! authorId: ID! }"
);

var fed = Federation {
  federation_id: "fed_001",
  name: "Microservices",
  subgraphs: "",
  subgraph_count: 0,
  created_at: "2026-03-30T00:00:00Z",
  last_composed_at: "",
  status: "ACTIVE"
};

fed = register_subgraph(fed, users_sg);
fed = register_subgraph(fed, posts_sg);
// fed.subgraph_count: 2
```

### 예제 3: 슈퍼그래프 합성
```freelang
var supergraph = compose_supergraph(fed);
// supergraph.subgraph_count: 2
// supergraph.is_valid: true
// supergraph.type_count: 2
```

### 예제 4: 쿼리 파싱 및 실행
```freelang
var query_str = "query { user(id: \"1\") { id name } }";
var query = parse_graphql_query(query_str);
// query.is_valid: true
// query.operation_type: "QUERY"

var result = execute_query(schema, query, "{}");
// result.error_count: 0
```

### 예제 5: 분산 쿼리 계획 (Federation 핵심)
```freelang
var complex_query = parse_graphql_query(
  "query { user(id: \"1\") { id name posts { title comments { text } } } }"
);

var plan = plan_federated_query(supergraph, complex_query);
// plan.step_count: 3 (users → posts → comments)
// plan.parallel_groups: 1
// plan.estimated_ms: 500
```

### 예제 6: 서브그래프별 쿼리 실행
```freelang
var user_query = parse_graphql_query("query { user(id: \"1\") { id name } }");
var users_result = execute_subgraph_query(users_sg, user_query);
// users_result.subgraph_calls: 1
// users_result.execution_ms: 100

var posts_query = parse_graphql_query("query { posts(authorId: \"1\") { title } }");
var posts_result = execute_subgraph_query(posts_sg, posts_query);
// posts_result.subgraph_calls: 1
// posts_result.execution_ms: 150
```

### 예제 7: 결과 병합
```freelang
var merged = merge_query_results(users_result, posts_result);
// merged.subgraph_calls: 2
// merged.execution_ms: 150 (max)
// merged.error_count: 0
```

### 예제 8: 뮤테이션 실행
```freelang
var mutation_str = "mutation CreateUser($name: String!) { createUser(name: $name) { id name } }";
var mutation = parse_graphql_query(mutation_str);
var variables = "{\"name\": \"Bob\"}";

var result = execute_mutation(schema, mutation, variables);
// result.error_count: 0
```

### 예제 9: 리졸버 생성
```freelang
var user_resolver = create_resolver("user", "Query");
var posts_resolver = create_resolver("posts", "User");

// 리졸버는 이후 필드별 커스텀 로직을 가지며,
// 각 리졸버는 해당 Subgraph에 라우팅됨
```

### 예제 10: DataLoader로 N+1 문제 해결
```freelang
var post_loader = create_data_loader("Post", 100);
// 대신 1 + N 쿼리:
// 1. users 조회 (1개 쿼리)
// 2. user.posts → post_loader.load([user1, user2, ...]) (100개씩 배치)

// 시간 절감:
// 원래: 1 + 1000 = 1001 쿼리
// DataLoader: 1 + 10 = 11 쿼리 (batch_size=100일 때)
```

### 예제 11: 결과 필터링
```freelang
var full_result = execute_query(schema, query, "{}");
var user_filtered = apply_query_filter(full_result, "role:user");
var admin_filtered = apply_query_filter(full_result, "role:admin");

// 동일한 쿼리 결과도 사용자 권한에 따라 다른 데이터 제공
```

### 예제 12: 쿼리 통계 조회
```freelang
var result = execute_query(schema, query, "{}");
var stats = get_query_stats(result);
// "쿼리 통계: 실행 250ms, 서브그래프 호출 2회, 에러 0건, 캐시 미스"

// 성능 최적화 포인트 식별 가능:
// - 실행 시간 > 500ms → 인덱싱 필요
// - 서브그래프 호출 > 5 → 쿼리 계획 최적화
// - 캐시 미스 > 50% → 캐시 전략 재검토
```

### 예제 13: 스키마 검증
```freelang
var schema = create_schema("API", "1.0");
schema = add_query_field(schema, "hello", "String");

var validation = validate_schema(schema);
// "스키마 API - ✅ 통과"
```

### 예제 14: 실제 시나리오 - 이커머스 GraphQL Federation

```freelang
// 마이크로서비스 구성
var users_sg = create_subgraph(
  "users",
  "https://users.service/graphql",
  "type User { id: ID! email: String! }"
);

var products_sg = create_subgraph(
  "products",
  "https://products.service/graphql",
  "type Product { id: ID! name: String! price: Float! }"
);

var orders_sg = create_subgraph(
  "orders",
  "https://orders.service/graphql",
  "type Order { id: ID! userId: ID! productIds: [ID!]! total: Float! }"
);

// 페더레이션 생성
var fed = Federation {
  federation_id: "ecommerce_001",
  name: "E-Commerce Platform",
  subgraphs: "",
  subgraph_count: 0,
  created_at: "2026-03-30T00:00:00Z",
  last_composed_at: "",
  status: "ACTIVE"
};

fed = register_subgraph(fed, users_sg);
fed = register_subgraph(fed, products_sg);
fed = register_subgraph(fed, orders_sg);

// 슈퍼그래프 합성
var supergraph = compose_supergraph(fed);

// 복잡한 쿼리: "사용자의 모든 주문과 각 주문의 상품 정보 조회"
var complex_query = parse_graphql_query(
  "query UserOrders($userId: ID!) { " +
  "  user(id: $userId) { email orders { id total products { name price } } } " +
  "}"
);

// 분산 쿼리 계획
var plan = plan_federated_query(supergraph, complex_query);

// 계획에 따라 순차 실행
var user_result = execute_subgraph_query(users_sg, complex_query);
var orders_result = execute_subgraph_query(orders_sg, complex_query);
var products_result = execute_subgraph_query(products_sg, complex_query);

// 결과 병합
var step1 = merge_query_results(user_result, orders_result);
var final = merge_query_results(step1, products_result);

// 통계 확인
var stats = get_query_stats(final);
// "쿼리 통계: 실행 320ms, 서브그래프 호출 3회, 에러 0건, 캐시 미스"
```

---

## 📊 GraphQL Federation 패턴

### 단일 서비스 vs 페더레이션

**단일 서비스**:
```
Client → API Gateway → GraphQL Server → Database
실행: 1번의 요청
문제: 모놀리식 구조, 확장 어려움
```

**페더레이션**:
```
Client → API Gateway → Apollo Federation
                         ├→ Users Subgraph
                         ├→ Products Subgraph
                         └→ Orders Subgraph
실행: 여러 서브그래프의 병렬/순차 조합
장점: 마이크로서비스 친화적, 독립 배포 가능
```

### 분산 쿼리 실행 흐름

```
1. 클라이언트 쿼리 전송
   "query { user(id: "1") { name posts { title } } }"

2. 쿼리 파싱
   ↓ parse_graphql_query()

3. 쿼리 계획 수립
   ↓ plan_federated_query()
   - users 서브그래프에서 user 조회
   - posts 서브그래프에서 해당 사용자의 posts 조회

4. 서브그래프별 실행
   ↓ execute_subgraph_query(users_sg, ...)
   ↓ execute_subgraph_query(posts_sg, ...)

5. 결과 병합
   ↓ merge_query_results()
   최종 JSON 응답

6. 통계 기록
   ↓ get_query_stats()
```

### N+1 문제 해결

**문제**:
```
posts = query.get_posts(userId: "1")
for each post in posts:
  comments = query.get_comments(postId: post.id)
  // N개 posts → N번의 comments 쿼리
  // 총 1 + N 쿼리
```

**해결 (DataLoader)**:
```
post_loader = create_data_loader("Post", 100)
comments_loader = create_data_loader("Comment", 200)

// 배치 로딩
loader.load([post1.id, post2.id, ..., post100.id])
// 한 번에 100개 로드 (100번 쿼리 → 1번 쿼리)
```

---

## ✨ 완성도

- ✅ GraphQL 스키마 생성 및 관리
- ✅ 타입 정의 및 필드 추가
- ✅ Subgraph 생성 및 등록
- ✅ 페더레이션 구성
- ✅ 슈퍼그래프 합성
- ✅ 쿼리 파싱
- ✅ 단일/분산 쿼리 실행
- ✅ 뮤테이션 실행
- ✅ 분산 쿼리 계획 (Federation 핵심)
- ✅ 서브그래프 라우팅
- ✅ 결과 병합
- ✅ DataLoader (N+1 해결)
- ✅ 결과 필터링
- ✅ 성능 통계
- ✅ 포괄적 문서화 (20개 함수, 14개 사용 예제)

---

## 📝 파일 목록

```
kstdlib/graphql/
├── schema.fl          (250줄, 10개 함수, 5개 struct)
├── resolver.fl        (265줄, 10개 함수, 5개 struct)
└── README.md          (이 파일, 580줄)

합계: 3개 파일, 1095줄
```

---

**작성일**: 2026-03-30
**K-StdLib 누적**: Phase 1-15 완료 (46개 모듈, 594개 함수)
