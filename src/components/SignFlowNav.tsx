import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
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

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
    <header
      className={`fixed left-1/2 top-6 z-[70] flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col items-center px-8 py-4 text-white transition-all duration-300 ease-in-out sm:w-auto sm:border sm:border-[#333] sm:bg-[#1f1f1f57] sm:px-10 sm:shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:backdrop-blur-[24px] ${headerShapeClass}`}>
      <div className="flex w-full items-center justify-between gap-x-8 sm:gap-x-12">
        <Link to="/" onClick={closeMenu} className="hidden items-center gap-3 sm:flex">
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
          className={`ml-auto flex h-[46px] w-[46px] items-center justify-center rounded-full border transition active:scale-95 focus:outline-none sm:hidden ${
            isOpen ? 'border-white bg-white text-black' : 'border-white/75 bg-transparent text-white'
          }`}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          type="button">
          <ArrowUpRight className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-[360deg]' : 'rotate-180'}`} strokeWidth={2.2} />
        </button>
      </div>
    </header>

    <div
      className={`fixed inset-0 z-[60] bg-black/[0.66] px-5 pb-8 pt-32 text-black backdrop-blur-[32px] transition-all duration-300 sm:hidden ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`mx-auto flex max-w-md flex-col gap-5 transition-all duration-300 ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-4 scale-[0.98]'
        }`}
      >
        <nav className="rounded-[22px] bg-white p-7 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="space-y-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                className="flex items-center justify-between text-[34px] font-medium uppercase leading-none tracking-[-0.02em] text-black"
              >
                <span>{link.label}</span>
                {link.href === '/portfolio' && <span className="h-2.5 w-2.5 rounded-full bg-black" />}
              </Link>
            ))}
          </div>
        </nav>

        <Link
          to="/portfolio"
          onClick={closeMenu}
          className="flex h-20 items-center justify-between rounded-[22px] bg-[#FF5825] px-7 text-[28px] font-medium uppercase tracking-[-0.02em] text-white shadow-[0_24px_70px_rgba(255,88,37,0.28)]"
        >
          <span>Projects</span>
          <ArrowUpRight className="h-8 w-8" />
        </Link>
      </div>
    </div>
    </>
  );
}
