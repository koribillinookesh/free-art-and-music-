const kidsEngine = {
  loadActivity(act) {
    const stage = document.getElementById('kids-play-stage');
    if (!stage) return;

    if (act === 'color') {
      stage.innerHTML = `
        <div class="card" style="text-align:center; margin-top:1rem;">
          <h3>🎨 Tap the matching Color: <span id="kid-target-txt" style="color:#ef4444;">RED</span></h3>
          <div style="display:flex; justify-content:center; gap:1rem; margin-top:1rem;">
            <button style="padding:2rem; background:#ef4444; border-radius:12px;" onclick="kidsEngine.validateColor('red')"></button>
            <button style="padding:2rem; background:#3b82f6; border-radius:12px;" onclick="kidsEngine.validateColor('blue')"></button>
            <button style="padding:2rem; background:#22c55e; border-radius:12px;" onclick="kidsEngine.validateColor('green')"></button>
          </div>
        </div>
      `;
    } else if (act === 'trace') {
      stage.innerHTML = `
        <div class="card" style="text-align:center; margin-top:1rem;">
          <h3>✏️ Trace the Letter: A</h3>
          <p>Draw inside the guide outline:</p>
          <canvas id="kids-trace-canvas" width="300" height="300" style="border:3px dashed #f59e0b; background:#fff;"></canvas>
          <br><button class="btn-primary" style="margin-top:10px;" onclick="appState.addStars(10); appState.showToast('Great job tracing! +10 ⭐');">Done!</button>
        </div>
      `;
    } else if (act === 'video') {
      stage.innerHTML = `
        <div class="card" style="margin-top:1rem;">
          <h3>📺 Step-by-Step Cartoon Drawing</h3>
          <div style="aspect-ratio:16/9; background:#000; display:flex; align-items:center; justify-content:center; color:#fff; border-radius:8px;">
            <p>🎬 [Kids Drawing Video: How to Draw a Cute Cartoon Lion]</p>
          </div>
        </div>
      `;
    }
  },

  validateColor(c) {
    if (c === 'red') {
      appState.showToast('🌟 Awesome! +10 Stars!');
      appState.addStars(10);
    } else {
      appState.showToast('Try again!');
    }
  }
};
