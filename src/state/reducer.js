// src/state/reducer.js

import {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  SET_QUERY,
  SET_FILTERS,
  ADD_WATCHLIST,
  REMOVE_WATCHLIST,
  CLEAR_WATCHLIST,
  SET_PAGE,
  SET_PAGE_SIZE,
} from './actionTypes';

// API'den veri çekerken kullanılacak durumlar
const apiInitialState = {
  isLoading: false,
  isError: false,
  data: [], // API'den gelen dizi listesi
};

// Uygulamanın başlangıç durumu
export const initialState = {
  ...apiInitialState,
  query: 'The Walking Dead', // Açılışta varsayılan sorgu [cite: 30]
  filters: {
    type: 'all',
    language: 'all',
    minRating: 0,
  },
  watchlist: [], // Gösterime girecekler listesi [cite: 34]
  currentPage: 1,
  pageSize: 6, // Her sayfada 6 dizi olacak [cite: 38]
};

export const reducer = (state, action) => {
  switch (action.type) {
    // API İsteği Durumları
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false, data: [] };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true, data: [] };

    // Arama ve Filtreler
    case SET_QUERY:
      return { ...state, query: action.payload, currentPage: 1 };
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };

    // Sayfalama
    case SET_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload, currentPage: 1 };

    // Gösterime Girecekler Listesi (Watchlist)
    case ADD_WATCHLIST:
      // Zaten listede yoksa ekle
      if (state.watchlist.some(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case REMOVE_WATCHLIST:
      return { ...state, watchlist: state.watchlist.filter(item => item.id !== action.payload) };
    case CLEAR_WATCHLIST:
      return { ...state, watchlist: [] };

    default:
      return state;
  }
};