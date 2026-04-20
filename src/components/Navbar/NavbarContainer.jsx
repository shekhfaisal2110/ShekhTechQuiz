// components/Navbar/NavbarContainer.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCertificateContext } from "../../App";
import { useAuthState } from "../../hooks/useAuthState";

import NavLogo from "./NavLogo";
import MobileMenuToggle from "./MobileMenuToggle";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ProfileButton from "./ProfileButton";

// Icons
import { Trophy, Award, Home, RotateCcw, HelpCircle, FileText, MessageCircle } from "lucide-react";

export default function NavbarContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { activeCertificateCount, recycledCertificateCount } = useCertificateContext();
  const { user, profileImage, authLoading } = useAuthState();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleProfileClick = () => {
    navigate('/profile');
    closeMenu();
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getNavLinkWithCount = (to, label, icon, baseCount = 0) => {
    let displayCount = 0;
    if (to === '/certificates') displayCount = activeCertificateCount;
    else if (to === '/RecycleBin') displayCount = recycledCertificateCount;
    else displayCount = baseCount;
    return { to, label, icon, count: displayCount };
  };

  const navLinks = [
    { to: '/', label: 'Courses', icon: Trophy, count: 0 },
    getNavLinkWithCount('/certificates', 'Certificates', Award),
    getNavLinkWithCount('/RecycleBin', 'Recycle Certificates', RotateCcw),
    { to: '/QuizGuidelines', label: 'Quiz Guidelines', icon: FileText, count: 0 },
    { to: '/QuizHelpForm', label: 'Help Support', icon: MessageCircle, count: 0 },
    { to: '/QuizFAQ', label: 'FAQ', icon: HelpCircle, count: 0 },
    { to: '/demo', label: 'Demo Certificate', icon: Trophy, count: 0 },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <NavLogo onClick={closeMenu} />

          <DesktopNav
            navLinks={navLinks}
            isActive={isActive}
            handleProfileClick={handleProfileClick}
            user={user}
            profileImage={profileImage}
            authLoading={authLoading}
          />

          <div className="flex items-center space-x-2 md:hidden">
            <ProfileButton
              user={user}
              profileImage={profileImage}
              authLoading={authLoading}
              onClick={handleProfileClick}
              variant="mobile-toggle"
            />
            <MobileMenuToggle isMenuOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>

        <MobileNav
          isMenuOpen={isMenuOpen}
          navLinks={navLinks}
          isActive={isActive}
          handleProfileClick={handleProfileClick}
          closeMenu={closeMenu}
          user={user}
          profileImage={profileImage}
          authLoading={authLoading}
        />
      </div>
    </nav>
  );
}