/* 鼠标点击烟花特效注入脚本 */
hexo.extend.filter.register('after_render:html', function (str) {
  const fireworksCSS = `
<style>
  .fireworks-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  }
  .firework-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: firework-burst 0.8s ease-out forwards;
  }
  @keyframes firework-burst {
    0% {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(var(--tx), var(--ty)) scale(0);
    }
  }
</style>`;

  const fireworksJS = `
<script>
(function() {
  if (typeof window === 'undefined') return;

  // 移动端检测
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  var container = document.createElement('div');
  container.className = 'fireworks-container';
  document.body.appendChild(container);

  var colors = ['#f472b6', '#ec4899', '#db2777', '#f9a8d4', '#fce7f3', '#818cf8', '#c084fc', '#fb7185'];

  function createFirework(x, y) {
    var particleCount = isMobile ? 12 : 20;
    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.className = 'firework-particle';

      var angle = (Math.PI * 2 / particleCount) * i;
      var velocity = 30 + Math.random() * 50;
      var tx = Math.cos(angle) * velocity;
      var ty = Math.sin(angle) * velocity;

      var size = 3 + Math.random() * 4;
      var color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText =
        'left:' + x + 'px;' +
        'top:' + y + 'px;' +
        'width:' + size + 'px;' +
        'height:' + size + 'px;' +
        'background:' + color + ';' +
        '--tx:' + tx + 'px;' +
        '--ty:' + ty + 'px;' +
        'box-shadow: 0 0 6px ' + color + ';';

      container.appendChild(particle);

      (function(p) {
        setTimeout(function() {
          if (p.parentNode) p.parentNode.removeChild(p);
        }, 800);
      })(particle);
    }
  }

  document.addEventListener('click', function(e) {
    createFirework(e.clientX, e.clientY);
  });

  // 触摸支持
  if (isMobile) {
    document.addEventListener('touchstart', function(e) {
      var touch = e.touches[0];
      createFirework(touch.clientX, touch.clientY);
    }, { passive: true });
  }
})();
</script>`;

  // 在 </body> 前注入烟花 CSS 和 JS
  return str.replace('</body>', fireworksCSS + fireworksJS + '\n</body>');
});
