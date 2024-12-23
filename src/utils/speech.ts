import { getFrenchNumberPronunciation } from './numberPronunciation';

class SpeechManager {
  private static instance: SpeechManager;
  private synthesis: SpeechSynthesisUtterance;
  private voices: SpeechSynthesisVoice[] = [];

  private constructor() {
    this.synthesis = new SpeechSynthesisUtterance();
    this.synthesis.lang = 'fr-FR';
    this.synthesis.rate = 1.15;
    this.synthesis.pitch = 1.3;
    this.synthesis.volume = 1;

    window.speechSynthesis.onvoiceschanged = () => {
      this.voices = window.speechSynthesis.getVoices();
      const preferredVoices = [
        'Google français',
        'Amélie',
        'Thomas',
        'fr-FR-Standard-A',
        'fr-FR-Standard-B'
      ];
      
      const frenchVoice = this.voices.find(voice => 
        voice.lang.includes('fr') && 
        preferredVoices.some(name => 
          voice.name.toLowerCase().includes(name.toLowerCase())
        )
      );

      if (frenchVoice) {
        this.synthesis.voice = frenchVoice;
      }
    };
  }

  public static getInstance(): SpeechManager {
    if (!SpeechManager.instance) {
      SpeechManager.instance = new SpeechManager();
    }
    return SpeechManager.instance;
  }

  private formatOperationText(text: string): string {
    return text.replace(/\d+/g, (match) => {
      const number = parseInt(match, 10);
      return getFrenchNumberPronunciation(number);
    })
    .replace(/\+/g, ' plus ')
    .replace(/-/g, ' moins ')
    .replace(/\*/g, ' fois ')
    .replace(/\//g, ' divisé par ')
    .replace(/=/g, ' égale ');
  }

  public speak(text: string) {
    window.speechSynthesis.cancel();
    const processedText = this.formatOperationText(text);
    this.synthesis.text = processedText
      .replace(/\./g, '... ')
      .replace(/,/g, '... ')
      .replace(/:/g, '... ');
    
    window.speechSynthesis.speak(this.synthesis);
  }

  public readOperation(operation: string, firstNumber: number, result: number) {
    const text = `Quel nombre... ${this.formatOperationText(operation)}... ${getFrenchNumberPronunciation(firstNumber)}... donne ${getFrenchNumberPronunciation(result)}?`;
    this.speak(text);
  }

  public sayCorrect() {
    const phrases = [
      'Bravo! C\'est la bonne réponse!',
      'Excellent travail! Continue comme ça!',
      'Super! Tu as trouvé!',
      'Parfait! Tu progresses très bien!'
    ];
    this.speak(phrases[Math.floor(Math.random() * phrases.length)]);
  }

  public sayIncorrect() {
    const phrases = [
      'Ce n\'est pas tout à fait ça. Essaie encore!',
      'Presque! Réfléchis encore un peu.',
      'Continue d\'essayer, tu vas y arriver!',
      'N\'abandonne pas, tu peux le faire!'
    ];
    this.speak(phrases[Math.floor(Math.random() * phrases.length)]);
  }
}

export const speechManager = SpeechManager.getInstance();