import React, { useState } from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { StyledButton, StyledGoogleIcon, StyledLoginLayout } from './style';
import Icon from '../../assets/search.png';
type AuthProps = {

};

const AuthLogin:React.FC<AuthProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider()).then((response)=>{
      console.log(response.user)
      navigate('/')
    }).catch((err)=>{
      console.log(err)
      setAuthing(false)
    })
  }
  return(
    <StyledLoginLayout>
      <StyledButton onClick={signInWithGoogle}>
        SignIn with Google
        <StyledGoogleIcon src={Icon}/>
      </StyledButton>
    </StyledLoginLayout>
  )
};

export default AuthLogin;