# K-Compliance 구현 준비 문서

**상태**: Implementation v0.2 (᳄구 완성, 호스트 암호·서명은 위임)
**기준 스펙**: `docs/specifications/K_COMPLIANCE_SPEC.md`
**작성일**: 2026-09-27

## 파일

```
src/kstdlib/compliance/
├─ identity.free
├─ pii_protection.free
├─ audit_log.free
├─ access_control.free
├─ crypto_wrappers.free
├─ integrity.free
├─ compliance_check.free
└─ _index.free

tests/compliance/identity.test.free
```

## 함수 상태

| # | 함수 | 상태 |
|---|------|------|
| 1 | `주민등록번호_유효성확인` | ✅ 체크디지트 + 날짜/성별코드 |
| 2 | `사업자등록번호_유효성확인` | ✅ 국세청 가중치 |
| 3 | `법인등록번호_유효성확인` | ✅ 1-2 교차 체크 |
| 4 | `국내휴대폰번호_유효성확인` | ✅ |
| 5 | `국내전화번호_유효성확인` | ✅ |
| 6 | `개인정보_비식별화` | ✅ |
| 7 | `민감정보_마스킹` | ✅ |
| 8 | `개인정보_암호화` | ⚠️ crypto 래퍼 |
| 9 | `개인정보_복호화` | ⚠️ crypto 래퍼 |
| 10 | `접근로그_기록` | ✅ 메모리 |
| 11 | `보안이벤트_로그` | ✅ 메모리 |
| 12 | `감사로그_조회` | ✅ 메모리 |
| 13 | `권한_확인` | ✅ 메모리 |
| 14 | `역할_권한_확인` | ✅ 메모리 |
| 15 | `세션_유효성확인` | ✅ 메모리 |
| 16 | `SHA256_해시화` | ⚠️ 호스트 위임 |
| 17 | `ARIA_암호화` | ⚠️ 호스트 위임 |
| 18 | `SEED_암호화` | ⚠️ 호스트 위임 |
| 19 | `파일_체크섬검증` | ⚠️ SHA256 위임 |
| 20 | `데이터_서명생성` | ⚠️ RSA 위임 |
| 21 | `데이터_서명검증` | ⚠️ RSA 위임 |
| 22 | `PIPA_개인정보수집동의_검증` | ✅ |
| 23 | `ISMS_보안수준_평가` | ✅ 항목 점수 |
| 24 | `PCI_DSS_신용카드검증` | ✅ Luhn + 만료/
CVV 형식 |

## 남은 일

- `src/kstdlib/crypto` 호스트에 ARIA/SEED/SHA256 실구현 연결
- 감사 로그 파일 append (`--allow-write`)
- 기존 스텑 파일 archive 이동
