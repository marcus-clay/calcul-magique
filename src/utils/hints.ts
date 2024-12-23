import { Exercise } from '../types';
import { parseExpression } from './exerciseGenerator';

export const getHint = (exercise: Exercise): string => {
  const { firstNumber, operation, result } = parseExpression(exercise.expression);
  
  switch (operation) {
    case '+':
      return `Pour trouver le nombre manquant, suivons ces étapes :

1. On cherche quel nombre ajouté à ${firstNumber} donne ${result}
2. Pour le trouver, on peut faire : ${result} - ${firstNumber}

Par exemple :
Si on ajoute 5 à ${firstNumber}, on obtient ${firstNumber + 5}
Si on ajoute 10 à ${firstNumber}, on obtient ${firstNumber + 10}

Continue à essayer jusqu'à trouver le bon nombre !`;

    case '-':
      return `Pour trouver le nombre manquant, suivons ces étapes :

1. On cherche quel nombre soustrait de ${firstNumber} donne ${result}
2. On peut compter de ${result} jusqu'à ${firstNumber}

Par exemple :
${firstNumber} - 5 = ${firstNumber - 5}
${firstNumber} - 10 = ${firstNumber - 10}

La différence entre ${firstNumber} et ${result} sera ta réponse !`;

    case 'x':
      return `Pour trouver le nombre manquant, suivons ces étapes :

1. On cherche quel nombre multiplié par ${firstNumber} donne ${result}
2. Essayons quelques multiplications :

${firstNumber} × 2 = ${firstNumber * 2}
${firstNumber} × 3 = ${firstNumber * 3}
${firstNumber} × 4 = ${firstNumber * 4}

Continue jusqu'à trouver le nombre qui donne ${result} !`;

    case '÷':
      return `Pour trouver le nombre manquant, suivons ces étapes :

1. On cherche par quel nombre diviser ${firstNumber} pour obtenir ${result}
2. On peut aussi se demander : combien de fois ${result} rentre dans ${firstNumber} ?

Essayons :
${firstNumber} ÷ 2 = ${firstNumber / 2}
${firstNumber} ÷ 3 = ${(firstNumber / 3).toFixed(1)}
${firstNumber} ÷ 4 = ${(firstNumber / 4).toFixed(1)}

La division ${firstNumber} ÷ ? doit donner ${result}`;

    default:
      return 'Prends ton temps pour réfléchir à l\'opération.';
  }
};