// src/pages/GuestbookPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGuestbook, addGuestbookEntry } from '../api/apiClient';
import { useAuth } from '../contexts/AuthContext';

const GuestbookPage = () => {
    const { userId: ownerUserId } = useParams();
    const { user: writerUser } = useAuth();
    
    const [entries, setEntries] = useState([]);
    const [newContent, setNewContent] = useState("");
    const [loading, setLoading] = useState(true);

    const loadGuestbook = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchGuestbook(ownerUserId);
            setEntries(data);
        } catch (error) {
            console.error("방명록 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    }, [ownerUserId]);
    
    useEffect(() => {
        loadGuestbook();
    }, [loadGuestbook]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newContent.trim() || !writerUser) return;
        
        const newEntryData = {
            content: newContent,
            writerUserId: writerUser.userId,
            ownerUserId: Number(ownerUserId),
        };

        try {
            await addGuestbookEntry(newEntryData);
            setNewContent("");
            loadGuestbook(); // 방명록 목록 새로고침
        } catch (error) {
            console.error("방명록 작성 실패:", error);
            alert("방명록 작성에 실패했습니다.");
        }
    };

    if (loading) return <div className="container">방명록을 불러오는 중...</div>;

    return (
        <div className="container">
            <h2>방명록</h2>
            <div className="guestbook-form">
                <form onSubmit={handleSubmit}>
                    <textarea 
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="일촌평을 남겨주세요!"
                    />
                    <button type="submit">남기기</button>
                </form>
            </div>
            <div className="guestbook-list">
                {entries.map(entry => (
                    <div key={entry.entryId} className="guestbook-entry">
                        <p><strong>{entry.writerNickname}</strong></p>
                        <p>{entry.content}</p>
                        <small>{new Date(entry.createdAt).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuestbookPage;