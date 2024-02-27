import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from 'firebaseStore/firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {});
  }, []);

  // const signUpSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const useCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     setEmail('');
  //     setPassword('');

  //     console.log('user', useCredential.user);
  //   } catch (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log('error with signUp', errorCode, errorMessage);
  //   }
  // };
  console.log(email);
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      setLoginPassword('');

      const { accessToken } = userCredential.user;
      localStorage.setItem('userInfo', JSON.stringify({ accessToken, email }));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const onChangeSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeSetPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {/* <form onSubmit={signUpSubmit}>
        <div>
          회원가입:&nbsp;
          <div>
            아이디:&nbsp;
            <input value={email} onChange={onChangeSetEmail} />
          </div>
          <div>
            비밀번호:&nbsp;
            <input value={password} onChange={onChangeSetPassword} />
          </div>
        </div>
        <button type="submit">회원가입 완료</button>
      </form>
      <div>-------절취선-------</div> */}

      <form onSubmit={loginSubmit}>
        <div>
          로그인:&nbsp;
          <div>
            아이디:&nbsp;
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            비밀번호:&nbsp;
            <input value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button type="submit">로그인 완료</button>
      </form>
    </>
  );
}

export default Login;
