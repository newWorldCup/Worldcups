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
import useFormInput from 'components/common/useFormInput';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const email = useFormInput(''); //커스텀훅value 자리에 email이 들어갑니다
  const password = useFormInput('');
  const nickname = useFormInput(''); //커스텀훅value 자리에 password 들어갑니다

  const inputValidate = () => {
    if (!email.value.trim() || !password.value.trim() || !nickname.value.trim()) {
      alert('아이디와 비밀번호,닉네임을 모두 입력하세요');
      return false;
    }
    return true;
  };

  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputValidate()) {
      console.log(email.value, password.value, nickname.value);
    }
  };

  return (
    <StyledPage>
      <StyledSignUi onSubmit={onSubmitHandler}>
        <StyledTitle>회원가입</StyledTitle>
        <StyledInputs>
          <StyledInput
            type="email"
            name="email"
            value={email.value}
            onChange={email.onChange} //커스텀훅으로 핸들러를 대신함
            placeholder="아이디(4~30글자,이메일로 작성하세요.)"
            minLength={4}
            maxLength={30}
          ></StyledInput>
          <StyledInput
            name="password"
            value={password.value}
            onChange={password.onChange} //커스텀훅으로 핸들러를 대신함
            placeholder="비밀번호(4~15글자)"
            minLength={4}
            maxLength={15}
          ></StyledInput>
          <StyledInput
            name="nickname"
            value={nickname.value}
            onChange={nickname.onChange} //커스텀훅으로 핸들러를 대신함
            placeholder="닉네임(1~9글자)"
            minLength={1}
            maxLength={9}
          ></StyledInput>
        </StyledInputs>
        <StyledButtons>
          <StyledBtn type="submit">회원가입</StyledBtn>
          <StyledP onClick={() => navigate('/signin')}>로그인</StyledP>
        </StyledButtons>
      </StyledSignUi>
    </StyledPage>
  );
};

export default SignUpPage;
