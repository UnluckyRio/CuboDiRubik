/**
 * Logica del Cubo di Rubik
 * Questo file contiene tutte le funzioni per gestire lo stato del cubo,
 * le rotazioni delle facce e gli algoritmi di risoluzione
 */

// Definizione dei colori standard del cubo di Rubik
export const CUBE_COLORS = {
  WHITE: '#ffffff',
  RED: '#ff0000',
  BLUE: '#0000ff',
  GREEN: '#00ff00',
  YELLOW: '#ffff00',
  ORANGE: '#ff8000'
} as const;

// Tipo per i colori del cubo
export type CubeColor = typeof CUBE_COLORS[keyof typeof CUBE_COLORS];

// Interfaccia per una faccia del cubo (3x3)
export interface Face {
  colors: CubeColor[][];
}

// Interfaccia per lo stato completo del cubo
export interface CubeState {
  front: Face;
  back: Face;
  left: Face;
  right: Face;
  top: Face;
  bottom: Face;
}

// Enum per le direzioni di rotazione
export enum RotationDirection {
  CLOCKWISE = 'CW',
  COUNTERCLOCKWISE = 'CCW'
}

// Enum per le facce del cubo
export enum CubeFace {
  FRONT = 'front',
  BACK = 'back',
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom'
}

/**
 * Crea lo stato iniziale risolto del cubo
 * @returns Lo stato del cubo completamente risolto
 */
export function createSolvedCube(): CubeState {
  const createFace = (color: CubeColor): Face => ({
    colors: Array(3).fill(null).map(() => Array(3).fill(color))
  });

  return {
    front: createFace(CUBE_COLORS.RED),
    back: createFace(CUBE_COLORS.ORANGE),
    left: createFace(CUBE_COLORS.GREEN),
    right: createFace(CUBE_COLORS.BLUE),
    top: createFace(CUBE_COLORS.WHITE),
    bottom: createFace(CUBE_COLORS.YELLOW)
  };
}

/**
 * Ruota una matrice 3x3 di 90 gradi in senso orario
 * @param matrix La matrice da ruotare
 * @returns La matrice ruotata
 */
function rotateMatrix90Clockwise<T>(matrix: T[][]): T[][] {
  const n = matrix.length;
  const rotated: T[][] = Array(n).fill(null).map(() => Array(n).fill(null));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[j][n - 1 - i] = matrix[i][j];
    }
  }
  
  return rotated;
}

/**
 * Ruota una matrice 3x3 di 90 gradi in senso antiorario
 * @param matrix La matrice da ruotare
 * @returns La matrice ruotata
 */
function rotateMatrix90CounterClockwise<T>(matrix: T[][]): T[][] {
  const n = matrix.length;
  const rotated: T[][] = Array(n).fill(null).map(() => Array(n).fill(null));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[n - 1 - j][i] = matrix[i][j];
    }
  }
  
  return rotated;
}

/**
 * Ruota la faccia frontale del cubo
 * @param cube Lo stato attuale del cubo
 * @param direction La direzione di rotazione
 * @returns Il nuovo stato del cubo
 */
export function rotateFrontFace(cube: CubeState, direction: RotationDirection): CubeState {
  const newCube = JSON.parse(JSON.stringify(cube)) as CubeState;
  
  // Ruota la faccia frontale stessa
  if (direction === RotationDirection.CLOCKWISE) {
    newCube.front.colors = rotateMatrix90Clockwise(cube.front.colors);
  } else {
    newCube.front.colors = rotateMatrix90CounterClockwise(cube.front.colors);
  }
  
  // Salva i bordi che verranno spostati
  const topRow = cube.top.colors[2].slice();
  const rightCol = [cube.right.colors[0][0], cube.right.colors[1][0], cube.right.colors[2][0]];
  const bottomRow = cube.bottom.colors[0].slice();
  const leftCol = [cube.left.colors[0][2], cube.left.colors[1][2], cube.left.colors[2][2]];
  
  if (direction === RotationDirection.CLOCKWISE) {
    // Sposta i bordi in senso orario
    newCube.top.colors[2] = leftCol.reverse();
    newCube.right.colors[0][0] = topRow[0];
    newCube.right.colors[1][0] = topRow[1];
    newCube.right.colors[2][0] = topRow[2];
    newCube.bottom.colors[0] = rightCol.reverse();
    newCube.left.colors[0][2] = bottomRow[0];
    newCube.left.colors[1][2] = bottomRow[1];
    newCube.left.colors[2][2] = bottomRow[2];
  } else {
    // Sposta i bordi in senso antiorario
    newCube.top.colors[2] = rightCol;
    newCube.right.colors[0][0] = bottomRow[2];
    newCube.right.colors[1][0] = bottomRow[1];
    newCube.right.colors[2][0] = bottomRow[0];
    newCube.bottom.colors[0] = leftCol;
    newCube.left.colors[0][2] = topRow[2];
    newCube.left.colors[1][2] = topRow[1];
    newCube.left.colors[2][2] = topRow[0];
  }
  
  return newCube;
}

/**
 * Ruota la faccia superiore del cubo
 * @param cube Lo stato attuale del cubo
 * @param direction La direzione di rotazione
 * @returns Il nuovo stato del cubo
 */
export function rotateTopFace(cube: CubeState, direction: RotationDirection): CubeState {
  const newCube = JSON.parse(JSON.stringify(cube)) as CubeState;
  
  // Ruota la faccia superiore stessa
  if (direction === RotationDirection.CLOCKWISE) {
    newCube.top.colors = rotateMatrix90Clockwise(cube.top.colors);
  } else {
    newCube.top.colors = rotateMatrix90CounterClockwise(cube.top.colors);
  }
  
  // Salva le righe superiori delle facce laterali
  const frontRow = cube.front.colors[0].slice();
  const rightRow = cube.right.colors[0].slice();
  const backRow = cube.back.colors[0].slice();
  const leftRow = cube.left.colors[0].slice();
  
  if (direction === RotationDirection.CLOCKWISE) {
    newCube.front.colors[0] = leftRow;
    newCube.right.colors[0] = frontRow;
    newCube.back.colors[0] = rightRow;
    newCube.left.colors[0] = backRow;
  } else {
    newCube.front.colors[0] = rightRow;
    newCube.right.colors[0] = backRow;
    newCube.back.colors[0] = leftRow;
    newCube.left.colors[0] = frontRow;
  }
  
  return newCube;
}

/**
 * Ruota la faccia destra del cubo
 * @param cube Lo stato attuale del cubo
 * @param direction La direzione di rotazione
 * @returns Il nuovo stato del cubo
 */
export function rotateRightFace(cube: CubeState, direction: RotationDirection): CubeState {
  const newCube = JSON.parse(JSON.stringify(cube)) as CubeState;
  
  // Ruota la faccia destra stessa
  if (direction === RotationDirection.CLOCKWISE) {
    newCube.right.colors = rotateMatrix90Clockwise(cube.right.colors);
  } else {
    newCube.right.colors = rotateMatrix90CounterClockwise(cube.right.colors);
  }
  
  // Salva le colonne che verranno spostate
  const frontCol = [cube.front.colors[0][2], cube.front.colors[1][2], cube.front.colors[2][2]];
  const topCol = [cube.top.colors[0][2], cube.top.colors[1][2], cube.top.colors[2][2]];
  const backCol = [cube.back.colors[0][0], cube.back.colors[1][0], cube.back.colors[2][0]];
  const bottomCol = [cube.bottom.colors[0][2], cube.bottom.colors[1][2], cube.bottom.colors[2][2]];
  
  if (direction === RotationDirection.CLOCKWISE) {
    newCube.front.colors[0][2] = bottomCol[0];
    newCube.front.colors[1][2] = bottomCol[1];
    newCube.front.colors[2][2] = bottomCol[2];
    
    newCube.top.colors[0][2] = frontCol[0];
    newCube.top.colors[1][2] = frontCol[1];
    newCube.top.colors[2][2] = frontCol[2];
    
    newCube.back.colors[0][0] = topCol[2];
    newCube.back.colors[1][0] = topCol[1];
    newCube.back.colors[2][0] = topCol[0];
    
    newCube.bottom.colors[0][2] = backCol[2];
    newCube.bottom.colors[1][2] = backCol[1];
    newCube.bottom.colors[2][2] = backCol[0];
  } else {
    newCube.front.colors[0][2] = topCol[0];
    newCube.front.colors[1][2] = topCol[1];
    newCube.front.colors[2][2] = topCol[2];
    
    newCube.top.colors[0][2] = backCol[2];
    newCube.top.colors[1][2] = backCol[1];
    newCube.top.colors[2][2] = backCol[0];
    
    newCube.back.colors[0][0] = bottomCol[2];
    newCube.back.colors[1][0] = bottomCol[1];
    newCube.back.colors[2][0] = bottomCol[0];
    
    newCube.bottom.colors[0][2] = frontCol[0];
    newCube.bottom.colors[1][2] = frontCol[1];
    newCube.bottom.colors[2][2] = frontCol[2];
  }
  
  return newCube;
}

/**
 * Verifica se il cubo è completamente risolto
 * @param cube Lo stato del cubo da verificare
 * @returns true se il cubo è risolto, false altrimenti
 */
export function isCubeSolved(cube: CubeState): boolean {
  const faces = Object.values(cube) as Face[];
  
  return faces.every(face => {
    const firstColor = face.colors[0][0];
    return face.colors.every(row => 
      row.every(color => color === firstColor)
    );
  });
}

/**
 * Genera una sequenza di mosse casuali per mescolare il cubo
 * @param numMoves Il numero di mosse da generare
 * @returns Un array di mosse casuali
 */
export function generateScrambleSequence(numMoves: number = 25): string[] {
  const moves = ['F', 'B', 'R', 'L', 'U', 'D'];
  const modifiers = ['', '\'', '2'];
  const sequence: string[] = [];
  
  let lastMove = '';
  
  for (let i = 0; i < numMoves; i++) {
    let move: string;
    
    // Evita di ripetere la stessa faccia consecutivamente
    do {
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      const randomModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      move = randomMove + randomModifier;
    } while (move.charAt(0) === lastMove.charAt(0));
    
    sequence.push(move);
    lastMove = move;
  }
  
  return sequence;
}

/**
 * Applica una mossa al cubo basata sulla notazione standard
 * @param cube Lo stato attuale del cubo
 * @param move La mossa da applicare (es. 'F', 'R\'', 'U2')
 * @returns Il nuovo stato del cubo
 */
export function applyMove(cube: CubeState, move: string): CubeState {
  const face = move.charAt(0);
  const modifier = move.slice(1);
  
  let newCube = cube;
  let rotations = 1;
  let direction = RotationDirection.CLOCKWISE;
  
  // Determina il numero di rotazioni e la direzione
  if (modifier === '\'') {
    direction = RotationDirection.COUNTERCLOCKWISE;
  } else if (modifier === '2') {
    rotations = 2;
  }
  
  // Applica le rotazioni
  for (let i = 0; i < rotations; i++) {
    switch (face) {
      case 'F':
        newCube = rotateFrontFace(newCube, direction);
        break;
      case 'U':
        newCube = rotateTopFace(newCube, direction);
        break;
      case 'R':
        newCube = rotateRightFace(newCube, direction);
        break;
      // Implementa altre facce se necessario
      default:
        console.warn(`Mossa non implementata: ${face}`);
    }
  }
  
  return newCube;
}

/**
 * Algoritmo semplificato per risolvere il cubo (implementazione base)
 * Questo è un algoritmo molto semplificato per scopi dimostrativi
 * @param cube Lo stato attuale del cubo
 * @returns Una sequenza di mosse per risolvere il cubo
 */
export function getSolvingSequence(cube: CubeState): string[] {
  // Questo è un algoritmo molto semplificato
  // In una implementazione reale, si userebbe un algoritmo come CFOP, Roux, o ZZ
  
  if (isCubeSolved(cube)) {
    return [];
  }
  
  // Sequenza di esempio che funziona per alcuni casi semplici
  const basicSolvingMoves = [
    'R', 'U', 'R\'', 'U\'',
    'R', 'U', 'R\'', 'U\'',
    'F', 'R', 'U', 'R\'', 'U\'', 'F\'',
    'R', 'U', 'R\'', 'U', 'R', 'U2', 'R\''
  ];
  
  return basicSolvingMoves;
}

/**
 * Applica una sequenza di mosse al cubo
 * @param cube Lo stato iniziale del cubo
 * @param moves Array di mosse da applicare
 * @returns Il nuovo stato del cubo dopo aver applicato tutte le mosse
 */
export function applyMoveSequence(cube: CubeState, moves: string[]): CubeState {
  return moves.reduce((currentCube, move) => applyMove(currentCube, move), cube);
}

/**
 * Conta il numero di pezzi nella posizione corretta
 * @param cube Lo stato del cubo da analizzare
 * @returns Il numero di pezzi correttamente posizionati
 */
export function countCorrectPieces(cube: CubeState): number {
  const solvedCube = createSolvedCube();
  let correctPieces = 0;
  
  Object.keys(cube).forEach(faceKey => {
    const face = cube[faceKey as keyof CubeState];
    const solvedFace = solvedCube[faceKey as keyof CubeState];
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (face.colors[i][j] === solvedFace.colors[i][j]) {
          correctPieces++;
        }
      }
    }
  });
  
  return correctPieces;
}