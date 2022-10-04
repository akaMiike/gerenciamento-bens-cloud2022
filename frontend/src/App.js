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
import {setApiAuth} from "./api";

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

  return <AuthContext.Provider value={{ auth, setAuth: updateAuth }}>
    <DataContext.Provider value={{ data, setData }}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />}>

            </Route>
            <Route path="/goods" element={<GoodsPage />}>

            </Route>
            <Route path="/goods/validate/:assetId" element={<ValidationPage />}>

            </Route>


            {/*<Route path="teams" element={<Teams />}>*/}
            {/*  <Route path=":teamId" element={<Team />} />*/}
            {/*  <Route path="new" element={<NewTeamForm />} />*/}
            {/*  <Route index element={<LeagueStandings />} />*/}
            {/*</Route>*/}
          </Routes>
        </BrowserRouter>
    </DataContext.Provider>
  </AuthContext.Provider>
}

export default App;
