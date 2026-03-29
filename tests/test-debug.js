const { Lexer } = require('./dist/script-runner/lexer');
const { Parser } = require('./dist/script-runner/parser');

const code = 'var obj = {x: 10}';

const lexer = new Lexer(code);
const {tokens} = lexer.tokenize();

console.log('Tokens:', tokens.map(t => `${t.type}:"${t.lexeme}"`).join(' '));

// Add debugging to parser
const parser = new Parser(tokens);
console.log('Parser initial pos:', parser.pos);
console.log('First token:', tokens[0].type);

const result = parser.parse();

console.log('Result statements:', result.program.stmts.length);
console.log('Result errors:', result.errors.length);
if (result.errors.length > 0) {
  console.log('Errors:', result.errors);
}
