import React, { createContext, useContext, useState } from 'react'

//how to know user is logged in 
//use localstorage to store the user's fullname username

export const AuthContext = createContext();

//define context;
export const UseAuthContext = ()=>{
    return useContext(AuthContext);
}

//wrap the context to export // global use
export const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser ] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

  return <AuthContext.Provider value={{authUser, setAuthUser}} >{children}</AuthContext.Provider>
}

// export default AuthContext;