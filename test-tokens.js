const { Lexer } = require('./dist/script-runner/lexer');

const code = 'var obj = {x: 10}';

const lexer = new Lexer(code);
const {tokens} = lexer.tokenize();

console.log('Tokens:');
tokens.forEach((t, i) => {
  console.log(`${i}: ${t.type} = "${t.lexeme}"`);
});
