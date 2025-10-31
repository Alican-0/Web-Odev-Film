// src/components/layout/Header.jsx

import React from 'react';
import styled from 'styled-components';
import { FaTicketAlt } from 'react-icons/fa'; // Icon kullanımı için 'react-icons' paketini kurmanız gerekebilir

// Eğer 'react-icons' paketini kurmadıysanız, kurun:
// npm install react-icons

const HeaderContainer = styled.header`
  background-color: white;
  padding: 15px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #3f51b5; /* Marka rengi */
`;

const NavLink = styled.a`
  color: #3f51b5;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <FaTicketAlt style={{ marginRight: '10px', color: '#ff9800' }} />
        Kampüs Film Kulübü
      </Logo>
      <nav>
        <NavLink href="/">Ana Sayfa</NavLink>
      </nav>
    </HeaderContainer>
  );
};

export default Header;