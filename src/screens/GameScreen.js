import React, { useState } from 'react';
import { useGameState, useGameDispatch, gameActions } from '../GameContext';
import './GameScreen.css';

const GameScreen = () => {
  const gameState = useGameState();
  const dispatch = useGameDispatch();
  const [selectedAction, setSelectedAction] = useState(null);
  const [actionResult, setActionResult] = useState('');

  const { player, gameData } = gameState;

  const availableActions = [
    { id: 'compose', name: 'Compor Música', energy: 20, description: 'Criar uma nova música para aumentar suas habilidades de composição' },
    { id: 'practice', name: 'Praticar Vocal', energy: 15, description: 'Melhorar suas habilidades vocais' },
    { id: 'perform', name: 'Fazer Show', energy: 30, description: 'Apresentar-se para ganhar fãs e dinheiro' },
    { id: 'record', name: 'Gravar Música', energy: 25, description: 'Gravar uma música no estúdio' },
    { id: 'promote', name: 'Marketing', energy: 10, description: 'Promover sua música nas redes sociais' }
  ];

  const canPerformAction = (action) => {
    return gameData.energy >= action.energy;
  };

  const handleAction = (action) => {
    if (!canPerformAction(action)) {
      setActionResult('Energia insuficiente para esta ação!');
      return;
    }

    setSelectedAction(action);
    
    // Use energy
    dispatch(gameActions.useEnergy(action.energy));
    
    // Perform action and get results
    const result = performAction(action);
    setActionResult(result.message);
    
    // Update player stats based on action
    if (result.updates) {
      dispatch(gameActions.updatePlayer(result.updates));
    }
  };

  const performAction = (action) => {
    switch (action.id) {
      case 'compose':
        const compositionGain = Math.floor(Math.random() * 3) + 1;
        return {
          message: `Você compôs uma nova música! +${compositionGain} Composição`,
          updates: {
            stats: { songwriting: compositionGain }
          }
        };
      
      case 'practice':
        const vocalGain = Math.floor(Math.random() * 3) + 1;
        return {
          message: `Sessão de prática concluída! +${vocalGain} Vocal`,
          updates: {
            stats: { singing: vocalGain }
          }
        };
      
      case 'perform':
        const fansGain = Math.floor(Math.random() * 50) + 20;
        const moneyGain = Math.floor(Math.random() * 200) + 100;
        const performanceGain = Math.floor(Math.random() * 2) + 1;
        return {
          message: `Show incrível! +${fansGain} fãs, +R$${moneyGain}, +${performanceGain} Performance`,
          updates: {
            career: { fans: fansGain },
            finances: { amount: moneyGain },
            stats: { performance: performanceGain }
          }
        };
      
      case 'record':
        const productionGain = Math.floor(Math.random() * 2) + 1;
        const cost = 500;
        return {
          message: `Música gravada com sucesso! +${productionGain} Produção (-R$${cost})`,
          updates: {
            stats: { production: productionGain },
            finances: { amount: -cost }
          }
        };
      
      case 'promote':
        const charismaGain = Math.floor(Math.random() * 2) + 1;
        const marketingFans = Math.floor(Math.random() * 30) + 10;
        return {
          message: `Campanha de marketing executada! +${marketingFans} fãs, +${charismaGain} Carisma`,
          updates: {
            career: { fans: marketingFans },
            stats: { charisma: charismaGain }
          }
        };
      
      default:
        return { message: 'Ação desconhecida!' };
    }
  };

  const handleNextTurn = () => {
    dispatch(gameActions.advanceTurn());
    setSelectedAction(null);
    setActionResult('');
  };

  return (
    <div className="game-screen">
      <div className="status-bar">
        <div className="player-info">
          <h3>{player?.profile.artistName}</h3>
          <p>Fãs: {player?.profile.career.fans || 0}</p>
          <p>Dinheiro: R$ {player?.profile.finances.balance || 0}</p>
        </div>
        <div className="energy-info">
          <p>Energia: {gameData.energy}/{gameData.maxEnergy}</p>
          <div className="energy-bar">
            <div 
              className="energy-fill" 
              style={{ width: `${(gameData.energy / gameData.maxEnergy) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="date-info">
          <p>Turno: {gameData.currentTurn}/{gameData.maxTurns}</p>
          <p>Data: {gameData.date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</p>
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
                className={`action-button ${selectedAction?.id === action.id ? 'selected' : ''} ${!canPerformAction(action) ? 'disabled' : ''}`}
                disabled={!canPerformAction(action)}
              >
                <div className="action-name">{action.name}</div>
                <div className="energy-cost">-{action.energy} energia</div>
              </button>
            ))}
          </div>
        </div>

        <div className="content-area">
          {actionResult && (
            <div className="action-result">
              <h4>Resultado da Ação:</h4>
              <p>{actionResult}</p>
            </div>
          )}
          
          {selectedAction ? (
            <div className="action-details">
              <h3>{selectedAction.name}</h3>
              <p>{selectedAction.description}</p>
              <p className="energy-requirement">Energia necessária: {selectedAction.energy}</p>
            </div>
          ) : (
            <div className="welcome-message">
              <h3>Bem-vindo ao seu estúdio!</h3>
              <p>Selecione uma ação para desenvolver sua carreira musical.</p>
              <p>Cada ação consome energia. Quando sua energia acabar, o turno avança automaticamente.</p>
            </div>
          )}
          
          {gameData.energy === 0 && (
            <div className="turn-end">
              <h4>Energia esgotada!</h4>
              <button className="btn btn-primary" onClick={handleNextTurn}>
                Próximo Turno
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="player-stats">
        <h3>Estatísticas</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Vocal:</span>
            <span className="stat-value">{player?.profile.stats.singing || 1}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Performance:</span>
            <span className="stat-value">{player?.profile.stats.performance || 1}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Carisma:</span>
            <span className="stat-value">{player?.profile.stats.charisma || 1}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Composição:</span>
            <span className="stat-value">{player?.profile.stats.songwriting || 1}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Produção:</span>
            <span className="stat-value">{player?.profile.stats.production || 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;