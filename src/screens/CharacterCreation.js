import React, { useState } from 'react';

const CharacterCreation = ({ onCreateCharacter }) => {
  const [characterData, setCharacterData] = useState({
    name: '',
    artistName: '',
    age: 18,
    appearance: {
      height: 170,
      hairStyle: '',
      hairColor: '',
      skinColor: '',
      clothingStyle: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCharacter(characterData);
  };

  return (
    <div className="character-creation">
      <h2>Crie seu Artista</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Real:</label>
          <input
            type="text"
            value={characterData.name}
            onChange={(e) => setCharacterData({...characterData, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Nome Artístico:</label>
          <input
            type="text"
            value={characterData.artistName}
            onChange={(e) => setCharacterData({...characterData, artistName: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Idade:</label>
          <input
            type="number"
            value={characterData.age}
            onChange={(e) => setCharacterData({...characterData, age: parseInt(e.target.value)})}
            min="16"
            max="50"
          />
        </div>
        <h3>Aparência</h3>
        <div className="form-group">
          <label>Estilo de Cabelo:</label>
          <select
            value={characterData.appearance.hairStyle}
            onChange={(e) => setCharacterData({
              ...characterData,
              appearance: {...characterData.appearance, hairStyle: e.target.value}
            })}
          >
            <option value="">Selecione...</option>
            <option value="curto">Curto</option>
            <option value="medio">Médio</option>
            <option value="longo">Longo</option>
          </select>
        </div>
        <button type="submit">Criar Personagem</button>
      </form>
    </div>
  );
};

export default CharacterCreation;