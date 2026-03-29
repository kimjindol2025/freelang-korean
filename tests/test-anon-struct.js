const { Lexer } = require('./dist/script-runner/lexer');
const { Parser } = require('./dist/script-runner/parser');

const code = 'var obj = {x: 10, y: 20}';

try {
  const lexer = new Lexer(code);
  const {tokens} = lexer.tokenize();
  
  const parser = new Parser(tokens);
  const result = parser.parse();
  
  if (result.program && result.program.stmts && result.program.stmts.length > 0) {
    const stmt = result.program.stmts[0];
    console.log('✅ Code parsed successfully!');
    console.log('Statement kind:', stmt.kind);
    if (stmt && stmt.init) {
      console.log('Init kind:', stmt.init.kind);
      if (stmt.init.kind === 'struct_lit') {
        console.log('✅ P1 SUCCESS - Anonymous struct literal recognized!');
        console.log('   structName="' + stmt.init.structName + '", fields=' + stmt.init.fields.length);
      } else {
        console.log('Value parsed but not as struct_lit');
      }
    }
  } else {
    console.log('Parse errors:', result.errors);
  }
} catch (error) {
  console.error('Error:', error.message);
}
