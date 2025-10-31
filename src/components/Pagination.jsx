// src/components/Pagination.jsx

import React from 'react';
import styled from 'styled-components';
import { SET_PAGE } from '../state/actionTypes';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 0;
`;

const Button = styled.button`
  background-color: ${props => (props.$active ? '#ffc107' : '#f0f0f0')};
  color: ${props => (props.$active ? 'white' : '#333')};
  border: ${props => (props.$active ? 'none' : '1px solid #ccc')};
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s, color 0.2s;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NavigationButton = styled(Button)`
    background-color: #f0f0f0;
    color: #333;
    min-width: 100px;
    &:hover:not(:disabled) {
        background-color: #e0e0e0;
    }
`;

const Pagination = ({ currentPage, totalPages, dispatch }) => {

  const handlePageChange = (newPage) => {
    dispatch({ type: SET_PAGE, payload: newPage });
  };

  return (
    <PaginationContainer>
      {/* Önceki Butonu  */}
      <NavigationButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Önceki
      </NavigationButton>

      {/* Sayfa Numaraları (Basitçe 1, 2, Son şekliyle gösterilebilir) */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        // Çok fazla sayfa varsa sadece başlangıç, bitiş ve mevcut sayfa çevresi gösterilebilir.
        if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
            return (
                <Button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    $active={pageNumber === currentPage}
                >
                    {pageNumber}
                </Button>
            );
        }
        // ... gösterimi
        if ((pageNumber === currentPage - 2 && currentPage > 2) || (pageNumber === currentPage + 2 && currentPage < totalPages - 1)) {
            return <span key={pageNumber} style={{padding: '0 5px'}}>...</span>;
        }
        return null;
      })}

      {/* Sonraki Butonu  */}
      <NavigationButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Sonraki
      </NavigationButton>
    </PaginationContainer>
  );
};

export default Pagination;