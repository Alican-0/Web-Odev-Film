// src/api/tvmaze.js

import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';

/**
 * Kullanılan endpoint: https://api.tvmaze.com/search/shows?q=<query> 
 * Sorguya göre dizi listesini getirir.
 */
export const fetchShows = async (query) => {
  try {
    // API adresi 
    const response = await axios.get(`${BASE_URL}/search/shows?q=${query}`); 
    
    // TVMaze arama sonucu, dizi verisini `.show` nesnesinde tutar.
    // Uygulamanın listeleyebilmesi için sadece show nesnelerini dönüyoruz.
    return response.data.map(item => item.show); 
    
  } catch (error) {
    console.error(`Dizi arama sırasında hata: ${query}`, error);
    // Hatanın Home bileşeninde yakalanabilmesi için tekrar fırlatıyoruz.
    throw error; 
  }
};

/**
 * Belirli bir dizinin detaylarını getirir.
 * Kullanılan endpoint: https://api.tvmaze.com/shows/:id [cite: 27]
 */
export const fetchShowDetails = async (id) => {
  try {
    // API adresi [cite: 27]
    const response = await axios.get(`${BASE_URL}/shows/${id}`); 
    return response.data;
  } catch (error) {
    console.error(`Dizi detayı çekilirken hata: ${id}`, error);
    throw error;
  }
};

/**
 * Belirli bir dizinin bölüm listesini getirir.
 * Kullanılan endpoint: https://api.tvmaze.com/shows/:id/episodes [cite: 28]
 */
export const fetchEpisodes = async (id) => {
  try {
    // API adresi [cite: 28]
    const response = await axios.get(`${BASE_URL}/shows/${id}/episodes`); 
    return response.data;
  } catch (error) {
    console.error(`Bölüm listesi çekilirken hata: ${id}`, error);
    throw error;
  }
};