import { useEffect, useState } from 'react';
import {
  StyledSignUi,
  StyledSocialBtns,
  StyledTitle,
  StyledInputs,
  StyledButtons,
  StyledBtn,
  StyledInput,
  StyledP,
  StyledLoaing
} from 'styles/StyledSign';
import useFormInput from 'components/common/useFormInput';
import { useNavigate } from 'react-router-dom';
import { auth, db } from 'firebaseStore/firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const email = useFormInput(''); //커스텀훅value 자리에 email이 들어갑니다
  const password = useFormInput(''); //커스텀훅value 자리에 password 들어갑니다
  const nickname = useFormInput('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);
  const inputValidate = () => {
    if (!email.value.trim() || !password.value.trim() || !nickname.value.trim()) {
      toast.error('아이디와 비밀번호,닉네임을 모두 입력하세요');
      return false;
    }
    // 이메일 유효성 검사 강화
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.value)) {
      toast.error('유효하지 않은 이메일 형식입니다.');
      return false;
    }
    //비밀번호 유효성 검사 강화
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/;
    if (!passwordRegex.test(password.value)) {
      toast.error('비밀번호는 6~15글자이며,최소 하나의 문자,숫자,특수문자를 포함해야 합니다!');
      return false;
    }
    return true;
  };
  //firebase api 회원가입 연결
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const isInputValidated = inputValidate();
    if (isInputValidated) {
      setIsLoading(true);
      try {
        const signUp = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = signUp.user;
        await setDoc(doc(db, 'users', user.uid), {
          email: email.value,
          nickname: nickname.value
        });
        toast.success('회원가입에 성공했습니다!');
        await signOut(auth);
        navigate('/signin');
      } catch (error) {
        console.log('회원가입 에러', error);
        if (error.code === 'auth/email-already-in-use') {
          return toast.error('이미 존재하는 아이디입니다.');
        } else {
          toast.error('회원가입 중 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };
  if (isLoading) {
    return <StyledLoaing>...회원가입 처리중입니다...</StyledLoaing>;
  }

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
          placeholder="비밀번호(6~15글자),최소 하나의 특수문자,문자,숫자가 들어가야합니다."
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
