// src/components/ShowDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchShowDetails, fetchEpisodes } from '../api/tvmaze'; 

// --- Styled Components (Genel Koyu Tema ve İstenen Estetik) ---

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 30px;
  /* Koyu Tema, Sayfa Arka Planına Uyumlu */
  background: #1a1a1a; 
  color: #f0f0f0; /* Açık yazı rengi */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

const BackLink = styled(Link)`
  display: inline-flex; /* İçeriği ortalamak için */
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
  padding: 6px 12px;
  background: #3a3a3a; /* Koyu gri buton rengi */
  color: #f0f0f0; /* Açık renkli yazı */
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  border: 1px solid #555;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #4a4a4a; /* Hover'da biraz daha koyu */
    color: #ffffff;
    text-decoration: none;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #7986cb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 50px auto;
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

const MainInfo = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;
  align-items: flex-start; 
  margin-left: 10px; /* Görseli biraz sağa kaydır */
`;

const Poster = styled.img`
  width: 250px; 
  min-width: 250px;
  height: auto;
  border-radius: 15px; /* Yumuşak kenarlar */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const TextContent = styled.div`
  flex-grow: 1;
  padding-top: 10px;
`;

const EpisodeList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  margin-left: -35px; /* Madde işaretlerini gizlerken listeyi sola kaydır */
`;

const EpisodeItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 5px;
  /* Koyu Tema ve Liste Stili */
  background: transparent; 
  border-radius: 0;
  border: none; 
  box-shadow: none; 

  /* İstenen: Bölüm satırı koyu arka planda ve çizgisiz (son görsele göre) */
  border-bottom: 1px solid #333; /* Hafif ayırıcı çizgi */

  &:last-child {
    border-bottom: none;
  }

  div:first-child {
    display: flex;
    align-items: center;
    font-weight: 400; 
  }
`;

const EpisodeNumber = styled.span`
  /* S1E1 gibi numaralar için */
  color: #f0f0f0; /* Açık renk */
  margin-right: 10px; 
  font-size: 1rem;
  font-weight: 700;
`;

const EpisodeMeta = styled.div`
  font-size: 0.9rem;
  color: #b0b0b0; /* Açık gri meta veri rengi */
  display: flex;
  margin-left: auto;
  gap: 15px;
  align-items: center;
  white-space: nowrap;
`;

const SourceButton = styled.button`
  background: #3a3a3a; /* Koyu gri buton */
  color: #f0f0f0; /* Açık buton yazı rengi */
  border: 1px solid #555;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transform: translateY(-2px); 
  transition: background 0.2s;
  &:hover {
    background: #4a4a4a;
  }
`;

// HTML etiketlerinden gelen gereksiz <p> etiketlerini temizlemek için fonksiyon
const stripHtml = (html) => html ? html.replace(/<[^>]*>/g, '') : 'Özet bulunmamaktadır.';


const ShowDetail = () => {
  const { id: rawId } = useParams();
  const id = Number(rawId); 
  
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        
      if (isNaN(id) || id === 0) {
        setIsLoading(false);
        setIsError(true);
        return;
      }

      setIsLoading(true);
      setIsError(false);
      try {
        const [showData, episodesData] = await Promise.all([
          fetchShowDetails(id),
          fetchEpisodes(id)
        ]);
        
        setShow(showData);
        setEpisodes(episodesData);
      } catch (err) {
        console.error("Detay verisi çekilirken hata oluştu:", err);
        setIsError(true); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <DetailContainer><Spinner /></DetailContainer>;
  if (isError) return <DetailContainer>Hata: Dizi detayları yüklenemedi. <BackLink to="/">Ana Sayfaya Dön</BackLink></DetailContainer>;
  if (!show) return <DetailContainer>Dizi bulunamadı.</DetailContainer>;
  
  // Bölüm listesi için, istenen görsele daha yakın bir yapıda render ediyoruz
  const renderEpisodes = () => {
    return episodes.map(episode => (
      <EpisodeItem key={episode.id}>
        <div>
          {/* Sadece S1E1 kısmını koyu temadaki gibi tek bir alanda göster */}
          <EpisodeNumber>S{episode.season}E{episode.number}:</EpisodeNumber>
          {episode.name}
        </div>
        <EpisodeMeta>
          
          <span>{episode.airdate}</span> 
          <span>{episode.runtime ? `${episode.runtime} dk` : ''}</span>
          
          {/* Orijinal TVMaze linkine yönlendirme */}
          {episode.url && (
            <a 
              href={episode.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', marginLeft: '15px' }}
            >
              <SourceButton>Kaynak</SourceButton>
            </a>
          )}
        </EpisodeMeta>
      </EpisodeItem>
    ));
  };
  
  return (
    <DetailContainer>
      <BackLink to="/">&lt; Ana Sayfaya Dön</BackLink>
      
      <h1>{show.name}</h1>
      
      <MainInfo>
          <Poster 
            src={show.image?.medium || show.image?.original || 'placeholder.jpg'} 
            alt={show.name} 
          />
          
          <TextContent>
              {/* Puan ve Diğer Bilgiler - Görsellerdeki gibi koyu temaya uyarlandı */}
              <p style={{ fontWeight: 600, color: '#c5c5c5', marginBottom: '15px' }}>
                Puan: **{show.rating?.average || 'N/A'}** | 
                Tür: **{show.genres?.join(', ') || 'N/A'}** | 
                Dil: **{show.language || 'N/A'}**
              </p>
              
              {/* Özet */}
              <p style={{ lineHeight: 1.6 }}>{stripHtml(show.summary)}</p>
          </TextContent>
      </MainInfo>

      {/* GÜNCELLEME: İstenen Beyaz Başlık ve Siyah Alt Çizgi */}
      <h3 style={{ 
        marginTop: '50px', 
        borderBottom: '2px solid #333', /* Siyah çizgi */
        paddingBottom: '10px', 
        color: '#ffffff', /* BEYAZ YAZI */
        fontSize: '1.5rem'
      }}>
        Bölümler ({episodes.length})
      </h3>
      
      <EpisodeList>
        {renderEpisodes()}
      </EpisodeList>
    </DetailContainer>
  );
};

export default ShowDetail;