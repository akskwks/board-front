import React from 'react';
import { Link } from 'react-router-dom';
import './BoardList.css';

const BoardList = ({ boards }) => {

    const sortedBoards = boards ? [...boards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return ( 
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>게시판 목록</h2> 
            <Link to="/write">
                <button className="btn">글쓰기</button>
            </Link>
            
            <table style={{ width: '800px', borderCollapse: 'collapse', marginTop: '20px', align: 'center' }}>
                <thead className='thead'>
                    <tr>
                        <th style={{ padding: '8px', width: '7%' }}>번호</th>
                        <th style={{ padding: '8px', width: '35%' }}>제목</th>
                        <th style={{ padding: '8px', width: '15%' }}>작성자</th>
                        <th style={{ padding: '8px', width: '25%' }}>작성일</th>
                    </tr> 
                </thead>
                <tbody>
                    {sortedBoards.map((board, index) => (
                        <tr key={board.boardId}>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                {sortedBoards.length - index}
                            </td>
                            <td style={{ padding: '8px' }}>
                                <Link to={`/boards/${board.boardId}`}>{board.title}</Link>
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>{board.user}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>{new Date(board.createdAt).toLocaleString()}</td>
                        </tr>
                        
                        
                    ))}
                </tbody>
            </table>
        </div>

        
    );

    
}




export default BoardList;
