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

const SignUpPage = () => {
  const navigate = useNavigate();
  return (
    <StyledPage>
      <StyledSignUi onSubmit={1}>
        <StyledTitle>회원가입</StyledTitle>
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
          <StyledInput
            name="nickname"
            value={1}
            onChange={1}
            placeholder="닉네임(1~9글자)"
            minLength={1}
            maxLength={9}
          ></StyledInput>
        </StyledInputs>
        <StyledButtons>
          <StyledBtn>회원가입</StyledBtn>
          <StyledP onClick={() => navigate('/signin')}>로그인</StyledP>
        </StyledButtons>
      </StyledSignUi>
    </StyledPage>
  );
};

export default SignUpPage;
