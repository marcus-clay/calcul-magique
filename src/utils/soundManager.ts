class SoundManager {
  private static instance: SoundManager;
  private successAudio: HTMLAudioElement;
  private errorAudio: HTMLAudioElement;

  private constructor() {
    this.successAudio = new Audio('/sounds/success.mp3');
    this.errorAudio = new Audio('/sounds/error.mp3');
    
    // Précharger les sons
    this.successAudio.load();
    this.errorAudio.load();
    
    // Ajuster le volume
    this.successAudio.volume = 0.5;
    this.errorAudio.volume = 0.3;
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public playSuccess() {
    this.successAudio.currentTime = 0;
    this.successAudio.play().catch(() => {
      console.warn('Unable to play success sound');
    });
  }

  public playError() {
    this.errorAudio.currentTime = 0;
    this.errorAudio.play().catch(() => {
      console.warn('Unable to play error sound');
    });
  }
}

export const soundManager = SoundManager.getInstance();