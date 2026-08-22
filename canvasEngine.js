class CanvasStudio {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.layers = [];
    this.activeLayerIdx = 0;
    this.tool = 'brush';
    this.isDrawing = false;
    this.history = [];
    this.historyStep = -1;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.container.innerHTML = '';
    this.addLayer();
  }

  addLayer() {
    const canvas = document.createElement('canvas');
    canvas.className = 'canvas-layer';
    canvas.width = 900;
    canvas.height = 520;
    const ctx = canvas.getContext('2d');
    this.container.appendChild(canvas);
    this.layers.push({ canvas, ctx });
    this.activeLayerIdx = this.layers.length - 1;
    this.bindEvents(canvas);
    this.pushHistory();
  }

  bindEvents(canvas) {
    let startX = 0, startY = 0;

    const start = (e) => {
      this.isDrawing = true;
      const coords = this.getCoords(e, canvas);
      startX = coords.x;
      startY = coords.y;
      const ctx = this.layers[this.activeLayerIdx].ctx;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      const coords = this.getCoords(e, canvas);
      const ctx = this.layers[this.activeLayerIdx].ctx;
      const color = document.getElementById('art-color').value;
      const size = document.getElementById('art-size').value;
      const opacity = document.getElementById('art-opacity').value;

      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.globalAlpha = opacity;

      if (this.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      } else if (this.tool === 'brush' || this.tool === 'pencil' || this.tool === 'watercolor') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = color;
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      }
    };

    const stop = (e) => {
      if (!this.isDrawing) return;
      this.isDrawing = false;
      const ctx = this.layers[this.activeLayerIdx].ctx;
      const coords = this.getCoords(e, canvas);
      const color = document.getElementById('art-color').value;

      if (this.tool === 'rectangle') {
        ctx.fillStyle = color;
        ctx.fillRect(startX, startY, coords.x - startX, coords.y - startY);
      } else if (this.tool === 'circle') {
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(coords.x - startX, 2) + Math.pow(coords.y - startY, 2));
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }
      this.pushHistory();
      appState.addStars(2);
    };

    canvas.addEventListener('pointerdown', start);
    canvas.addEventListener('pointermove', draw);
    window.addEventListener('pointerup', stop);
  }

  getCoords(e, canvas) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (canvas.width / r.width),
      y: (e.clientY - r.top) * (canvas.height / r.height)
    };
  }

  setTool(t) { this.tool = t; }

  pushHistory() {
    const active = this.layers[this.activeLayerIdx];
    if (!active) return;
    this.historyStep++;
    this.history = this.history.slice(0, this.historyStep);
    this.history.push(active.ctx.getImageData(0, 0, active.canvas.width, active.canvas.height));
  }

  undo() {
    if (this.historyStep > 0) {
      this.historyStep--;
      const active = this.layers[this.activeLayerIdx];
      active.ctx.putImageData(this.history[this.historyStep], 0, 0);
    }
  }

  redo() {
    if (this.historyStep < this.history.length - 1) {
      this.historyStep++;
      const active = this.layers[this.activeLayerIdx];
      active.ctx.putImageData(this.history[this.historyStep], 0, 0);
    }
  }

  exportPNG() {
    const comp = document.createElement('canvas');
    comp.width = 900; comp.height = 520;
    const ctx = comp.getContext('2d');
    this.layers.forEach(l => ctx.drawImage(l.canvas, 0, 0));
    const link = document.createElement('a');
    link.download = 'my-art-creation.png';
    link.href = comp.toDataURL('image/png');
    link.click();
    appState.showToast('Artwork exported successfully!');
  }

  saveToGallery() {
    const comp = document.createElement('canvas');
    comp.width = 900; comp.height = 520;
    const ctx = comp.getContext('2d');
    this.layers.forEach(l => ctx.drawImage(l.canvas, 0, 0));
    const dataUrl = comp.toDataURL('image/png');
    
    let gallery = JSON.parse(localStorage.getItem('user_gallery') || '[]');
    gallery.push({ id: Date.now(), type: 'art', data: dataUrl, date: new Date().toLocaleDateString() });
    localStorage.setItem('user_gallery', JSON.stringify(gallery));
    appState.showToast('Saved to your Personal Gallery! (+10 ⭐)');
    appState.addStars(10);
  }
}