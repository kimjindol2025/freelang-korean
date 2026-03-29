const fs = require('fs');
const path = require('path');
const { Lexer } = require('./dist/script-runner/lexer');
const { Parser } = require('./dist/script-runner/parser');
const { Compiler } = require('./dist/script-runner/compiler');
const { VM } = require('./dist/script-runner/vm');

const testDir = './self-hosting';
const testFiles = fs.readdirSync(testDir).filter(f => f.startsWith('test_') && f.endsWith('.fl')).sort();

console.log('🧪 Running all bootstrap tests\n');
console.log('=' .repeat(60) + '\n');

let passed = 0;
let failed = 0;
const failures = [];

for (const file of testFiles) {
  const filePath = path.join(testDir, file);
  const code = fs.readFileSync(filePath, 'utf8');

  try {
    const lexer = new Lexer(code);
    const { tokens, errors: lexErrors } = lexer.tokenize();
    if (lexErrors.length > 0) throw new Error(`Lex errors: ${lexErrors[0].message}`);

    const parser = new Parser(tokens);
    const { program, errors } = parser.parse();
    if (errors.length > 0) throw new Error(`Parse errors: ${errors[0].message}`);

    const compiler = new Compiler();
    const chunk = compiler.compile(program);

    const vm = new VM();
    const { output, error } = vm.run(chunk);
    if (error) throw new Error(error);

    console.log(`✅ ${file}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${file} - ${error.message}`);
    failed++;
    failures.push({ file, error: error.message });
  }
}

console.log('\n' + '='.repeat(60));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log('\nFailures:');
  failures.forEach(f => console.log(`  - ${f.file}: ${f.error}`));
  process.exit(1);
} else {
  console.log('\n🎉 All bootstrap tests passed!');
}
