import React, { createContext, useContext, useReducer } from 'react';
import Player from './game/Player';

// Game screens
const SCREENS = {
  TITLE: 'TITLE',
  CHARACTER_CREATION: 'CHARACTER_CREATION',
  GAME: 'GAME'
};

// Initial game state
const initialState = {
  currentScreen: SCREENS.TITLE,
  player: null,
  gameData: {
    currentTurn: 1,
    maxTurns: 4,
    date: new Date(2024, 0, 1), // January 1, 2024
    energy: 100,
    maxEnergy: 100
  }
};

// Game actions
const ACTIONS = {
  SET_SCREEN: 'SET_SCREEN',
  CREATE_PLAYER: 'CREATE_PLAYER',
  UPDATE_PLAYER: 'UPDATE_PLAYER',
  ADVANCE_TURN: 'ADVANCE_TURN',
  USE_ENERGY: 'USE_ENERGY',
  RESET_GAME: 'RESET_GAME'
};

// Game reducer
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SCREEN:
      return {
        ...state,
        currentScreen: action.payload
      };
    
    case ACTIONS.CREATE_PLAYER:
      const newPlayer = new Player();
      newPlayer.profile.name = action.payload.name;
      newPlayer.profile.artistName = action.payload.artistName;
      newPlayer.profile.age = action.payload.age;
      newPlayer.profile.appearance = { ...newPlayer.profile.appearance, ...action.payload.appearance };
      
      return {
        ...state,
        player: newPlayer,
        currentScreen: SCREENS.GAME
      };
    
    case ACTIONS.UPDATE_PLAYER:
      if (!state.player) return state;
      
      // Update the existing player instance directly to preserve methods
      if (action.payload.stats) {
        state.player.updateStats(action.payload.stats);
      }
      if (action.payload.career) {
        state.player.updateCareer(action.payload.career);
      }
      if (action.payload.finances) {
        state.player.updateFinances(action.payload.finances);
      }
      
      return {
        ...state,
        player: state.player // Return the same instance with updated values
      };
    
    case ACTIONS.ADVANCE_TURN:
      const nextTurn = state.gameData.currentTurn + 1;
      const newDate = new Date(state.gameData.date);
      newDate.setMonth(newDate.getMonth() + 1);
      
      return {
        ...state,
        gameData: {
          ...state.gameData,
          currentTurn: nextTurn > state.gameData.maxTurns ? 1 : nextTurn,
          date: newDate,
          energy: state.gameData.maxEnergy // Reset energy each turn
        }
      };
    
    case ACTIONS.USE_ENERGY:
      const newEnergy = Math.max(0, state.gameData.energy - action.payload);
      return {
        ...state,
        gameData: {
          ...state.gameData,
          energy: newEnergy
        }
      };
    
    case ACTIONS.RESET_GAME:
      return initialState;
    
    default:
      return state;
  }
}

// Create contexts
const GameContext = createContext();
const GameDispatchContext = createContext();

// Provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

// Custom hooks
export function useGameState() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}

export function useGameDispatch() {
  const context = useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error('useGameDispatch must be used within a GameProvider');
  }
  return context;
}

// Action creators
export const gameActions = {
  setScreen: (screen) => ({ type: ACTIONS.SET_SCREEN, payload: screen }),
  createPlayer: (playerData) => ({ type: ACTIONS.CREATE_PLAYER, payload: playerData }),
  updatePlayer: (updates) => ({ type: ACTIONS.UPDATE_PLAYER, payload: updates }),
  advanceTurn: () => ({ type: ACTIONS.ADVANCE_TURN }),
  useEnergy: (amount) => ({ type: ACTIONS.USE_ENERGY, payload: amount }),
  resetGame: () => ({ type: ACTIONS.RESET_GAME })
};

export { SCREENS };
export default GameContext;