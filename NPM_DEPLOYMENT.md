# 📦 npm 배포 가이드 (FreeLang V2)

**버전**: v2.10.0
**상태**: 배포 준비 완료

---

## 🚀 npm 패키지 배포 단계

### 1️⃣ npm 계정 준비

```bash
# npm 로그인
npm login
# 또는 (토큰 사용)
npm login --auth-type=legacy
```

### 2️⃣ package.json 검증

```bash
# 현재 설정 확인
npm view .

# 필수 필드 확인
- name: @freelang/compiler (또는 freelang-compiler)
- version: 2.10.0 ✅
- description: ✅
- main: dist/cli/index.js ✅
- types: dist/cli/index.d.ts ✅
- repository: ✅ (진행 중)
- license: ✅
- author: ✅
- keywords: ✅
```

### 3️⃣ .npmignore 설정

```bash
# 배포에서 제외할 파일 지정
cat > .npmignore << 'NPMIGNORE'
# Development files
src/
tests/
examples/
docs/
.git/
.gitignore
.env
.env.local

# Build files
dist/
build/

# Config files
tsconfig.json
jest.config.js
.eslintrc
prettier.config.js

# Docker files
Dockerfile*
docker-compose.yml

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
logs/

# Dependencies
node_modules/
package-lock.json
yarn.lock

# CI/CD
.github/
.gitlab-ci.yml
.travis.yml
NPMIGNORE
```

### 4️⃣ 빌드 및 테스트

```bash
# 빌드 실행
npm run build

# 테스트 실행
npm test

# 빌드 결과 확인
npm pack --dry-run
```

### 5️⃣ 버전 업데이트

```bash
# 현재 버전 확인
npm version
# version 2.10.0 ✅

# 또는 수동 업데이트
npm version 2.10.0 --no-git-tag-version
```

### 6️⃣ 패키지 발행

#### 방법 1: 공개 배포 (npm)
```bash
# 공개 패키지로 발행
npm publish --access public

# 발행 확인
npm view freelang-compiler

# 또는 scoped 패키지
npm publish --access public --scope @freelang
```

#### 방법 2: 비공개 배포 (프라이빗)
```bash
# npm 프로 계정 필요
npm publish --access restricted
```

#### 방법 3: GitHub Packages
```bash
# .npmrc 설정
echo "@freelang:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc

# 배포
npm publish
```

---

## 📋 배포 체크리스트

```
[ ] npm 계정 생성/로그인
[ ] package.json 검증
[ ] .npmignore 생성
[ ] npm run build 성공
[ ] npm test 성공
[ ] npm pack 확인
[ ] 버전 업데이트 (2.10.0)
[ ] 변경 로그 작성
[ ] README 최종 검증
[ ] LICENSE 확인
[ ] npm publish 실행
[ ] npm install @freelang/compiler 테스트
[ ] 버전 확인 (npm info)
[ ] GitHub Releases 작성
[ ] 커뮤니티 공지
```

---

## ✅ 배포 후 검증

### 1. npm 레지스트리 확인

```bash
# 패키지 정보 조회
npm info freelang-compiler

# 또는
npm view freelang-compiler

# 특정 버전 확인
npm view freelang-compiler@2.10.0
```

### 2. 설치 테스트

```bash
# 전역 설치
npm install -g freelang-compiler

# 로컬 설치
npm install freelang-compiler

# 또는
npm install @freelang/compiler

# 작동 확인
freelang --version
# 또는
npx freelang-compiler --version
```

### 3. 예제 실행

```bash
# 글로벌 설치 후
echo 'fn main() { println("Hello from npm!") }' > test.fl
freelang test.fl

# 또는 npx 사용
npx freelang-compiler test.fl
```

---

## 📈 배포 후 관리

### 버전 업그레이드

```bash
# 패치 릴리스 (2.10.1)
npm version patch

# 마이너 릴리스 (2.11.0)
npm version minor

# 메이저 릴리스 (3.0.0)
npm version major
```

### 배포된 버전 확인

```bash
# 모든 버전 조회
npm view freelang-compiler versions

# 최신 버전 조회
npm view freelang-compiler@latest version
```

### 업데이트 배포

```bash
# 새 버전 빌드
npm run build

# 테스트 실행
npm test

# 버전 업데이트
npm version minor

# 배포
npm publish
```

---

## 🔐 보안 고려사항

### npm 토큰 관리

```bash
# 토큰 생성
npm token create

# 토큰 확인
npm token list

# 토큰 삭제
npm token revoke YOUR_TOKEN_ID
```

### 패키지 보안

```bash
# 보안 감사
npm audit

# 자동 수정
npm audit fix

# 보안 공지 확인
npm deprecate freelang-compiler@OLD_VERSION "Use 2.10.0+ instead"
```

---

## 📊 배포 메타데이터

### package.json 최종 버전

```json
{
  "name": "@freelang/compiler",
  "version": "2.10.0",
  "description": "FreeLang V2 - 100% Complete Independent Programming Language",
  "main": "dist/cli/index.js",
  "types": "dist/cli/index.d.ts",
  "scripts": {
    "build": "npm run build:ts",
    "build:ts": "tsc",
    "test": "jest",
    "dev": "ts-node src/cli/index.ts",
    "start": "node dist/cli/index.js"
  },
  "keywords": [
    "programming-language",
    "compiler",
    "interpreter",
    "freelang",
    "ai",
    "typescript"
  ],
  "author": "FreeLang Development Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/freelang-v2/freelang-v2.git"
  },
  "homepage": "https://freelang.io",
  "bugs": {
    "url": "https://github.com/freelang-v2/freelang-v2/issues"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "files": [
    "dist",
    "stdlib",
    "docs",
    "examples",
    "package.json",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ]
}
```

---

## 🎯 배포 완료 후

### 1. 공식 발표
- GitHub Releases 작성
- 변경 로그 공개
- 커뮤니티 공지

### 2. 문서 업데이트
- npm 설치 방법 추가
- 사용 예제 업데이트
- API 문서 최종화

### 3. 모니터링
- 다운로드 통계 확인
- 사용자 피드백 모니터링
- 버그 리포트 확인

---

## 📞 문제 해결

### 배포 실패

```bash
# 로그인 확인
npm whoami

# 토큰 확인
npm token list

# 패키지명 중복 확인
npm info freelang-compiler
```

### 버전 충돌

```bash
# 이미 배포된 버전 확인
npm view freelang-compiler@2.10.0

# 버전 제거 (관리자만)
npm unpublish freelang-compiler@2.10.0 --force
```

---

**상태**: ✅ 배포 준비 완료
**버전**: 2.10.0
**예상 배포**: 2026-03-28

