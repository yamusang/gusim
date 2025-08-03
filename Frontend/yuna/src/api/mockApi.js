let users = [
  { user_id: 1, username: 'cyworld_admin', password_hash: '1234', nickname: '관리자', mini_hompy_name: '싸이월드에 오신 것을 환영합니다!' },
  { user_id: 2, username: 'bomi', password_hash: '1234', nickname: '봄이', mini_hompy_name: '봄이의 미니홈피' },
];

let posts = [
  { post_id: 1, user_id: 1, title: '싸이월드 리액트 버전 오픈!', content: '이제 리액트로 싸이월드를 즐겨보세요!', created_at: new Date(), view_count: 101 },
  { post_id: 2, user_id: 2, title: '오늘의 일기', content: '오늘은 날씨가 좋아서 기분도 좋았다. ☀️', created_at: new Date(), view_count: 55 },
];

// 댓글/대댓글 구조를 위해 parent_id 추가. null이면 최상위 댓글.
let comments = [
  { comment_id: 1, post_id: 1, user_id: 2, content: '우와! 정말 멋져요!', parent_id: null, created_at: new Date() },
  { comment_id: 2, post_id: 1, user_id: 1, content: '감사합니다! 자주 놀러오세요~', parent_id: 1, created_at: new Date() },
  { comment_id: 3, post_id: 1, user_id: 2, content: '네! 혹시 이모티콘도 지원되나요?', parent_id: 2, created_at: new Date() },
  { comment_id: 4, post_id: 2, user_id: 1, content: '일기 잘 보고 갑니다~', parent_id: null, created_at: new Date() },
];

let albums = [
    { album_id: 1, user_id: 2, title: '2025년 여름휴가', description: '제주도에서 즐거운 시간' },
];

let photos = [
    { photo_id: 1, album_id: 1, user_id: 2, photo_url: 'https://via.placeholder.com/300/87CEEB/FFFFFF?text=Jeju+Sea', caption: '푸른 제주 바다' },
    { photo_id: 2, album_id: 1, user_id: 2, photo_url: 'https://via.placeholder.com/300/FFD700/FFFFFF?text=Hallasan', caption: '한라산 등반!' },
];

let guestbook = [
    { entry_id: 1, writer_user_id: 1, owner_user_id: 2, content: '홈피 잘 보고 가요~ 도토리 놓고 갑니다!', is_private: false },
]

// --- API 함수들 (Promise를 반환하여 비동기 흉내) ---

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiLogin = async (username, password) => {
  await delay(500);
  const user = users.find(u => u.username === username && u.password_hash === password);
  if (user) return { ...user };
  throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
};

export const fetchPosts = async () => {
  await delay(300);
  return posts.map(p => ({...p, author: users.find(u => u.user_id === p.user_id).nickname}));
};

export const fetchPostById = async (postId) => {
    await delay(300);
    const post = posts.find(p => p.post_id === Number(postId));
    if (!post) throw new Error('게시글을 찾을 수 없습니다.');
    const postAuthor = users.find(u => u.user_id === post.user_id);
    
    const postComments = comments
      .filter(c => c.post_id === Number(postId))
      .map(c => ({...c, author: users.find(u => u.user_id === c.user_id)}));
      
    return { ...post, author: postAuthor.nickname, comments: postComments };
};

export const addComment = async ({ postId, userId, content, parentId }) => {
    await delay(300);
    const newComment = {
        comment_id: comments.length + 1,
        post_id: Number(postId),
        user_id: userId,
        content,
        parent_id: parentId,
        created_at: new Date(),
        author: users.find(u => u.user_id === userId)
    };
    comments.push(newComment);
    return newComment;
}

export const fetchAlbumsByUser = async (userId) => {
    await delay(300);
    return albums.filter(a => a.user_id === userId);
}

export const fetchPhotosByAlbum = async (albumId) => {
    await delay(300);
    const album = albums.find(a => a.album_id === Number(albumId));
    const photosInAlbum = photos.filter(p => p.album_id === Number(albumId));
    return { album, photos: photosInAlbum };
}

export const fetchGuestbook = async (ownerId) => {
    await delay(300);
    return guestbook
        .filter(e => e.owner_user_id === ownerId)
        .map(e => ({...e, writer: users.find(u => u.user_id === e.writer_user_id).nickname}));
}

export const addGuestbookEntry = async ({ writerId, ownerId, content }) => {
    await delay(300);
    const newEntry = {
        entry_id: guestbook.length + 1,
        writer_user_id: writerId,
        owner_user_id: ownerId,
        content,
        is_private: false,
        created_at: new Date(),
    };
    guestbook.push(newEntry);
    return { ...newEntry, writer: users.find(u => u.user_id === writerId).nickname };
}