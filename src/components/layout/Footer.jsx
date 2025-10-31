// src/components/layout/Footer.jsx

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #3f51b5; /* Koyu arka plan */
  color: white;
  padding: 15px 0;
  text-align: center;
  font-size: 0.9rem;
  margin-top: auto; /* Sayfanın en altına yapışmasını sağlar */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Mustafa Alican KUTSAL-2025</p>
    </FooterContainer>
  );
};

export default Footer;