import { onValue, ref, set } from "firebase/database";
import React, { createContext, ReactNode, useState, useEffect, useCallback } from "react";
import { db } from "./auth.config";

export const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token: string, data: any) => {},
  logout: () => {},
  userData: {},
  expenseData: {}
})

type AuthContextProps = {
  children: ReactNode
}

let logoutTimer:any;

const reminingTimeCalc = (reminingTime:string) => {
  const currTime = new Date().getTime();
  console.log("TIME DURATION",(+reminingTime - currTime),currTime, 1667055285657)
  return (+reminingTime - currTime)
}

const retriveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationTime:any = localStorage.getItem('expirationTime');
  
  const reminingTime = reminingTimeCalc(storedExpirationTime);
  console.log('set',reminingTime, storedExpirationTime)
  if(reminingTime <= 60000) {
    localStorage.clear();
    return null
  }

  return {
    token: storedToken,
    duration: reminingTime,
  }
}

export const AuthContextProvider: React.FC<AuthContextProps> = ({children}) => {
  const tokenData = retriveStoredToken();

  console.log("TOKEN DATA:",tokenData )
  
  const initialToken:any = tokenData?.token;

  const [token, setToken] = useState(initialToken);
  const [data, setUserData] = useState({});
  const [expenseData, setExpenseData] = useState({});

  const { uid }:any = data;
  const userLoggedIn = !!uid;

  const logoutHandler = useCallback(() => {
    setToken('');
    setUserData({});
    localStorage.clear();

    if(logoutTimer) {
      clearTimeout(logoutTimer);
    }
  },[])
  const loginHandler = (token: string, data:any) => {
    const {displayName, email, uid , stsTokenManager } = data;
    const {expirationTime} = stsTokenManager;
    setToken(token);
    setUserData(data);
    //setting user related data to the localstorage to access across platform
    localStorage.setItem('token',token)
    localStorage.setItem('userName', displayName)
    localStorage.setItem('email', email)
    localStorage.setItem('uid', uid)

    const timeStamp:any = new Date(expirationTime).getTime()
    const reminingTimeLeft:any = new Date(reminingTimeCalc(timeStamp));

    localStorage.setItem('expirationTime',timeStamp);
  }

  useEffect(()=> {
    if(data) {
      onValue(ref(db), (snapshot) => {
        const expData = snapshot.val();
        const uuid:any = localStorage.getItem('uid');
        if (expData !== null) {
          setExpenseData(expData[uuid]);
        }
      });
    }

  },[data])
  
  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userData: data,
    expenseData: expenseData,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;