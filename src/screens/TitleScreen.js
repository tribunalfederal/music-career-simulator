import React from 'react';
import { useGameDispatch, gameActions, SCREENS } from '../GameContext';
import './TitleScreen.css';

const TitleScreen = () => {
  const dispatch = useGameDispatch();

  const handleNewGame = () => {
    dispatch(gameActions.setScreen(SCREENS.CHARACTER_CREATION));
  };

  return (
    <div className="title-screen">
      <div className="title-content">
        <h1 className="game-title">Music Career Simulator</h1>
        <p className="game-subtitle">Realize o sonho de se tornar uma estrela da música</p>
        
        <div className="title-menu">
          <button className="btn btn-primary" onClick={handleNewGame}>
            Novo Jogo
          </button>
          <button className="btn btn-secondary" disabled>
            Carregar Jogo
          </button>
          <button className="btn btn-secondary" disabled>
            Opções
          </button>
        </div>
        
        <div className="game-info">
          <h3>Como Jogar</h3>
          <ul>
            <li>Crie seu personagem músico</li>
            <li>Desenvolva suas habilidades musicais</li>
            <li>Componha músicas e faça shows</li>
            <li>Construa sua base de fãs</li>
            <li>Alcance o estrelato!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;