const fs = require('fs');
const { Lexer } = require('./dist/script-runner/lexer');
const { Parser } = require('./dist/script-runner/parser');

const code = fs.readFileSync('./test_partial.fl', 'utf8');
console.log('Code:\n' + code);
console.log('\n' + '='.repeat(50) + '\n');

const lexer = new Lexer(code);
const { tokens, errors: lexErrors } = lexer.tokenize();
if (lexErrors.length > 0) {
  console.error('Lex Errors:', lexErrors);
  process.exit(1);
}

const parser = new Parser(tokens);
const { program, errors } = parser.parse();

if (errors.length > 0) {
  console.error('Parse Errors:', errors);
  process.exit(1);
} else {
  console.log(`✅ Success! Parsed ${program.stmts.length} statements`);
}
