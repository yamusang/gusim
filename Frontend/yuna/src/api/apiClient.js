import axios from 'axios';

// Axios 인스턴스 생성: 모든 요청의 기본 URL과 설정을 관리합니다.
const apiClient = axios.create({
  baseURL: 'http://localhost:5173/api', // Spring Boot 서버 주소
  withCredentials: true, // 세션/쿠키 기반 인증 시 필요할 수 있음
});


/**
 * 인증 (Authentication) API
 */
export const apiLogin = async (username, password) => {
  const response = await apiClient.post('/auth/login', { username, password });
  return response.data; // { userId, nickname, miniHompyName }
};


/**
 * 게시판 (Posts) API
 */
export const fetchPosts = async () => {
  const response = await apiClient.get('/posts');
  return response.data;
};

export const fetchPostById = async (postId) => {
  const response = await apiClient.get(`/posts/${postId}`);
  return response.data;
};


/**
 * 댓글 (Comments) API
 */
export const fetchCommentsByPostId = async (postId) => {
  const response = await apiClient.get(`/posts/${postId}/comments`);
  return response.data;
};

export const addComment = async ({ postId, userId, content, parentCommentId }) => {
  const response = await apiClient.post(`/posts/${postId}/comments`, {
    content,
    userId,
    parentCommentId,
  });
  return response.data;
};


/**
 * 사진첩 (Albums & Photos) API
 */
export const fetchAlbumsByUser = async (userId) => {
  const response = await apiClient.get(`/albums/user/${userId}`);
  return response.data;
};

export const fetchPhotosByAlbum = async (albumId) => {
  const response = await apiClient.get(`/albums/${albumId}`);
  return response.data;
};


/**
 * 방명록 (Guestbook) API
 */
export const fetchGuestbook = async (ownerUserId) => {
  const response = await apiClient.get(`/guestbooks/${ownerUserId}`);
  return response.data;
};

export const addGuestbookEntry = async (entryData) => {
  // entryData: { content, writerUserId, ownerUserId }
  const response = await apiClient.post('/guestbooks', entryData);
  return response.data;
};
export const createPost = async (postData) => {
  const response = await apiClient.post('/posts', postData);
  return response.data;
};


