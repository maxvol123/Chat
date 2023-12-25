import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Approuter from "./components/Approuter";
import { useContext, useState } from 'react';
import { Context } from '.';
import {useAuthState} from 'react-firebase-hooks/auth'
import Loader from "./components/Loader";

function App() {
  const {auth} = useContext(Context)
  const [user,loading] = useAuthState(auth)
  if (loading) {
    return(
      <Loader/>
    )
  }
  return (
    <BrowserRouter>
      <Navbar/>
      <Approuter/>
    </BrowserRouter>
  );
}

export default App;