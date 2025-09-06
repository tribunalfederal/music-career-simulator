import React from 'react';
import { GameProvider, useGameState, SCREENS } from './GameContext';
import TitleScreen from './screens/TitleScreen';
import CharacterCreation from './screens/CharacterCreation';
import GameScreen from './screens/GameScreen';

function GameRouter() {
  const gameState = useGameState();
  
  switch (gameState.currentScreen) {
    case SCREENS.TITLE:
      return <TitleScreen />;
    case SCREENS.CHARACTER_CREATION:
      return <CharacterCreation />;
    case SCREENS.GAME:
      return <GameScreen />;
    default:
      return <TitleScreen />;
  }
}

function App() {
  return (
    <GameProvider>
      <div className="App">
        <GameRouter />
      </div>
    </GameProvider>
  );
}

export default App;