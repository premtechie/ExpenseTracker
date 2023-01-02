import React, { useContext, useState } from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { StyledButton, StyledGoogleIcon, StyledLoginLayout } from './style';
import Icon from '../../assets/search.png';
import { Spin } from 'antd';
import AuthContext from '../auth-context';
type AuthProps = {

};

const AuthLogin:React.FC<AuthProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const authCntx = useContext(AuthContext);


  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider()).then((response:any)=>{
      const { accessToken } = response.user
      authCntx.login(accessToken, response.user)
      navigate('/', {replace:true})
    }).catch((err)=>{
      alert(err)
      setAuthing(false)
    })
  }
  // if(authing) {
  //   return (
  //     <div>Loading ....</div>
  //   )
  // }
  return(
    <StyledLoginLayout>
      <Spin spinning={authing}>
        <StyledButton onClick={signInWithGoogle}>
          SignIn with Google
        <StyledGoogleIcon src={Icon}/>
      </StyledButton>
      </Spin>
    </StyledLoginLayout>
  )
};

export default AuthLogin;