import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api', // 백엔드 주소/포트 맞춰
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 첨부
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === 게시글 작성 API 추가 ===
export const createPost = (postData) => {
  // postData 예: { title, content, userId }
  return api.post('/posts', postData);
};

export default api;
