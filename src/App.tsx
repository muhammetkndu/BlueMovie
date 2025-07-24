import {HashRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/home"
import DetailCard from "./pages/movieDetail"
import Favorites from "./pages/favorites"

function App() {

  return (  
  <HashRouter>
    <Navbar />
    <DetailCard />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
      </Routes>
  </HashRouter>
  )
}

export default App
