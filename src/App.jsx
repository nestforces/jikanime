import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import AnimeDetail from './pages/AnimeDetail/AnimeDetail';
import AnimeSearchPage from './pages/AnimeSearchPage/AnimeSearchPage';
import AnimeLists from './pages/AnimeLists/AnimeLists';
import { ColorModeProvider } from './assets/Colors/ColorModeProvider';

function App() {

  return (
    <>
        {/* <ColorModeProvider> */}
        <Routes>
          <Route path = '/' element={<Home />}/>
          <Route path = '/anime-detail/:id' element={<AnimeDetail />}/>
          <Route path = '/anime-search' element={<AnimeSearchPage />}/>
          <Route path = '/anime-lists/:typeLists' element={<AnimeLists />}/>
        </Routes>
        {/* </ColorModeProvider> */}
    </>
  )
}

export default App
