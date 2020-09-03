import React, { useState } from 'react'
import { Header } from './Components/Header'
import  UserData  from './Components/UserData'
import { Quiz } from './Components/Quiz'
import './App.css';

function App() {
  const [registered, setRegistered] = useState(false)
  const [user, setUser] = useState({})

  return (
    <div>
      <Header />
      {!registered ? (
        <UserData setRegistered={setRegistered} setUser={setUser} />
        ) : (
          <Quiz userData={user} setRegistered={setRegistered}/>  
      )}
    </div>
  );
}

export default App;