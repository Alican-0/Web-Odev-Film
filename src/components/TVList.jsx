// src/components/TVList.jsx

import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App';
import TVCard from './TVCard';
import Pagination from './Pagination'; // Bir sonraki adımda detaylandırılacak

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const Message = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #616161;
`;

const Spinner = styled.div`
  /* Basit bir CSS Spinner */
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3f51b5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 50px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorButton = styled.button`
    background-color: #f44336;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 15px;
`;


// src/components/TVList.jsx dosyasında (sadece ilgili kısmı güncelliyoruz)

// ... (Diğer importlar ve styled components)

const TVList = () => {
  const { state, dispatch } = useContext(AppContext);
  const { isLoading, isError, data, currentPage, pageSize, query, filters } = state; // filters'ı state'ten alıyoruz!

  // ... (isLoading, isError, data.length === 0 kontrolleri)

  // --- Filtreleme Mantığı ---
  const filteredData = data.filter(show => {
    // 1. Tür (Genre) Filtresi
    const genreMatch = filters.type === 'all' || (show.genres && show.genres.includes(filters.type));

    // 2. Dil (Language) Filtresi
    const languageMatch = filters.language === 'all' || (show.language === filters.language);

    // 3. Min Puan (Rating) Filtresi
    const ratingMatch = (show.rating && show.rating.average >= filters.minRating) || filters.minRating === 0;

    return genreMatch && languageMatch && ratingMatch;
  });

  // Eğer filtrelemeden sonra sonuç kalmazsa (Boş sonuç durumu için ek bir kontrol)
  if (data.length > 0 && filteredData.length === 0) {
      return <Message>Seçtiğiniz filtreleme kriterlerine uygun sonuç bulunamadı.</Message>;
  }

  // --- Sayfalama (Pagination) Mantığı ---
  // Artık 'data' yerine 'filteredData' üzerinden hesaplama yapıyoruz.
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentShows = filteredData.slice(startIndex, endIndex); // Geçerli sayfadaki diziler
  const totalPages = Math.ceil(filteredData.length / pageSize); // Toplam sayfa sayısı da filtrelenmiş veriye göre hesaplanır

  // ... (return statement ve JSX içeriği aynı kalır)

  return (
    <>
      <ListContainer>
        {currentShows.map(show => (
          show.id && <TVCard key={show.id} show={show} />
        ))}
      </ListContainer>
      
      {/* Sayfalama 6'dan fazlaysa gösterilir */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default TVList;