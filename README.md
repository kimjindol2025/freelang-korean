# 🇰🇷 K-FreeLang v1.0

**한국 개발자를 위한 완전한 독립 프로그래밍 언어**
한글 변수명 + 594개 함수 + 46개 모듈 + 자가호스팅

---

## 📦 설치 & 링크

| 항목 | 링크 |
|------|------|
| **npm** | [![npm](https://img.shields.io/npm/v/kfreelang?style=flat-square)](https://www.npmjs.com/package/kfreelang) |
| **홈페이지** | 🌐 https://kimjindol2025.github.io/freelang-korean |
| **GitHub** | 📍 https://github.com/kimjindol2025/freelang-korean |
| **설치** | `npm install -g kfreelang` |

---

## ✨ 핵심 특징

### 🎯 1. 완벽한 한글 지원
```freelang
변수 이름 = "김철수"
변수 나이 = 30

함수 인사하기(이름: 문자열) {
  출력(이름 + "님 안녕하세요!")
}

인사하기(이름)
```

### 📦 2. K-StdLib - 594개 함수 / 46개 모듈

| Phase | 모듈 | 함수 | 기능 |
|-------|------|------|------|
| Phase 1-3 | 기본, 암호화, 한국형 | 124 | 자료구조, ARIA/SEED, 음력/공휴일 |
| Phase 4-6 | 검증, 웹, 테스트 | 136 | 형변환, HTTP/라우팅, Mock/Coverage |
| Phase 7-9 | 캐싱, 모니터링, 분산 | 73 | LRU/TTL, CPU/메모리, Redis호환 |
| Phase 10-12 | 이벤트, 추적, 시계열 | 62 | Pub/Sub, Trace/Span, TimeSeries |
| Phase 13-15 | 검색, 벡터, GraphQL | 60 | BM25/TF-IDF, 임베딩, Federation |
| **합계** | **46개 모듈** | **594개 함수** | ✅ 완성 |

### 🔐 3. 보안 내장
- ARIA/SEED 암호화
- TOTP/HOTP 2FA
- PIPA(개인정보보호법) 준수
- 검증 & 마스킹 함수

### 🚀 4. 자가호스팅
FreeLang으로 FreeLang 컴파일러를 작성했습니다.
- 완전한 부트스트랩 가능
- compiler.free: 4.7 KB
- 22단계 파이프라인

### 🌐 5. GraphQL Federation
분산 마이크로서비스를 위한 완전한 지원
- Schema composition
- Federated query planning
- Subgraph routing
- Result merging

---

## 🚀 빠른 시작

### npm 설치
```bash
npm install -g kfreelang
```

### 첫 코드 작성
```freelang
변수 메시지 = "안녕하세요!"
출력(메시지)
```

### 실행
```bash
kfreelang hello.free
```

---

## 📊 상태

| 항목 | 상태 | 진행률 |
|------|------|--------|
| 한글 식별자 | ✅ 완성 | 100% |
| K-StdLib | ✅ 완성 | 100% (594함수) |
| npm 배포 | ✅ 완성 | v1.0.0 |
| 자가호스팅 | ✅ 완성 | 부트스트랩 가능 |
| 웹사이트 | ✅ 완성 | GitHub Pages |
| 문서 | ✅ 완성 | 초급~고급 |

**상태**: 🟢 **프로덕션 준비 완료 (Production Ready)**

---

## 💡 사용 예시

### 예시 1: 데이터 검증
```freelang
함수 사용자검증(이메일: 문자열) → 참거짓 {
  변수 유효 = 이메일.포함("@")
  반환 유효
}

만약 사용자검증("kim@example.com") {
  출력("유효한 이메일")
}
```

### 예시 2: 암호화
```freelang
변수 암호화됨 = ARIA_암호화("개인정보", "키")
변수 복호화됨 = ARIA_복호화(암호화됨, "키")
```

### 예시 3: GraphQL 스키마
```freelang
변수 스키마 = GraphQLSchema_생성("API")
스키마 = add_type_definition(스키마, "User", "필드")
변수 쿼리결과 = execute_federated_query(스키마, 쿼리)
```

---

## 📚 문서

| 가이드 | 링크 |
|--------|------|
| **API 레퍼런스** | [K-StdLib 594개 함수](./doc/K-STDLIB_API.md) |
| **튜토리얼** | [초급~고급 학습 가이드](./doc/TUTORIALS.md) |
| **한글 문법** | [한글 키워드 & 문법](./doc/KOREAN_SYNTAX.md) |
| **아키텍처** | [설계 & 내부 구조](./doc/ARCHITECTURE.md) |

---

## 🤝 커뮤니티

### 저장소
- 📍 [GitHub](https://github.com/kimjindol2025/freelang-korean)
- 🏠 [홈페이지](https://kimjindol2025.github.io/freelang-korean)
- 📦 [npm 페이지](https://www.npmjs.com/package/kfreelang)

### 지원
- 🐛 [버그 보고](https://github.com/kimjindol2025/freelang-korean/issues)
- 💡 [기능 제안](https://github.com/kimjindol2025/freelang-korean/discussions)
- 🤝 [기여 가이드](./CONTRIBUTING.md)

---

## 📈 K-FreeLang vs FreeLang v2

| 항목 | FreeLang v2 | K-FreeLang v1.0 |
|------|------------|-----------------|
| **언어** | 영문 | 한글 + 영문 |
| **함수** | ~100 | 594 |
| **모듈** | ~5 | 46 |
| **보안** | 기본 | ARIA/SEED/PIPA |
| **GraphQL** | 미지원 | Federation 완벽 |
| **npm** | @freelang | kfreelang |
| **상태** | 진행 중 | ✅ 완성 |

---

## 📋 K-FreeLang이란?

**K-FreeLang**은 FreeLang v2를 기반으로 **한국 개발자를 위해 완전히 독립**하여 개발한 언어입니다.

### 특징
- ✅ 한글 변수명/함수명 완벽 지원
- ✅ 594개 함수 (K-StdLib Phase 1-15)
- ✅ 46개 모듈 (암호화, 웹, 분산시스템 등)
- ✅ 자가호스팅 (FreeLang → FreeLang 컴파일)
- ✅ GraphQL Federation 완벽 지원
- ✅ npm으로 글로벌 설치 가능

### 독립성
- **원본**: FreeLang v2.8.0 (진행 중)
- **우리**: K-FreeLang v1.0 (독립 프로젝트, ✅ 완성)
- **npm**: 별도 패키지 (kfreelang)
- **저장소**: 별도 관리 (freelang-korean-independent)

---

## 🎯 로드맵

### ✅ v1.0 (완료)
- 한글 식별자 완벽 지원
- 594개 함수 (K-StdLib Phase 1-15)
- npm 배포 (kfreelang@1.0.0)
- 자가호스팅
- 웹사이트 & 문서

### 🔄 v1.1 (2026년 2분기)
- 한글 키워드 확장
- IDE 플러그인 (VS Code)
- JIT 컴파일 최적화

### 📅 v2.0 (2026년 하반기)
- 마이크로서비스 프레임워크
- 클라우드 배포 도구
- AI/ML 지원

---

## 📞 연락처

| 항목 | 링크 |
|------|------|
| **버그** | [GitHub Issues](https://github.com/kimjindol2025/freelang-korean/issues) |
| **토론** | [GitHub Discussions](https://github.com/kimjindol2025/freelang-korean/discussions) |
| **기여** | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| **라이선스** | [MIT](./LICENSE) |

---

## 📄 정보

| 항목 | 내용 |
|------|------|
| **버전** | v1.0.0 |
| **출시** | 2026-03-30 |
| **라이선스** | MIT |
| **개발** | Kim (KimNexus) + Community |
| **상태** | 🟢 프로덕션 준비 완료 |

---

<div align="center">

### 🇰🇷 한국 개발자를 위한 프로그래밍 언어

**K-FreeLang v1.0**

[npm](https://www.npmjs.com/package/kfreelang) • [홈페이지](https://kimjindol2025.github.io/freelang-korean) • [GitHub](https://github.com/kimjindol2025/freelang-korean) • [문서](./doc/)

Made with ❤️ for Korean Developers | MIT License © 2026

</div>
