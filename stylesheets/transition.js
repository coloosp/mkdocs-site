// 希卡转场 + 音效 + 全局符文特效 (zelda 素材)
(function(){
  var MAJOR = ['%E7%AE%97%E6%B3%95%E7%BB%83%E4%B9%A0','%E5%8A%9B%E6%89%A3hot100','%E7%AE%97%E6%B3%95%E6%9D%82%E8%B0%88','算法练习','力扣hot100','算法杂谈','缓存系统','协程库','CpCache','fiber-lib'];

  function isMajor(raw) {
    if (!raw) return false;
    for (var i=0; i<MAJOR.length; i++) {
      if (raw.indexOf(MAJOR[i]) !== -1) return true;
    }
    return false;
  }

  function audioBase() {
    var links = document.querySelectorAll('link[rel=stylesheet]');
    for (var i=0; i<links.length; i++) {
      var m = links[i].href.match(/(.*\/)stylesheets\/extra\.css/);
      if (m) return m[1];
    }
    return '';
  }

  function playAudio(filename) {
    var a = new Audio(audioBase() + 'audio/' + filename);
    a.volume = 0.5;
    a.play().catch(function(){});
  }

  // ---- 全局点击音效 — 随机 1 或 2 ----
  document.addEventListener('click', function(e){
    var name = Math.random() < 0.5 ? '点击音效1.mp3' : '点击音效2.mp3';
    playAudio(name);
  });

  // ---- 全局符文脉冲 + 拖拽轨迹 ----
  var dragging = false, dragMoved = false;

  function spawnRune(x, y, size, dur, delay) {
    var ring = document.createElement('span');
    ring.style.cssText =
      'position:fixed;left:'+(x-size/2)+'px;top:'+(y-size/2)+'px;'+
      'width:'+size+'px;height:'+size+'px;border-radius:50%;'+
      'border:2px solid #3CD3FC;'+
      'box-shadow:0 0 6px rgba(60,211,252,0.6),inset 0 0 4px rgba(60,211,252,0.3);'+
      'pointer-events:none;z-index:99999;'+
      'animation:rune-pulse '+dur+'s ease-out '+delay+'s forwards;';
    document.body.appendChild(ring);
    setTimeout(function(){ ring.remove(); }, (dur+delay)*1000+100);
  }

  function spawnTrail(x, y) {
    var dot = document.createElement('span');
    dot.style.cssText =
      'position:fixed;left:'+(x-3)+'px;top:'+(y-3)+'px;'+
      'width:6px;height:6px;border-radius:50%;background:#3CD3FC;'+
      'box-shadow:0 0 6px rgba(60,211,252,0.8),0 0 14px rgba(79,192,255,0.5);'+
      'pointer-events:none;z-index:99998;'+
      'animation:trail-fade 0.7s ease-out forwards;';
    document.body.appendChild(dot);
    setTimeout(function(){ dot.remove(); }, 800);
  }

  document.addEventListener('mousedown', function(e){
    if (e.target.closest('#stamina-trigger')) return;
    dragging = true; dragMoved = false;
    spawnRune(e.clientX, e.clientY, 12, 0.55, 0);
  });

  document.addEventListener('mousemove', function(e){
    if (!dragging) return;
    if (!dragMoved) dragMoved = true;
    spawnTrail(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', function(e){
    if (!dragging) return;
    dragging = false;
    if (dragMoved) {
      for (var i=0; i<4; i++) {
        spawnRune(e.clientX, e.clientY, 10+6*i, 0.7, i*0.05);
      }
    }
  });

  // ---- 背景音乐：首页固定，其他页随机 2/3/4 ----
  var isHome = location.pathname.replace(/\/+$/,'') === '' ||
    /\/index\.html?$/.test(location.pathname) ||
    location.pathname.replace(/\/+$/,'').endsWith('/mkdocs-site');
  var bgmFile = isHome ? '背景音乐.bfstm.mp3' :
    '背景音乐' + (Math.floor(Math.random()*3)+2) + '.mp3';
  var bgmStarted = false;
  function startBGM() {
    if (bgmStarted) return; bgmStarted = true;
    var a = new Audio(audioBase() + 'audio/' + bgmFile);
    a.loop = true; a.volume = 0.3;
    a.play().catch(function(){});
  }
  document.addEventListener('click', startBGM, {once: true});

  // ---- 大板块转场 + 切换音效 ----
  document.addEventListener('click', function(e){
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.charAt(0)==='#' || href.indexOf('javascript:')===0 || href.indexOf('http')===0) return;
    if (!isMajor(href)) return;

    e.preventDefault();
    playAudio('切换场景.mp3');
    var ov = document.createElement('div');
    ov.className = 'sheikah-transition';
    ov.innerHTML = '<img class="eye-icon" src="' + audioBase() + 'stylesheets/img/sheikah-symbol.svg" style="width:80px;height:74px;">';
    document.body.appendChild(ov);
    setTimeout(function(){ window.location = href; }, 800);
  });
})();
