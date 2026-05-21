import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './SignFlowNav.css';

interface NavLinkItem {
  label: string;
  href: string;
}

interface SignFlowNavProps {
  logo: string;
  logoAlt?: string;
  links: NavLinkItem[];
}

const AnimatedNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    to={href}
    onClick={onClick}
    className="sign-flow-nav-link relative inline-flex items-center text-base">
    <span className="sign-flow-nav-track">
      <span className="sign-flow-nav-line text-gray-300">{children}</span>
      <span className="sign-flow-nav-line text-white">{children}</span>
    </span>
  </Link>
);

export default function SignFlowNav({ logo, logoAlt = 'Logo', links }: SignFlowNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-[48px]');
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(current => !current);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);

    if (isOpen) {
      setHeaderShapeClass('rounded-[48px]');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-[48px]');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed left-1/2 top-6 z-50 flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col items-center border border-[#333] bg-[#1f1f1f57] px-8 py-4 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-[24px] transition-[border-radius] duration-0 ease-in-out sm:w-auto sm:px-10 ${headerShapeClass}`}>
      <div className="flex w-full items-center justify-between gap-x-8 sm:gap-x-12">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <img src={logo} alt={logoAlt} className="h-8 w-8 rounded-full object-cover" />
          <span className="hidden whitespace-nowrap text-base font-bold text-white sm:block">疯狂许师傅</span>
        </Link>

        <nav className="hidden items-center space-x-5 sm:flex sm:space-x-9">
          {links.map(link => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <Link to="/portfolio" onClick={closeMenu} className="relative hidden sm:block">
          <span className="absolute inset-0 -m-2 rounded-full bg-gray-100 opacity-35 blur-lg transition-all duration-300 ease-out hover:opacity-60 hover:blur-xl" />
          <span className="relative z-10 inline-flex rounded-full bg-gradient-to-br from-gray-100 to-gray-300 px-5 py-2.5 text-base font-semibold text-black transition-all duration-200 hover:from-gray-200 hover:to-gray-400">
            View Projects
          </span>
        </Link>

        <button
          className="flex h-8 w-8 items-center justify-center text-gray-300 focus:outline-none sm:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          type="button">
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${
          isOpen ? 'max-h-[420px] pt-4 opacity-100' : 'max-h-0 pt-0 opacity-0 pointer-events-none'
        }`}>
        <nav className="flex w-full flex-col items-center space-y-4 text-base">
          {links.map(link => (
            <Link key={link.href} to={link.href} onClick={closeMenu} className="w-full text-center text-gray-300 transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/portfolio"
          onClick={closeMenu}
          className="mt-4 w-full rounded-full bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-2 text-center text-sm font-semibold text-black transition-all duration-200 hover:from-gray-200 hover:to-gray-400">
          View Projects
        </Link>
      </div>
    </header>
  );
}
