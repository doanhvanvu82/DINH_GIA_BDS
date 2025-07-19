import { useNavigate } from 'react-router-dom';


const Header = ({ title }: { title?: string }) => {
  const navigate = useNavigate();
  
  return (
    <header className="fixed top-0 left-0 w-full z-[1200] bg-header-bg shadow-sm ">
     
      
      {/* Bottom Row - Logo & Navigation */}
      <div className="bg-header-bg">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo */}
          <div className="text-[22px] font-bold text-header-text ml-4 tracking-wider">
            {title || "logo"}
          </div>
          {/* Navigation Menu */}
          <nav className="flex items-center gap-8">
            <button
              onClick={() => navigate('/')}
              className="text-header-link hover:text-header-link-hover font-medium transition-colors duration-200"
              aria-label="Về trang chủ"
            >
              Trang chủ
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="text-header-link hover:text-header-link-hover font-medium transition-colors duration-200"
              aria-label="Liên hệ"
            >
              Liên hệ
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;