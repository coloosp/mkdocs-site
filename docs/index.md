<!-- 希卡之石面板 — 首页 -->
<div class="sheikah-slate" style="max-width:760px; margin:0 auto 2rem; padding: 30px 36px;">

<!-- 希卡之眼水印 -->
<svg class="sheikah-eye-watermark" viewBox="0 0 380 350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M190 0L380 350H0L190 0ZM190 70L310 310H70L190 70Z" fill="#3CD3FC"/>
  <circle cx="190" cy="195" r="18" fill="#3CD3FC"/>
  <path d="M190 140L160 175H220L190 140Z" fill="#3CD3FC" opacity="0.6"/>
  <path d="M190 250L160 215H220L190 250Z" fill="#3CD3FC" opacity="0.6"/>
</svg>

<div style="position:relative;z-index:2;">

<!-- 标题区 + 精力轮互动 -->
<div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-bottom:22px;">

  <!-- 长按头像触发精力轮 -->
  <div id="stamina-trigger" style="position:relative;cursor:pointer;user-select:none;"
       title="长按注入精力…">
    <img src="images/avatar.jpg" alt="头像" class="avatar" style="width:54px;height:54px;margin:0;">

    <!-- 精力轮（默认隐藏） -->
    <div id="stamina-wheel" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
      width:80px;height:80px;opacity:0;pointer-events:none;transition:opacity 0.3s;">
      <svg viewBox="0 0 100 100" style="width:100%;height:100%;transform:rotate(-90deg);">
        <!-- 底色圆环 -->
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="8"/>
        <!-- 精力填充弧 — conic-gradient masked -->
        <circle id="stamina-fill" cx="50" cy="50" r="42" fill="none"
          stroke="#13FF59" stroke-width="8" stroke-linecap="round"
          stroke-dasharray="263.89" stroke-dashoffset="263.89"
          style="filter:drop-shadow(0 0 8px rgba(19,255,89,0.7));transition:none;"/>
        <!-- 低精力时变红 -->
        <circle id="stamina-fill-low" cx="50" cy="50" r="42" fill="none"
          stroke="#F15050" stroke-width="8" stroke-linecap="round"
          stroke-dasharray="263.89" stroke-dashoffset="263.89"
          style="filter:drop-shadow(0 0 8px rgba(241,80,80,0.7));opacity:0;transition:none;"/>
      </svg>
      <div id="stamina-label" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
        font-family:var(--font-title);font-size:10px;color:var(--text-muted);letter-spacing:0.1em;"></div>
    </div>

      </div>

  <div>
    <h1 style="font-family:var(--font-title);font-weight:400;font-style:normal;font-size:clamp(22px,4vw,30px);color:var(--zelda-tan);letter-spacing:0.04em;text-shadow:0 0 18px rgba(60,211,252,0.35);margin:0;border:none;padding:0;">
      Coloop（彩泡泡）
    </h1>
    <p style="font-size:12.5px;color:var(--text-muted);letter-spacing:0.06em;margin:4px 0 0;">
      还在 <b style="color:var(--sheikah-blue);font-style:normal;font-weight:500;">C++</b> 学习的编程爱好者
    </p>
  </div>
</div>

<!-- 希卡分隔线 -->
<div class="sheikah-divider">
  <span class="line"></span>
  <img class="ornament" src="stylesheets/img/text-divider-ornament.svg" alt="">
  <span class="line"></span>
</div>

<!-- 关于我 -->
<h3>关于我</h3>
<p>日常：C++ 学习、写点小项目、刷算法题<br>想法：总之实现一点有趣的东西</p>

<!-- 项目展示 — Sheikah 卡片 + 角落装饰 -->
<h3>我的项目</h3>

<div class="sheikah-card">
  <img class="card-corner tl" src="stylesheets/img/text-ornament-corner.svg" alt="">
  <img class="card-corner tr" src="stylesheets/img/text-ornament-corner.svg" alt="">
  <img class="card-corner br" src="stylesheets/img/text-ornament-corner.svg" alt="">
  <img class="card-corner bl" src="stylesheets/img/text-ornament-corner.svg" alt="">
  <span class="sheikah-rune">◇ Project 01</span>
  <h4 style="margin-top:0.3rem;">协程库 (fiber-lib)</h4>
  <p style="margin-bottom:0.8rem;">基于 C++ 的轻量级协程框架，包含线程、协程、调度器、定时器、IO 管理等模块，已完成性能测试。</p>
  <a href="https://github.com/coloosp/fiber-lib" class="sheikah-btn" style="margin-right:10px;">GitHub</a>
  <a href="fiber-lib/故事开始/" class="sheikah-btn golden">阅读文档</a>
</div>

<div class="sheikah-card">
  <img class="card-corner tl" src="stylesheets/img/text-ornament-corner.svg" alt="">
  <img class="card-corner tr" src="stylesheets/img/text-ornament-corner.svg" alt="">
  <img class="card-corner br" src="stylesheets/img/text-ornament-corner.svg" alt="">
  <img class="card-corner bl" src="stylesheets/img/text-ornament-corner.svg" alt="">
  <span class="sheikah-rune">◇ Project 02</span>
  <h4 style="margin-top:0.3rem;">缓存系统 (CpCache)</h4>
  <p style="margin-bottom:0.8rem;">实现了 LRU、LFU、ARC 等经典缓存替换算法，包含功能测试和编译运行说明。</p>
  <a href="https://github.com/coloosp/CpCache" class="sheikah-btn" style="margin-right:10px;">GitHub</a>
  <a href="CpCache/项目简介/" class="sheikah-btn golden">阅读文档</a>
</div>

<!-- 希卡分隔线 -->
<div class="sheikah-divider">
  <span class="line"></span>
  <img class="ornament" src="stylesheets/img/text-divider-ornament.svg" alt="">
  <span class="line"></span>
</div>

<!-- 联系 -->
<h3>联系我</h3>
<p style="display:flex;flex-wrap:wrap;gap:8px;">
  <a href="https://space.bilibili.com/85760889" class="btn">Bilibili</a>
  <a href="https://github.com/coloosp" class="btn">GitHub</a>
  <a href="https://leetcode.cn/u/daz2ling-germainjxb/" class="btn btn-secondary">力扣</a>
</p>
<p style="font-size:16px;color:var(--text-main);">QQ: 1336990381</p>
<p style="font-size:12px;color:var(--text-muted);">来完成有趣的事情吧~ 😚</p>

</div>
</div>

<!-- 精力轮交互脚本 -->
<script>
(function(){
  const trigger = document.getElementById('stamina-trigger');
  const wheel = document.getElementById('stamina-wheel');
  const fill = document.getElementById('stamina-fill');
  const fillLow = document.getElementById('stamina-fill-low');
  const label = document.getElementById('stamina-label');
  const CIRCUMFERENCE = 2 * Math.PI * 42; // ~263.89
  fill.style.strokeDasharray = CIRCUMFERENCE;
  fill.style.strokeDashoffset = CIRCUMFERENCE;
  fillLow.style.strokeDasharray = CIRCUMFERENCE;
  fillLow.style.strokeDashoffset = CIRCUMFERENCE;

  let pressing = false, timer = null, startTime = 0;
  const DURATION = 2400; // 2.4s to fill

  function setProgress(pct) {
    const offset = CIRCUMFERENCE * (1 - pct);
    if (pct <= 0.2) {
      fill.style.opacity = '0';
      fillLow.style.opacity = '1';
      fillLow.style.strokeDashoffset = offset;
    } else {
      fill.style.opacity = '1';
      fillLow.style.opacity = '0';
      fill.style.strokeDashoffset = offset;
    }
    label.textContent = Math.round(pct * 100) + '%';
  }

  function startPress(e) {
    e.preventDefault();
    pressing = true; startTime = Date.now();
    wheel.style.opacity = '1';
    setProgress(0);
    tick();
  }

  function tick() {
    if (!pressing) return;
    const elapsed = Date.now() - startTime;
    const pct = Math.min(elapsed / DURATION, 1);
    setProgress(pct);
    if (pct < 1) {
      timer = requestAnimationFrame(() => { if (pressing) tick(); });
    } else {
      // 注满 — 闪一下绿色 + 上升三连音
      staminaDoneSound();
      fill.style.filter = 'drop-shadow(0 0 16px rgba(19,255,89,1))';
      setTimeout(() => {
        fill.style.filter = 'drop-shadow(0 0 8px rgba(19,255,89,0.7))';
        wheel.style.opacity = '0';
        setProgress(0);
      }, 600);
      pressing = false;
    }
  }

  function endPress() {
    if (!pressing) return;
    pressing = false;
    if (timer) cancelAnimationFrame(timer);
    // 回退动画
    const pct = Math.min((Date.now() - startTime) / DURATION, 1);
    const remaining = pct;
    const startOffset = CIRCUMFERENCE * (1 - remaining);
    const startTime2 = Date.now();
    function drain() {
      const elapsed = Date.now() - startTime2;
      const drainPct = Math.max(0, remaining - elapsed / 800);
      const offset = CIRCUMFERENCE * (1 - drainPct);
      fill.style.strokeDashoffset = offset;
      fillLow.style.strokeDashoffset = offset;
      if (drainPct > 0) {
        requestAnimationFrame(drain);
      } else {
        wheel.style.opacity = '0';
        fill.style.opacity = '1';
        fillLow.style.opacity = '0';
      }
    }
    drain();
  }

  trigger.addEventListener('mousedown', startPress);
  trigger.addEventListener('touchstart', startPress, {passive: false});
  window.addEventListener('mouseup', endPress);
  window.addEventListener('touchend', endPress);
})();
</script>
