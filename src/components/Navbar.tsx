import React, { useState, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

import styled from '@emotion/styled';

// Impor Ikon
import { FiMenu, FiX, FiHome, FiAward, FiBookOpen, FiLogIn, FiLogOut, FiSun, FiMoon, FiSettings, FiTool } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";

// Tipe-tipe yang dibutuhkan
interface UserType { name: string; level: string; role: 'user' | 'admin'; }
interface AuthContextType { isAuthenticated: boolean; user: UserType | null; logout: () => void; }
type Theme = 'light' | 'dark';
interface ThemeContextType { theme: Theme; toggleTheme: () => void; }
interface NavLinkType { path: string; label: string; icon: ReactNode; auth?: boolean; }

// ========================================================================
// STYLED COMPONENTS (TETAP SAMA SEPERTI SEBELUMNYA)
// ========================================================================

const Header = styled.header`
  background-color: var(--kayu-jati);
  font-family: var(--font-body);
  border-bottom: 4px solid var(--kayu-gelap);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 0 1rem;
  height: 4.5rem; /* 72px */

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
  @media (min-width: 1024px) {
    height: 110px;
    padding: 0 5rem;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  transition: transform 0.3s ease, filter 0.3s ease;
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px rgba(255, 223, 111, 0.7));
  }
  @media (min-width: 768px) {
    height: 62px;
  }
`;

const NavDesktop = styled.nav`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    flex: 1;
    justify-content: center;
  }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--teks-putih-gading);
  text-decoration: none;
  position: relative;
  padding-bottom: 8px;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--emas-kerajaan);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.4s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &:hover {
    color: white;
  }
  
  ${props => props.isActive && `
    color: var(--emas-kerajaan);
    font-weight: 700;
    &::after {
      transform: scaleX(1);
    }
  `}
`;

const AuthActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  min-width: 150px;
  flex: 1;
`;

const RegisterButton = styled(Link)`
  background-color: var(--emas-kerajaan);
  color: var(--teks-coklat-tua);
  font-family: var(--font-body);
  font-weight: 700;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2), inset 0 -2px 1px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.3), inset 0 -2px 1px rgba(0,0,0,0.1);
    background-color: var(--emas-terang);
  }
`;

// Tombol Logout Sederhana
const LogoutButton = styled.button`
  background-color: transparent;
  color: var(--teks-putih-gading);
  font-family: var(--font-body);
  font-weight: 500;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--teks-putih-gading);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--merah-pusaka);
    border-color: var(--merah-pusaka);
    color: white;
  }
`;

const MobileMenuButton = styled.button`
  color: var(--teks-putih-gading);
  padding: 0.5rem;
  z-index: 100;
  @media (min-width: 1024px) { display: none; }
`;

// ========================================================================
// KOMPONEN UTAMA
// ========================================================================

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth() as AuthContextType;
  // const { theme, toggleTheme } = useTheme() as ThemeContextType;
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/'); // Arahkan ke beranda setelah logout
  };

  const navLinks: NavLinkType[] = [
    { path: "/", label: "Beranda", icon: <FiHome /> },
    { path: "/kuis", label: "Kuis", icon: <FaQuestionCircle />, auth: true },
    { path: "/leaderboard", label: "Leaderboard", icon: <FiAward /> },
    { path: "/tutorial", label: "Tutorial", icon: <FiBookOpen /> },
  ];

  return (
    <Header>
      <Container>
        <div style={{ flex: '1 0 0' }}>
          <Link to="/">
            <LogoImage
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/507170e63ed72fa0abf94c821deabb0a1109b706?placeholderIfAbsent=true"
              alt="HISTORIC BLOCK"
            />
          </Link>
        </div>

        <NavDesktop>
          {navLinks.map(link => (
            (!link.auth || isAuthenticated) && (
              <NavLink key={link.path} to={link.path} isActive={location.pathname === link.path}>
                {link.label}
              </NavLink>
            )
          ))}
        </NavDesktop>
        
        <AuthActionsContainer>
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <span style={{ color: 'var(--teks-putih-gading)' }}>
                  Selamat datang, <strong style={{color: 'var(--emas-kerajaan)'}}>{user.name}</strong>!
                </span>
                <LogoutButton onClick={handleLogout}>Keluar</LogoutButton>
              </>
            ) : (
              <>
                <NavLink to="/login" isActive={location.pathname === '/login'}>Masuk</NavLink>
                <RegisterButton to="/register">Daftar</RegisterButton>
              </>
            )}
          </div>
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={32} /> : <FiMenu size={32} />}
          </MobileMenuButton>
        </AuthActionsContainer>
      </Container>
      
      {/* Mobile Menu (Styling-nya bisa ditambahkan di atas jika perlu) */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50 }} onClick={() => setIsMobileMenuOpen(false)}>
          <div style={{ backgroundColor: 'var(--kertas-lontar)', color: 'var(--teks-coklat-tua)', width: '100%', maxWidth: '24rem', height: '100%', boxShadow: 'xl' }} onClick={(e) => e.stopPropagation()}>
            <p style={{padding: '1rem'}}>Mobile Menu Content Here</p>
            {isAuthenticated && (
              <div style={{padding: '1rem'}}>
                <LogoutButton onClick={handleLogout} style={{width: '100%', color: 'white', backgroundColor: 'var(--merah-pusaka)'}}>Keluar</LogoutButton>
              </div>
            )}
          </div>
        </div>
      )}
    </Header>
  );
};

export default Navbar;