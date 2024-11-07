import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BoardDetail.css';
import './BoardForm.css';

const BoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ nickname: '', content: '' });

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/boards/${id}`);
                setBoard(response.data);
                setEditedTitle(response.data.title);
                setEditedContent(response.data.content);
            } catch (error) {
                console.error("Error fetching board detail:", error);
            }
        };

        fetchBoard();
    }, [id]);


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/boards/${id}/comments`, newComment);
            setComments([...comments, response.data]);
            setNewComment({ nickname: '', content: '' });
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };


    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/boards/${id}`);
            alert('게시글이 삭제되었습니다.');
            navigate('/'); // 삭제 후 목록 페이지로 이동
        } catch (error) {
            console.error("Error deleting board:", error);
            alert('게시글 삭제에 실패했습니다.');
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/api/boards/${id}`, {
                title: editedTitle,
                content: editedContent
            });
            alert('게시글이 수정되었습니다.');
            setIsEditing(false);
            setBoard({ ...board, title: editedTitle, content: editedContent });
        } catch (error) {
            console.error("Error updating board:", error);
            alert('게시글 수정에 실패했습니다.');
        }
    };

    if (!board) return <p>Loading...</p>;

    return (
        <article>
            {isEditing ? (
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <br /><br />
                    <div>
                        <div className='boxform'>
                        <input
                            type="text"
                            style={{ border: 'white' }}
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                        />
                        </div>
                        <br />
                        <div className='boxform3'>
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            placeholder="내용을 입력하세요"
                            rows="10"
                            style={{ width: '100%', marginTop: '10px' }}
                        />
                        </div>
                        <button onClick={handleSave}>저장</button>
                        <button onClick={handleEditToggle}>취소</button>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <br />
                    <br />
                    <h2 className='box'>{board.title}</h2>
                    <div className='box2'>
                        <p><strong>작성자 : </strong> {board.user}</p>
                        <p><strong>작성일 : </strong> {new Date(board.createdAt).toLocaleString()}</p>
                    </div>
                    <br />
                    <div className='box3'>
                        <p>{board.content}</p>
                    </div>
                    <br />
                    <br />
                    <div style={{ display: 'flex', gap: '10px' }}>
                    <button className='btn' onClick={handleEditToggle}>수정</button>
                    <button className='btn' onClick={handleDelete}>삭제</button>
                    </div>
                </div>

                
            )}

<section>
                <h3>댓글</h3>
                <ul>
                    {comments.map(comment => (
                        <li key={comment.commentId}>
                            <p><strong>{comment.nickname}:</strong> {comment.content}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* 댓글 입력 폼 */}
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    placeholder="닉네임"
                    value={newComment.nickname}
                    onChange={(e) => setNewComment({ ...newComment, nickname: e.target.value })}
                />
                <textarea
                    placeholder="댓글 내용"
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                />
                <button type="submit">댓글 작성</button>
            </form>
        </article>
    );
};

export default BoardDetail;
