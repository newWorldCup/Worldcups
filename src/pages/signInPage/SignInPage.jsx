import React from 'react';
import {
  StyledSignUi,
  StyledPage,
  StyledTitle,
  StyledInputs,
  StyledButtons,
  StyledBtn,
  StyledInput,
  StyledP
} from '../../styles/StyledSign';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  return (
    <StyledPage>
      <StyledSignUi onSubmit={1}>
        <StyledTitle>로그인</StyledTitle>
        <StyledInputs>
          <StyledInput
            name="id"
            value={1}
            onChange={1}
            placeholder="아이디(4~10글자)"
            minLength={4}
            maxLength={10}
          ></StyledInput>
          <StyledInput
            name="password"
            value={1}
            onChange={1}
            placeholder="비밀번호(4~15글자)"
            minLength={4}
            maxLength={15}
          ></StyledInput>
        </StyledInputs>
        <StyledButtons>
          <StyledBtn>로그인</StyledBtn>
          <StyledP onClick={() => navigate('/signup')}>회원가입</StyledP>
        </StyledButtons>
      </StyledSignUi>
    </StyledPage>
  );
};

export default SignInPage;
