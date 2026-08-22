const speechEngine = {
  isListening: false,
  recognition: null,

  initSTT() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!window.SpeechRecognition) return;
    this.recognition = new window.SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;

    this.recognition.onresult = (e) => {
      const command = e.results[e.results.length - 1][0].transcript.trim().toLowerCase();
      this.handleVoiceCommand(command);
    };
  },

  toggleSTT() {
    if (!this.recognition) this.initSTT();
    if (!this.recognition) return alert('Speech recognition is not supported in this browser.');

    const btn = document.getElementById('stt-btn');
    if (!this.isListening) {
      this.recognition.start();
      this.isListening = true;
      btn.style.background = '#ef4444';
      appState.showToast('🎙️ Voice control active. Say "open art", "open music", or "start relax".');
    } else {
      this.recognition.stop();
      this.isListening = false;
      btn.style.background = '';
      appState.showToast('Voice control paused.');
    }
  },

  handleVoiceCommand(cmd) {
    if (cmd.includes('home')) router.navigate('home');
    else if (cmd.includes('art') || cmd.includes('draw')) router.navigate('art');
    else if (cmd.includes('music') || cmd.includes('piano')) router.navigate('music');
    else if (cmd.includes('relax')) router.navigate('relax');
    else if (cmd.includes('kids')) router.navigate('kids');
    else if (cmd.includes('gallery')) router.navigate('gallery');
  },

  readActiveView() {
    const activePanel = document.querySelector('.view-panel.active');
    if (!activePanel || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activePanel.innerText);
    window.speechSynthesis.speak(utterance);
  }
};