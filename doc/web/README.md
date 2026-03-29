# 🌐 K-StdLib Web Module

FreeLang v2 기반의 **HTTP 웹 프레임워크** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ http.fl - HTTP 서버 (16개 함수)

HTTP 서버, 요청/응답 처리, 헤더 관리

#### HTTP 메서드
| 함수 | 설명 |
|------|------|
| `get_http_method_get()` | GET 메서드 |
| `get_http_method_post()` | POST 메서드 |
| `get_http_method_put()` | PUT 메서드 |
| `get_http_method_delete()` | DELETE 메서드 |
| `get_http_method_patch()` | PATCH 메서드 |
| `get_http_method_head()` | HEAD 메서드 |
| `get_http_method_options()` | OPTIONS 메서드 |

#### HTTP 상태 코드
| 함수 | 설명 |
|------|------|
| `get_http_status_ok()` | 200 OK |
| `get_http_status_created()` | 201 Created |
| `get_http_status_no_content()` | 204 No Content |
| `get_http_status_bad_request()` | 400 Bad Request |
| `get_http_status_unauthorized()` | 401 Unauthorized |
| `get_http_status_forbidden()` | 403 Forbidden |
| `get_http_status_not_found()` | 404 Not Found |
| `get_http_status_internal_error()` | 500 Internal Server Error |
| `get_http_status_service_unavailable()` | 503 Service Unavailable |

#### 요청/응답 처리
| 함수 | 설명 |
|------|------|
| `create_http_request(method, path)` | HTTP 요청 생성 |
| `create_http_response(status_code)` | HTTP 응답 생성 |
| `add_request_header(request, header_name, value)` | 요청 헤더 추가 |
| `add_response_header(response, header_name, value)` | 응답 헤더 추가 |
| `set_request_body(request, body)` | 요청 본문 설정 |
| `set_response_body(response, body)` | 응답 본문 설정 |
| `set_response_content_type(response, content_type)` | 응답 콘텐츠 타입 설정 |
| `json_response(status_code, json_body)` | JSON 응답 생성 |

#### 서버 관리
| 함수 | 설명 |
|------|------|
| `create_http_server_config(host, port)` | 서버 설정 생성 |
| `create_http_server(config)` | HTTP 서버 생성 |
| `start_http_server(server)` | 서버 시작 |
| `stop_http_server(server)` | 서버 중지 |
| `handle_request(server, request)` | 요청 처리 |
| `finish_response(server)` | 응답 완료 |
| `parse_request_line(request_line)` | 요청 라인 파싱 |
| `build_response_line(response)` | 응답 라인 생성 |
| `get_server_info(server)` | 서버 정보 조회 |

---

### 2️⃣ router.fl - REST API 라우팅 (15개 함수)

REST API 경로 매칭, 핸들러 매핑, 미들웨어 통합

#### 라우터 기본
| 함수 | 설명 |
|------|------|
| `create_router()` | 라우터 생성 |
| `set_router_prefix(router, prefix)` | 라우터 프리픽스 설정 |

#### HTTP 메서드 라우트
| 함수 | 설명 |
|------|------|
| `get(router, path, handler)` | GET 라우트 추가 |
| `post(router, path, handler)` | POST 라우트 추가 |
| `put(router, path, handler)` | PUT 라우트 추가 |
| `delete_route(router, path, handler)` | DELETE 라우트 추가 |
| `patch(router, path, handler)` | PATCH 라우트 추가 |

#### 경로 매칭
| 함수 | 설명 |
|------|------|
| `match_route(router, method, path)` | 경로 매칭 |
| `extract_path_params(route_pattern, request_path)` | 경로 파라미터 추출 |
| `check_route_conflict(router, method, path)` | 라우트 충돌 감지 |

#### 미들웨어 & 보호
| 함수 | 설명 |
|------|------|
| `add_middleware_to_route(route, middleware)` | 라우트에 미들웨어 추가 |
| `protect_route(route)` | 라우트 보호 (인증 필요) |

#### 라우트 그룹
| 함수 | 설명 |
|------|------|
| `create_route_group(prefix)` | 라우트 그룹 생성 (공통 프리픽스) |
| `add_group_middleware(group, middleware)` | 그룹 미들웨어 추가 |

#### 정보 조회
| 함수 | 설명 |
|------|------|
| `get_route_info(route)` | 라우트 정보 조회 |
| `list_routes(router)` | 모든 라우트 출력 |
| `handle_options(path)` | OPTIONS 메서드 처리 (CORS 프리플라이트) |
| `create_redirect(from_path, to_path, status_code)` | 리다이렉트 라우트 |

---

### 3️⃣ middleware.fl - 미들웨어 시스템 (25개 함수)

요청 처리 파이프라인, 인증, 로깅, CORS, Rate Limiting

#### 미들웨어 기본
| 함수 | 설명 |
|------|------|
| `create_middleware(name, type, handler_name)` | 미들웨어 생성 |
| `set_middleware_priority(middleware, priority)` | 우선순위 설정 |
| `set_middleware_config(middleware, config)` | 설정 추가 |
| `enable_middleware(middleware)` | 미들웨어 활성화 |
| `disable_middleware(middleware)` | 미들웨어 비활성화 |

#### 미들웨어 체인
| 함수 | 설명 |
|------|------|
| `create_middleware_chain()` | 미들웨어 체인 생성 |
| `add_middleware_to_chain(chain, middleware)` | 체인에 미들웨어 추가 |
| `sort_middleware_chain(chain)` | 체인 정렬 (우선순위 기반) |
| `start_middleware_execution(chain)` | 실행 시작 |
| `finish_middleware_execution(chain)` | 실행 완료 |
| `calculate_execution_order(chain)` | 실행 순서 계산 |
| `next_middleware(chain, current_index)` | 다음 미들웨어로 전달 |

#### 인증 미들웨어
| 함수 | 설명 |
|------|------|
| `create_auth_middleware(required)` | 인증 미들웨어 생성 |
| `verify_token(auth, token)` | 토큰 검증 |

#### 로깅 미들웨어
| 함수 | 설명 |
|------|------|
| `create_logging_middleware(log_level)` | 로깅 미들웨어 생성 |

#### CORS 미들웨어
| 함수 | 설명 |
|------|------|
| `create_cors_middleware()` | CORS 미들웨어 생성 |
| `handle_cors_preflight(cors, origin)` | 프리플라이트 요청 처리 |

#### Rate Limiting 미들웨어
| 함수 | 설명 |
|------|------|
| `create_rate_limit_middleware(max_requests, window_seconds)` | Rate limit 생성 |
| `check_rate_limit(limit, client_id)` | Rate limit 확인 |

#### 에러 핸들러
| 함수 | 설명 |
|------|------|
| `create_error_handler_middleware()` | 에러 핸들러 생성 |
| `format_error_response(handler, error_message, status)` | 에러 응답 포맷 |

#### 미들웨어 결과
| 함수 | 설명 |
|------|------|
| `create_middleware_result(middleware_name, success)` | 실행 결과 생성 |
| `get_middleware_info(middleware)` | 미들웨어 정보 조회 |
| `get_middleware_chain_info(chain)` | 체인 정보 조회 |

#### 조건 & 제어
| 함수 | 설명 |
|------|------|
| `create_middleware_condition(path_pattern)` | 미들웨어 조건 생성 |
| `match_path_pattern(condition, request_path)` | 경로 매칭 |
| `create_middleware_abort(status_code, message)` | 미들웨어 중단 |

---

### 4️⃣ session.fl - 세션 관리 (30개 함수)

세션 저장소, 쿠키, 사용자 인증, 역할/권한 관리

#### 세션 기본
| 함수 | 설명 |
|------|------|
| `create_session(user_id)` | 세션 생성 |
| `set_session_data(session, key, value)` | 세션 데이터 설정 |
| `get_session_data(session, key)` | 세션 데이터 조회 |
| `delete_session_data(session, key)` | 세션 데이터 삭제 |
| `refresh_session(session)` | 세션 갱신 |
| `is_session_expired(session)` | 만료 확인 |
| `destroy_session(session)` | 세션 소멸 |
| `regenerate_session_id(session)` | 세션 ID 재생성 |

#### 세션 스토어
| 함수 | 설명 |
|------|------|
| `create_session_store(type)` | 세션 스토어 생성 |
| `save_session(store, session)` | 세션 저장 |
| `get_session(store, session_id)` | 세션 조회 |
| `delete_session(store, session_id)` | 세션 삭제 |
| `cleanup_expired_sessions(store)` | 만료 세션 정리 |

#### 세션 설정 & 쿠키
| 함수 | 설명 |
|------|------|
| `create_session_config()` | 세션 설정 생성 |
| `create_cookie(name, value)` | 쿠키 생성 |
| `serialize_cookie(cookie)` | 쿠키 문자열 생성 |
| `parse_cookie(cookie_string)` | 쿠키 파싱 |
| `create_session_cookie(session_id, config)` | 세션 쿠키 생성 |

#### 사용자 세션
| 함수 | 설명 |
|------|------|
| `create_user_session(user_id, username, email)` | 사용자 세션 생성 |
| `add_user_role(user_session, role)` | 역할 추가 |
| `add_user_permission(user_session, permission)` | 권한 추가 |
| `has_role(user_session, role)` | 역할 확인 |
| `has_permission(user_session, permission)` | 권한 확인 |
| `update_last_activity(user_session)` | 마지막 활동 시간 업데이트 |
| `set_user_custom_data(user_session, key, value)` | 사용자 정의 데이터 설정 |

#### 정보 조회 & 인증
| 함수 | 설명 |
|------|------|
| `get_session_info(session)` | 세션 정보 조회 |
| `get_cookie_info(cookie)` | 쿠키 정보 조회 |
| `create_session_auth_status(authenticated)` | 인증 상태 생성 |
| `verify_session_auth(session, auth_status)` | 세션 기반 인증 검증 |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|------|
| **http.fl** | 16개 | HTTP 메서드, 상태 코드, 요청/응답 처리 |
| **router.fl** | 15개 | REST API 라우팅, 경로 매칭, 미들웨어 |
| **middleware.fl** | 25개 | 미들웨어 체인, 인증, CORS, Rate Limiting |
| **session.fl** | 30개 | 세션 관리, 쿠키, 역할/권한 |
| **합계** | **86개** | Phase 5 - Web Framework |

---

## 🎯 사용 사례

### 1. 기본 HTTP 서버

```freelang
// 서버 설정
var config = create_http_server_config("0.0.0.0", 8080);
var server = create_http_server(config);

// 서버 시작
server = start_http_server(server);

// 요청 처리
var request = create_http_request("GET", "/api/users");
server = handle_request(server, request);

// 응답 생성
var response = create_http_response(200);
response = set_response_body(response, "{\"users\": []}");
response = set_response_content_type(response, "application/json");

// 서버 중지
server = stop_http_server(server);
```

### 2. REST API 라우팅

```freelang
// 라우터 생성
var router = create_router();
router = set_router_prefix(router, "/api/v1");

// 라우트 정의
router = get(router, "/users", "list_users_handler");
router = post(router, "/users", "create_user_handler");
router = put(router, "/users/:id", "update_user_handler");
router = delete_route(router, "/users/:id", "delete_user_handler");

// 라우트 그룹
var admin_group = create_route_group("/admin");
admin_group = add_group_middleware(admin_group, "auth");

// 경로 매칭
var matched_route = match_route(router, "GET", "/api/v1/users");

// 경로 파라미터 추출
var params = extract_path_params("/users/:id", "/users/123");
// 결과: "id=123"
```

### 3. 미들웨어 체인

```freelang
// 미들웨어 체인 생성
var chain = create_middleware_chain();

// 미들웨어 생성 및 추가
var auth_middleware = create_middleware("auth", "AUTH", "auth_handler");
auth_middleware = set_middleware_priority(auth_middleware, 1);
chain = add_middleware_to_chain(chain, auth_middleware);

var logging_middleware = create_middleware("logging", "LOGGING", "logging_handler");
logging_middleware = set_middleware_priority(logging_middleware, 2);
chain = add_middleware_to_chain(chain, logging_middleware);

var cors_middleware = create_middleware("cors", "CORS", "cors_handler");
cors_middleware = set_middleware_priority(cors_middleware, 0);
chain = add_middleware_to_chain(chain, cors_middleware);

// 실행 순서 정렬 및 실행
chain = sort_middleware_chain(chain);
chain = start_middleware_execution(chain);

// ... 미들웨어 처리 ...

chain = finish_middleware_execution(chain);
```

### 4. 인증 및 로깅

```freelang
// 인증 미들웨어
var auth = create_auth_middleware(true);
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
var is_valid = verify_token(auth, token);

// 로깅 미들웨어
var logging = create_logging_middleware("INFO");

// CORS 설정
var cors = create_cors_middleware();
```

### 5. 세션 관리

```freelang
// 세션 스토어 생성
var store = create_session_store("MEMORY");

// 세션 생성
var session = create_session("user_123");
session = set_session_data(session, "theme", "dark");
session = set_session_data(session, "language", "ko");

// 세션 저장
store = save_session(store, session);

// 세션 쿠키 생성
var config = create_session_config();
var cookie = create_session_cookie(session.session_id, config);
var cookie_str = serialize_cookie(cookie);
// 결과: "session_id=sess_001; Path=/; Secure; HttpOnly; SameSite=Lax"

// 사용자 세션
var user_session = create_user_session("user_123", "alice", "alice@example.com");
user_session = add_user_role(user_session, "admin");
user_session = add_user_permission(user_session, "write_posts");
user_session = add_user_permission(user_session, "delete_users");

// 역할/권한 확인
if has_role(user_session, "admin") {
  // admin 역할 보유
}

if has_permission(user_session, "write_posts") {
  // write_posts 권한 보유
}
```

### 6. CORS 처리

```freelang
// CORS 미들웨어
var cors = create_cors_middleware();

// 프리플라이트 요청 처리
var origin = "https://example.com";
var is_allowed = handle_cors_preflight(cors, origin);

// OPTIONS 메서드 처리
var options = handle_options("/api/users");
```

### 7. Rate Limiting

```freelang
// Rate limiting 설정 (1시간에 1000개 요청)
var rate_limit = create_rate_limit_middleware(1000, 3600);

// 클라이언트별 제한 확인
var client_ip = "192.168.1.1";
var is_allowed = check_rate_limit(rate_limit, client_ip);
```

### 8. 에러 핸들링

```freelang
// 에러 핸들러 생성
var error_handler = create_error_handler_middleware();

// 에러 응답 생성
var error_response = format_error_response(
  error_handler,
  "Internal Server Error",
  500
);
// 결과: {"error":"Internal Server Error","status":500}
```

---

## 🔗 통합 예제

```freelang
// HTTP 서버 설정
var config = create_http_server_config("localhost", 8080);
var server = create_http_server(config);

// 라우터 설정
var router = create_router();
router = set_router_prefix(router, "/api");
router = get(router, "/users", "list_users");
router = post(router, "/users", "create_user");
router = put(router, "/users/:id", "update_user");
router = delete_route(router, "/users/:id", "delete_user");

// 미들웨어 체인
var chain = create_middleware_chain();
var auth = create_middleware("auth", "AUTH", "verify_auth");
var cors = create_middleware("cors", "CORS", "handle_cors");
auth = set_middleware_priority(auth, 1);
cors = set_middleware_priority(cors, 0);
chain = add_middleware_to_chain(chain, cors);
chain = add_middleware_to_chain(chain, auth);

// 세션 스토어
var session_store = create_session_store("MEMORY");
var session_config = create_session_config();

// 서버 시작
server = start_http_server(server);

// ... 요청 처리 ...

// 서버 중지
server = stop_http_server(server);
```

---

## 📈 K-StdLib 진행

| Phase | 모듈 | 함수 | 상태 |
|-------|------|------|------|
| Phase 1 | 7개 | 58개 | ✅ 완료 |
| Phase 2 | 5개 | 69개 | ✅ 완료 |
| Phase 3 | 4개 | 66개 | ✅ 완료 |
| Phase 4 | 4개 | 63개 | ✅ 완료 |
| Phase 5 | 4개 | 86개 | ✅ **완료** |
| **합계** | **24개** | **342개** | **✅** |

---

## 🚀 다음 단계

### Phase 6: Testing Framework (테스트 프레임워크)
- 단위 테스트 (Unit Test)
- 통합 테스트 (Integration Test)
- E2E 테스트 (End-to-End Test)
- 모킹 & 스텁 (Mocking & Stub)
- 커버리지 리포팅

### Phase 7: 공유 라이브러리
- 캐싱 시스템
- 배치 처리
- 비동기 작업 큐
- 모니터링 & 메트릭

---

**생성일**: 2026-03-30
**버전**: Phase 5 - Web Framework
**다음**: Phase 6 - Testing Framework

