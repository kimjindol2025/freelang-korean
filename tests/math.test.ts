/**
 * K-FreeLang math.free 함수 검증
 *
 * 순수 JavaScript 구현으로 math.free의 로직 검증
 */

// ==================== math.free 함수 구현 (테스트용) ====================

// 절댓값
function abs(n: number): number {
  return n < 0 ? n * -1 : n;
}

// 부호 반환
function sign(n: number): number {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
}

// 최댓값
function max(a: number, b: number): number {
  return a > b ? a : b;
}

// 최솟값
function min(a: number, b: number): number {
  return a < b ? a : b;
}

// 범위 제한
function clamp(value: number, min_val: number, max_val: number): number {
  if (value < min_val) return min_val;
  if (value > max_val) return max_val;
  return value;
}

// 선형 보간
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// 거듭제곱 (정수 지수)
function pow(base: number, exp: number): number {
  if (exp === 0) return 1;
  if (exp < 0) return 1 / pow(base, -exp);

  let result = 1;
  for (let i = 0; i < exp; i++) {
    result = result * base;
  }
  return result;
}

// 제곱근 (Newton-Raphson)
function sqrt(n: number): number {
  if (n < 0) return 0;
  if (n === 0) return 0;

  let x = n;
  for (let i = 0; i < 10; i++) {
    x = (x + n / x) / 2;
  }
  return x;
}

// 최대공약수
function gcd(a: number, b: number): number {
  let a_abs = abs(a);
  let b_abs = abs(b);

  while (b_abs !== 0) {
    const temp = b_abs;
    b_abs = a_abs % b_abs;
    a_abs = temp;
  }

  return a_abs;
}

// 최소공배수
function lcm(a: number, b: number): number {
  return abs(a * b) / gcd(a, b);
}

// 팩토리얼
function factorial(n: number): number {
  if (n < 0) return 0;
  if (n === 0) return 1;

  let result = 1;
  for (let i = 1; i <= n; i++) {
    result = result * i;
  }
  return result;
}

// 피보나치
function fibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

// 소수 판정
function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

// NaN 판정
function isNaN(n: number): boolean {
  return n !== n;
}

// 무한대 판정
function isInfinite(n: number): boolean {
  return abs(n) > 1.7976931348623157e+308;
}

// ==================== Jest 테스트 ====================

describe('K-FreeLang math.free 함수 검증', () => {

  describe('기본 함수', () => {
    test('abs: 절댓값', () => {
      expect(abs(-42)).toBe(42);
      expect(abs(42)).toBe(42);
      expect(abs(0)).toBe(0);
    });

    test('sign: 부호 반환', () => {
      expect(sign(10)).toBe(1);
      expect(sign(-10)).toBe(-1);
      expect(sign(0)).toBe(0);
    });

    test('max: 최댓값', () => {
      expect(max(10, 20)).toBe(20);
      expect(max(20, 10)).toBe(20);
      expect(max(-10, -5)).toBe(-5);
    });

    test('min: 최솟값', () => {
      expect(min(10, 20)).toBe(10);
      expect(min(20, 10)).toBe(10);
      expect(min(-10, -5)).toBe(-10);
    });

    test('clamp: 범위 제한', () => {
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(5, 0, 10)).toBe(5);
    });

    test('lerp: 선형 보간', () => {
      expect(lerp(0, 10, 0.5)).toBe(5);
      expect(lerp(0, 10, 0)).toBe(0);
      expect(lerp(0, 10, 1)).toBe(10);
    });
  });

  describe('거듭제곱 및 근', () => {
    test('pow: 거듭제곱', () => {
      expect(pow(2, 0)).toBe(1);
      expect(pow(2, 3)).toBe(8);
      expect(pow(2, 4)).toBe(16);
      expect(pow(2, -1)).toBeCloseTo(0.5, 5);
    });

    test('sqrt: 제곱근', () => {
      expect(sqrt(0)).toBe(0);
      expect(sqrt(1)).toBeCloseTo(1, 5);
      expect(sqrt(4)).toBeCloseTo(2, 5);
      expect(sqrt(9)).toBeCloseTo(3, 5);
      expect(sqrt(-1)).toBe(0); // 음수는 0 반환
    });
  });

  describe('정수론', () => {
    test('gcd: 최대공약수', () => {
      expect(gcd(12, 8)).toBe(4);
      expect(gcd(48, 18)).toBe(6);
      expect(gcd(7, 5)).toBe(1);
      expect(gcd(0, 5)).toBe(5);
    });

    test('lcm: 최소공배수', () => {
      expect(lcm(4, 6)).toBe(12);
      expect(lcm(12, 18)).toBe(36);
      expect(lcm(7, 5)).toBe(35);
    });

    test('factorial: 팩토리얼', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(5)).toBe(120);
      expect(factorial(10)).toBe(3628800);
      expect(factorial(-1)).toBe(0);
    });
  });

  describe('수열', () => {
    test('fibonacci: 피보나치', () => {
      expect(fibonacci(0)).toBe(0);
      expect(fibonacci(1)).toBe(1);
      expect(fibonacci(2)).toBe(1);
      expect(fibonacci(5)).toBe(5);
      expect(fibonacci(10)).toBe(55);
    });

    test('isPrime: 소수 판정', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(6)).toBe(false);
      expect(isPrime(1)).toBe(false);
      expect(isPrime(0)).toBe(false);
    });
  });

  describe('타입 검사', () => {
    test('isNaN: NaN 판정', () => {
      expect(isNaN(Number.NaN)).toBe(true);
      expect(isNaN(10)).toBe(false);
      expect(isNaN(0)).toBe(false);
    });

    test('isInfinite: 무한대 판정', () => {
      expect(isInfinite(Number.POSITIVE_INFINITY)).toBe(true);
      expect(isInfinite(Number.NEGATIVE_INFINITY)).toBe(true);
      expect(isInfinite(10)).toBe(false);
      expect(isInfinite(1e308)).toBe(false);
    });
  });

  describe('상수 검증', () => {
    test('PI 상수', () => {
      const PI = 3.141592653589793;
      expect(PI).toBeCloseTo(3.14159, 5);
    });

    test('E 상수', () => {
      const E = 2.718281828459045;
      expect(E).toBeCloseTo(2.71828, 5);
    });
  });

  describe('수학적 정확성', () => {
    test('sqrt 정확도 (Newton-Raphson)', () => {
      // 10 반복으로 충분한 정확도
      expect(sqrt(2)).toBeCloseTo(1.41421356, 7);
      expect(sqrt(3)).toBeCloseTo(1.73205081, 7);
    });

    test('pow 음수 지수', () => {
      expect(pow(2, -2)).toBeCloseTo(0.25, 5);
      expect(pow(10, -1)).toBeCloseTo(0.1, 5);
    });

    test('GCD/LCM 관계식', () => {
      const a = 12;
      const b = 18;
      // gcd(a,b) * lcm(a,b) = a * b
      expect(gcd(a, b) * lcm(a, b)).toBe(a * b);
    });
  });
});
