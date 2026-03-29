const fs = require('fs');
const { Lexer } = require('./dist/script-runner/lexer');
const { Parser } = require('./dist/script-runner/parser');
const { Compiler } = require('./dist/script-runner/compiler');
const { VM } = require('./dist/script-runner/vm');

const code = fs.readFileSync('./self-hosting/test_blockers_p1_p5.fl', 'utf8');

console.log('🎯 Bootstrap Blocker Test: P1-P5\n');
console.log('=' .repeat(60) + '\n');

try {
  console.log('Step 1: Lexing...');
  const lexer = new Lexer(code);
  const { tokens, errors: lexErrors } = lexer.tokenize();
  if (lexErrors.length > 0) throw new Error(`Lex errors: ${lexErrors[0].message}`);
  console.log(`✓ Lexing successful (${tokens.length} tokens)\n`);

  console.log('Step 2: Parsing...');
  const parser = new Parser(tokens);
  const { program, errors } = parser.parse();
  if (errors.length > 0) throw new Error(`Parse errors: ${errors[0].message}`);
  console.log(`✓ Parsing successful (${program.stmts.length} statements)\n`);

  console.log('Step 3: Compilation...');
  const compiler = new Compiler();
  const chunk = compiler.compile(program);
  console.log(`✓ Compilation successful\n`);

  console.log('Step 4: Execution...');
  const vm = new VM();
  const { output, error } = vm.run(chunk);
  if (error) throw new Error(error);
  console.log(`✓ Execution successful\n`);

  if (output.length > 0) {
    console.log('Output:');
    output.forEach(line => console.log('  ' + line));
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n✅ ALL BLOCKERS (P1-P5) SUCCESSFULLY RESOLVED!\n');
  console.log('Summary:');
  console.log('  ✅ P1: Anonymous Struct Literal');
  console.log('  ✅ P2: Struct Constructor');
  console.log('  ✅ P3: If-Else Statement');
  console.log('  ✅ P4: C-style For Loop');
  console.log('  ✅ P5: Match Statement');

} catch (error) {
  console.error('\n❌ TEST FAILED:\n' + error.message);
  console.error(error.stack);
  process.exit(1);
}
