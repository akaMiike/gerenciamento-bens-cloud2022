import React, {useEffect} from 'react';
import SignIn from "./screens/SignInPage";
import GoodsPage from "./screens/GoodsPage";
import ValidationPage from "./screens/ValidationPage";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {useState} from "react";
import {setApiAuth, unsetApiAuth} from "./api";

export const AuthContext = React.createContext({});
export const DataContext = React.createContext({});

function App() {
  const [auth, setAuth] = useState()
  const [data, setData] = useState({})

  useEffect(() => {
    const authStored = localStorage.getItem("auth")
    if (authStored) {
      const parsedAuth = JSON.parse(authStored)
      setAuth(parsedAuth)
      setApiAuth(parsedAuth.username, parsedAuth.password)
    }
  }, [])

  function updateAuth({ username, password }) {
    const newAuth = { username, password }
    setAuth(newAuth)
    setApiAuth(username, password)

    localStorage.setItem("auth", JSON.stringify(newAuth) )
  }

  function logout() {
    setAuth()
    unsetApiAuth()
    localStorage.removeItem("auth")
  }

  return <AuthContext.Provider value={{ auth, setAuth: updateAuth, logout }}>
    <DataContext.Provider value={{ data, setData }}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />}>

            </Route>
            <Route path="/goods" element={<GoodsPage />}>

            </Route>
            <Route path="/goods/validate/:assetId" element={<ValidationPage />}>

            </Route>
          </Routes>
        </BrowserRouter>
    </DataContext.Provider>
  </AuthContext.Provider>
}

export default App;
