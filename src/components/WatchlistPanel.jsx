// src/components/WatchlistPanel.jsx

import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App';
import { REMOVE_WATCHLIST, CLEAR_WATCHLIST } from '../state/actionTypes';
import { FaTrash, FaTimesCircle } from 'react-icons/fa';

// --- Styled Components ---

const Panel = styled.div`
  position: sticky;
  top: 20px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 1.3rem;
  color: #3f51b5;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
  color: #333;

  &:last-child {
    border-bottom: none;
  }
`;

const EmptyMessage = styled.p`
  padding: 10px;
  background: #fff3e0;
  color: #ff9800;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    color: #d32f2f;
  }
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: #f5f5f5;
  color: #757575;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0e0e0;
  }
`;

// --- Bileşen ---

const WatchlistPanel = () => {
  const { state, dispatch } = useContext(AppContext);
  const { watchlist } = state;

  const handleRemove = (id) => {
    dispatch({ type: REMOVE_WATCHLIST, payload: id });
  };

  const handleClear = () => {
    if (window.confirm("Gösterime girecekler listesini temizlemek istediğinizden emin misiniz?")) {
      dispatch({ type: CLEAR_WATCHLIST });
    }
  };

  return (
    <Panel>
      <Title>
        Gösterime Girecekler ({watchlist.length})
      </Title>

      {watchlist.length === 0 ? (
        <EmptyMessage>
          Listeye eklenmiş yapım yok.
        </EmptyMessage>
      ) : (
        <>
          <List>
            {watchlist.map((item) => (
              <ListItem key={item.id}>
                <span>{item.name}</span>
                <RemoveButton onClick={() => handleRemove(item.id)} title="Listeden Çıkar">
                  <FaTimesCircle size={18} />
                </RemoveButton>
              </ListItem>
            ))}
          </List>
          
          <ClearButton onClick={handleClear}>
            <FaTrash style={{ marginRight: '8px' }} />
            Listeyi Temizle
          </ClearButton>
        </>
      )}
    </Panel>
  );
};

export default WatchlistPanel;