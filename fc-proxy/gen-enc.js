// 生成加密 API Key — 本地运行后把输出替换到 chatbot.js 的 ENC_KEY
// 用法: node gen-enc.js sk-你的key 你的密码
var apiKey = process.argv[2];
var password = process.argv[3];

if (!apiKey || !password) {
  console.log('用法: node gen-enc.js <API_KEY> <密码>');
  console.log('例如: node gen-enc.js sk-abc123 mypassword');
  process.exit(1);
}

function xorString(str, key) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

var encrypted = xorString(apiKey, password);
var encoded = Buffer.from(encrypted, 'binary').toString('base64');
console.log('将下面这行替换 chatbot.js 中的 ENC_KEY:');
console.log("var ENC_KEY = '" + encoded + "';");
