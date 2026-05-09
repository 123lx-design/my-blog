/* Live2D 看板娘注入脚本 - 使用 L2Dwidget */
hexo.extend.filter.register('after_render:html', function (str) {
  const live2dScript = `
<script src="https://fastly.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js"></script>
<script>
L2Dwidget.init({
  "model": {
    "jsonPath": "https://fastly.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json"
  },
  "display": {
    "position": "left",
    "width": 200,
    "height": 400,
    "hOffset": 0,
    "vOffset": -20
  },
  "mobile": {
    "show": false,
    "scale": 0.5
  },
  "react": {
    "opacityDefault": 0.9,
    "opacityOnHover": 0.2
  }
});
</script>`;

  return str.replace('</body>', live2dScript + '\n</body>');
});
