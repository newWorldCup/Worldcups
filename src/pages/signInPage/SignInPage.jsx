import {
  StyledSignUi,
  StyledSocialBtns,
  StyledTitle,
  StyledInputs,
  StyledButtons,
  StyledBtn,
  StyledInput,
  StyledP,
  StyledSocialBtn
} from 'styles/StyledSign';
import { useNavigate } from 'react-router-dom';
import useFormInput from 'components/common/useFormInput';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from 'firebaseStore/firebaseConfig';
import { useState } from 'react';
import googleIcon from '../../assets/free-icon-google-300221.png';
import githubIcon from '../../assets/free-icon-github-logo-25231.png';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const SignInPage = () => {
  const [userData, setUserData] = useState(null);
  const email = useFormInput(''); //커스텀훅value 자리에 email이 들어갑니다
  const password = useFormInput(''); //커스텀훅value 자리에 password 들어갑니다
  const navigate = useNavigate();

  const inputValidate = () => {
    if (!email.value.trim() || !password.value.trim()) {
      toast.error('아이디와 비밀번호를 모두 입력하세요');
      return false;
    }
    return true;
  };

  function GoogleLoginHandler() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console로 들어온 데이터 표시
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //firebase api 로그인 연결
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const isInputValidated = inputValidate();
    if (isInputValidated) {
      try {
        const signIn = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = signIn.user;
        const userRef = doc(db, 'users', user.uid); //user컬렉션의 해당유저의 uid 데이터를 가져옵니다.
        const userSnap = await getDoc(userRef); //문서 가져오는 로직입니다.
        localStorage.setItem('email', JSON.stringify(userSnap.data().email));
        localStorage.setItem('nickname', JSON.stringify(userSnap.data().nickname));
        localStorage.setItem('uid', JSON.stringify(signIn.user.uid));
        localStorage.setItem('token', JSON.stringify(signIn.user.accessToken));
        toast.success('로그인에 성공했습니다!');
        navigate('/', { replace: true });
      } catch (error) {
        if (error.code === 'auth/invalid-credential') {
          return toast.error('아이디 비밀번호가 맞는지 확인해주세요!');
        } else {
          toast.error('알 수 없는 오류가 생겼습니다! 아이디를 삭제하고 다시 만들어주세요!');
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <StyledSignUi onSubmit={onSubmitHandler}>
        <StyledTitle>로그인</StyledTitle>
        <StyledInputs>
          <StyledInput
            type="email"
            name="email"
            value={email.value}
            onChange={email.onChange} //커스텀훅으로 핸들러를 대신함
            placeholder="아이디를 입력하세요"
            minLength={4}
            maxLength={30}
          ></StyledInput>
          <StyledInput
            type="password"
            name="password"
            value={password.value}
            onChange={password.onChange} //커스텀훅으로 핸들러를 대신함
            placeholder="비밀번호를 입력하세요"
            minLength={6}
            maxLength={15}
          ></StyledInput>
        </StyledInputs>
        <StyledButtons>
          <StyledBtn type="submit">로그인</StyledBtn>
          <StyledP onClick={() => navigate('/signup')}>회원가입</StyledP>
        </StyledButtons>
      </StyledSignUi>
      <StyledSocialBtns>
        <StyledSocialBtn $imageUrl={githubIcon} onClick={GoogleLoginHandler} />
        <StyledSocialBtn $imageUrl={googleIcon} onClick={GoogleLoginHandler} />
      </StyledSocialBtns>
    </>
  );
};

export default SignInPage;
