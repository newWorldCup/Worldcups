import styled from 'styled-components';

export const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  top: 0;
  width: 100%;
  padding: 20px 10px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoImg = styled.img`
  transition: all 0.3s ease-in-out;
  padding: 30px;
  max-width: 100%;
`;

export const MenuButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    color: var(--main-color);
  }
`;

export const TestBox = styled.div`
  height: 2000px;
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
