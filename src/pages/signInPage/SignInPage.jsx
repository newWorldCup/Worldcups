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
import useFormInput from 'components/common/useFormInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
const SignInPage = () => {
  const email = useFormInput(''); //커스텀훅value 자리에 email이 들어갑니다
  const password = useFormInput(''); //커스텀훅value 자리에 password 들어갑니다
  const navigate = useNavigate();

  const inputValidate = () => {
    if (!email.value.trim() || !password.value.trim()) {
      alert('아이디와 비밀번호를 모두 입력하세요');
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (inputValidate()) {
      try {
        const signIn = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log(signIn);
        navigate('/', { replace: true });
      } catch (error) {
        if (error.code === 'auth/invalid-credential') {
          return alert('존재하지 않는 아이디입니다!');
        } else {
          alert('비밀번호가 맞지 않습니다!');
          console.log(error);
        }
      }
    }
  };

  return (
    <StyledPage>
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
    </StyledPage>
  );
};

export default SignInPage;
