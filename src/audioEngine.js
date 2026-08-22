class AudioEngine {
  constructor() {
    this.ctx = null;
    this.instrument = 'piano';
    this.isRecording = false;
    this.recordedEvents = [];
    this.recStartTime = 0;
    this.metroInterval = null;
    this.notes = [
      { name: 'Sa / C4', freq: 261.63, key: 'a' },
      { name: 'Re / D4', freq: 293.66, key: 's' },
      { name: 'Ga / E4', freq: 329.63, key: 'd' },
      { name: 'Ma / F4', freq: 349.23, key: 'f' },
      { name: 'Pa / G4', freq: 392.00, key: 'g' },
      { name: 'Dha / A4', freq: 440.00, key: 'h' },
      { name: 'Ni / B4', freq: 493.88, key: 'j' },
      { name: 'Sa^ / C5', freq: 523.25, key: 'k' }
    ];
  }

  init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  renderKeys(mountId) {
    const el = document.getElementById(mountId);
    if (!el) return;
    el.innerHTML = '';
    this.notes.forEach(note => {
      const k = document.createElement('div');
      k.className = 'key-tile';
      k.innerHTML = `<span>${note.name}<br><small>[${note.key.toUpperCase()}]</small></span>`;
      k.onpointerdown = () => this.playTone(note.freq);
      el.appendChild(k);
    });

    window.addEventListener('keydown', (e) => {
      const f = this.notes.find(n => n.key === e.key.toLowerCase());
      if (f && !e.repeat) this.playTone(f.freq);
    });
  }

  setInstrument(inst) { this.instrument = inst; }

  playTone(freq) {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (this.instrument === 'piano') osc.type = 'triangle';
    else if (this.instrument === 'flute') osc.type = 'sine';
    else if (this.instrument === 'veena' || this.instrument === 'guitar') osc.type = 'sawtooth';
    else osc.type = 'square';

    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 1.2);

    if (this.isRecording) {
      this.recordedEvents.push({ freq, time: Date.now() - this.recStartTime });
    }
    appState.addStars(1);
  }

  toggleRecording() {
    this.isRecording = !this.isRecording;
    const btn = document.getElementById('rec-btn');
    if (this.isRecording) {
      this.recordedEvents = [];
      this.recStartTime = Date.now();
      btn.textContent = '⏹️ Stop';
      btn.style.background = '#ef4444';
      appState.showToast('Audio Recording started.');
    } else {
      btn.textContent = '🔴 Record';
      btn.style.background = '';
      appState.showToast('Recording saved to session memory.');
    }
  }

  playback() {
    if (!this.recordedEvents.length) return appState.showToast('No recorded track available.');
    this.recordedEvents.forEach(item => {
      setTimeout(() => this.playTone(item.freq), item.time);
    });
  }

  toggleMetronome() {
    const btn = document.getElementById('metro-btn');
    if (this.metroInterval) {
      clearInterval(this.metroInterval);
      this.metroInterval = null;
      btn.style.background = '';
    } else {
      const bpm = parseInt(document.getElementById('tempo-slider').value, 10) || 120;
      const intervalMs = (60 / bpm) * 1000;
      this.metroInterval = setInterval(() => {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.value = 1000;
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      }, intervalMs);
      btn.style.background = '#22c55e';
    }
  }
}
