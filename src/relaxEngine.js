class RelaxEngine {
  constructor() {
    this.audioContext = null;
    this.nodes = {};
  }

  init() {
    if (!this.audioContext) this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  setAmbient(type, volume) {
    this.init();
    const v = parseFloat(volume);
    if (!this.nodes[type]) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = type === 'rain' ? 'sine' : type === 'ocean' ? 'triangle' : 'sawtooth';
      osc.frequency.value = type === 'rain' ? 120 : type === 'ocean' ? 80 : 200;
      gain.gain.value = v;
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();
      this.nodes[type] = { osc, gain };
    } else {
      this.nodes[type].gain.gain.setValueAtTime(v, this.audioContext.currentTime);
    }
  }

  startSession(minutes) {
    const orb = document.getElementById('breath-orb');
    const label = document.getElementById('breath-label');
    let cycle = 0;
    appState.showToast(`Starting ${minutes}-minute relaxation session.`);

    const interval = setInterval(() => {
      cycle = (cycle + 1) % 4;
      if (cycle === 0) {
        orb.classList.add('grow');
        label.textContent = 'Breathe In... (4s)';
      } else if (cycle === 1) {
        label.textContent = 'Hold breath... (4s)';
      } else if (cycle === 2) {
        orb.classList.remove('grow');
        label.textContent = 'Breathe Out gently... (4s)';
      } else {
        label.textContent = 'Hold empty... (4s)';
      }
    }, 4000);
  }
}
