"use client";

import { useState } from 'react';
import Link from 'next/link';

import './home-page.css';
import { InputTextChange} from '@/app/types/types';

const Home = () => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e: InputTextChange) => {
    setUsername(e.target.value);
  }

  return (
    <div className="home">
      <main className="main">
        <h3 className='welcome'>
          <span>Welcome to</span>
          <span className="special">ChessCraft</span>
        </h3>
        <div className="username-input">
          <input 
            placeholder='Enter username'
            type="text" value={username}
            onChange={(e) => handleUsernameChange(e)} 
          />
        </div>
        <div className="buttons">
          <div className='room-btns'>
            <button className='btn'>Create room</button>
            <button className='btn'>Join room</button>
          </div>
          <button className='btn'>
            <Link href="/game">New game</Link>
          </button>
        </div>
      </main>
      
      <div className="footer">
        <h6>
          <span className='special'>Chess-Craft</span>  
          A multiplayer chess application
        </h6>
        <div>Developer <span className='special'>shubham.kharade28@gmail.com</span></div>
      </div>
    </div>
  )
}

export default Home;