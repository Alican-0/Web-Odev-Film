// src/App.jsx

import React, { useReducer, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Router importları
import Home from './components/Home';
import ShowDetail from './components/ShowDetail'; // Detay sayfasını import ediyoruz
import { initialState, reducer } from './state/reducer';

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // Uygulamayı BrowserRouter ile sarmalıyoruz
    <BrowserRouter>
      <AppContext.Provider value={{ state, dispatch }}>
        {/* URL'ye göre hangi bileşenin yükleneceğini belirleriz */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<ShowDetail />} /> {/* Detay Sayfası için dinamik yol */}
          {/* Gelecekte 404 sayfası da eklenebilir */}
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
