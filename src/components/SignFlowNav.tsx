import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useAdaptiveButtonTone } from '@/lib/useAdaptiveButtonTone';
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
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-[48px]');
  const [menuOrigin, setMenuOrigin] = useState({ x: 0, y: 0, radius: 0 });
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isNavButtonOnLight = useAdaptiveButtonTone(menuButtonRef, typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches);

  const closeMenu = () => setIsOpen(false);
  const isActiveLink = (href: string) => {
    if (href === '/portfolio') return location.pathname === '/portfolio' || location.pathname.startsWith('/portfolio/');
    return location.pathname === href;
  };

  const updateMenuOrigin = () => {
    const rect = menuButtonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 56;
    const y = rect ? rect.top + rect.height / 2 : 56;
    const radius = Math.ceil(Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    ));
    setMenuOrigin({ x, y, radius });
  };
  const toggleMenu = () => {
    updateMenuOrigin();
    setIsOpen(current => !current);
  };

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

  useEffect(() => {
    window.addEventListener('resize', updateMenuOrigin);

    return () => {
      window.removeEventListener('resize', updateMenuOrigin);
    };
  }, []);

  return (
    <>
    <header
      className={`fixed left-1/2 top-6 z-[70] flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col items-center px-8 py-4 text-white transition-all duration-300 ease-in-out lg:w-auto lg:border lg:border-[#333] lg:bg-[#1f1f1f57] lg:px-10 lg:shadow-[0_18px_60px_rgba(0,0,0,0.28)] lg:backdrop-blur-[24px] ${headerShapeClass}`}>
      <div className="flex w-full items-center justify-between gap-x-8 lg:gap-x-12">
        <Link to="/" onClick={closeMenu} className="hidden items-center gap-3 lg:flex">
          <img src={logo} alt={logoAlt} className="h-8 w-8 rounded-full object-cover" />
          <span className="hidden whitespace-nowrap text-base font-semibold text-white lg:block">疯狂许师傅</span>
        </Link>

        <nav className="hidden items-center space-x-5 lg:flex lg:space-x-9">
          {links.map(link => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <Link to="/portfolio" onClick={closeMenu} className="relative hidden shrink-0 lg:block">
          <span className="absolute inset-0 -m-2 rounded-full bg-gray-100 opacity-35 blur-lg transition-all duration-300 ease-out hover:opacity-60 hover:blur-xl" />
          <span className="relative z-10 inline-flex whitespace-nowrap rounded-full bg-gradient-to-br from-gray-100 to-gray-300 px-5 py-2.5 text-base font-semibold text-black transition-all duration-200 hover:from-gray-200 hover:to-gray-400">
            View Projects
          </span>
        </Link>

        <button
          ref={menuButtonRef}
          className={`ml-auto flex h-[46px] w-[46px] items-center justify-center rounded-full border transition active:scale-95 focus:outline-none md:h-[55px] md:w-[55px] lg:hidden ${
            isOpen
              ? 'border-white bg-white text-black'
              : isNavButtonOnLight
                ? 'border-black/75 bg-transparent text-black'
                : 'border-white/75 bg-transparent text-white'
          }`}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          type="button">
          <ArrowUpRight className={`h-6 w-6 transition-transform duration-300 md:h-7 md:w-7 ${isOpen ? 'rotate-[360deg]' : 'rotate-180'}`} strokeWidth={2.2} />
        </button>
      </div>
    </header>

    <div
      className={`fixed inset-0 z-[60] bg-black px-5 pb-8 pt-32 text-black transition-all duration-300 md:hidden ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{
        clipPath: isOpen
          ? `circle(${menuOrigin.radius || 1600}px at ${menuOrigin.x || 'calc(100% - 56px)'}px ${menuOrigin.y || 56}px)`
          : `circle(1px at ${menuOrigin.x || 'calc(100% - 56px)'}px ${menuOrigin.y || 56}px)`,
        transition: isOpen
          ? 'clip-path 760ms cubic-bezier(.22,1,.36,1), opacity 180ms ease-out'
          : 'clip-path 220ms ease-in, opacity 220ms ease-in',
      }}
      aria-hidden={!isOpen}
    >
      <div
        className={`mx-auto flex max-w-md flex-col gap-5 transition-all duration-300 ${
          isOpen ? 'translate-y-0 scale-100 opacity-100 delay-120' : 'translate-y-4 scale-[0.98] opacity-0'
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
                {isActiveLink(link.href) && <span className="h-2.5 w-2.5 rounded-full bg-black" />}
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

    <div
      className={`fixed inset-y-0 right-0 z-[60] hidden w-[48vw] overflow-hidden text-white md:block lg:hidden ${
        isOpen ? '' : 'pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <aside
        className="flex h-full w-full flex-col justify-between bg-[#111111] px-12 pb-12 pt-40"
        style={{
          clipPath: isOpen
            ? 'circle(140vmax at calc(100% - 68px) 58px)'
            : 'circle(1px at calc(100% - 68px) 58px)',
          WebkitClipPath: isOpen
            ? 'circle(140vmax at calc(100% - 68px) 58px)'
            : 'circle(1px at calc(100% - 68px) 58px)',
          opacity: isOpen ? 1 : 0,
          transition: isOpen
            ? 'clip-path 760ms cubic-bezier(.22,1,.36,1), -webkit-clip-path 760ms cubic-bezier(.22,1,.36,1), opacity 180ms ease-out'
            : 'clip-path 220ms ease-in, -webkit-clip-path 220ms ease-in, opacity 220ms ease-in',
        }}
      >
        <nav className="flex flex-col items-start gap-16">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={closeMenu}
              className="text-[32px] font-medium capitalize leading-none tracking-[-0.0em] text-white"
            >
              {link.label.toLowerCase()}
            </Link>
          ))}
        </nav>

        <Link
          to="/portfolio"
          onClick={closeMenu}
          className="flex h-20 items-center justify-between rounded-[18px] bg-[#FF5825] px-7 font-semibold uppercase tracking-[-0.0em] text-white shadow-[0_24px_70px_rgba(255,88,37,0.25)]"
        >
          <span className="!text-[20px] leading-none">Projects</span>
          <ArrowUpRight className="h-9 w-9" />
        </Link>
      </aside>
    </div>
    </>
  );
}
