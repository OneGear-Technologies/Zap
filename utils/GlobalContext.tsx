import React, {
  useState,
  createContext,
  useEffect,
  useRef
} from "react";
import EncryptedStorage from 'react-native-encrypted-storage';

const Context = createContext({})

export interface UserInfo {
    access_token: string,
    refresh_token: string,
    username: string,
    first_name: string,
    last_name: string
}


const Provider = ( { children }) => {
  const [ domain, setDomain ] = useState("http://100.115.79.115:8000") // TODO: update this after deployment
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  
  async function storeUserSession(access_token : string, refresh_token: string, username : string, first_name : string, last_name: string) {
    try {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
              access_token : access_token,
	      refresh_token : refresh_token,
              username: username,
	      first_name : first_name,
	      last_name : last_name
            })
        );
      console.log("Successfuly stored")

    } catch (error) {
      console.log("Unable to store with error: " + error)
    }
  }


  async function retrieveUserSession() {
    try {    
        const session = await EncryptedStorage.getItem("user_session");
    
        if (session !== undefined && session !== null) {
	  let userInfo : UserInfo = JSON.parse(session)

	  setIsLoggedIn(true)
	  
	  return userInfo
        }
    } catch (error) {
      console.log("Unable to store with error: " + error)
    }
  }
  
  const globalContext = {
    domain,
    isLoggedIn,
    setIsLoggedIn,
    storeUserSession,
    retrieveUserSession
  }

  return <Context.Provider value={globalContext}>{children}</Context.Provider>
  
}

export { Context, Provider }
