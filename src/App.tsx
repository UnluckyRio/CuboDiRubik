import React, { useState, useCallback } from 'react';
import RubiksCube from './components/RubiksCube';
import Timer from './components/Timer';
import GameStats from './components/GameStats';
import './App.css';

// Interfaccia per i record del gioco
interface GameRecord {
  time: number;
  moves: number;
  date: string;
}

function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentMoves, setCurrentMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Gestisce l'aggiornamento del tempo
  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  // Gestisce l'aggiornamento del contatore mosse
  const handleMoveCount = useCallback((count: number) => {
    setCurrentMoves(count);
    
    // Avvia il timer alla prima mossa se non è già avviato
    if (count === 1 && !gameStarted) {
      setIsTimerRunning(true);
      setGameStarted(true);
      setIsSolved(false);
    }
    
    // Reset del timer se il contatore torna a 0
    if (count === 0) {
      setIsTimerRunning(false);
      setGameStarted(false);
      setResetTimer(true);
      setTimeout(() => setResetTimer(false), 100);
      setIsSolved(false);
    }
  }, [gameStarted]);

  // Gestisce quando il cubo viene risolto
  const handleSolved = useCallback(() => {
    setIsTimerRunning(false);
    setIsSolved(true);
    setGameStarted(false);
  }, []);

  // Gestisce i nuovi record
  const handleNewRecord = useCallback((record: GameRecord) => {
    console.log('Nuovo record:', record);
  }, []);

  // Reset completo del gioco
  const resetGame = useCallback(() => {
    setIsTimerRunning(false);
    setGameStarted(false);
    setCurrentMoves(0);
    setIsSolved(false);
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 100);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧩 Cubo di Rubik Virtuale</h1>
        <p className="app-description">
          Risolvi il cubo di Rubik! Clicca e trascina per ruotare la vista, 
          usa i pulsanti per mischiare, risolvere o resettare il cubo.
        </p>
      </header>

      <main className="app-main">
        <div className="game-container">
          <div className="cube-section">
            <RubiksCube 
              onSolved={handleSolved}
              onMoveCount={handleMoveCount}
            />
          </div>
          
          <div className="info-section">
            <div className="timer-section">
              <Timer 
                isRunning={isTimerRunning}
                onTimeUpdate={handleTimeUpdate}
                reset={resetTimer}
              />
            </div>
            
            <div className="stats-section">
              <GameStats 
                currentTime={currentTime}
                currentMoves={currentMoves}
                isSolved={isSolved}
                onNewRecord={handleNewRecord}
              />
            </div>
            
            <div className="game-controls">
              <button 
                onClick={resetGame}
                className="reset-game-btn"
              >
                🔄 Reset Completo
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="instructions">
          <h3>📋 Istruzioni:</h3>
          <ul>
            <li><strong>Ruota la vista:</strong> Clicca e trascina fuori dal cubo</li>
            <li><strong>Mischia:</strong> Usa il pulsante "Mischia" per mescolare il cubo</li>
            <li><strong>Risolvi:</strong> Usa il pulsante "Risolvi" per la soluzione automatica</li>
            <li><strong>Reset:</strong> Riporta il cubo allo stato iniziale</li>
            <li><strong>Timer:</strong> Si avvia automaticamente alla prima mossa</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
