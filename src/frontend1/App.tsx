import React from 'react';
import './App.css';
import HomePage from './HomePage/HomePage';
import TryPage from './TryPage/TryPage';
// import Sidebar from './components/Waiting/Sidebar/Sidebar';
// import Headers from './components/Waiting/Headers';
// import Query from './components/Waiting/Query';
// import Home from './Page/Home';
// import Navbar from '../src/NavBar/NavBar';
// import Header from '../src/Header/Header';
// import Heros from '../src/Heros/Heros';
// import UploadSection from '../src/UploadSection/UploadSection';



function App() {

  return (
    <div className="App">

      <HomePage/>
      {/* <Navbar/>
      <Heros/>
      <Header />
      <UploadSection/> */}
        {/* <Headers />
        <Query /> */}
         {/* <Home /> */}
         {/* <Sidebar /> */}
         <TryPage />
    </div>
  )
}

export default App
