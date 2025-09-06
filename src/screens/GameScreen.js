import React, { useState } from 'react';
import './GameScreen.css';

const GameScreen = ({ gameState, player }) => {
  const [selectedAction, setSelectedAction] = useState(null);

  const availableActions = [
    { id: 'compose', name: 'Compor Música', energy: 2 },
    { id: 'practice', name: 'Praticar', energy: 1 },
    { id: 'perform', name: 'Fazer Show', energy: 3 },
    { id: 'record', name: 'Gravar Música', energy: 2 },
    { id: 'promote', name: 'Marketing', energy: 1 }
  ];

  const handleAction = (action) => {
    setSelectedAction(action);
    // Implementar lógica da ação
  };

  return (
    <div className="game-screen">
      <div className="status-bar">
        <div className="player-info">
          <h3>{player.artistName}</h3>
          <p>Fãs: {gameState.fans}</p>
          <p>Dinheiro: R$ {gameState.money}</p>
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
              {/* Adicionar detalhes específicos da ação aqui */}
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
          <div>Composição: {player.skills?.composition || 1}</div>
          <div>Vocal: {player.skills?.vocal || 1}</div>
          <div>Performance: {player.skills?.performance || 1}</div>
          <div>Produção: {player.skills?.production || 1}</div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;