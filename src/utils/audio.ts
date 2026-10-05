/**
 * Procedural Web Audio API Ambient Underwater Sound Generator
 * Generates an organic, deep hydro-acoustic underwater atmosphere
 * with soft ocean pressure hum, distant sub-bass resonance, and subtle surface swells.
 */

class HydroAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoNode: OscillatorNode | null = null;
  private isAudioRunning = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
  }

  public toggle(): boolean {
    if (this.isAudioRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 2.5);
      this.masterGain.connect(this.ctx.destination);

      // Low-pass filter simulating underwater dampening
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(220, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(2.5, this.ctx.currentTime);

      // Sub-bass ocean pressure resonance (55Hz)
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.subOsc.connect(subGain);
      subGain.connect(this.filterNode);

      // Procedural Brownian/Pink water noise buffer
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      // LFO for slow tidal swell
      this.lfoNode = this.ctx.createOscillator();
      this.lfoNode.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec swell cycle
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(80, this.ctx.currentTime);
      this.lfoNode.connect(lfoGain);
      lfoGain.connect(this.filterNode.frequency);

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.masterGain);

      this.noiseNode.start();
      this.subOsc.start();
      this.lfoNode.start();

      this.isAudioRunning = true;
    } catch (e) {
      console.warn('Audio autoplay prevented or unsupported:', e);
    }
  }

  public stop() {
    if (!this.isAudioRunning || !this.ctx || !this.masterGain) return;
    try {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        try {
          this.noiseNode?.stop();
          this.subOsc?.stop();
          this.lfoNode?.stop();
          this.noiseNode?.disconnect();
          this.subOsc?.disconnect();
          this.filterNode?.disconnect();
        } catch {
          // ignore cleanup errors
        }
        this.isAudioRunning = false;
      }, 1300);
    } catch {
      this.isAudioRunning = false;
    }
  }

  public get running(): boolean {
    return this.isAudioRunning;
  }
}

export const hydroAudio = new HydroAudioEngine();
