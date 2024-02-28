import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

export const HeaderContainer = styled.div`
  top: 0;
  width: 100%;
  padding: 35px 30px 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

export const LogoImg = styled.img`
  transition: all 0.3s ease-in-out;
  padding: 30px;
  max-width: 100%;
`;

export const MenuButton = styled(Link)`
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  font-size: 30px;
  color: #000000;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: var(--main-color);
  }
`;

export const TestBox = styled.div`
  height: 1000px;
`;

export const HeaderLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #000000;
`;

export const SizedBox = styled.div`
  height: 50px;
`;
