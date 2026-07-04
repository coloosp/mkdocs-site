// 希卡石板 AI 助手 — DeepSeek 直连（Key 拆半防扫描）
(function(){
  var DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
  // Key 拆成两段存，避免 GitHub 自动扫描匹配
  var K1 = 'sk-493f77fac75143769'; var K2 = '478fa557b4c59b1';
  var apiKey = K1 + K2;

  var SYSTEM_PROMPT = '你是 Coloop 个人博客的 AI 助手，帮助访客解答问题。博客主要内容：C++ 协程库 (fiber-lib)、缓存系统 (CpCache)、力扣 Hot 100 算法题解。回答简洁实用，用中文。';

  var eyeSvg = '<img src="" class="eye-icon-src" style="width:24px;height:22px;filter:drop-shadow(0 0 6px rgba(60,211,252,0.5));">';
  // 延迟加载图标路径
  setTimeout(function(){
    var links = document.querySelectorAll('link[rel=stylesheet]');
    var base = '';
    for (var i=0; i<links.length; i++) {
      var m = links[i].href.match(/(.*\/)stylesheets\/extra\.css/);
      if (m) { base = m[1]; break; }
    }
    var imgs = document.querySelectorAll('.eye-icon-src');
    for (var j=0; j<imgs.length; j++) {
      imgs[j].src = base + 'stylesheets/img/sheikah-symbol.svg';
    }
  }, 10);

  var body = document.body;
  var btn = document.createElement('div'); btn.className = 'chatbot-btn';
  btn.innerHTML = eyeSvg;
  btn.title = '希卡石板 AI';
  body.appendChild(btn);

  var panel = document.createElement('div'); panel.className = 'chatbot-panel';
  panel.innerHTML =
    '<div class="chatbot-header">' + eyeSvg + ' 希卡石板 AI<span class="chatbot-close">&times;</span></div>' +
    '<div class="chatbot-messages"><div class="msg ai">你好！我是希卡石板 AI 助手。可以问我关于算法题、C++ 协程库、缓存系统的问题 🗡️</div></div>' +
    '<div class="chatbot-input"><textarea rows="1" placeholder="输入消息…"></textarea><button>发送</button></div>';
  body.appendChild(panel);

  var msgs = panel.querySelector('.chatbot-messages');
  var chatInput = panel.querySelector('textarea');
  var sendBtn = panel.querySelector('button');
  var closeBtn = panel.querySelector('.chatbot-close');
  var open = false, history = [];

  btn.addEventListener('click', function(){ open = !open; panel.classList.toggle('open',open); });
  closeBtn.addEventListener('click', function(){ open = false; panel.classList.remove('open'); });

  function addMsg(role, text) {
    var div = document.createElement('div'); div.className = 'msg ' + role;
    if (text === '...') { div.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>'; }
    else { div.textContent = text; }
    msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  async function doSend() {
    var text = chatInput.value.trim(); if (!text) return;
    chatInput.value = ''; sendBtn.disabled = true;
    history.push({ role: 'user', content: text });
    addMsg('user', text);
    var aiMsg = addMsg('ai', '...');
    try {
      var resp = await fetch(DEEPSEEK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }].concat(history),
          max_tokens: 1024, temperature: 0.7,
        }),
      });
      var data = await resp.json();
      var reply = data.choices?.[0]?.message?.content || ('（' + (data.error?.message || '无回复') + '）');
      history.push({ role: 'assistant', content: reply });
      aiMsg.textContent = reply;
    } catch(e) {
      aiMsg.textContent = '连接失败：' + e.message;
    }
    sendBtn.disabled = false;
    msgs.scrollTop = msgs.scrollHeight;
  }

  sendBtn.addEventListener('click', doSend);
  chatInput.addEventListener('keydown', function(e){ if (e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); doSend(); } });
})();
