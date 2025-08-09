// src/api/apiClient.ts (또는 .js)
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api', // ✅ 백엔드 주소
  withCredentials: false, // ✅ 쿠키 인증 안 쓰면 false
  headers: { 'Content-Type': 'application/json' },
});

// ✅ (선택) JWT 쓰면 자동 첨부
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 저장 키 맞춰서 사용
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* =========================
      Auth
========================= */
export const apiLogin = async (username, password) => {
  const { data } = await apiClient.post('/auth/login', { username, password });
  // data 안에 token 있으면 localStorage.setItem('token', data.token);
  return data; // { userId, nickname, miniHompyName, token? }
};

/* =========================
      Posts
========================= */
// 등록하기: 서버가 토큰에서 유저 식별하면 userId 빼고 보내기 권장
export const createPost = async ({ title, content, userId }) =>
  (await apiClient.post('/posts', { title, content, userId })).data;

export const fetchPosts = async () =>
  (await apiClient.get('/posts')).data;

export const fetchPostById = async (postId) =>
  (await apiClient.get(`/posts/${postId}`)).data;

export const fetchPost = async (id) =>
  (await apiClient.get(`/posts/${id}`)).data;

/* =========================
      Comments
========================= */
export const fetchCommentsByPostId = async (postId) =>
  (await apiClient.get(`/posts/${postId}/comments`)).data;

export const addComment = async ({ postId, userId, content, parentCommentId }) =>
  (await apiClient.post(`/posts/${postId}/comments`, { content, userId, parentCommentId })).data;

/* =========================
      Albums & Photos
========================= */
export const fetchAlbumsByUser = async (userId) =>
  (await apiClient.get(`/albums/user/${userId}`)).data;

export const fetchPhotosByAlbum = async (albumId) =>
  (await apiClient.get(`/albums/${albumId}`)).data;

/* =========================
      Guestbook
========================= */
export const fetchGuestbook = async (ownerUserId) =>
  (await apiClient.get(`/guestbooks/${ownerUserId}`)).data;

export const addGuestbookEntry = async (entryData) =>
  (await apiClient.post('/guestbooks', entryData)).data;

export default apiClient;
//