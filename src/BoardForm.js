// src/BoardForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BoardForm.css';

const BoardForm = ({ onAddBoard }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();  // useNavigate 훅 사용

    const handleSubmit = (e) => {  
        e.preventDefault();

        if (!title.trim()) {
            alert('제목을 입력하세요!');
            return;
        }
        if (!content.trim()) {
            alert('내용을 입력하세요!');
            return;
        }
        if (!user.trim()) {
            alert('작성자를 입력하세요!');
            return;
        }

        axios.post('http://localhost:8080/api/boards', {
            title,
            content,
            user
        })
        .then(response => {
            alert('게시글이 작성되었습니다!');
            setTitle('');
            setContent('');
            setUser('');
            onAddBoard();  // 게시글 작성 후 목록을 다시 가져옴
            navigate('/');  // 작성 후 목록 페이지로 이동
        })
        .catch(error => {
            console.error("There was an error submitting the board data!", error);
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <div className='boxform'>
                    <label style={{ fontWeight: 'bold'}}>제목 : </label>
                    <input type="text" style={{width: '300px', height: '20px', border: 'white'}} value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <br />
                <div className='boxform2'>
                    <label style={{ fontWeight: 'bold'}}>내용 :</label>
                    <textarea style={{
                        width: '100%',
                        resize: 'vertical',
                        minHeight: '40px',
                        maxHeight: '200px',
                        border: 'none'
                    }} value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <br />
                <div className='boxform3'>
                    <label style={{ fontWeight: 'bold'}}>작성자 : </label>
                    <input type="text" style={{width: '100px', height: '20px', border: 'white'}} value={user} onChange={(e) => setUser(e.target.value)} />
                </div>
                <br />
                <button type="submit" className='btn'>작성하기</button>
            </form>
        </div>
    );
}

export default BoardForm;
