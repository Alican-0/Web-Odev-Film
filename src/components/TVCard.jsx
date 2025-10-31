// src/components/TVCard.jsx

import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { AppContext } from '../App';
import { ADD_WATCHLIST } from '../state/actionTypes';
import { useNavigate } from 'react-router-dom'; // 1. DEĞİŞİKLİK: useNavigate import edildi

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
`;

const NoPoster = styled.div`
  width: 100%;
  height: 250px;
  background-color: #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #757575;
  font-weight: 500;
  text-align: center;
`;

const CardBody = styled.div`
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: #333;
`;

const RatingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: #ff9800;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: 10px;
`;

const Badge = styled.span`
  display: inline-block;
  background-color: #e0e7ff;
  color: #3f51b5;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 5px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Summary = styled.p`
  font-size: 0.9rem;
  color: #616161;
  margin: 10px 0;
  flex-grow: 1;
  /* Özetin sadece 3 satır görünmesini sağlar */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const DetailButton = styled.button`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const AddButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #ffc107; /* Turuncu-sarı renk */
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #ffb300;
  }
`;

// HTML etiketlerinden gelen gereksiz <p> etiketlerini temizlemek için basit bir fonksiyon
const stripHtml = (html) => {
    return html ? html.replace(/<[^>]*>/g, '') : 'Özet bulunmamaktadır.';
};

const TVCard = ({ show }) => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate(); // 2. DEĞİŞİKLİK: useNavigate tanımlandı

  // Verilerin güvenli bir şekilde alınması
  const name = show?.name || 'Başlık Yok';
  const summary = stripHtml(show?.summary);
  const imageUrl = show?.image?.medium || show?.image?.original;
  const genres = show?.genres || [];
  const language = show?.language;
  const rating = show?.rating?.average || null;

  const handleAddToWatchlist = () => {
    dispatch({
      type: ADD_WATCHLIST,
      payload: {
        id: show.id,
        name: show.name,
        // İzleme listesi için sadece gerekli temel bilgileri gönderiyoruz
      },
    });
  };

  const handleDetailClick = () => {
    // 3. DEĞİŞİKLİK: Detay sayfasına yönlendirme yapıldı
    navigate(`/detail/${show.id}`); 
  };

  return (
    <Card>
      {imageUrl ? (
        <Poster src={imageUrl} alt={name} />
      ) : (
        <NoPoster>
          Poster Yok
          <br/>
          
        </NoPoster>
      )}
      <CardBody>
        <Title>{name}</Title>
        <div style={{ marginBottom: '10px' }}>
          {language && <Badge>{language}</Badge>}
          {rating && (
            <RatingBadge>
              <FaStar size={12} style={{ marginRight: '4px' }} />
              {rating.toFixed(1)}
            </RatingBadge>
          )}
        </div>
        <div>
          {genres.slice(0, 3).map(genre => (
            <Badge key={genre} style={{ backgroundColor: '#e8f5e9', color: '#4caf50' }}>
              {genre}
            </Badge>
          ))}
        </div>
        <Summary>{summary}</Summary>

        <ButtonGroup>
          <DetailButton onClick={handleDetailClick}>Detay</DetailButton>
          <AddButton onClick={handleAddToWatchlist}>Gösterime Ekle</AddButton>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
};

export default TVCard;