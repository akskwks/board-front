
// src/App.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import BoardForm from './BoardForm';
import BoardDetail from './BoardDetail';
import Carousel from './Carousel';

import image1 from './image/001.png';
import image2 from './image/002.png';
import image3 from './image/003.png';

const App = () => {
    const [boards, setBoards] = useState([]);


    const fetchBoards = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/boards');
            setBoards(response.data); // 데이터 설정
        } catch (error) {
            console.error("Error fetching board data:", error);
        }
    };

    useEffect(() => {
      fetchBoards();
    }, []);

    const carouselItems = [
        // <div style={{ background: 'lightblue', height: '100%' }}>TEST</div>,
        // <div style={{ background: 'lightgreen', height: '100%' }}>TEST2</div>,
        // <div style={{ background: 'lightcoral', height: '100%' }}>TEST3</div>
        <div>
            <img src={image1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>,
        <div>
            <img src={image2} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>,
        <div>
            <img src={image3} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    ];


    return (
        <Router>
            <div>
                <Carousel items={carouselItems} interval={3000} />
                
                <Routes>
                  <Route path="/" element={<BoardList boards={boards} />} />
                  <Route path="/write" element={<BoardForm onAddBoard={fetchBoards} />} />
                  <Route path="/boards/:id" element={<BoardDetail />} />
                </Routes>
            </div>
            <div style={{ height: '200px' }}></div>
        </Router>
        
    );
}

export default App;



