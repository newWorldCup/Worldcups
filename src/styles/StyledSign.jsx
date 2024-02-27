import styled from 'styled-components';

export const StyledSignUi = styled.form`
  width: 740px;
  height: 1000px;
  margin: 50px auto 50px auto;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 0;
`;
export const StyledTitle = styled.div`
  margin-top: 0px;
  border-bottom: 2px solid black;
  width: 660px;
  height: 30px;
  font-size: 20px;
  font-weight: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
export const StyledInputs = styled.div`
  width: 700px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
export const StyledButtons = styled.div`
  width: 700px;
  height: 100px;
  border: 1px solid transparent;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const StyledBtn = styled.button`
  border: 1px solid white;
  border-radius: 10px;
  background-color: gray;
  width: 200px;
  height: 50px;
  color: white;
  font-size: 30px;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
    background-color: red;
  }
`;
export const StyledInput = styled.input`
  width: 660px;
  height: 50px;
  margin: 20px auto 20px auto;
  border: 1px solid transparent;
  border-bottom: 2px solid lightgray;
`;
export const StyledP = styled.p`
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledSocialBtns = styled.div`
  border-top: 2px solid black;
  width: 680px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;