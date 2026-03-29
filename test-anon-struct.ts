import { Lexer } from './src/lexer/lexer';
import { Parser } from './src/script-runner/parser';

// Test anonymous struct literal parsing
const code = `
var obj = {x: 10, y: 20}
`;

console.log('🔍 Testing Anonymous Struct Literal Parsing');

try {
  const lexer = new Lexer(code);
  const tokens = lexer.tokenize();
  console.log('✅ Tokens:', tokens.length);
  
  const parser = new Parser(tokens);
  const ast = parser.parse();
  console.log('✅ AST parsed');
  
  // Check if first statement is assignment with struct_lit value
  const firstStmt = ast.statements[0];
  if (firstStmt && 'right' in firstStmt) {
    const right = firstStmt.right;
    console.log('Value kind:', right.kind);
    if (right.kind === 'struct_lit') {
      console.log('✅ P1 SUCCESS: structName="' + right.structName + '", fields=' + right.fields.length);
    } else {
      console.log('❌ P1 FAIL: Expected struct_lit, got:', right.kind);
    }
  }
} catch (error) {
  console.error('❌ Error:', error.message);
}
