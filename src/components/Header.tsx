import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 w-full z-[1200] bg-blue-600 border-b border-blue-700 shadow-sm flex items-center py-2 px-4">
      <div className="flex gap-2 ml-[120px]">
        <button
          onClick={() => navigate('/')}
          className="px-2 py-1 rounded bg-white text-blue-700 font-semibold shadow hover:bg-blue-50 transition text-sm"
          aria-label="Về trang chủ"
        >
          Trang chủ
        </button>
        <button
          onClick={() => navigate('/about')}
          className="px-2 py-1 rounded bg-white text-blue-700 font-semibold shadow hover:bg-blue-50 transition text-sm"
          aria-label="Giới thiệu"
        >
          About
        </button>
      </div>
    </header>
  );
};

export default Header; 