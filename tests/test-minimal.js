const fs = require('fs');
const { Lexer } = require('./dist/script-runner/lexer');
const { Parser } = require('./dist/script-runner/parser');

const code = fs.readFileSync('./test_minimal.fl', 'utf8');

const lexer = new Lexer(code);
const { tokens } = lexer.tokenize();
console.log('Tokens:', tokens);

const parser = new Parser(tokens);
const { program, errors } = parser.parse();

if (errors.length > 0) {
  console.error('Errors:', errors);
} else {
  console.log('Success! Statements:', program.stmts.length);
  program.stmts.forEach((stmt, i) => {
    console.log(`  ${i}: ${stmt.kind}`);
  });
}
