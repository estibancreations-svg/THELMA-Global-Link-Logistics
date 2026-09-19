
/**
 * T.H.E.L.M.A. Sensory Engine v4.0.0
 * Procedural Audio & Haptic Feedback Controller
 * Uses Web Audio API for asset-less sound generation.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private enabled: boolean = true;
  private ambientOsc: OscillatorNode | null = null;

  constructor() {
    // Lazy initialization is handled on first user interaction
  }

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.gain.value = 0.2; // Default system volume
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled && this.ctx) {
      this.ctx.suspend();
    } else if (enabled && this.ctx) {
      this.ctx.resume();
    }
  }

  private triggerHaptic(pattern: number | number[]) {
    if ('vibrate' in navigator && this.enabled) {
      navigator.vibrate(pattern);
    }
  }

  public playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    // High-tech mechanical click (Square wave burst)
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, t);
    filter.frequency.linearRampToValueAtTime(500, t + 0.05);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.05);

    this.triggerHaptic(5); // 5ms micro-vibration
  }

  public playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    // Subtle high freq blip
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, t);
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.02);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.02);
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    // Ascending major triad
    const t = this.ctx.currentTime;
    
    [440, 554.37, 659.25].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0, t + (i * 0.05));
        gain.gain.linearRampToValueAtTime(0.1, t + (i * 0.05) + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + (i * 0.05) + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        
        osc.start(t + (i * 0.05));
        osc.stop(t + (i * 0.05) + 0.3);
    });

    this.triggerHaptic([10, 30, 10]);
  }

  public playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    // Low buzz (Sawtooth)
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.linearRampToValueAtTime(100, t + 0.3);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);

    this.triggerHaptic([50, 50, 50]);
  }

  public playStartup() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    // Futuristic sweep
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(50, t);
    osc.frequency.exponentialRampToValueAtTime(2000, t + 1.5);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, t);
    filter.frequency.linearRampToValueAtTime(5000, t + 1.5);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.5);
    gain.gain.linearRampToValueAtTime(0, t + 2.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 2.0);
    
    this.triggerHaptic(50);
  }

  public playAlert() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx || !this.masterGain) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.setValueAtTime(1200, t + 0.2);
      osc.frequency.setValueAtTime(800, t + 0.4);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.6);
      
      this.triggerHaptic([100, 50, 100]);
  }

  public startAmbient() {
      if (!this.enabled || this.ambientOsc) return;
      this.init();
      if (!this.ctx || !this.masterGain) return;

      // Low frequency hum
      this.ambientOsc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.value = 60; // 60Hz hum
      
      gain.gain.value = 0.015; // Very subtle

      this.ambientOsc.connect(gain);
      gain.connect(this.masterGain);
      this.ambientOsc.start();
  }
}

export const soundEngine = new SoundEngine();
