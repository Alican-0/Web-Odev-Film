// src/components/Filters.jsx

import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App';
import { SET_QUERY, SET_FILTERS } from '../state/actionTypes';

// --- Styled Components ---

const FiltersContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  align-items: flex-end; /* Butonu hizalamak için */
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #616161;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 150px; /* Filtre kutuları için minimum genişlik */
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 100px;
  
  &:hover {
    background-color: #303f9f;
  }
`;

// TVMaze'de popüler olan bazı Tür ve Dil seçenekleri
const availableGenres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Science-Fiction', 'Romance', 'Horror', 'Mystery'];
const availableLanguages = ['English', 'Japanese', 'Korean', 'Spanish', 'French', 'German'];

// --- Bileşen ---

const Filters = () => {
  const { state, dispatch } = useContext(AppContext);
  
  // Arama kutusu için yerel state
  const [localQuery, setLocalQuery] = useState(state.query);
  const [localFilters, setLocalFilters] = useState(state.filters);


  // Sadece ENTER tuşuna basıldığında veya butona tıklandığında query'yi global state'e gönder
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: SET_QUERY, payload: localQuery });
  };
  
  // Filtreler değiştiğinde (Tür, Dil, Puan) global state'e gönder
  useEffect(() => {
    // Filters.jsx yüklendiğinde varsayılan filtreleri de set ediyoruz
    dispatch({ type: SET_FILTERS, payload: localFilters });
  }, [localFilters, dispatch]);


  // Filtreleme mantığı: (Not: Filtreleme API tarafında değil, çekilen verinin React tarafında filtrelenmesini gerektirir)
  // Bizim veriyi filtrelememiz gerekecek, bu mantığı şimdilik TVList'te uygulayalım.
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    // Min Puan'ı sayıya çevir
    const finalValue = name === 'minRating' ? Number(value) : value;

    setLocalFilters(prev => ({
        ...prev,
        [name]: finalValue
    }));
  };

  return (
    <FiltersContainer>
      <form onSubmit={handleSearch}>
        <FormRow>
          {/* Arama Kutusu */}
          <InputGroup style={{ flex: '3' }}>
            <Label htmlFor="searchQuery">Dizi Ara (örn: star, batman)</Label>
            <Input
              id="searchQuery"
              type="text"
              placeholder="Dizi adı girin..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
          </InputGroup>

          <SearchButton type="submit">
            Ara
          </SearchButton>
        </FormRow>
      </form>

      <FormRow>
          {/* Tür Filtresi */}
          <InputGroup>
              <Label htmlFor="genre">Tür (hepsi)</Label>
              <Select id="genre" name="type" value={localFilters.type} onChange={handleFilterChange}>
                  <option value="all">Tümü</option>
                  {availableGenres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                  ))}
              </Select>
          </InputGroup>

          {/* Dil Filtresi */}
          <InputGroup>
              <Label htmlFor="language">Dil (hepsi)</Label>
              <Select id="language" name="language" value={localFilters.language} onChange={handleFilterChange}>
                  <option value="all">Tümü</option>
                  {availableLanguages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                  ))}
              </Select>
          </InputGroup>

          {/* Min Puan Filtresi */}
          <InputGroup>
              <Label htmlFor="minRating">Min. Puan (0+)</Label>
              <Select id="minRating" name="minRating" value={localFilters.minRating} onChange={handleFilterChange}>
                  {[0, 6, 7, 8, 9].map(rating => (
                      <option key={rating} value={rating}>{rating}+</option>
                  ))}
              </Select>
          </InputGroup>
      </FormRow>
    </FiltersContainer>
  );
};

export default Filters;