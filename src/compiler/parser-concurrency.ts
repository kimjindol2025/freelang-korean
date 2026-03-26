/**
 * K-FreeLang Parser - 동시성 구조 (Concurrency: Lock, Mutex, Channel)
 * P2 고급 기능: Lock, Mutex, Semaphore, Channel 파싱
 */

import { Token, TokenType } from './korean-lexer';
import * as AST from './korean-ast';

/**
 * Lock Statement 파싱: 락 { ... }
 * 기본 상호 배제 블록
 */
export function parseLockStatement(parser: any): AST.LockStatement {
  const lockToken = parser.advance(); // consume LOCK (락)
  parser.consume(TokenType.LBRACE, '{ 필요');

  const body: AST.Statement[] = [];
  while (!parser.check(TokenType.RBRACE) && !parser.isAtEnd()) {
    const stmt = parser.parseStatement();
    if (stmt) body.push(stmt);
  }

  parser.consume(TokenType.RBRACE, '} 필요');

  return {
    type: 'LockStatement',
    body,
    line: lockToken.line,
    column: lockToken.column
  };
}

/**
 * Mutex Declaration 파싱: 뮤텍스 이름 { ... }
 * 명시적 뮤텍스 선언 및 관리
 */
export function parseMutexDeclaration(parser: any): AST.MutexDeclaration {
  const mutexToken = parser.advance(); // consume MUTEX (뮤텍스)

  // 뮤텍스 이름
  const name = parser.advance().value;
  parser.consume(TokenType.LBRACE, '{ 필요');

  // 뮤텍스가 보호하는 자원 (타입)
  let resourceType: AST.TypeAnnotation | undefined;
  if (parser.check(TokenType.COLON)) {
    parser.advance(); // consume :
    resourceType = parser.parseTypeAnnotation();
  }

  // 초기값 (옵션)
  let initialValue: AST.Expression | undefined;
  if (parser.check(TokenType.ASSIGN)) {
    parser.advance(); // consume =
    initialValue = parser.parseExpression();
  }

  parser.consume(TokenType.RBRACE, '} 필요');

  return {
    type: 'MutexDeclaration',
    name,
    resourceType,
    initialValue,
    line: mutexToken.line,
    column: mutexToken.column
  };
}

/**
 * Semaphore Declaration 파싱: 세마포어 이름 (초기값)
 * 신호 메커니즘 기반의 동기화
 */
export function parseSemaphoreDeclaration(parser: any): AST.SemaphoreDeclaration {
  const semaphoreToken = parser.advance(); // consume SEMAPHORE (세마포어)

  const name = parser.advance().value;

  // 초기값 (필수)
  let initialValue: AST.Expression | undefined;
  if (parser.check(TokenType.LPAREN)) {
    parser.advance(); // consume (
    initialValue = parser.parseExpression();
    parser.consume(TokenType.RPAREN, ') 필요');
  }

  return {
    type: 'SemaphoreDeclaration',
    name,
    initialValue,
    line: semaphoreToken.line,
    column: semaphoreToken.column
  };
}

/**
 * Channel Declaration 파싱: 채널 이름 <타입>
 * 고루틴 간 통신
 */
export function parseChannelDeclaration(parser: any): AST.ChannelDeclaration {
  const channelToken = parser.advance(); // consume CHANNEL (채널)

  const name = parser.advance().value;

  // 채널의 데이터 타입: <Type>
  let elementType: AST.TypeAnnotation | undefined;
  if (parser.check(TokenType.LT)) {
    parser.advance(); // consume <
    elementType = parser.parseTypeAnnotation();
    parser.consume(TokenType.GT, '> 필요');
  }

  // 버퍼 크기 (옵션): channel<Type>(bufferSize)
  let bufferSize: AST.Expression | undefined;
  if (parser.check(TokenType.LPAREN)) {
    parser.advance(); // consume (
    bufferSize = parser.parseExpression();
    parser.consume(TokenType.RPAREN, ') 필요');
  }

  return {
    type: 'ChannelDeclaration',
    name,
    elementType,
    bufferSize,
    line: channelToken.line,
    column: channelToken.column
  };
}

/**
 * Mutex Lock Expression 파싱: 채널.잠금()
 * 뮤텍스의 Lock 획득
 */
export function parseMutexLock(parser: any, object: AST.Expression): AST.MutexLock {
  const lockToken = parser.advance(); // consume LOCK_CALL (잠금 메서드)
  parser.consume(TokenType.LPAREN, '( 필요');
  parser.consume(TokenType.RPAREN, ') 필요');

  return {
    type: 'MutexLock',
    object,
    line: lockToken.line,
    column: lockToken.column
  };
}

/**
 * Mutex Unlock Expression 파싱: 뮤텍스.해제()
 * 뮤텍스의 Lock 해제
 */
export function parseMutexUnlock(parser: any, object: AST.Expression): AST.MutexUnlock {
  const unlockToken = parser.advance(); // consume UNLOCK_CALL (해제 메서드)
  parser.consume(TokenType.LPAREN, '( 필요');
  parser.consume(TokenType.RPAREN, ') 필요');

  return {
    type: 'MutexUnlock',
    object,
    line: unlockToken.line,
    column: unlockToken.column
  };
}

/**
 * Semaphore Signal Expression 파싱: 세마포어.신호()
 * 세마포어 신호 생성
 */
export function parseSemaphoreSignal(parser: any, object: AST.Expression): AST.SemaphoreSignal {
  const signalToken = parser.advance(); // consume SIGNAL_CALL (신호 메서드)
  parser.consume(TokenType.LPAREN, '( 필요');
  parser.consume(TokenType.RPAREN, ') 필요');

  return {
    type: 'SemaphoreSignal',
    object,
    line: signalToken.line,
    column: signalToken.column
  };
}

/**
 * Semaphore Wait Expression 파싱: 세마포어.대기()
 * 세마포어 신호 대기
 */
export function parseSemaphoreWait(parser: any, object: AST.Expression): AST.SemaphoreWait {
  const waitToken = parser.advance(); // consume WAIT_CALL (대기 메서드)
  parser.consume(TokenType.LPAREN, '( 필요');
  parser.consume(TokenType.RPAREN, ') 필요');

  return {
    type: 'SemaphoreWait',
    object,
    line: waitToken.line,
    column: waitToken.column
  };
}

/**
 * Channel Send Expression 파싱: 채널 <- 값
 * 채널에 값 전송
 */
export function parseChannelSend(parser: any, channel: AST.Expression): AST.ChannelSend {
  const sendToken = parser.advance(); // consume SEND (<-)
  const value = parser.parseExpression();

  return {
    type: 'ChannelSend',
    channel,
    value,
    line: sendToken.line,
    column: sendToken.column
  };
}

/**
 * Channel Receive Expression 파싱: 값 <- 채널
 * 채널에서 값 수신
 */
export function parseChannelReceive(parser: any): AST.ChannelReceive {
  const receiveToken = parser.current;
  const channel = parser.parseExpression();

  parser.advance(); // consume <-

  // 또는 값 = <- 채널 형태로 사용
  // 이 경우 assignment에서 처리됨

  return {
    type: 'ChannelReceive',
    channel,
    line: receiveToken.line,
    column: receiveToken.column
  };
}

/**
 * Select Statement 파싱: 선택 { 경우 ... }
 * 여러 채널 연산 중 하나를 선택
 */
export function parseSelectStatement(parser: any): AST.SelectStatement {
  const selectToken = parser.advance(); // consume SELECT (선택)
  parser.consume(TokenType.LBRACE, '{ 필요');

  const cases: AST.SelectCase[] = [];

  while (!parser.check(TokenType.RBRACE) && !parser.isAtEnd()) {
    // 경우 채널_수신 or 경우 채널_전송 or 경우기본
    if (parser.check(TokenType.CASE)) {
      parser.advance(); // consume 경우

      let channel: AST.Expression | undefined;
      let value: AST.Expression | undefined;
      let operation: 'send' | 'receive' | 'default' = 'default';

      if (!parser.check(TokenType.RBRACE)) {
        // 채널 <- 값 (send) 또는 값 <- 채널 (receive)
        const expr1 = parser.parseExpression();

        if (parser.check(TokenType.ARROW)) {
          // expr1 <- expr2
          parser.advance(); // consume <-
          const expr2 = parser.parseExpression();
          channel = expr1;
          value = expr2;
          operation = 'send';
        } else if (parser.check(TokenType.SEND)) {
          // 다른 형태의 ->도 체크
          operation = 'receive';
          channel = expr1;
        }
      } else {
        operation = 'default';
      }

      parser.consume(TokenType.ARROW, '→ 필요');

      // 케이스 본문
      const body: AST.Statement[] = [];
      while (!parser.check(TokenType.CASE) && !parser.check(TokenType.RBRACE) && !parser.isAtEnd()) {
        const stmt = parser.parseStatement();
        if (stmt) body.push(stmt);
      }

      cases.push({
        type: 'SelectCase',
        operation,
        channel,
        value,
        body
      });
    } else {
      break;
    }
  }

  parser.consume(TokenType.RBRACE, '} 필요');

  return {
    type: 'SelectStatement',
    cases,
    line: selectToken.line,
    column: selectToken.column
  };
}

/**
 * Scoped Mutex Expression 파싱: 잠금(뮤텍스) { ... }
 * RAII 패턴: 블록 진입 시 lock, 퇴출 시 unlock 자동
 */
export function parseScopedMutex(parser: any): AST.ScopedMutex {
  const lockToken = parser.advance(); // consume LOCK (잠금)
  parser.consume(TokenType.LPAREN, '( 필요');
  const mutex = parser.parseExpression();
  parser.consume(TokenType.RPAREN, ') 필요');

  parser.consume(TokenType.LBRACE, '{ 필요');

  const body: AST.Statement[] = [];
  while (!parser.check(TokenType.RBRACE) && !parser.isAtEnd()) {
    const stmt = parser.parseStatement();
    if (stmt) body.push(stmt);
  }

  parser.consume(TokenType.RBRACE, '} 필요');

  return {
    type: 'ScopedMutex',
    mutex,
    body,
    line: lockToken.line,
    column: lockToken.column
  };
}

/**
 * AST 노드 정의 (korean-ast.ts에 추가)
 */

declare global {
  namespace AST {
    interface LockStatement extends ASTNode {
      type: 'LockStatement';
      body: Statement[];
    }

    interface MutexDeclaration extends ASTNode {
      type: 'MutexDeclaration';
      name: string;
      resourceType?: TypeAnnotation;
      initialValue?: Expression;
    }

    interface SemaphoreDeclaration extends ASTNode {
      type: 'SemaphoreDeclaration';
      name: string;
      initialValue?: Expression;
    }

    interface ChannelDeclaration extends ASTNode {
      type: 'ChannelDeclaration';
      name: string;
      elementType?: TypeAnnotation;
      bufferSize?: Expression;
    }

    interface MutexLock extends ASTNode {
      type: 'MutexLock';
      object: Expression;
    }

    interface MutexUnlock extends ASTNode {
      type: 'MutexUnlock';
      object: Expression;
    }

    interface SemaphoreSignal extends ASTNode {
      type: 'SemaphoreSignal';
      object: Expression;
    }

    interface SemaphoreWait extends ASTNode {
      type: 'SemaphoreWait';
      object: Expression;
    }

    interface ChannelSend extends ASTNode {
      type: 'ChannelSend';
      channel: Expression;
      value: Expression;
    }

    interface ChannelReceive extends ASTNode {
      type: 'ChannelReceive';
      channel: Expression;
    }

    interface SelectCase {
      type: 'SelectCase';
      operation: 'send' | 'receive' | 'default';
      channel?: Expression;
      value?: Expression;
      body: Statement[];
    }

    interface SelectStatement extends ASTNode {
      type: 'SelectStatement';
      cases: SelectCase[];
    }

    interface ScopedMutex extends ASTNode {
      type: 'ScopedMutex';
      mutex: Expression;
      body: Statement[];
    }
  }
}

// 내보내기
export {
  parseLockStatement,
  parseMutexDeclaration,
  parseSemaphoreDeclaration,
  parseChannelDeclaration,
  parseMutexLock,
  parseMutexUnlock,
  parseSemaphoreSignal,
  parseSemaphoreWait,
  parseChannelSend,
  parseChannelReceive,
  parseSelectStatement,
  parseScopedMutex
};
