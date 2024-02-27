import { useEffect } from 'react';
import {
  StyledSignUi,
  StyledSocialBtns,
  StyledTitle,
  StyledInputs,
  StyledButtons,
  StyledBtn,
  StyledInput,
  StyledP
} from 'styles/StyledSign';
import useFormInput from 'components/common/useFormInput';
import { useNavigate } from 'react-router-dom';
import { auth, db } from 'firebaseStore/firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
const SignUpPage = () => {
  const email = useFormInput(''); //커스텀훅value 자리에 email이 들어갑니다
  const password = useFormInput(''); //커스텀훅value 자리에 password 들어갑니다
  const nickname = useFormInput('');
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);
  const inputValidate = () => {
    if (!email.value.trim() || !password.value.trim() || !nickname.value.trim()) {
      alert('아이디와 비밀번호,닉네임을 모두 입력하세요');
      return false;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/;
    if (!passwordRegex.test(password.value)) {
      alert('비밀번호는 6~15글자이며,최소 하나의 문자,숫자,특수문자를 포함해야 합니다!');
      return false;
    }
    return true;
  };
  //firebase api 회원가입 연결
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (inputValidate()) {
      try {
        const signUp = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = signUp.user;
        await setDoc(doc(db, 'users', user.uid), {
          email: email.value,
          nickname: nickname.value
        });
        alert('회원가입에 성공했습니다!');
        navigate('/signin');
      } catch (error) {
        console.log('회원가입 에러', error);
        if (error.code === 'auth/email-already-in-use') {
          return alert('이미 존재하는 아이디입니다.');
        } else {
          alert('회원가입 중 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <StyledSignUi onSubmit={onSubmitHandler}>
      <StyledTitle>회원가입</StyledTitle>
      <StyledInputs>
        <StyledInput
          type="email"
          name="email"
          value={email.value}
          onChange={email.onChange} //커스텀훅으로 핸들러를 대신함
          placeholder="아이디(4~30글자),이메일로 작성하세요."
          minLength={4}
          maxLength={30}
        ></StyledInput>
        <StyledInput
          type="password"
          name="password"
          value={password.value}
          onChange={password.onChange} //커스텀훅으로 핸들러를 대신함
          placeholder="비밀번호(6~15글자)"
          minLength={6}
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
      <StyledSocialBtns></StyledSocialBtns>
    </StyledSignUi>
  );
};

export default SignUpPage;
