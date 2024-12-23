export function getFrenchNumberPronunciation(number: number): string {
  const specialNumbers: { [key: number]: string } = {
    0: 'zéro',
    1: 'un',
    2: 'deux',
    3: 'trois',
    4: 'quatre',
    5: 'cinq',
    6: 'six',
    7: 'sept',
    8: 'huit',
    9: 'neuf',
    10: 'dix',
    11: 'onze',
    12: 'douze',
    13: 'treize',
    14: 'quatorze',
    15: 'quinze',
    16: 'seize',
    20: 'vingt',
    30: 'trente',
    40: 'quarante',
    50: 'cinquante',
    60: 'soixante',
    70: 'soixante-dix',
    80: 'quatre-vingts',
    90: 'quatre-vingt-dix'
  };

  if (number in specialNumbers) {
    return specialNumbers[number];
  }

  if (number < 100) {
    const tens = Math.floor(number / 10) * 10;
    const ones = number % 10;
    
    if (tens === 70) {
      return ones === 1 ? 'soixante et onze' : `soixante-${specialNumbers[ones + 10]}`;
    }
    
    if (tens === 90) {
      return `quatre-vingt-${specialNumbers[ones + 10]}`;
    }
    
    const tensWord = specialNumbers[tens];
    const onesWord = specialNumbers[ones];
    
    if (ones === 1 && tens !== 80) {
      return `${tensWord} et un`;
    }
    
    return `${tensWord}-${onesWord}`;
  }

  return number.toString().split('').join(' ');
}