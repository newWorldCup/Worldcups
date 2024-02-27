import styled from 'styled-components';
export const StyledPage = styled.div`
  width: 100%;
  height: 500px;
  background-color: white;
`;
export const StyledSignUi = styled.form`
  width: 740px;
  height: 600px;
  margin: 50px auto 50px auto;
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
`;
export const StyledTitle = styled.div`
  width: 700px;
  height: 30px;
  border: 1px solid transparent;
  border-radius: 15px;
  color: black;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
export const StyledInputs = styled.div`
  width: 700px;
  height: 250px;
  border: 1px solid transparent;
  border-radius: 15px;
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
