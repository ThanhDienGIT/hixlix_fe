import React, { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import instance from '../axios/instance';



export function TokenProvider({ children }) {
    const [token, setToken] = useState(null);

    const JWTToken = (ele) => {
        setToken(jwt_decode(ele))
    }

    const checktoken = () => {
        if (localStorage.getItem('access_token') !== null) {
            instance.get('/checktoken').then(res => {
            console.log(console.log(res.data));
          }
          ).catch(err =>{
            if(err.response.status === 401){
              localStorage.removeItem('access_token')
              window.location.href = '/'
            }
          })
        }
    }

    if(window.location.pathname !== '/login'){
        if(localStorage.getItem('access_token') === null){
            window.location.href='/login'
        }
    }

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            JWTToken(localStorage.getItem('access_token'))
            checktoken()
        }
    }, [])


    return (
        <TokenContext.Provider value={{ token, JWTToken }}>
            {children}
        </TokenContext.Provider>
    );
}

export const TokenContext = createContext();