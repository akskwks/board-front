
// src/App.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import BoardForm from './BoardForm';
import BoardDetail from './BoardDetail';

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


    return (
        <Router>
            <div>
                
                <Routes>
                  <Route path="/" element={<BoardList boards={boards} />} />
                  <Route path="/write" element={<BoardForm onAddBoard={fetchBoards} />} />
                  <Route path="/boards/:id" element={<BoardDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;



