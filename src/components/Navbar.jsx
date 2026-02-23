import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavIcon from "./NavIcon.jsx";

const navLinks = [
  {
    href: "/",
    alt: "Home",
    light: "/Assets/Home.png",
    hover: "/Assets/Home_hover.png",
    dark: "/Assets/Home_dark.png",
    darkHover: "/Assets/Home_dark_hover.png",
  },
  {
    href: "/work",
    alt: "Work",
    light: "/Assets/Work.png",
    hover: "/Assets/Work_hover.png",
    dark: "/Assets/Work_dark.png",
    darkHover: "/Assets/Work_dark_hover.png",
  },
  {
    href: "/illustrations",
    alt: "Illustrations",
    light: "/Assets/Illustrations.png",
    hover: "/Assets/Illustrations_hover.png",
    dark: "/Assets/Illustrations_dark.png",
    darkHover: "/Assets/Illustrations_dark_hover.png",
  },
];

const navLinksRight = [
  {
    href: "/about",
    alt: "About",
    light: "/Assets/About.png",
    hover: "/Assets/About_hover.png",
    dark: "/Assets/About_dark.png",
    darkHover: "/Assets/About_dark_hover.png",
  },
  {
    href: "/services",
    alt: "Services",
    light: "/Assets/Services.png",
    hover: "/Assets/Services_hover.png",
    dark: "/Assets/Services_dark.png",
    darkHover: "/Assets/Services_dark_hover.png",
  },
  {
    href: "/contact",
    alt: "Contact",
    light: "/Assets/Contact.png",
    hover: "/Assets/Contact_hover.png",
    dark: "/Assets/Contact_dark.png",
    darkHover: "/Assets/Contact_hover.png",
  },
];

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/illustrations", label: "Illustrations" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const navRef = useRef(null);

  // Delayed visibility (matches original nav-loaded behavior)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <header
      ref={navRef}
      style={{ visibility: visible ? "visible" : "hidden" }}
      className="fixed top-0 left-0 w-full bg-white dark:bg-black shadow-sm z-[1000] transition-colors duration-300"
    >
      {/* Main Nav */}
      <nav className="grid grid-cols-3 items-center max-w-[1100px] mx-auto px-4 py-4">
        {/* Left links */}
        <div className="hidden md:flex gap-8 justify-start">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="block">
              <NavIcon {...link} />
            </Link>
          ))}
        </div>

        {/* Logo (center) */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="block hover:scale-105 transition-transform duration-200"
          >
            <NavIcon
              light="/Assets/logo.png"
              hover="/Assets/logo_hover.png"
              dark="/Assets/logo_dark.png"
              darkHover="/Assets/logo_dark_hover.png"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Right links */}
        <div className="hidden md:flex gap-8 justify-end items-center">
          {navLinksRight.map((link) => (
            <Link key={link.href} to={link.href} className="block">
              <NavIcon
                {...link}
                height={link.alt === "Contact" ? "42px" : "60px"}
              />
            </Link>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-2xl bg-transparent border-none text-black dark:text-white"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen((o) => !o);
          }}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="flex flex-col bg-[#f9f9f9] dark:bg-black px-4 py-4 list-none">
          {mobileLinks.map((link) => (
            <li key={link.href} className="my-2">
              <Link
                to={link.href}
                className="text-black dark:text-[#f5f5f5] no-underline font-medium hover:opacity-70"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
