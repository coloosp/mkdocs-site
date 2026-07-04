// 阿里云 FC 代理 — 转发到 DeepSeek API
// 部署时设置环境变量 DEEPSEEK_KEY = 你的 API Key

const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';

exports.handler = async (req, resp, context) => {
  // 设置 CORS
  resp.setHeader('Access-Control-Allow-Origin', '*');
  resp.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  resp.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    resp.statusCode = 200;
    resp.send('');
    return;
  }

  if (req.method !== 'POST') {
    resp.statusCode = 405;
    resp.setHeader('Content-Type', 'application/json');
    resp.send(JSON.stringify({ error: '只支持 POST' }));
    return;
  }

  try {
    const body = JSON.parse(req.body || '{}');
    const key = process.env.DEEPSEEK_KEY;

    if (!key) {
      resp.statusCode = 500;
      resp.setHeader('Content-Type', 'application/json');
      resp.send(JSON.stringify({ error: 'API Key 未配置' }));
      return;
    }

    const aiResp = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: body.model || 'deepseek-chat',
        messages: body.messages || [],
        max_tokens: body.max_tokens || 1024,
        temperature: body.temperature ?? 0.7,
      }),
    });

    const data = await aiResp.json();
    resp.statusCode = aiResp.status;
    resp.setHeader('Content-Type', 'application/json');
    resp.send(JSON.stringify(data));
  } catch (e) {
    resp.statusCode = 500;
    resp.setHeader('Content-Type', 'application/json');
    resp.send(JSON.stringify({ error: e.message }));
  }
};
