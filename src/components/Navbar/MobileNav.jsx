// components/Navbar/MobileNav.jsx
import React from "react";
import NavItem from "./NavItem";
import ProfileButton from "./ProfileButton";

export default function MobileNav({
  isMenuOpen,
  navLinks,
  isActive,
  handleProfileClick,
  closeMenu,
  user,
  profileImage,
  authLoading,
}) {
  return (
    <div
      className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen
          ? 'max-h-[600px] opacity-100 visible py-2'
          : 'max-h-0 opacity-0 invisible'
      } overflow-hidden`}
    >
      <div className="px-3 pt-2 pb-4 space-y-1 bg-white rounded-lg mx-1 my-2 shadow-md border border-gray-100">
        {navLinks.map((link) => (
          <NavItem
            key={link.to}
            to={link.to}
            label={link.label}
            Icon={link.icon}
            count={link.count}
            isActive={isActive(link.to)}
            onClick={closeMenu}
            variant="mobile"
          />
        ))}

        <ProfileButton
          user={user}
          profileImage={profileImage}
          authLoading={authLoading}
          onClick={handleProfileClick}
          variant="mobile"
        />
      </div>
    </div>
  );
}