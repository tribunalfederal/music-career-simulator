import React, { useState } from 'react';
import CharacterCreation from './screens/CharacterCreation';
import GameScreen from './screens/GameScreen';
import Player from './game/Player';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState('character-creation'); // 'character-creation' | 'playing'
  const [player, setPlayer] = useState(null);
  const [currentGame, setCurrentGame] = useState({
    fans: 0,
    money: 1000,
    currentTurn: 1,
    date: new Date(),
    energy: 4
  });

  const handleCreateCharacter = (characterData) => {
    const newPlayer = new Player();
    newPlayer.profile.name = characterData.name;
    newPlayer.profile.artistName = characterData.artistName;
    newPlayer.profile.age = characterData.age;
    newPlayer.profile.appearance = characterData.appearance;
    
    setPlayer(newPlayer);
    setGameState('playing');
  };

  const resetGame = () => {
    setGameState('character-creation');
    setPlayer(null);
    setCurrentGame({
      fans: 0,
      money: 1000,
      currentTurn: 1,
      date: new Date(),
      energy: 4
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Music Career Simulator</h1>
        {player && (
          <button className="reset-button" onClick={resetGame}>
            Novo Jogo
          </button>
        )}
      </header>
      
      <main className="app-main">
        {gameState === 'character-creation' ? (
          <CharacterCreation onCreateCharacter={handleCreateCharacter} />
        ) : (
          <GameScreen 
            gameState={currentGame} 
            player={player} 
            onGameStateChange={setCurrentGame}
          />
        )}
      </main>
    </div>
  );
};

export default App;