import React, { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export function TokenProvider({ children }) {
    const [token, setToken] = useState(null);

    const JWTToken = (ele) => {
        setToken(jwt_decode(ele))
    }

       
    if(window.location.pathname !== '/login'){
        if(localStorage.getItem('access_token') === null){
            window.location.href='/login'
        }
    }

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            JWTToken(localStorage.getItem('access_token'))
        }
    }, [])

    return (
        <TokenContext.Provider value={{ token, JWTToken }}>
            {children}
        </TokenContext.Provider>
    );
}

export const TokenContext = createContext();