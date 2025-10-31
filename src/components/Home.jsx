// src/components/Home.jsx

import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App';
import { fetchShows } from '../api/tvmaze';
import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from '../state/actionTypes';

// Dışarıdan içe aktarılacak bileşenler
import Header from './layout/Header';
import Footer from './layout/Footer'; // 
import Filters from './Filters'; // Bu bileşeni bir sonraki adımda detaylandıracağız 
import TVList from './TVList'; // Bu bileşeni bir sonraki adımda detaylandıracağız [cite: 13]
import WatchlistPanel from './WatchlistPanel'; // [cite: 15]

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f7fa; /* Arka plan rengi */
`;

const MainContent = styled.div`
  display: flex;
  max-width: 1400px;
  width: 100%;
  margin: 20px auto;
  padding: 0 20px;
  flex-grow: 1;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  padding-right: 30px;
`;

const Sidebar = styled.div`
  flex-shrink: 0;
  width: 350px; /* Ekran görüntüsüne göre sağ panel genişliği */
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;


const Home = () => {
  const { state, dispatch } = useContext(AppContext);
  const { query } = state;

  // Veri Çekme İşlemi (Component Lifecycle Management) [cite: 9]
  useEffect(() => {
    const searchTVShows = async () => {
      dispatch({ type: FETCH_INIT }); // Yükleniyor durumunu başlat

      try {
        // API çağrısı: Varsayılan sorgu ("friends") ile başlar [cite: 30]
        const data = await fetchShows(query); // query state'ten geliyor
        dispatch({ type: FETCH_SUCCESS, payload: data }); // Başarılı sonuçları kaydet
      } catch (error) {
        dispatch({ type: FETCH_FAILURE }); // Hata durumunu kaydet
      }
    };

    searchTVShows();
  }, [query]); // query değiştiğinde tekrar çalışır

  return (
    <Container>
      <Header />

      <MainContent>
        <ContentArea>
          {/* Arama Kutusu ve Filtreler: Üstte yer alacak [cite: 31] */}
          <Filters />

          {/* Dizi Listeleme Alanı */}
          <TVList />
        </ContentArea>

        {/* Gösterime Girecekler Paneli (WatchlistPanel) [cite: 15] */}
        <Sidebar>
          <WatchlistPanel />
        </Sidebar>

      </MainContent>

      <Footer />
    </Container>
  );
};

export default Home;