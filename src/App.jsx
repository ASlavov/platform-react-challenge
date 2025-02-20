import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainCatDisplay from './components/MainCatDisplay';
function App() {
    return (


    <BrowserRouter>
        <Routes>
            {/* This can probably be implemented better */}
            <Route path="/" element={
                <div className="min-h-screen bg-black flex">
                    <MainCatDisplay/>
                </div>
            }/>
            <Route path="/cat/:id" element={
                <div className="min-h-screen bg-black flex">
                    <MainCatDisplay/>
                </div>
            }/>
            {/*<Route path="/breeds" element={
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <MainBreedDisplay/>
                </div>
            }/>
            <Route path="/breeds/:id" element={
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <MainBreedDisplay/>
                </div>
            }/>*/}
        </Routes>
    </BrowserRouter>
    );
}

export default App;
