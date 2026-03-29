# 💾 K-StdLib Database Module

FreeLang v2 기반의 **SQLite 데이터베이스 관리** 표준 라이브러리입니다.

---

## 📦 모듈 구성

### 1️⃣ database.fl - SQLite 래퍼 (16개 함수)

SQLite 데이터베이스의 기본 CRUD 연산

#### 연결 관리
| 함수 | 설명 |
|------|------|
| `create_connection()` | 데이터베이스 연결 생성 |
| `open_database()` | 데이터베이스 파일 열기 |
| `close_database()` | 데이터베이스 닫기 |

#### CRUD 연산
| 함수 | 설명 |
|------|------|
| `insert_record()` | 레코드 삽입 (INSERT) |
| `select_records()` | 레코드 조회 (SELECT) |
| `update_record()` | 레코드 업데이트 (UPDATE) |
| `delete_record()` | 레코드 삭제 (DELETE) |

#### 스키마 관리
| 함수 | 설명 |
|------|------|
| `create_table()` | 테이블 생성 |
| `drop_table()` | 테이블 삭제 |
| `create_index()` | 인덱스 생성 |

#### 유틸리티
| 함수 | 설명 |
|------|------|
| `execute_query()` | 직접 SQL 실행 |
| `table_exists()` | 테이블 존재 여부 |
| `column_exists()` | 컬럼 존재 여부 |
| `backup_database()` | 데이터베이스 백업 |
| `restore_database()` | 백업 복원 |

---

### 2️⃣ orm.fl - ORM 기초 (14개 함수)

객체-관계 매핑, 모델 정의, 쿼리 빌더

#### 모델 정의
| 함수 | 설명 |
|------|------|
| `create_model()` | 모델 생성 |
| `create_model_field()` | 필드 정의 |
| `add_field_to_model()` | 모델에 필드 추가 |
| `set_field_default()` | 필드 기본값 설정 |

#### 쿼리 빌더
| 함수 | 설명 |
|------|------|
| `create_query_builder()` | 쿼리 빌더 생성 |
| `select()` | SELECT 절 설정 |
| `where()` | WHERE 조건 추가 |
| `and_where()` | AND 조건 추가 |
| `or_where()` | OR 조건 추가 |
| `order_by()` | ORDER BY 설정 |
| `limit()` | LIMIT 설정 |
| `offset()` | OFFSET 설정 |
| `build_query()` | SQL 쿼리 빌드 |

#### 관계 & 검증
| 함수 | 설명 |
|------|------|
| `create_relationship()` | 관계 정의 (1:N, N:M) |
| `create_validation()` | 검증 규칙 정의 |
| `validate_field()` | 필드 검증 |

#### 스키마 생성
| 함수 | 설명 |
|------|------|
| `generate_create_table_sql()` | CREATE TABLE SQL 생성 |

---

### 3️⃣ migration.fl - 마이그레이션 (16개 함수)

데이터베이스 스키마 버전 관리, 마이그레이션

#### 마이그레이션 생성
| 함수 | 설명 |
|------|------|
| `create_migration()` | 마이그레이션 생성 |
| `create_add_column_migration()` | 컬럼 추가 |
| `create_drop_column_migration()` | 컬럼 삭제 |
| `create_rename_column_migration()` | 컬럼 이름 변경 |
| `create_create_table_migration()` | 테이블 생성 |
| `create_drop_table_migration()` | 테이블 삭제 |
| `create_create_index_migration()` | 인덱스 생성 |
| `create_drop_index_migration()` | 인덱스 삭제 |

#### 마이그레이션 관리
| 함수 | 설명 |
|------|------|
| `is_migration_applied()` | 마이그레이션 적용 여부 |
| `mark_migration_applied()` | 마이그레이션 적용 표시 |
| `generate_migration_filename()` | 마이그레이션 파일명 생성 |
| `create_migration_history()` | 히스토리 생성 |
| `get_migration_info()` | 마이그레이션 정보 조회 |
| `get_rollback_info()` | 롤백 정보 조회 |

#### 데이터 마이그레이션
| 함수 | 설명 |
|------|------|
| `create_data_migration()` | 데이터 변환 마이그레이션 |

---

### 4️⃣ transaction.fl - 트랜잭션 (17개 함수)

트랜잭션 관리, ACID 보장, 동시성 제어

#### 트랜잭션 제어
| 함수 | 설명 |
|------|------|
| `begin_transaction()` | 트랜잭션 시작 |
| `commit_transaction()` | 커밋 |
| `rollback_transaction()` | 롤백 |
| `is_transaction_active()` | 활성 여부 |
| `is_transaction_committed()` | 커밋 여부 |
| `is_transaction_rolled_back()` | 롤백 여부 |

#### Savepoint
| 함수 | 설명 |
|------|------|
| `create_savepoint()` | Savepoint 생성 |
| `rollback_to_savepoint()` | Savepoint로 롤백 |

#### 동시성 제어
| 함수 | 설명 |
|------|------|
| `create_optimistic_lock()` | 낙관적 잠금 |
| `check_version()` | 버전 체크 |
| `increment_version()` | 버전 증가 |
| `create_pessimistic_lock()` | 비관적 잠금 |
| `unlock()` | 잠금 해제 |

#### 고급 기능
| 함수 | 설명 |
|------|------|
| `detect_deadlock()` | 데드락 감지 |
| `create_transaction_timeout()` | 타임아웃 설정 |
| `check_timeout()` | 타임아웃 확인 |
| `create_transaction_log()` | 트랜잭션 로그 생성 |
| `recovery_from_log()` | 로그 복구 |
| `execute_prepare_phase()` | 2PC Prepare Phase |
| `execute_commit_phase()` | 2PC Commit Phase |

---

## 📊 함수 통계

| 모듈 | 함수 | 설명 |
|------|------|------|
| **database.fl** | 16개 | SQLite CRUD, 백업/복원 |
| **orm.fl** | 14개 | 모델, 쿼리 빌더, 관계, 검증 |
| **migration.fl** | 16개 | 마이그레이션, 스키마 버전 |
| **transaction.fl** | 17개 | ACID, 동시성, 2PC |
| **합계** | **63개** | Phase 4 데이터베이스 |

---

## 🎯 사용 사례

### 1. 데이터베이스 기본 CRUD

```freelang
// 연결 생성
var db = open_database("app.db");

// 테이블 생성
var schema = "id INTEGER PRIMARY KEY, name TEXT, email TEXT";
create_table(db, "users", schema);

// 레코드 삽입
insert_record(db, "users", "name, email", "'Alice', 'alice@example.com'");

// 레코드 조회
select_records(db, "users", "name='Alice'");

// 레코드 업데이트
update_record(db, "users", "email='newemail@example.com'", "name='Alice'");

// 레코드 삭제
delete_record(db, "users", "name='Alice'");

db = close_database(db);
```

### 2. 쿼리 빌더 사용

```freelang
var query_builder = create_query_builder("users");
query_builder = select(query_builder, "id, name, email");
query_builder = where(query_builder, "age > 18");
query_builder = and_where(query_builder, "status='active'");
query_builder = order_by(query_builder, "created_at", "DESC");
query_builder = limit(query_builder, 10);

var sql = build_query(query_builder);
// SELECT id, name, email FROM users WHERE age > 18 AND status='active' ORDER BY created_at DESC LIMIT 10
```

### 3. 모델 정의

```freelang
var user_model = create_model("User", "users");

var id_field = create_model_field("id", "i32", true, false);
user_model = add_field_to_model(user_model, id_field);

var name_field = create_model_field("name", "string", false, false);
user_model = add_field_to_model(user_model, name_field);

var email_field = create_model_field("email", "string", false, false);
user_model = add_field_to_model(user_model, email_field);

var create_sql = generate_create_table_sql(user_model);
```

### 4. 마이그레이션

```freelang
// 컬럼 추가 마이그레이션
var migration = create_add_column_migration("users", "phone", "TEXT");

// 테이블 생성 마이그레이션
var migration = create_create_table_migration("products",
  "id INTEGER PRIMARY KEY, name TEXT, price REAL");

// 인덱스 생성
var migration = create_create_index_migration("idx_email", "users", "email");
```

### 5. 트랜잭션

```freelang
// 트랜잭션 시작
var txn = begin_transaction("READ COMMITTED");

// 작업 수행
txn = add_operation(txn);

// Savepoint 생성
var sp = create_savepoint(txn, "sp1");

// 커밋
txn = commit_transaction(txn);

// 또는 롤백
txn = rollback_transaction(txn);
```

### 6. 동시성 제어

```freelang
// 낙관적 잠금
var opt_lock = create_optimistic_lock("user_123");

if check_version(opt_lock, 1) {
  // 버전이 맞으면 업데이트
  opt_lock = increment_version(opt_lock);
}

// 비관적 잠금
var pess_lock = create_pessimistic_lock("user_123", "EXCLUSIVE", "txn_001");

// 잠금 해제
pess_lock = unlock(pess_lock);
```

---

## 🔐 ACID 특성

- ✅ **Atomicity** (원자성) - 트랜잭션 전체 커밋 또는 롤백
- ✅ **Consistency** (일관성) - 제약 조건 검증
- ✅ **Isolation** (격리성) - 4가지 격리 수준 지원
- ✅ **Durability** (영속성) - 백업/복구 기능

---

## 📈 K-StdLib 진행

| Phase | 모듈 | 함수 | 상태 |
|-------|------|------|------|
| Phase 1 | 7개 | 58개 | ✅ 완료 |
| Phase 2 | 5개 | 69개 | ✅ 완료 |
| Phase 3 | 4개 | 66개 | ✅ 완료 |
| Phase 4 | 4개 | 63개 | ✅ **완료** |
| **합계** | **20개** | **256개** | **✅** |

---

**생성일**: 2026-03-30
**버전**: Phase 4 - Database Module
**다음**: Phase 5 - Web Framework (HTTP, REST API)
