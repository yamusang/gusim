import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ backgroundColor: '#f8f9fa', padding: '20px', borderBottom: '1px solid #e9ecef', textAlign: 'center' }}>
      <nav>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.5em', fontWeight: 'bold' }}>
          나만의 게시판
        </Link>
      </nav>
    </header>
  );
}

export default Header;