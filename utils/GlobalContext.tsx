import React, {
  useState,
  createContext,
  useEffect,
  useRef
} from "react";

const Context = createContext({})

const Provider = ( { children }) => {
  const [ domain, setDomain ] = useState("http://100.115.79.115:8000") // TODO: update this after deployment
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  
  const globalContext = {
    domain,
    isLoggedIn,
    setIsLoggedIn
  }

  return <Context.Provider value={globalContext}>{children}</Context.Provider>
  
}

export { Context, Provider }
