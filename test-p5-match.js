const fs = require('fs');
const { Lexer } = require('./dist/script-runner/lexer');
const { Parser } = require('./dist/script-runner/parser');
const { Compiler } = require('./dist/script-runner/compiler');
const { VM } = require('./dist/script-runner/vm');

const code = fs.readFileSync('./self-hosting/test_match_p5.fl', 'utf8');

console.log('Testing: test_match_p5.fl (P5 - Match Statement)\n');
console.log('Code:\n' + code);
console.log('\n' + '='.repeat(60) + '\n');

try {
  const lexer = new Lexer(code);
  const { tokens, errors: lexErrors } = lexer.tokenize();
  console.log(`✓ Lexing complete (${tokens.length} tokens)`);
  if (lexErrors.length > 0) {
    console.error('Lex errors:', lexErrors);
    throw new Error('Lex errors');
  }

  const parser = new Parser(tokens);
  const { program, errors } = parser.parse();
  console.log(`✓ Parsing complete (${program.stmts.length} statements)`);
  if (errors.length > 0) {
    console.error('Parse errors:', errors);
    throw new Error('Parse errors');
  }

  const compiler = new Compiler();
  const chunk = compiler.compile(program);
  console.log(`✓ Compilation complete`);

  const vm = new VM();
  const { output, error } = vm.run(chunk);
  console.log(`✓ Execution complete\n`);

  if (error) throw new Error(error);

  console.log('Output:');
  output.forEach(line => console.log('  ' + line));
  console.log('\n✅ P5 MATCH TEST PASSED');

} catch (error) {
  console.error('\n❌ P5 MATCH TEST FAILED:', error.message);
  console.error(error.stack);
  process.exit(1);
}
