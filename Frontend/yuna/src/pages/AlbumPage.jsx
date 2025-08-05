// src/pages/AlbumPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAlbumsByUser } from '../api/apiClient';
import './AlbumPage.css';

const AlbumPage = () => {
  const { userId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        setLoading(true);
        // Mock API 호출
        const data = await fetchAlbumsByUser(userId);
        setAlbums(data);
        setError(null);
      } catch (err) {
        setError('앨범을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAlbums();
  }, [userId]);

  if (loading) {
    return <div className="container"><p>앨범 목록을 불러오는 중...</p></div>;
  }

  if (error) {
    return <div className="container"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className="container">
      <h2>사진첩</h2>
      {albums.length > 0 ? (
        <div className="album-grid">
          {albums.map(album => (
            // 각 앨범을 클릭하면 사진 목록 페이지로 이동합니다. (다음 단계에서 구현)
            <Link to={`/album/${album.albumId}`} key={album.albumId} className="album-card">
              <div className="album-thumbnail">
                {/* 앨범의 첫 번째 사진을 썸네일로 사용하거나, 없으면 플레이스홀더를 보여줍니다. */}
                <img 
                  src={`https://via.placeholder.com/300/282c34/61dafb?text=${album.title.charAt(0)}`} 
                  alt={album.title} 
                />
              </div>
              <div className="album-info">
                <h3>{album.title}</h3>
                <p>{album.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>생성된 앨범이 없습니다.</p>
      )}
    </div>
  );
};

export default AlbumPage;