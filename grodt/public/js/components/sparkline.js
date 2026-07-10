// Mini-Kursverlauf als Canvas (Watchlist-Zeilen).

export function drawSparkline(canvas, closes, { up = '#30a46c', down = '#e5484d' } = {}) {
  if (!canvas || !closes || closes.length < 2) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || 64;
  const h = canvas.clientHeight || 28;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const span = max - min || 1;
  const stepX = w / (closes.length - 1);
  const y = (v) => h - 2 - ((v - min) / span) * (h - 4);

  const rising = closes[closes.length - 1] >= closes[0];
  const color = rising ? up : down;

  ctx.beginPath();
  closes.forEach((v, i) => {
    const x = i * stepX;
    if (i === 0) ctx.moveTo(x, y(v));
    else ctx.lineTo(x, y(v));
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // dezente Fläche darunter
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = color + '22';
  ctx.fill();
}
