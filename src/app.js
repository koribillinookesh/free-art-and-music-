class StateManager {
  constructor() {
    this.stars = parseInt(localStorage.getItem('user_stars') || '245', 10);
    this.streak = 7;
    this.level = Math.floor(this.stars / 50) + 1;
    this.updateHUD();
  }

  addStars(n) {
    this.stars += n;
    this.level = Math.floor(this.stars / 50) + 1;
    localStorage.setItem('user_stars', this.stars.toString());
    this.updateHUD();
  }

  updateHUD() {
    const starEl = document.getElementById('hud-stars');
    const lvlEl = document.getElementById('hud-lvl');
    const strkEl = document.getElementById('hud-streak');
    if (starEl) starEl.textContent = this.stars;
    if (lvlEl) lvlEl.textContent = this.level;
    if (strkEl) strkEl.textContent = this.streak;
  }

  claimChallenge() {
    this.addStars(20);
    this.showToast('🎯 Challenge completed! You earned +20 ⭐');
  }

  showToast(msg) {
    const stack = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = 'toast-msg';
    t.textContent = msg;
    stack.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  toggleDarkMode() { document.body.classList.toggle('dark-mode'); }
  toggleHighContrast() { document.body.classList.toggle('high-contrast'); }
  toggleDyslexiaFont() { document.body.classList.toggle('dyslexia-font'); }
}

const router = {
  navigate(viewId) {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.add('active');
    if (viewId === 'gallery') this.renderGallery();
  },

  renderGallery() {
    const grid = document.getElementById('gallery-cards');
    if (!grid) return;
    const items = JSON.parse(localStorage.getItem('user_gallery') || '[]');
    grid.innerHTML = items.length ? '' : '<p>No saved artworks found yet. Draw something in the Art Studio!</p>';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<img src="${item.data}" style="width:100%; border-radius:6px;" alt="Artwork"><p><small>Saved on: ${item.date}</small></p>`;
      grid.appendChild(card);
    });
  }
};

const appState = new StateManager();
let canvasEngine, audioEngine, relaxEngine;

window.addEventListener('DOMContentLoaded', () => {
  canvasEngine = new CanvasStudio('canvas-wrapper');
  audioEngine = new AudioEngine();
  audioEngine.renderKeys('instrument-mount');
  relaxEngine = new RelaxEngine();
});
