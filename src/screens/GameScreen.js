import React, { useState } from 'react';
import './GameScreen.css';

const GameScreen = ({ gameState, player, onGameStateChange }) => {
  const [selectedAction, setSelectedAction] = useState(null);

  const availableActions = [
    { id: 'compose', name: 'Compor Música', energy: 2 },
    { id: 'practice', name: 'Praticar', energy: 1 },
    { id: 'perform', name: 'Fazer Show', energy: 3 },
    { id: 'record', name: 'Gravar Música', energy: 2 },
    { id: 'promote', name: 'Marketing', energy: 1 }
  ];

  const handleAction = (action) => {
    if (gameState.energy >= action.energy) {
      setSelectedAction(action);
      
      // Basic action logic
      const newGameState = { ...gameState };
      newGameState.energy -= action.energy;
      
      switch (action.id) {
        case 'practice':
          // Increase singing skill
          player.updateStats({ singing: player.profile.stats.singing + 1 });
          break;
        case 'compose':
          // Increase songwriting skill
          player.updateStats({ songwriting: player.profile.stats.songwriting + 1 });
          break;
        case 'perform':
          // Gain fans and money
          const fansGained = Math.floor(Math.random() * 50) + 10;
          const moneyEarned = Math.floor(Math.random() * 200) + 50;
          newGameState.fans += fansGained;
          newGameState.money += moneyEarned;
          player.updateStats({ performance: player.profile.stats.performance + 1 });
          break;
        case 'record':
          // Increase production skill and spend money
          player.updateStats({ production: player.profile.stats.production + 1 });
          newGameState.money -= 100;
          break;
        case 'promote':
          // Spend money to gain fans
          const cost = 150;
          if (newGameState.money >= cost) {
            newGameState.money -= cost;
            newGameState.fans += Math.floor(Math.random() * 30) + 20;
          }
          break;
        default:
          break;
      }
      
      // End turn if no energy left
      if (newGameState.energy <= 0) {
        newGameState.currentTurn += 1;
        newGameState.energy = 4;
        // Advance date by one day
        const newDate = new Date(newGameState.date);
        newDate.setDate(newDate.getDate() + 1);
        newGameState.date = newDate;
      }
      
      onGameStateChange(newGameState);
    }
  };

  return (
    <div className="game-screen">
      <div className="status-bar">
        <div className="player-info">
          <h3>{player.profile.artistName || 'Artista'}</h3>
          <p>Fãs: {gameState.fans}</p>
          <p>Dinheiro: R$ {gameState.money}</p>
          <p>Energia: {gameState.energy}/4</p>
        </div>
        <div className="date-info">
          <p>Turno: {gameState.currentTurn}/4</p>
          <p>Data: {gameState.date.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="main-area">
        <div className="actions-panel">
          <h3>Ações Disponíveis</h3>
          <div className="action-buttons">
            {availableActions.map(action => (
              <button
                key={action.id}
                onClick={() => handleAction(action)}
                className={`action-button ${selectedAction?.id === action.id ? 'selected' : ''}`}
                disabled={gameState.energy < action.energy}
                style={{
                  opacity: gameState.energy < action.energy ? 0.5 : 1,
                  cursor: gameState.energy < action.energy ? 'not-allowed' : 'pointer'
                }}
              >
                {action.name}
                <span className="energy-cost">(-{action.energy} energia)</span>
              </button>
            ))}
          </div>
        </div>

        <div className="content-area">
          {selectedAction ? (
            <div className="action-details">
              <h3>{selectedAction.name}</h3>
              <p>Você selecionou: {selectedAction.name}</p>
              <p>Custo de energia: {selectedAction.energy}</p>
              {selectedAction.id === 'practice' && <p>Melhora suas habilidades vocais</p>}
              {selectedAction.id === 'compose' && <p>Melhora suas habilidades de composição</p>}
              {selectedAction.id === 'perform' && <p>Ganha fãs e dinheiro</p>}
              {selectedAction.id === 'record' && <p>Melhora produção musical</p>}
              {selectedAction.id === 'promote' && <p>Gasta dinheiro para ganhar fãs</p>}
            </div>
          ) : (
            <div className="welcome-message">
              <h3>Bem-vindo ao seu estúdio!</h3>
              <p>Selecione uma ação para começar.</p>
            </div>
          )}
        </div>
      </div>

      <div className="player-stats">
        <h3>Estatísticas</h3>
        <div className="stats-grid">
          <div>Vocal: {player.profile.stats.singing}</div>
          <div>Performance: {player.profile.stats.performance}</div>
          <div>Composição: {player.profile.stats.songwriting}</div>
          <div>Produção: {player.profile.stats.production}</div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;