import { Exercise } from '../types';
import { parseExpression } from './exerciseGenerator';

export function getSolutionExplanation(exercise: Exercise): string {
  const { firstNumber, operation, result } = parseExpression(exercise.expression);
  
  switch (operation) {
    case '+':
      return `1️⃣ On part de ${firstNumber} et on veut arriver à ${result}
2️⃣ Pour trouver ce qu'il faut ajouter, on calcule la différence :
   ${result} - ${firstNumber} = ${exercise.missing}
3️⃣ On vérifie : ${firstNumber} + ${exercise.missing} = ${result}

💡 Astuce : Pour vérifier une addition, on peut faire la soustraction inverse`;

    case '-':
      return `1️⃣ On part de ${firstNumber} et on veut obtenir ${result}
2️⃣ Pour trouver ce qu'il faut soustraire, on calcule :
   ${firstNumber} - ${result} = ${exercise.missing}
3️⃣ On vérifie : ${firstNumber} - ${exercise.missing} = ${result}

💡 Astuce : La soustraction est l'opération inverse de l'addition`;

    case 'x':
      return `1️⃣ On cherche combien de fois ${firstNumber} entre dans ${result}
2️⃣ Pour trouver ce nombre, on divise :
   ${result} ÷ ${firstNumber} = ${exercise.missing}
3️⃣ On vérifie : ${firstNumber} × ${exercise.missing} = ${result}

💡 Astuce : La multiplication est une addition répétée
   ${firstNumber} × ${exercise.missing} = ${Array(exercise.missing).fill(firstNumber).join(' + ')} = ${result}`;

    case '÷':
      return `1️⃣ On cherche par quel nombre diviser ${firstNumber} pour obtenir ${result}
2️⃣ Pour le trouver, on peut multiplier ${result} par différents nombres jusqu'à obtenir ${firstNumber}
3️⃣ ${result} × ${exercise.missing} = ${firstNumber}
   Donc ${firstNumber} ÷ ${exercise.missing} = ${result}

💡 Astuce : La division est l'opération inverse de la multiplication`;

    default:
      return 'Voici la solution de l\'exercice.';
  }
}